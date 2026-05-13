/**
 * Posterior superior temporal gyrus (left) — Catalan translation.
 * Tier-1 machine-assisted; awaiting native review.
 */

import type { AtlasTranslation } from "../types";

export const pstgLeftAtlasCa: AtlasTranslation = {
  fullName: "Gir temporal superior posterior (esquerre) — regió de Wernicke",
  disorders: {
    "wernicke-aphasia": {
      name: "Afàsia de Wernicke (afàsia fluent)",
      oneLine:
        "Parla fluida, ben articulada però semànticament buida, amb la comprensió notablement alterada; la síndrome clàssica la lesió de la qual va donar nom a la regió.",
    },
    "pure-word-deafness": {
      name: "Sordesa verbal pura",
      oneLine:
        "Incapacitat selectiva per comprendre el llenguatge parlat malgrat la preservació de l'audició i la lectura, associada a lesions bilaterals que afecten l'escorça temporal superior posterior.",
    },
    schizophrenia: {
      name: "Esquizofrènia (al·lucinacions auditives verbals)",
      oneLine:
        "Les veus al·lucinades recluten regions temporals superiors posteriors amb patrons que se superposen amb els de la percepció normal de la parla.",
    },
  },
  anatomyAndLandmarks: {
    paragraphs: [
      "La porció posterior del gir temporal superior esquerre ocupa la riba superior del solc lateral, posterior al gir de Heschl (escorça auditiva primària) i superior al gir temporal mitjà. La regió s'enrosca al voltant de l'extrem posterior de la cissura de Sylvi i està vorejada superiorment pel gir supramarginal del lòbul parietal inferior.",
      "Els límits de «l'àrea de Wernicke» mai no s'han definit amb nitidesa. Diferents autors inclouen o exclouen el planum temporale, el gir supramarginal i parts del BA 22 (l'escorça temporal superior pròpiament dita) i del BA 39 (el gir angular). La pàgina de baix fa servir pSTG-L per a la superfície cortical i reserva l'epònim per al referent històric [cite:hickok-poeppel-2007-dual-stream].",
    ],
  },
  functionSection: {
    paragraphs: [
      "El gir temporal superior posterior esquerre participa centralment en la percepció del llenguatge parlat — la transformació de l'entrada acústica en representacions lèxiques i fonològiques [cite:hickok-poeppel-2007-dual-stream]. En l'influent model de doble corrent de Hickok i Poeppel, el corrent dorsal acobla aquesta regió amb l'escorça frontal inferior a través del fascicle arquejat i sosté el mapeig del so de la parla sobre representacions articulatòries; el corrent ventral recorre l'escorça temporal mitjana i inferior i sosté el mapeig del so de la parla sobre el significat [cite:hickok-poeppel-2007-dual-stream].",
      "El dany a aquesta regió produeix clàssicament una afàsia fluent: parla ben articulada, prosòdica i superficialment normal en ritme però semànticament buida, sovint plena de parafasias (substitucions de paraules) i neologismes. De manera crucial, la comprensió està marcadament alterada — el pacient no pot seguir de manera fiable instruccions parlades ni repetir frases no familiars [cite:wernicke-1874-aphasic-symptom-complex]. El contrast clàssic amb l'afàsia de Broca — no fluent però comprensiva — va establir el model històric de dues regions que tots els relats posteriors de xarxa han refinat.",
      "El refinament contemporani és que la comprensió del llenguatge no està localitzada només en aquesta regió. La imatge funcional mostra que la parla natural compromet una xarxa perisilviana que s'estén per l'escorça temporal superior i mitjana, el gir angular i l'escorça frontal inferior, amb cada component aportant còmputs parcials [cite:huth-2016-semantic-maps]. El pSTG posterior és necessari; no és suficient. La monografia curosa de Wernicke de 1874 ja anticipava això, descrivint la regió com un node en un sistema lingüístic connectat.",
      "Al costat dret, la regió homòloga (pSTG-R) es recluta amb més força per a la prosòdia, el contorn melòdic i la capa afectiva de la parla i la música. L'asimetria és fiable però parcial; tots dos hemisferis contribueixen a la majoria dels usos quotidians del llenguatge.",
    ],
  },
  cellTypesSection: {
    paragraphs: [
      "Com la resta de l'escorça d'associació, el pSTG-L està dominat per neurones piramidals glutamatèrgiques a les capes III i V, amb una robusta capa granular IV que reflecteix el paper de la regió com a objectiu primerenc de l'entrada talàmica auditiva procedent de l'escorça auditiva primària. Les interneurones inhibitòries locals esculpeixen la precisió temporal necessària per seguir la ràpida dinàmica acústica de la parla.",
      "La vista cel·lular conté cèl·lules piramidals corticals reconstruïdes de l'escorça d'associació; descendeix a la capa cel·lular per veure la geometria dendrítica que sosté el còmput de precisió temporal que aquesta regió realitza.",
    ],
  },
  connectionsSection: {
    paragraphs: [
      "El corrent dorsal del model de doble corrent connecta el pSTG-L amb l'escorça frontal inferior (regió de Broca) a través del fascicle arquejat i parts del fascicle longitudinal superior, sostenint el mapeig so-articulació que subjau a la repetició de la parla [cite:catani-2005-arcuate-fasciculus]. El dany específicament a aquesta ruta dorsal — preservant els punts finals corticals — produeix una afàsia de conducció: la comprensió i la producció fluida es preserven, però la repetició de frases no familiars està selectivament alterada [cite:geschwind-1965-disconnexion-syndromes].",
      "El corrent ventral recorre el fascicle longitudinal inferior i parts del fascicle fronto-occipital inferior, sostenint el mapeig so-significat que subjau a la comprensió. Tots dos corrents són bidireccionals; tots dos contribueixen a la majoria de les tasques lingüístiques quotidianes [cite:hickok-poeppel-2007-dual-stream]. El clàssic diagrama de «flux d'informació» de Wernicke a Broca, encara que pedagògicament útil, simplifica en excés una xarxa ricament recurrent.",
    ],
  },
  clinicalContext: {
    paragraphs: [
      "L'afàsia de Wernicke pura per una lesió focal confinada al pSTG-L és, com l'afàsia de Broca pura, més rara del que suggereix l'epònim. La síndrome clínica resulta més sovint d'infarts de l'artèria cerebral mitjana que afecten el pSTG juntament amb el gir supramarginal i la substància blanca subjacent. La recuperació en l'afàsia de Wernicke crònica depèn tant de la integritat dels homòlegs de l'hemisferi dret que poden compensar parcialment com de la integritat de les connexions del corrent dorsal amb l'escorça frontal inferior.",
      "La sordesa verbal pura — la incapacitat selectiva per comprendre el llenguatge parlat malgrat la preservació de l'audició, la lectura i la parla — requereix típicament lesions bilaterals que afecten l'escorça temporal superior posterior, sovint preservant la mateixa escorça auditiva primària. La condició demostra que descodificar la parla en llenguatge és funcionalment separable de sentir per se.",
      "En l'esquizofrènia, les al·lucinacions auditives verbals recluten l'escorça temporal superior posterior amb patrons que se superposen substancialment amb la percepció normal de la parla. La lectura contemporània no és que les al·lucinacions ocorrin perquè el pSTG «falli» de manera aïllada, sinó que la xarxa que coordina la generació de la parla interna amb la seva monitorització està desregulada, amb el pSTG com un de diversos nodes implicats.",
    ],
  },
  historyOfDiscovery: {
    paragraphs: [
      "Carl Wernicke va publicar Der aphasische Symptomencomplex el 1874, quan tenia vint-i-sis anys [cite:wernicke-1874-aphasic-symptom-complex]. La monografia descrivia una sèrie de pacients amb parla fluent però inintel·ligible i comprensió alterada després de lesions a la porció posterior del gir temporal superior esquerre. La contribució de Wernicke va ser doble: va distingir el dèficit de comprensió fluent dels seus pacients del dèficit de producció no fluent de Broca, i va proposar un model connexionista explícit en què el dany al tracte fibrós que connecta totes dues regions produiria una tercera síndrome (afàsia de conducció) que ningú no havia descrit encara.",
      "L'article de 1965 de Norman Geschwind sobre les síndromes de desconnexió va revifar i estendre el marc de Wernicke per a un públic anglosaxó que en bona part l'havia oblidat sota la influència de l'holisme de mitjan segle XX [cite:geschwind-1965-disconnexion-syndromes]. El model de doble corrent de Hickok i Poeppel de 2007 és el descendent contemporani — la intuïció connexionista de Wernicke amb les vies de substància blanca finalment mapejades [cite:hickok-poeppel-2007-dual-stream].",
    ],
  },
};
