# Glow Beauty - Interfaz Web E-commerce Completa

## 🎨 Paleta de Colores

- **Fondo Principal:** #FCE4EC (rosa muy claro)
- **Fondo Cards:** #FFFFFF (blanco)
- **Primary Pink:** #EC407A (rosa principal)
- **Dark Pink:** #C2185B (rosa oscuro)
- **Texto Oscuro:** #333333
- **Texto Claro:** #666666

## 📁 Estructura del Proyecto

```
src/
├── components/
│   └── Header.jsx          # Header reutilizable en todas las páginas
├── pages/
│   ├── Login.jsx           # Pantalla 1: Login/Registro
│   ├── Products.jsx        # Pantalla 2: Catálogo de productos
│   ├── ProductDetail.jsx   # Pantalla 3: Detalle de producto
│   ├── Checkout.jsx        # Pantalla 4: Carrito + Checkout
│   └── Confirmation.jsx    # Pantalla 5: Confirmación de compra
├── routes/
│   └── AppRouter.jsx       # Rutas principales
├── styles/
│   ├── header.css          # Estilos del header
│   └── pages.css           # Estilos de todas las páginas
├── App.jsx                 # Componente raíz
├── main.jsx                # Punto de entrada React
└── style.css               # Estilos globales + variables CSS
```

## 🖥️ Flujo de Pantallas

### 1️⃣ LOGIN / REGISTRO (/login)
- Card centrada con formulario elegante
- Inputs: Email y Contraseña
- Botón "Ingresar" (primary)
- Link a "Crear cuenta"
- Almacena usuario en localStorage

### 2️⃣ CATÁLOGO DE PRODUCTOS (/products)
- Título: "Nuestros Productos"
- Grid de 3 columnas (responsive)
- 6 productos de maquillaje
- Cada producto muestra:
  - Emoji como imagen
  - Nombre
  - Precio destacado
  - Botón "Ver Producto"

### 3️⃣ DETALLE DE PRODUCTO (/product/:id)
- Layout 2 columnas
- Izquierda: Imagen grande (gradient rosa)
- Derecha: 
  - Nombre del producto
  - Precio destacado
  - Descripción larga
  - Ingredientes
  - Selector de cantidad
  - Botón "Agregar al Carrito"
  - Botón "Continuar Comprando"

### 4️⃣ CARRITO + CHECKOUT (/checkout)
- Layout 2 columnas
- **Izquierda:**
  - Lista de productos en carrito
  - Cada item: imagen, nombre, cantidad, precio
  - Botón eliminar
- **Derecha:**
  - Formulario de envío
  - Inputs: Nombre, Email, Dirección, Ciudad, Código Postal
  - Selector de método de pago
  - Resumen de compra:
    - Subtotal
    - Impuesto (10%)
    - Envío (gratis >$50)
    - Total
  - Botón "Confirmar Compra"

### 5️⃣ CONFIRMACIÓN (/confirmation)
- Card centrada
- Ícono animado de éxito 🎉
- Título: "¡Compra Realizada con Éxito!"
- Detalles del pedido (número, estado, tiempo entrega)
- Botón "Volver al Inicio"
- Botón "Seguir Comprando"

## 🎯 Componentes Reutilizables

### Header
- Logo "✨ Glow Beauty" clickeable (va a login)
- Buscador en el centro
- Iconos: Usuario 👤 y Carrito 🛍️
- Sticky top
- Sombra sutil

### Botones
- **btn-primary:** Rosa (#EC407A), texto blanco, hover oscuro
- **btn-secondary:** Transparente con borde rosa, hover relleno
- Transiciones suaves
- Efecto elevación al hover

### Inputs
- Borde 2px rosa claro
- Focus: borde rosa primary + fondo rosa 3%
- Border-radius: 12px
- Transiciones suaves

### Cards
- Fondo blanco
- Border-radius: 12px
- Sombra suave
- Hover: elevación + sombra mayor

### Product Cards
- Imagen: gradient rosa
- Info: nombre, descripción, precio
- Botón full-width

## 🎨 Características de Diseño

✅ Paleta 100% rosa - elegante y femenino
✅ Tipografía: Serif (Playfair) para títulos, Sans-serif (Roboto) para texto
✅ Mucho espacio en blanco (clean UI)
✅ Bordes redondeados: 12px
✅ Sombras suaves y consistentes
✅ Animaciones suaves en botones e iconos
✅ Responsive: Desktop > Tablet > Mobile
✅ Coherencia visual en todas las pantallas

## 📦 Productos Incluidos

1. **Labial Matte Perfecto** - $29.99 - 💋
2. **Base Luminosa** - $34.99 - ✨
3. **Paleta de Sombras** - $39.99 - 🎨
4. **Corrector Full Cover** - $24.99 - 🌟
5. **Sérum Facial Luxe** - $44.99 - 💧
6. **Delineador Preciso** - $19.99 - ✏️

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview
npm run preview
```

## 📱 Responsive Breakpoints

- Desktop: 1200px (contenedor)
- Tablet: 1024px (grid 2 columnas)
- Mobile: 768px (grid 1 columna)

## 💾 Almacenamiento

- **Carrito:** localStorage ('cart')
- **Usuario:** localStorage ('user')
- Datos se limpian al confirmar compra

## ✨ Detalles Especiales

- Animación bounce en ícono de confirmación
- Badge de cantidad en carrito
- Descuento envío gratis si subtotal > $50
- Búsqueda funcional en catálogo (preparada)
- Links de navegación suave entre pantallas
- Validación básica de formularios
