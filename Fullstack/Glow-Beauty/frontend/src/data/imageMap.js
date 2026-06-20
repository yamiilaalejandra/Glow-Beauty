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

export const IMAGE_MAP = {
  'Delineador Preciso': delineadorImg,
  'Labial Nude Mate': labialImg,
  'Labial Rosa Brillante': labialRosaImg,
  'Labial Rojo Intenso': labialRojoImg,
  'Paleta de Sombras': sombraImg,
  'Sombras Multicolor': sombraColorImg,
  'Máscara de Pestañas Volumen': rimelImg,
  'Base Hidratante': baseImg,
  'Polvo Fijador': polvobaseImg,
  'Set de Brochas': brochasImg,
  'Neceser Cosmético': cosmeticsImg,
  'Sombra Individual': sombraIndividualImg,
  'Sombras Brillosas (Pack)': sombrabrilloImg,
  'Paleta Brillo 3 Tonos': sombrabrillo3Img,
  'Anillo Luna': anilloluna,
  'Arito Perla': aritoperla,
  'Aritos Corazón': aritoscorazon,
  'Aritos Monocromáticos': aritosmonocromatico,
  'Collar Oro': collarOro,
  'Collar Único': collarUnico,
  'Collar Sol': collarSol,
  'Combo Arito + Anteojos + Reloj': comboAritoAnteojosReloj,
  'Combo Aritos + Anteojos': comboAritosAnteojos,
  'Pulsera Perla': pulseraPerla,
  'Pulseras Rojas': pulserasRojas,
  'Tobilleras': tobilleras,
};

export const getImage = (item) => item.image || IMAGE_MAP[item.name] || null;
