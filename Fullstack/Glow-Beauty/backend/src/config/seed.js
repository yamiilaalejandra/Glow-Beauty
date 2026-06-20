require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const bcrypt = require('bcryptjs');
const { sequelize, Admin, Product } = require('../models');

const products = [
  { name: 'Delineador Preciso', description: 'Trazos definidos y duraderos para un look impecable durante todo el día.', longDescription: 'Nuestro delineador de punta fina ofrece un acabado ultra preciso, ideal para crear líneas finas y cat-eye perfectos. Resistente al agua y de larga duración.', ingredients: 'Cera de abejas, aceite de ricino, pigmentos negros', price: 1800, image: '', stock: 12, category: 'product' },
  { name: 'Labial Nude Mate', description: 'Color suave y acabado mate para un look natural sofisticado.', longDescription: 'Labial con fórmula cremosa y acabado mate que se adapta a tu tono de piel. Restaura hidratación y se mantiene sin transferencias por horas.', ingredients: 'Manteca de karité, vitamina E, pigmentos minerales', price: 2200, image: '', stock: 8, category: 'product' },
  { name: 'Labial Rosa Brillante', description: 'Rosa luminoso con brillo delicado que ilumina tu sonrisa.', longDescription: 'Fórmula ligera y cómoda con un brillo sutil. Ideal para un look fresco y femenino con sensación hidratante.', ingredients: 'Aceite de jojoba, cera de coco, mica perlada', price: 2300, image: '', stock: 10, category: 'product' },
  { name: 'Labial Rojo Intenso', description: 'Rojo vibrante para un estilo impactante y elegante.', longDescription: 'Labial de alta pigmentación con textura suave y duradera. Su tono rojo intenso aporta sofisticación a cualquier look.', ingredients: 'Aceite de almendras, vitamina E, pigmentos rojo rubí', price: 2400, image: '', stock: 7, category: 'product' },
  { name: 'Paleta de Sombras', description: '12 tonos versátiles para looks diarios y de noche.', longDescription: 'Paleta de sombras con tonos mate y satinados. Perfecta para crear combinaciones delicadas y llamativas con una fórmula de alta pigmentación.', ingredients: 'Mica, talco, aceite de argán', price: 3200, image: '', stock: 9, category: 'product' },
  { name: 'Sombras Multicolor', description: 'Tonos intensos y vibrantes para un maquillaje creativo.', longDescription: 'Sombras con colores pigmentados y una textura suave que permite difuminar fácilmente sin perder intensidad.', ingredients: 'Mica, óxido de hierro, talco', price: 2900, image: '', stock: 11, category: 'product' },
  { name: 'Máscara de Pestañas Volumen', description: 'Pestañas más largas y con volumen instantáneo.', longDescription: 'Máscara con cepillo volumizador que separa y cubre cada pestaña para un efecto dramático y sin grumos.', ingredients: 'Cera de carnauba, polímeros, agua', price: 2600, image: '', stock: 5, category: 'product' },
  { name: 'Base Hidratante', description: 'Cobertura ligera con efecto piel natural.', longDescription: 'Base que hidrata mientras unifica el tono y deja un acabado radiante. Fórmula cómoda y de larga duración.', ingredients: 'Ácido hialurónico, glicerina, antioxidantes', price: 3000, image: '', stock: 13, category: 'product' },
  { name: 'Polvo Fijador', description: 'Acabado mate y fijación prolongada para todo el día.', longDescription: 'Polvo kit que controla el brillo, fija el maquillaje y deja una sensación ligera y sedosa.', ingredients: 'Sílice, talco, extracto de flor de loto', price: 1950, image: '', stock: 6, category: 'product' },
  { name: 'Set de Brochas', description: 'Brochas esenciales para aplicación profesional.', longDescription: 'Set de brochas variadas para base, rubor, difuminado y delineado. Cerdas suaves y mango ergonómico.', ingredients: 'Cerdas sintéticas, mango de madera', price: 3500, image: '', stock: 8, category: 'product' },
  { name: 'Neceser Cosmético', description: 'Bolso compacto resistente y fácil de limpiar.', longDescription: 'Neceser con compartimentos y cierre reforzado, ideal para organizar y transportar tus productos favoritos.', ingredients: 'Nylon impermeable', price: 2200, image: '', stock: 14, category: 'product' },
  { name: 'Sombra Individual', description: 'Sombra compacta con alta pigmentación.', longDescription: 'Sombra en polvo con acabado satinado y buena adherencia, perfecta para destacar el párpado con precisión.', ingredients: 'Mica, pigmentos', price: 650, image: '', stock: 20, category: 'product' },
  { name: 'Sombras Brillosas (Pack)', description: 'Tonos brillantes para looks luminosos.', longDescription: 'Pequeña paleta travel-friendly con tonos brillosos y fáciles de aplicar para iluminar la mirada.', ingredients: 'Mica, aceites acondicionadores', price: 1400, image: '', stock: 10, category: 'product' },
  { name: 'Paleta Brillo 3 Tonos', description: 'Trío de sombras con brillo intenso.', longDescription: 'Mini paleta con tres tonos brillantes pensados para combinar y crear puntos de luz en el maquillaje.', ingredients: 'Mica, pigmentos', price: 1500, image: '', stock: 16, category: 'product' },
];

