import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';
import {
  getNextProductId,
  getStoredProducts,
  initializeProductStorage,
  saveProducts
} from '../data/products';
import {
  getNextAccessoryId,
  getStoredAccessories,
  initializeAccessoryStorage,
  saveAccessories
} from '../data/accessories';
import { getStoredOrders } from '../data/orders';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState(() => sessionStorage.getItem('adminActiveTab') || 'products');
  const [products, setProducts] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    name: '',
    description: '',
    longDescription: '',
    ingredients: '',
    price: '',
    image: '',
    stock: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    initializeProductStorage();
    initializeAccessoryStorage();
    setProducts(getStoredProducts());
    setAccessories(getStoredAccessories());
    setOrders(getStoredOrders());

    const handleInventoryUpdated = () => {
      setProducts(getStoredProducts());
      setAccessories(getStoredAccessories());
    };

    const handleOrdersUpdated = () => {
      setOrders(getStoredOrders());
    };

    window.addEventListener('glowBeautyInventoryUpdated', handleInventoryUpdated);
    window.addEventListener('glowBeautyOrdersUpdated', handleOrdersUpdated);

    return () => {
      window.removeEventListener('glowBeautyInventoryUpdated', handleInventoryUpdated);
      window.removeEventListener('glowBeautyOrdersUpdated', handleOrdersUpdated);
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem('adminActiveTab', activeTab);
  }, [activeTab]);

  const resetForm = () => {
    setForm({ name: '', description: '', longDescription: '', ingredients: '', price: '', image: '', stock: '' });
    setEditingItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditItem = (item, category) => {
    setEditingItem({ id: item.id, category });
    setActiveTab(category);
    setForm({
      name: item.name,
      description: item.description,
      longDescription: item.longDescription,
      ingredients: item.ingredients,
      price: String(item.price),
      image: item.image,
      stock: String(item.stock)
    });
    setMessage('');
  };

  const handleDeleteItem = (itemId, category) => {
    if (category === 'products') {
      const updatedProducts = products.filter((product) => product.id !== itemId);
      saveProducts(updatedProducts);
      setProducts(updatedProducts);
      if (editingItem?.category === 'products' && editingItem.id === itemId) resetForm();
      setMessage('Producto eliminado correctamente.');
    } else {
      const updatedAccessories = accessories.filter((accessory) => accessory.id !== itemId);
      saveAccessories(updatedAccessories);
      setAccessories(updatedAccessories);
      if (editingItem?.category === 'accessories' && editingItem.id === itemId) resetForm();
      setMessage('Accesorio eliminado correctamente.');
    }
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    const price = parseFloat(form.price);
    const stock = parseInt(form.stock, 10);

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.longDescription.trim() ||
      !form.ingredients.trim() ||
      !form.image.trim() ||
      Number.isNaN(price) ||
      Number.isNaN(stock)
    ) {
      setMessage('Completa todos los campos correctamente.');
      return;
    }

    const category = activeTab === 'accessories' ? 'accessories' : 'products';
    const nextId = category === 'accessories' ? getNextAccessoryId() : getNextProductId();
    const itemId = editingItem?.id || nextId;
    const newItem = {
      id: itemId,
      name: form.name.trim(),
      description: form.description.trim(),
      longDescription: form.longDescription.trim(),
      ingredients: form.ingredients.trim(),
      price,
      image: form.image.trim(),
      stock,
      category: category === 'accessories' ? 'accessory' : 'product'
    };

    if (category === 'accessories') {
      const updatedAccessories = editingItem
        ? accessories.map((accessory) => (accessory.id === editingItem.id ? { ...accessory, ...newItem } : accessory))
        : [...accessories, newItem];
      saveAccessories(updatedAccessories);
      setAccessories(updatedAccessories);
      setMessage(editingItem ? 'Accesorio actualizado correctamente.' : 'Accesorio agregado correctamente.');
    } else {
      const updatedProducts = editingItem
        ? products.map((product) => (product.id === editingItem.id ? { ...product, ...newItem } : product))
        : [...products, newItem];
      saveProducts(updatedProducts);
      setProducts(updatedProducts);
      setMessage(editingItem ? 'Producto actualizado correctamente.' : 'Producto agregado correctamente.');
    }

    resetForm();
  };

  const isProductsTab = activeTab === 'products';
  const isAccessoriesTab = activeTab === 'accessories';
  const currentItems = isProductsTab ? products : accessories;

  return (
    <main className="page-content">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1>Panel de Administración</h1>
            <p style={{ marginTop: 8, color: '#555' }}>
              Total de órdenes registradas: <strong>{orders.length}</strong>
            </p>
          </div>
        </div>

        <div className="admin-panel-tabs">
          <button
            className={`btn ${isProductsTab ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setActiveTab('products'); resetForm(); }}
          >
            Productos
          </button>
          <button
            className={`btn ${isAccessoriesTab ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setActiveTab('accessories'); resetForm(); }}
          >
            Accesorios
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/admin/ordenes')}
          >
            Órdenes de Compra
          </button>
        </div>

        {message && <div className="admin-message">{message}</div>}

        {(isProductsTab || isAccessoriesTab) && (
          /* VISTA EN DOS COLUMNAS - Para Inventario */
          <div className="admin-main-content">
            
            {/* COLUMNA IZQUIERDA: Tabla */}
            <section className="admin-card table-section">
              <h2>{isProductsTab ? 'Productos actuales' : 'Accesorios actuales'}</h2>
              {currentItems.length === 0 ? (
                <p>No hay artículos en esta categoría.</p>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left' }}>Nombre</th>
                      <th style={{ textAlign: 'right', paddingRight: '20px' }}>Precio</th>
                      <th style={{ textAlign: 'center' }}>Stock</th>
                      <th style={{ textAlign: 'center' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(item.price)}</td>
                        <td>{item.stock}</td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            className="btn btn-secondary"
                            onClick={() => handleEditItem(item, activeTab)}
                            style={{ marginRight: 8 }}
                          >
                            Editar
                          </button>
                          <button className="btn btn-danger" onClick={() => handleDeleteItem(item.id, activeTab)}>
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>

            {/* COLUMNA DERECHA: Formulario */}
            <section className="admin-card form-section">
              <h2>{editingItem ? `Editar ${isAccessoriesTab ? 'accesorio' : 'producto'}` : `Agregar nuevo ${isAccessoriesTab ? 'accesorio' : 'producto'}`}</h2>
              <form className="admin-form" onSubmit={handleSaveItem}>
                <div className="input-group">
                  <label htmlFor="name">Nombre</label>
                  <input id="name" name="name" value={form.name} onChange={handleInputChange} required />
                </div>
                <div className="input-group">
                  <label htmlFor="description">Descripción corta</label>
                  <input id="description" name="description" value={form.description} onChange={handleInputChange} required />
                </div>
                <div className="input-group">
                  <label htmlFor="longDescription">Descripción larga</label>
                  <textarea
                    id="longDescription"
                    name="longDescription"
                    rows="4"
                    value={form.longDescription}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="ingredients">Ingredientes / Componentes</label>
                  <input id="ingredients" name="ingredients" value={form.ingredients} onChange={handleInputChange} required />
                </div>
                <div className="input-group">
                  <label htmlFor="price">Precio</label>
                  <input id="price" name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleInputChange} required />
                </div>
                <div className="input-group">
                  <label htmlFor="image">URL de Imagen</label>
                  <input id="image" name="image" value={form.image} onChange={handleInputChange} required />
                </div>
                <div className="input-group">
                  <label htmlFor="stock">Stock</label>
                  <input id="stock" name="stock" type="number" min="0" value={form.stock} onChange={handleInputChange} required />
                </div>
                <div className="admin-form-actions">
                  <button type="submit" className="btn btn-primary">
                    {editingItem ? 'Guardar cambios' : `Agregar ${isAccessoriesTab ? 'accesorio' : 'producto'}`}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Limpiar formulario
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}