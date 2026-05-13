/**
 * "How you read this sentence" — Spanish translation.
 * Tier-1 machine-assisted; awaiting native review.
 */

import type { TourTranslation } from "../types";

export const howYouReadThisSentenceTourEs: TourTranslation = {
  title: "Cómo lees esta frase",
  subtitle: "Un recorrido de dos minutos y medio por la red del lenguaje.",
  blurb:
    "Leer es una secuencia de cómputos — de fotones a fonemas, hasta el significado. Este recorrido sigue el camino a través de la corteza visual, el sistema semántico del lóbulo temporal y las regiones frontales inferiores que integran todo en una comprensión a nivel de frase.",
  continueLabel: "Abrir la página del atlas de la región de Broca",
  scenes: {
    "0-photons": {
      narration:
        "Comienza con fotones. La luz reflejada de la página alcanza la retina, donde bastones y conos la traducen en señal eléctrica.",
    },
    "1-lgn": {
      narration:
        "La señal viaja por el nervio óptico, cruza en el quiasma y llega al tálamo — al núcleo geniculado lateral, la puerta de entrada a la visión.",
    },
    "2-v1": {
      narration:
        "Del tálamo a la corteza visual primaria, en la parte posterior del cráneo. V1 es maquinaria — bordes, contrastes, orientaciones. Aquí no hay reconocimiento, solo la geometría de lo que la página muestra.",
    },
    "3-ventral-stream": {
      narration:
        "Por la corriente visual ventral: V2, V4, el giro fusiforme. Los bordes se vuelven formas; las formas se vuelven letras; el área de la forma visual de las palabras aprende cada glifo como una unidad que ya no tienes que decodificar.",
    },
    "4-hg-pstg": {
      narration:
        "Si estuvieras oyendo en lugar de leer, el camino llegaría aquí por el giro de Heschl y la corteza temporal superior posterior. Las rutas auditiva y visual convergen en el mismo sistema semántico.",
    },
    "5-mtg": {
      narration:
        "La corteza temporal media mapea la forma de las palabras sobre su contenido conceptual. Aquí «madre» deja de ser tres sílabas y se vuelve un significado que llega con peso.",
    },
    "6-atl-hub": {
      narration:
        "La corteza temporal anterior enlaza las señales específicas de cada modalidad —visual, auditiva, emocional— en los conceptos abstractos que nombran una cosa como cosa, sin importar cómo la hayas encontrado.",
    },
    "7-angular-gyrus": {
      narration:
        "El giro angular integra entre sentidos, entre categorías, entre tiempos. Un núcleo heteromodal donde los significados de las palabras, las relaciones espaciales y los hechos numéricos convergen en la sala conceptual de una frase.",
    },
    "8-broca-arrival": {
      narration:
        "La corteza frontal inferior —la región de Broca— entra en línea. Sintaxis, el enlace de las palabras en una estructura donde su orden importa y su gramática moldea su significado.",
    },
    "9-recurrent": {
      narration:
        "La región de Broca dialoga de vuelta con la corteza temporal por el fascículo arqueado. La conversación es recurrente. Cada palabra actualiza el modelo de la frase; la frase reconfigura el sentido de cada palabra.",
    },
    "10-default-mode": {
      narration:
        "La red por defecto comienza a engancharse. Cingulada posterior, precúneo, corteza prefrontal medial. La frase se integra en el contexto mayor de lo que ya sabes, lo que recuerdas, quién eres.",
    },
    "11-meaning": {
      narration:
        "El significado ha llegado. No en una sola región — en las relaciones entre ellas, en los patrones de actividad que se sostienen unos cientos de milisegundos y luego se disuelven.",
    },
    "12-invisible": {
      narration:
        "Nada de esto se siente como leer. Se siente como entender. El mecanismo es invisible desde dentro — y la invisibilidad es parte de lo que leer es, igual que una ventana es invisible cuando miras a través de ella.",
    },
    "13-close": {
      narration:
        "Acabas de leer una frase sobre leer una frase. Los mismos circuitos que hicieron lo segundo hicieron lo primero. El cerebro leyendo al cerebro — y muy poco falta en esta imagen excepto, de algún modo, tú.",
    },
  },
};
