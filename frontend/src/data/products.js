import delineadorImg from '../assets/delineador.jpg';
import labialImg from '../assets/labial.jpg';
import labialRosaImg from '../assets/labialrosa.jpg';
import labialRojoImg from '../assets/labialrojo.jpg';
import sombraImg from '../assets/sombra.jpg';
import sombraColorImg from '../assets/sombracolor.jpg';
import rimelImg from '../assets/rimel.jpg';
import baseImg from '../assets/base.jpg';
import polvobaseImg from '../assets/polvobase.jpg';
import brochasImg from '../assets/brochas.jpg';
import cosmeticsImg from '../assets/cosmetics.jpg';
import sombrabrilloImg from '../assets/sombrabrillo.jpg';
import sombrabrillo3Img from '../assets/sombrabrillo3.jpg';
import sombraIndividualImg from '../assets/sombraindividual.jpg';

export const products = [
  {
    id: 1,
    name: 'Delineador Preciso',
    description: 'Trazos definidos y duraderos para un look impecable durante todo el día.',
    longDescription: 'Nuestro delineador de punta fina ofrece un acabado ultra preciso, ideal para crear líneas finas y cat-eye perfectos. Resistente al agua y de larga duración.',
    ingredients: 'Cera de abejas, aceite de ricino, pigmentos negros',
    price: 1800,
    image: delineadorImg
  },
  {
    id: 2,
    name: 'Labial Nude Mate',
    description: 'Color suave y acabado mate para un look natural sofisticado.',
    longDescription: 'Labial con fórmula cremosa y acabado mate que se adapta a tu tono de piel. Restaura hidratación y se mantiene sin transferencias por horas.',
    ingredients: 'Manteca de karité, vitamina E, pigmentos minerales',
    price: 2200,
    image: labialImg
  },
  {
    id: 3,
    name: 'Labial Rosa Brillante',
    description: 'Rosa luminoso con brillo delicado que ilumina tu sonrisa.',
    longDescription: 'Fórmula ligera y cómoda con un brillo sutil. Ideal para un look fresco y femenino con sensación hidratante.',
    ingredients: 'Aceite de jojoba, cera de coco, mica perlada',
    price: 2300,
    image: labialRosaImg
  },
  {
    id: 4,
    name: 'Labial Rojo Intenso',
    description: 'Rojo vibrante para un estilo impactante y elegante.',
    longDescription: 'Labial de alta pigmentación con textura suave y duradera. Su tono rojo intenso aporta sofisticación a cualquier look.',
    ingredients: 'Aceite de almendras, vitamina E, pigmentos rojo rubí',
    price: 2400,
    image: labialRojoImg
  },
  {
    id: 5,
    name: 'Paleta de Sombras',
    description: '12 tonos versátiles para looks diarios y de noche.',
    longDescription: 'Paleta de sombras con tonos mate y satinados. Perfecta para crear combinaciones delicadas y llamativas con una fórmula de alta pigmentación.',
    ingredients: 'Mica, talco, aceite de argán',
    price: 3200,
    image: sombraImg
  },
  {
    id: 6,
    name: 'Sombras Multicolor',
    description: 'Tonos intensos y vibrantes para un maquillaje creativo.',
    longDescription: 'Sombras con colores pigmentados y una textura suave que permite difuminar fácilmente sin perder intensidad.',
    ingredients: 'Mica, óxido de hierro, talco',
    price: 2900,
    image: sombraColorImg
  },
  {
    id: 7,
    name: 'Máscara de Pestañas Volumen',
    description: 'Pestañas más largas y con volumen instantáneo.',
    longDescription: 'Máscara con cepillo volumizador que separa y cubre cada pestaña para un efecto dramático y sin grumos.',
    ingredients: 'Cera de carnauba, polímeros, agua',
    price: 2600,
    image: rimelImg
  },
  {
    id: 8,
    name: 'Base Hidratante',
    description: 'Cobertura ligera con efecto piel natural.',
    longDescription: 'Base que hidrata mientras unifica el tono y deja un acabado radiante. Fórmula cómoda y de larga duración.',
    ingredients: 'Ácido hialurónico, glicerina, antioxidantes',
    price: 3000,
    image: baseImg
  },
  {
    id: 9,
    name: 'Polvo Fijador',
    description: 'Acabado mate y fijación prolongada para todo el día.',
    longDescription: 'Polvo kit que controla el brillo, fija el maquillaje y deja una sensación ligera y sedosa.',
    ingredients: 'Sílice, talco, extracto de flor de loto',
    price: 1950,
    image: polvobaseImg
  }
  ,
  {
    id: 10,
    name: 'Set de Brochas',
    description: 'Brochas esenciales para aplicación profesional.',
    longDescription: 'Set de brochas variadas para base, rubor, difuminado y delineado. Cerdas suaves y mango ergonómico.',
    ingredients: 'Cerdas sintéticas, mango de madera',
    price: 3500,
    image: brochasImg
  },
  {
    id: 11,
    name: 'Neceser Cosmético',
    description: 'Bolso compacto resistente y fácil de limpiar.',
    longDescription: 'Neceser con compartimentos y cierre reforzado, ideal para organizar y transportar tus productos favoritos.',
    ingredients: 'Nylon impermeable',
    price: 2200,
    image: cosmeticsImg
  },
  {
    id: 12,
    name: 'Sombra Individual',
    description: 'Sombra compacta con alta pigmentación.',
    longDescription: 'Sombra en polvo con acabado satinado y buena adherencia, perfecta para destacar el párpado con precisión.',
    ingredients: 'Mica, pigmentos',
    price: 650,
    image: sombraIndividualImg
  },
  {
    id: 13,
    name: 'Sombras Brillosas (Pack)',
    description: 'Tonos brillantes para looks luminosos.',
    longDescription: 'Pequeña paleta travel-friendly con tonos brillosos y fáciles de aplicar para iluminar la mirada.',
    ingredients: 'Mica, aceites acondicionadores',
    price: 1400,
    image: sombrabrilloImg
  },
  {
    id: 14,
    name: 'Paleta Brillo 3 Tonos',
    description: 'Trío de sombras con brillo intenso.',
    longDescription: 'Mini paleta con tres tonos brillantes pensados para combinar y crear puntos de luz en el maquillaje.',
    ingredients: 'Mica, pigmentos',
    price: 1500,
    image: sombrabrillo3Img
  }
];

export function getProductById(id) {
  return products.find((product) => product.id === Number(id));
}
