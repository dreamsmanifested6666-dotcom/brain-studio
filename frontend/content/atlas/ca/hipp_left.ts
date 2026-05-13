/**
 * Hippocampus (left) — Catalan translation.
 * Tier-1 machine-assisted; awaiting native review.
 */

import type { AtlasTranslation } from "../types";

export const hippLeftAtlasCa: AtlasTranslation = {
  fullName: "Hipocamp (esquerre)",
  disorders: {
    alzheimers: {
      name: "Malaltia d'Alzheimer",
      oneLine:
        "Entre les primeres regions corticals on apareixen els cabdells neurofibril·lars; la pèrdua de volum es correlaciona amb l'alteració de la memòria.",
    },
    ptsd: {
      name: "Trastorn per estrès posttraumàtic",
      oneLine:
        "El volum hipocampal reduït s'observa consistentment al TEPT; la direcció de la causalitat continua debatuda.",
    },
    amnesia: {
      name: "Amnèsia anterògrada (tipus temporal medial)",
      oneLine:
        "El dany hipocampal bilateral produeix la incapacitat canònica per formar noves memòries declaratives.",
    },
    "temporal-lobe-epilepsy": {
      name: "Epilèpsia del lòbul temporal",
      oneLine:
        "L'hipocamp és el focus de crisis més comú en l'epilèpsia focal de l'adult; l'esclerosi hipocampal és una troballa histopatològica freqüent.",
    },
  },
  anatomyAndLandmarks: {
    paragraphs: [
      "L'hipocamp és una estructura corbada arrupida al lòbul temporal medial, anomenada així per la seva semblança amb un cavallet de mar. En secció coronal mostra l'arquitectura en capes que dona a la regió les seves subdivisions precises — el gir dentat, el cornu ammonis (CA1, CA2, CA3, CA4) i el subicle — envoltats al voltant d'una única capa densa de neurones piramidals [cite:amaral-lavenex-2007-hippocampus-anatomy].",
      "L'hipocamp esquerre se situa sota el gir parahipocampal, lateral al tronc encefàlic i medial a la banya temporal del ventricle lateral. El seu principal feix eferent, el fòrnix, s'arqueja cap endavant fins als cossos mamil·lars i el tàlem anterior. Les entrades arriben a través de l'escorça entorinal per la via perforant.",
    ],
  },
  functionSection: {
    paragraphs: [
      "L'hipocamp participa centralment en la codificació de noves memòries episòdiques — el registre autobiogràfic dels esdeveniments a mesura que ocorren — i a lligar aquests esdeveniments als llocs, temps i contextos en què ocorren [cite:squire-1992-medial-temporal-lobe]. El dany aquí produeix una dissociació cridanera: les habilitats i els hàbits adquirits abans de la lesió romanen disponibles, i es poden aprendre noves habilitats motores, però l'evocació deliberada i rica en escenes d'esdeveniments personals recents esdevé impossible [cite:scoville-milner-1957-hm].",
      "Més enllà de la memòria, la mateixa circuiteria sosté la cognició espacial. Els registres de cèl·lules úniques en rosegadors van revelar neurones que es disparen cada vegada que l'animal ocupa una ubicació particular al seu entorn — «cèl·lules de lloc» — i la imatge humana confirma un paper homòleg en la construcció de mapes cognitius [cite:okeefe-dostrovsky-1971-place-cells]. El famós estudi de taxistes de Londres va trobar que el volum de l'hipocamp posterior augmentava amb els anys de navegar pels carrers irregulars de la ciutat, suggerint un canvi estructural depenent de l'ús en cervells adults [cite:maguire-2000-taxi-drivers].",
      "El treball recent ha reenquadrat l'hipocamp no com a magatzem passiu sinó com a motor constructiu: el mateix circuit que recupera una escena passada es recluta quan s'imagina una possible escena futura o un passat contrafàctic [cite:schacter-addis-2007-constructive-episodic]. La memòria i la imaginació comparteixen maquinària, cosa que és part de per què les memòries no són enregistraments estables — cada recuperació reescriu lleugerament la petjada.",
      "L'asimetria hemisfèrica dins de l'hipocamp és real però no s'hauria de sobreestimar. L'hipocamp esquerre es recluta més consistentment per a material episòdic verbal; el dret per a memòria espacial i basada en escenes. Tots dos contribueixen al recordar quotidià.",
    ],
  },
  cellTypesSection: {
    paragraphs: [
      "El còmput hipocampal està organitzat al voltant de tres classes principals de cèl·lules excitatòries. Les cèl·lules granulars del gir dentat reben entrada de l'escorça entorinal i projecten a CA3; les col·laterals recurrents de les neurones piramidals de CA3 són el substrat de manual de l'evocació autoassociativa; les neurones piramidals de CA1 reben la sortida de CA3 (col·laterals de Schaffer) i l'entrada entorinal directa, i formen la sortida principal de la formació hipocampal [cite:amaral-lavenex-2007-hippocampus-anatomy].",
      "La vista cel·lular conté morfologies reconstruïdes de neurones piramidals de CA1 i CA3 i de cèl·lules granulars del gir dentat dels arxius oberts, inclosa la col·lecció NeuroMorpho.org. Descendeix a la capa cel·lular per veure la geometria dendrítica darrere del senyal a nivell de població que es mostra aquí.",
    ],
  },
  connectionsSection: {
    paragraphs: [
      "L'hipocamp es comunica amb la resta del cervell a través d'un petit nombre de feixos de substància blanca ben descrits. La via perforant porta informació des de la capa II de l'escorça entorinal cap al gir dentat i als camps CA — la principal entrada cortical. El fòrnix és la sortida dominant, projectant als cossos mamil·lars, el tàlem anterior i els nuclis septals, i a través d'aquests cap a objectius corticals generalitzats [cite:amaral-lavenex-2007-hippocampus-anatomy].",
      "Funcionalment, l'hipocamp participa en la xarxa per defecte durant la recuperació de memòria i la imaginació del futur, acoblant-se especialment amb l'escorça cingulada posterior i el gir angular [cite:buckner-2008-default-network]. Durant la codificació, l'entrada sortint des de l'amígdala realça la consolidació, que és un dels mecanismes pels quals els esdeveniments carregats emocionalment es recorden més vívidament que els neutres.",
    ],
  },
  clinicalContext: {
    paragraphs: [
      "La malaltia d'Alzheimer comença, segons alguns relats, aquí. Els cabdells neurofibril·lars i la pèrdua sinàptica apareixen a l'escorça entorinal i a l'hipocamp anys abans del diagnòstic clínic, i l'atròfia hipocampal és un dels biomarcadors estructurals més fiables de malaltia primerenca [cite:small-2011-hippocampal-circuit-disorders]. Les queixes primerenques de memòria — oblidar converses recents, els noms de nous coneguts — segueixen la patologia regional més de prop que els símptomes posteriors, més globals.",
      "En el trastorn per estrès posttraumàtic, s'ha reportat un volum hipocampal reduït al llarg de molts estudis d'imatge, però la direcció de la causalitat continua sent controvertida: els hipocamps més petits poden ser un factor de risc preexistent, una conseqüència de l'estrès crònic, o tots dos. La literatura aquí està genuïnament sense resoldre, i la lectura curosa és que l'associació és robusta però encara no un mecanisme.",
      "L'epilèpsia del lòbul temporal té freqüentment l'hipocamp com a focus de crisis, amb l'esclerosi hipocampal com a troballa histològica comuna. La fenomenologia de les crisis del lòbul temporal — déjà vu, afecte intens no provocat, fragments d'escena — reflecteix les estructures implicades.",
    ],
  },
  historyOfDiscovery: {
    paragraphs: [
      "La comprensió moderna de la funció hipocampal comença amb un pacient: Henry Molaison (conegut a la literatura només com a H.M. fins a la seva mort el 2008), que el 1953 va ser sotmès a una lobectomia temporal medial bilateral en un intent de controlar una epilèpsia intractable. La cirurgia el va deixar amb una amnèsia anterògrada profunda i estable que William Beecher Scoville i Brenda Milner van descriure el 1957 [cite:scoville-milner-1957-hm].",
      "La seva intel·ligència preservada, memòria a curt termini intacta i capacitat per aprendre noves habilitats motores van fer impossible descartar l'hipocamp com a magatzem genèric de memòria i van forçar el camp a desenvolupar la visió de múltiples sistemes de memòria amb la qual encara treballem [cite:squire-1992-medial-temporal-lobe]. El descobriment de John O'Keefe de les cèl·lules de lloc a l'hipocamp del rosegador el 1971 va afegir la dimensió espacial que va completar la imatge moderna [cite:okeefe-dostrovsky-1971-place-cells].",
    ],
  },
};
