/**
 * "Hearing music" — Spanish translation.
 * Tier-1 machine-assisted; awaiting native review.
 */

import type { TourTranslation } from "../types";

export const hearingMusicTourEs: TourTranslation = {
  title: "Escuchar música",
  subtitle: "Un recorrido de dos minutos y medio por las vías auditiva y de recompensa.",
  blurb:
    "¿Por qué te conmueve un cambio de acorde? Escuchar música recluta una secuencia particular de regiones corticales y subcorticales — primero la corteza auditiva primaria, el hemisferio derecho procesador del espectro, los circuitos límbicos y de recompensa que vuelven el sonido organizado en algo sentido. Este recorrido sigue un momento de escucha.",
  continueLabel: "Continuar en el Laboratorio de NeuroMúsica",
  scenes: {
    "0-air": {
      narration:
        "Suena un acorde. Las ondas de presión del aire viajan del altavoz al oído, la cóclea las descompone en el espectro que compone el sonido, y la señal comienza su ascenso hacia la corteza.",
    },
    "1-brainstem": {
      narration:
        "Los núcleos auditivos del tronco encefálico — núcleo coclear, oliva superior, colículo inferior — realizan un análisis espectrotemporal rápido. Inicio, tono, ubicación. Nada de esto es aún consciente.",
    },
    "2-hg": {
      narration:
        "El cuerpo geniculado medial del tálamo retransmite la señal a la corteza auditiva primaria. El giro de Heschl en ambos lados. Organizado tonotópicamente — distintas frecuencias activan distintas posiciones a lo largo del giro.",
    },
    "3-right-bias": {
      narration:
        "El Heschl derecho se inclina hacia el trabajo. Mientras la corteza auditiva izquierda se especializa en la precisión temporal del habla, la derecha se especializa en la resolución espectral que demandan el tono y el timbre.",
    },
    "4-secondary-auditory": {
      narration:
        "La corteza auditiva secundaria —corteza temporal superior posterior en el lado derecho— extrae la melodía, la estructura armónica, el contorno de la línea. La música como música empieza a ensamblarse aquí.",
    },
    "5-emotion-fork": {
      narration:
        "Una ruta subcortical entrega la señal a la amígdala en paralelo. El etiquetado afectivo —esta música suena como se siente— corre concurrentemente con la extracción cortical de la estructura.",
    },
    "6-vmpfc-reward": {
      narration:
        "Área tegmental ventral, núcleo accumbens, corteza prefrontal ventromedial — el circuito de recompensa. La actividad dopaminérgica sigue el placer sentido de la música. La resolución anticipada, el acorde que aterriza.",
    },
    "7-hippocampus-binds": {
      narration:
        "El hipocampo enlaza la música a escenas. Una cocina, una persona, un año. La famosa capacidad de la música para recuperar autobiografía vive aquí — en la interfaz entre la ruta auditiva y la memoria episódica.",
    },
    "8-default-mode-integration": {
      narration:
        "Las regiones de la red por defecto integran el momento. Cingulada posterior, precúneo, corteza prefrontal medial. La pieza se integra en el sentido más amplio de quién eres escuchando, y qué es esta música para ti.",
    },
    "9-prediction": {
      narration:
        "El cerebro corre por delante de la música, prediciendo adónde irá la línea. La confirmación y la sorpresa enganchan el circuito de recompensa — gran parte de lo que hace la música placentera es la danza con lo que esperabas.",
    },
    "10-numinous": {
      narration:
        "Cuando una pieza llega con el peso que Otto llamó numinoso —algo más que agradar, algo que toma— la red de saliencia ha hablado. El sentido sentido de que algo importa viaja con la música.",
    },
    "11-close": {
      narration:
        "La música mueve las mismas regiones que te mueven a ti. La vía auditiva y la vía límbica comparten arquitectura; lo que estás oyendo y lo que estás sintiendo no son separables aquí, y la danza entre los dos es la música.",
    },
  },
};