const accessories = [
  { name: 'Anillo Luna', description: 'Anillo delicado con diseño lunar.', longDescription: 'Anillo de diseño fino, ideal para combinar con otros aros. Acabado pulido y cómodo.', ingredients: 'Metal bañado', price: 1200, image: '', stock: 15, category: 'accessory' },
  { name: 'Arito Perla', description: 'Aros pequeños con detalle de perla.', longDescription: 'Aritos elegantes y ligeros, perfectos para uso diario o eventos.', ingredients: 'Aleación y perla sintética', price: 900, image: '', stock: 10, category: 'accessory' },
  { name: 'Aritos Corazón', description: 'Aritos con forma de corazón.', longDescription: 'Aritos románticos y femeninos, combinan con todo tipo de looks.', ingredients: 'Aleación', price: 850, image: '', stock: 12, category: 'accessory' },
  { name: 'Aritos Monocromáticos', description: 'Aros minimalistas en tono dorado.', longDescription: 'Diseño sobrio y versátil, fácil de combinar.', ingredients: 'Aleación', price: 800, image: '', stock: 9, category: 'accessory' },
  { name: 'Collar Oro', description: 'Cadena con baño dorado elegante.', longDescription: 'Collar de acabado fino, ideal para capas con otros collares.', ingredients: 'Metal bañado', price: 2200, image: '', stock: 7, category: 'accessory' },
  { name: 'Collar Único', description: 'Collar de diseño exclusivo.', longDescription: 'Pieza original que aporta carácter a cualquier outfit.', ingredients: 'Aleación', price: 2500, image: '', stock: 6, category: 'accessory' },
  { name: 'Collar Sol', description: 'Collar con colgante de sol.', longDescription: 'Collar con detalle central que destaca sobre la piel.', ingredients: 'Metal y baño', price: 2000, image: '', stock: 11, category: 'accessory' },
  { name: 'Combo Arito + Anteojos + Reloj', description: 'Set combo con varios accesorios.', longDescription: 'Combo ideal para regalar, incluye accesorios combinados para un look completo.', ingredients: 'Variedad de materiales', price: 4800, image: '', stock: 4, category: 'accessory' },
  { name: 'Combo Aritos + Anteojos', description: 'Set práctico con aros y accesorios.', longDescription: 'Combinación versátil para complementar estilos diarios.', ingredients: 'Variedad de materiales', price: 3200, image: '', stock: 5, category: 'accessory' },
  { name: 'Pulsera Perla', description: 'Pulsera con detalle de perla.', longDescription: 'Pulsera delicada y elegante, perfecta para looks formales.', ingredients: 'Perla sintética y hilo', price: 1100, image: '', stock: 13, category: 'accessory' },
  { name: 'Pulseras Rojas', description: 'Set de pulseras en tonos rojos.', longDescription: 'Conjunto de pulseras para agregar color y textura a tu muñeca.', ingredients: 'Hilos y dijes', price: 950, image: '', stock: 18, category: 'accessory' },
  { name: 'Tobilleras', description: 'Tobilleras boho-chic para el verano.', longDescription: 'Accesorio perfecto para looks veraniegos y relajados.', ingredients: 'Hilos y charms', price: 1300, image: '', stock: 14, category: 'accessory' },
];

async function seed() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced');

    // Admin
    const existing = await Admin.findOne({ where: { username: 'Admin' } });
    if (!existing) {
      const hashed = await bcrypt.hash('Admin123', 10);
      await Admin.create({ username: 'Admin', password: hashed });
      console.log('Admin created');
    } else {
      console.log('Admin already exists');
    }

    // Products
    const productCount = await Product.count({ where: { category: 'product' } });
    if (productCount === 0) {
      await Product.bulkCreate(products);
      console.log(`${products.length} products seeded`);
    } else {
      console.log('Products already seeded');
    }

    // Accessories
    const accessoryCount = await Product.count({ where: { category: 'accessory' } });
    if (accessoryCount === 0) {
      await Product.bulkCreate(accessories);
      console.log(`${accessories.length} accessories seeded`);
    } else {
      console.log('Accessories already seeded');
    }

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
