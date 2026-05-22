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

export const accessories = [
  {
    id: 201,
    name: 'Anillo Luna',
    description: 'Anillo delicado con diseño lunar.',
    longDescription: 'Anillo de diseño fino, ideal para combinar con otros aros. Acabado pulido y cómodo.',
    ingredients: 'Metal bañado',
    price: 1200,
    image: anilloluna
  },
  {
    id: 202,
    name: 'Arito Perla',
    description: 'Aros pequeños con detalle de perla.',
    longDescription: 'Aritos elegantes y ligeros, perfectos para uso diario o eventos.',
    ingredients: 'Aleación y perla sintética',
    price: 900,
    image: aritoperla
  },
  {
    id: 203,
    name: 'Aritos Corazón',
    description: 'Aritos con forma de corazón.',
    longDescription: 'Aritos románticos y femeninos, combinan con todo tipo de looks.',
    ingredients: 'Aleación',
    price: 850,
    image: aritoscorazon
  },
  {
    id: 204,
    name: 'Aritos Monocromáticos',
    description: 'Aros minimalistas en tono dorado.',
    longDescription: 'Diseño sobrio y versátil, fácil de combinar.',
    ingredients: 'Aleación',
    price: 800,
    image: aritosmonocromatico
  },
  {
    id: 205,
    name: 'Collar Oro',
    description: 'Cadena con baño dorado elegante.',
    longDescription: 'Collar de acabado fino, ideal para capas con otros collares.',
    ingredients: 'Metal bañado',
    price: 2200,
    image: collarOro
  },
  {
    id: 206,
    name: 'Collar Único',
    description: 'Collar de diseño exclusivo.',
    longDescription: 'Pieza original que aporta carácter a cualquier outfit.',
    ingredients: 'Aleación',
    price: 2500,
    image: collarUnico
  },
  {
    id: 207,
    name: 'Collar Sol',
    description: 'Collar con colgante de sol.',
    longDescription: 'Collar con detalle central que destaca sobre la piel.',
    ingredients: 'Metal y baño',
    price: 2000,
    image: collarSol
  },
  {
    id: 208,
    name: 'Combo Arito + Anteojos + Reloj',
    description: 'Set combo con varios accesorios.',
    longDescription: 'Combo ideal para regalar, incluye accesorios combinados para un look completo.',
    ingredients: 'Variedad de materiales',
    price: 4800,
    image: comboAritoAnteojosReloj
  },
  {
    id: 209,
    name: 'Combo Aritos + Anteojos',
    description: 'Set práctico con aros y accesorios.',
    longDescription: 'Combinación versátil para complementar estilos diarios.',
    ingredients: 'Variedad de materiales',
    price: 3200,
    image: comboAritosAnteojos
  },
  {
    id: 210,
    name: 'Pulsera Perla',
    description: 'Pulsera con detalle de perla.',
    longDescription: 'Pulsera delicada y elegante, perfecta para looks formales.',
    ingredients: 'Perla sintética y hilo',
    price: 1100,
    image: pulseraPerla
  },
  {
    id: 211,
    name: 'Pulseras Rojas',
    description: 'Set de pulseras en tonos rojos.',
    longDescription: 'Conjunto de pulseras para agregar color y textura a tu muñeca.',
    ingredients: 'Hilos y dijes',
    price: 950,
    image: pulserasRojas
  },
  {
    id: 212,
    name: 'Tobilleras',
    description: 'Tobilleras boho-chic para el verano.',
    longDescription: 'Accesorio perfecto para looks veraniegos y relajados.',
    ingredients: 'Hilos y charms',
    price: 1300,
    image: tobilleras
  }
];

export function getAccessoryById(id) {
  return accessories.find((a) => a.id === Number(id));
}
