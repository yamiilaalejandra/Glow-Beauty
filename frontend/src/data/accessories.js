import anilloluna from '../assets/accesorios/anilloluna.jpg';
import aritoperla from '../assets/accesorios/aritoperla.jpg';
import aritoscorazon from '../assets/accesorios/aritoscorazon.jpg';
import aritosmonocromatico from '../assets/accesorios/aritosmonocromatico.jpg';
import collarOro from '../assets/accesorios/collar-oro.jpg';
import collarUnico from '../assets/accesorios/collar-unico.jpg';
import collarSol from '../assets/accesorios/collarsol.jpg';
import comboAritoAnteojosReloj from '../assets/accesorios/comboarito-anteojos-reloj.jpg';
import comboAritosAnteojos from '../assets/accesorios/comboaritos-anteojos.jpg';
import pulseraPerla from '../assets/accesorios/pulceraperla.jpg';
import pulserasRojas from '../assets/accesorios/pulcerasrojas.jpg';
import tobilleras from '../assets/accesorios/tobilleras.jpg';

const ACCESSORY_STORAGE_KEY = 'glowBeautyAccessories';

const DEFAULT_ACCESSORIES = [
  {
    id: 201,
    name: 'Anillo Luna',
    description: 'Anillo delicado con diseño lunar.',
    longDescription: 'Anillo de diseño fino, ideal para combinar con otros aros. Acabado pulido y cómodo.',
    ingredients: 'Metal bañado',
    price: 1200,
    image: anilloluna,
    stock: 15
  },
  {
    id: 202,
    name: 'Arito Perla',
    description: 'Aros pequeños con detalle de perla.',
    longDescription: 'Aritos elegantes y ligeros, perfectos para uso diario o eventos.',
    ingredients: 'Aleación y perla sintética',
    price: 900,
    image: aritoperla,
    stock: 10
  },
  {
    id: 203,
    name: 'Aritos Corazón',
    description: 'Aritos con forma de corazón.',
    longDescription: 'Aritos románticos y femeninos, combinan con todo tipo de looks.',
    ingredients: 'Aleación',
    price: 850,
    image: aritoscorazon,
    stock: 12
  },
  {
    id: 204,
    name: 'Aritos Monocromáticos',
    description: 'Aros minimalistas en tono dorado.',
    longDescription: 'Diseño sobrio y versátil, fácil de combinar.',
    ingredients: 'Aleación',
    price: 800,
    image: aritosmonocromatico,
    stock: 9
  },
  {
    id: 205,
    name: 'Collar Oro',
    description: 'Cadena con baño dorado elegante.',
    longDescription: 'Collar de acabado fino, ideal para capas con otros collares.',
    ingredients: 'Metal bañado',
    price: 2200,
    image: collarOro,
    stock: 7
  },
  {
    id: 206,
    name: 'Collar Único',
    description: 'Collar de diseño exclusivo.',
    longDescription: 'Pieza original que aporta carácter a cualquier outfit.',
    ingredients: 'Aleación',
    price: 2500,
    image: collarUnico,
    stock: 6
  },
  {
    id: 207,
    name: 'Collar Sol',
    description: 'Collar con colgante de sol.',
    longDescription: 'Collar con detalle central que destaca sobre la piel.',
    ingredients: 'Metal y baño',
    price: 2000,
    image: collarSol,
    stock: 11
  },
  {
    id: 208,
    name: 'Combo Arito + Anteojos + Reloj',
    description: 'Set combo con varios accesorios.',
    longDescription: 'Combo ideal para regalar, incluye accesorios combinados para un look completo.',
    ingredients: 'Variedad de materiales',
    price: 4800,
    image: comboAritoAnteojosReloj,
    stock: 4
  },
  {
    id: 209,
    name: 'Combo Aritos + Anteojos',
    description: 'Set práctico con aros y accesorios.',
    longDescription: 'Combinación versátil para complementar estilos diarios.',
    ingredients: 'Variedad de materiales',
    price: 3200,
    image: comboAritosAnteojos,
    stock: 5
  },
  {
    id: 210,
    name: 'Pulsera Perla',
    description: 'Pulsera con detalle de perla.',
    longDescription: 'Pulsera delicada y elegante, perfecta para looks formales.',
    ingredients: 'Perla sintética y hilo',
    price: 1100,
    image: pulseraPerla,
    stock: 13
  },
  {
    id: 211,
    name: 'Pulseras Rojas',
    description: 'Set de pulseras en tonos rojos.',
    longDescription: 'Conjunto de pulseras para agregar color y textura a tu muñeca.',
    ingredients: 'Hilos y dijes',
    price: 950,
    image: pulserasRojas,
    stock: 18
  },
  {
    id: 212,
    name: 'Tobilleras',
    description: 'Tobilleras boho-chic para el verano.',
    longDescription: 'Accesorio perfecto para looks veraniegos y relajados.',
    ingredients: 'Hilos y charms',
    price: 1300,
    image: tobilleras,
    stock: 14
  }
];

export const initializeAccessoryStorage = () => {
  if (!localStorage.getItem(ACCESSORY_STORAGE_KEY)) {
    localStorage.setItem(ACCESSORY_STORAGE_KEY, JSON.stringify(DEFAULT_ACCESSORIES));
    window.dispatchEvent(new Event('glowBeautyInventoryUpdated'));
  }
  return getStoredAccessories();
};

export const getStoredAccessories = () => {
  return JSON.parse(localStorage.getItem(ACCESSORY_STORAGE_KEY)) || DEFAULT_ACCESSORIES;
};

export const saveAccessories = (accessoryList) => {
  localStorage.setItem(ACCESSORY_STORAGE_KEY, JSON.stringify(accessoryList));
  window.dispatchEvent(new Event('glowBeautyInventoryUpdated'));
};

export const getAccessoryById = (id) => {
  return getStoredAccessories().find((a) => a.id === Number(id));
};

export const findAccessoriesByQuery = (query) => {
  const q = String(query || '').trim().toLowerCase();
  return getStoredAccessories().filter((accessory) =>
    accessory.name.toLowerCase().includes(q) ||
    accessory.description.toLowerCase().includes(q) ||
    accessory.longDescription.toLowerCase().includes(q)
  );
};

export const getNextAccessoryId = () => {
  const accessories = getStoredAccessories();
  return accessories.reduce((maxId, accessory) => Math.max(maxId, Number(accessory.id)), 0) + 1;
};

export const accessories = DEFAULT_ACCESSORIES;
