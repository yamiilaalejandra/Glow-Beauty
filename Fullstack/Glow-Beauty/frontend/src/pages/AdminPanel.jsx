import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';
import { getStoredProducts, createProduct, updateProduct, deleteProduct } from '../data/products';
import { getStoredAccessories, createAccessory, updateAccessory, deleteAccessory } from '../data/accessories';
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

  const loadData = async () => {
    try {
      const [prods, accs, ords] = await Promise.all([
        getStoredProducts(),
        getStoredAccessories(),
        getStoredOrders(),
      ]);
      setProducts(prods);
      setAccessories(accs);
      setOrders(ords);
    } catch (err) {
      setMessage('Error al cargar datos: ' + err.message);
    }
  };

  useEffect(() => {
    loadData();
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
      image: item.image || '',
      stock: String(item.stock)
    });
    setMessage('');
  };

  const handleDeleteItem = async (itemId, category) => {
    try {
      if (category === 'products') {
        await deleteProduct(itemId);
        setProducts((prev) => prev.filter((p) => p.id !== itemId));
        if (editingItem?.category === 'products' && editingItem.id === itemId) resetForm();
        setMessage('Producto eliminado correctamente.');
      } else {
        await deleteAccessory(itemId);
        setAccessories((prev) => prev.filter((a) => a.id !== itemId));
        if (editingItem?.category === 'accessories' && editingItem.id === itemId) resetForm();
        setMessage('Accesorio eliminado correctamente.');
      }
    } catch (err) {
      setMessage('Error al eliminar: ' + err.message);
    }
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    const price = parseFloat(form.price);
    const stock = parseInt(form.stock, 10);

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.longDescription.trim() ||
      !form.ingredients.trim() ||
      Number.isNaN(price) ||
      Number.isNaN(stock)
    ) {
      setMessage('Completa todos los campos correctamente.');
      return;
    }

    const category = activeTab === 'accessories' ? 'accessories' : 'products';
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      longDescription: form.longDescription.trim(),
      ingredients: form.ingredients.trim(),
      price,
      image: form.image.trim(),
      stock,
    };

    try {
      if (category === 'accessories') {
        if (editingItem) {
          const updated = await updateAccessory(editingItem.id, payload);
          setAccessories((prev) => prev.map((a) => (a.id === editingItem.id ? updated : a)));
          setMessage('Accesorio actualizado correctamente.');
        } else {
          const created = await createAccessory(payload);
          setAccessories((prev) => [...prev, created]);
          setMessage('Accesorio agregado correctamente.');
        }
      } else {
        if (editingItem) {
          const updated = await updateProduct(editingItem.id, payload);
          setProducts((prev) => prev.map((p) => (p.id === editingItem.id ? updated : p)));
          setMessage('Producto actualizado correctamente.');
        } else {
          const created = await createProduct(payload);
          setProducts((prev) => [...prev, created]);
          setMessage('Producto agregado correctamente.');
        }
      }
      resetForm();
    } catch (err) {
      setMessage('Error al guardar: ' + err.message);
    }
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
          <div className="admin-main-content">
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
                  <input id="image" name="image" value={form.image} onChange={handleInputChange} />
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
