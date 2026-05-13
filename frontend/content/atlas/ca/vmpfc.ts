/**
 * Ventromedial prefrontal cortex — Catalan translation.
 * Tier-1 machine-assisted; awaiting native review.
 */

import type { AtlasTranslation } from "../types";

export const vmpfcAtlasCa: AtlasTranslation = {
  fullName: "Escorça prefrontal ventromedial",
  disorders: {
    "frontotemporal-dementia-bv": {
      name: "Demència frontotemporal variant conductual (DFTvc)",
      oneLine:
        "L'atròfia del vmPFC i de l'escorça orbitofrontal adjacent produeix desinhibició, pèrdua d'empatia i alteracions característiques de la presa de decisions.",
    },
    depression: {
      name: "Trastorn depressiu major",
      oneLine:
        "L'activitat i connectivitat aberrants del vmPFC s'han implicat en els biaixos de valència negativa i en la ruminació característics del trastorn.",
    },
    ptsd: {
      name: "Trastorn per estrès posttraumàtic",
      oneLine:
        "La menor participació del vmPFC durant la regulació emocional és una de les troballes funcionals més replicades.",
    },
    addiction: {
      name: "Trastorns per consum de substàncies",
      oneLine:
        "La representació alterada del valor al vmPFC contribueix a la persistència de triar la recompensa immediata per damunt dels objectius a més llarg termini.",
    },
  },
  anatomyAndLandmarks: {
    paragraphs: [
      "L'escorça prefrontal ventromedial ocupa la porció inferior de la paret frontal medial, estenent-se des del pol rostral del lòbul frontal fins a la cingulada anterior, i continuant inferiorment fins a la superfície orbital. La regió és heterogènia, incloent porcions de les àrees de Brodmann 10, 14, 25 i 32. Els límits amb l'escorça orbitofrontal adjacent i la cingulada anterior pregenual són graduals més que nítids; diferents grups d'investigació tracen les línies de manera lleugerament diferent [cite:amodio-frith-2006-meeting-minds].",
      "El vmPFC se situa en un encreuament estructural: rep denses projeccions de l'amígdala a través del fascicle uncinat, de la formació hipocampal a través del fascicle cingular, del tàlem dorsomedial a través de les radiacions talàmiques, i de les regions posteriors de la xarxa per defecte a través de llargues vies còrtic-corticals medials. Aquesta convergència és part de per què una sola regió acaba implicada en tants relats funcionals diferents.",
    ],
  },
  functionSection: {
    paragraphs: [
      "El vmPFC és el lloc canònic de la representació del valor subjectiu en la neurociència contemporània de la decisió. Quan els humans trien entre opcions — aliments, loteries monetàries, resultats socials — el senyal BOLD al vmPFC escala amb el valor subjectiu de l'opció triada d'una manera que es manté a través de modalitats, contextos i preferències individuals [cite:hare-camerer-rangel-2009-self-control-vmpfc]. La mateixa activitat del vmPFC segueix tant el valor del gust com el de la salut en qui exerceixen autocontrol deliberat; en qui no s'autocontrolen, segueix només el gust. Aquesta és una de les dissociacions funcionals més netes en la neurociència cognitiva.",
      "La porta d'entrada històrica és la hipòtesi del marcador somàtic d'Antonio Damasio. Damasio i col·legues van observar que els pacients amb dany al vmPFC conservaven intel·ligència normal i coneixement explícit de les conseqüències però prenien decisions sistemàticament deficients en tasques com l'Iowa Gambling Task, on l'elecció exitosa depèn d'integrar senyals afectius sobre resultats previs [cite:bechara-damasio-2005-iowa-gambling]. El marc del marcador somàtic va proposar que el vmPFC lliga els senyals corporal-afectius a l'elecció deliberativa — que la bona presa de decisions depèn de l'accés a un sentit sentit, no només sabut, del que importa.",
      "Més enllà de la valoració, el vmPFC és un node fiable de la xarxa per defecte i es recluta durant el pensament autoreferencial, la recuperació de memòria autobiogràfica i la simulació d'altres — particularment la simulació d'altres similars a un mateix [cite:northoff-2006-self-referential-meta]. La participació de la regió tant en la valoració deliberada com en el processament autoreferencial en repòs no és coincidència; tots dos impliquen la construcció i consulta de models interns en què està representat el que a un li importa.",
      "El mapeig de Carhart-Harris i Friston de la funció de la xarxa per defecte sobre la funció del jo freudià situa el vmPFC directament dins del pont amb la psicologia profunda [cite:carhart-harris-friston-2010-default-mode-ego]. El que la psicoanàlisi clàssica va descriure com les funcions del jo de prova de realitat i integració de valor — el treball difícil de sostenir el que un vol al costat del que és possible — té, en part, el rostre empíric del còmput del valor del vmPFC.",
    ],
  },
  cellTypesSection: {
    paragraphs: [
      "Com la resta de l'escorça prefrontal medial, el vmPFC està dominat per neurones piramidals glutamatèrgiques a les capes III i V, amb la rica infraestructura inhibitòria característica de l'escorça d'associació. La regió també conté poblacions disperses de neurones de Von Economo — grans cèl·lules de projecció de la capa V amb forma de fus, concentrades a l'escorça cingulada anterior i fronto-insular, i que s'estenen fins a la paret medial aquí [cite:amodio-frith-2006-meeting-minds]. La seva funció precisa continua debatent-se; el que és fiable és que la seva distribució es mapeja sobre regions amb una connectivitat integradora de llarg abast particularment rica.",
      "Descendeix a la vista cel·lular per veure neurones piramidals frontals reconstruïdes; les cèl·lules prefrontals dels arxius porten les dendrites apicals llargues i àmpliament ramificades característiques de l'escorça d'associació.",
    ],
  },
  connectionsSection: {
    paragraphs: [
      "El fascicle uncinat porta connexions recíproques entre el vmPFC i l'amígdala basolateral — la ruta principal per la qual els senyals afectius es lliguen a la valoració deliberativa, i la ruta principal per la qual l'escorça prefrontal modula la reactivitat de l'amígdala en la regulació emocional [cite:phelps-ledoux-2005-amygdala-contributions]. El dany a aquest tracte altera totes dues direccions de la conversa, contribuint a les alteracions característiques de la presa de decisions en els pacients amb lesió del vmPFC.",
      "El fascicle cingular porta el vmPFC cap a la xarxa per defecte més àmplia, amb fortes connexions recíproques amb la cingulada posterior, el precuni i (a través de continuacions del cingular-fòrnix) la formació hipocampal. Aquestes connexions sostenen la lligadura de les representacions de valor a la memòria autobiogràfica i al processament autoreferencial més ampli [cite:andrews-hanna-2010-default-network-functional].",
      "Les connexions locals amb la cingulada anterior, l'escorça prefrontal dorsomedial i l'escorça orbitofrontal situen el vmPFC dins d'un sistema medial-frontal estretament acoblat en què les diferents subregions manegen aspectes diferents però superposats de valor, control i cognició social [cite:amodio-frith-2006-meeting-minds].",
    ],
  },
  clinicalContext: {
    paragraphs: [
      "La demència frontotemporal variant conductual (DFTvc) produeix canvis cridaners en la personalitat, el judici social i la presa de decisions amb la memòria relativament preservada en les primeres etapes. L'atròfia implica el vmPFC i l'escorça orbitofrontal i la ínsula anterior adjacents; la síndrome clínica — desinhibició, apatia, pèrdua d'empatia, mal judici financer — il·lustra el que succeeix quan la maquinària d'integració de valor es degrada mentre la memòria episòdica roman. La malaltia està entre els experiments naturals més nets sobre el que aporta el vmPFC.",
      "En el trastorn depressiu major, l'activitat i els patrons de connectivitat del vmPFC estan alterats de maneres que contribueixen als biaixos característics del trastorn cap a l'autoavaluació negativa i cap al pensament autoreferencial ruminatiu. L'enquadrament de la xarxa per defecte ajuda aquí: la hiperconnectivitat dins de la DMN, inclòs el vmPFC, s'ha vinculat al tipus de ruminació cap a dins que distingeix la cognició depressiva.",
      "Els trastorns per consum de substàncies mostren una representació alterada de la recompensa immediata davant la diferida al vmPFC, amb implicacions per a la persistència de triar la gratificació immediata per damunt dels objectius a més llarg termini — una troballa que importa clínicament per a les intervencions terapèutiques dirigides a reforçar la modulació dorsolateral-prefrontal dels senyals de valor del vmPFC demostrada per Hare i col·legues [cite:hare-camerer-rangel-2009-self-control-vmpfc].",
      "En el TEPT, la menor participació del vmPFC durant la regulació emocional és una de les troballes funcionals més replicades. La lectura mecanística és que la regulació efectiva de la reactivitat de l'amígdala requereix una comunicació vmPFC-amígdala intacta al llarg del fascicle uncinat; quan aquesta comunicació es debilita, els senyals relacionats amb l'amenaça es regulen a la baixa amb menys facilitat pel context cortical.",
    ],
  },
  historyOfDiscovery: {
    paragraphs: [
      "La història funcional moderna del vmPFC comença amb el cas de Phineas Gage de 1848 — el treballador del ferrocarril la cèlebre lesió frontal del qual (amb una barra de ferro que va travessar la seva escorça orbitofrontal i ventromedial) va preservar la seva intel·ligència i llenguatge però, segons els relats contemporanis, va transformar la seva conducta social i la seva presa de decisions. El cas va ser reanalitzat per Hanna Damasio i col·legues als anys noranta usant imatge moderna sobre el crani preservat de Gage, amb resultats consistents amb la hipòtesi que el dany al vmPFC altera selectivament la integració de l'afecte en l'elecció.",
      "El cas empíric va ser fet sistemàtic per Antonio Damasio i col·legues amb l'Iowa Gambling Task — un paradigma d'elecció de cartes en què els pacients amb lesió rendeixen normalment en tests cognitius estàndard però fallen en aprendre de la retroalimentació emocional sobre els resultats [cite:bechara-damasio-2005-iowa-gambling]. El marc del marcador somàtic de Damasio va donar al camp el seu primer relat funcional coherent del que el vmPFC aporta a la presa de decisions, i la imatge ha estat estesa i refinada per Antonio Rangel, Todd Hare, Colin Camerer i altres usant fMRI i paradigmes d'elecció econòmica [cite:hare-camerer-rangel-2009-self-control-vmpfc].",
    ],
  },
};
