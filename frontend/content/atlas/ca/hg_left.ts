/**
 * Heschl's gyrus (left) — Catalan translation.
 * Tier-1 machine-assisted; awaiting native review.
 */

import type { AtlasTranslation } from "../types";

export const hgLeftAtlasCa: AtlasTranslation = {
  fullName: "Gir de Heschl / escorça auditiva primària (esquerre)",
  disorders: {
    "cortical-deafness": {
      name: "Sordesa cortical",
      oneLine:
        "Les lesions bilaterals de l'escorça auditiva primària produeixen un dèficit cridaner en què el pacient no sent conscientment els sons malgrat l'audició perifèrica intacta.",
    },
    "auditory-agnosia": {
      name: "Agnòsia auditiva",
      oneLine:
        "Incapacitat selectiva per reconèixer sons amb l'audició preservada, típicament per lesions que afecten les regions auditives secundàries adjacents al HG.",
    },
    tinnitus: {
      name: "Acúfens (tinnitus)",
      oneLine:
        "La reorganització maladaptativa de les representacions tonotòpiques al HG és un dels mecanismes neurals proposats per a la percepció persistent de so en absència d'entrada acústica.",
    },
  },
  anatomyAndLandmarks: {
    paragraphs: [
      "El gir de Heschl és el gir temporal transvers que recorre la riba superior del solc lateral, gairebé perpendicular al gir temporal superior i parcialment ocult dins de la cissura de Sylvi. La seva posició a la superfície superior del lòbul temporal fa que no sigui visible a la superfície lateral del cervell intacte — cal obrir la cissura de Sylvi per veure'l [cite:da-costa-2011-tonotopy-heschl].",
      "La morfologia del gir de Heschl és un dels trets més variables de l'anatomia cortical humana. Aproximadament la meitat dels individus tenen un únic gir de Heschl a cada costat; la resta tenen duplicacions parcials o completes, amb dos girs paral·lels o un únic gir amb un solc longitudinal que el divideix. L'estudi d'fMRI a alt camp de 2011 de Da Costa et al. va establir que l'escorça auditiva primària abasta totes dues divisions del HG en els casos duplicats — el camp havia assumit prèviament que la PAC ocupava només el gir anterior, i la correcció importa per a la interpretació clínica de les lesions que impliquen el HG [cite:da-costa-2011-tonotopy-heschl].",
      "L'escorça auditiva primària correspon a l'àrea de Brodmann 41. Rep la principal entrada cortical del nucli geniculat medial del tàlem a través de la radiació auditiva, i projecta als planum polare i planum temporale circumdants (BA 42 i regions adjacents), que constitueixen l'escorça auditiva secundària.",
    ],
  },
  functionSection: {
    paragraphs: [
      "El gir de Heschl és l'escorça auditiva primària — la primera regió cortical a rebre l'entrada auditiva des de l'oïda a través de la còclea, els nuclis auditius del tronc encefàlic, el col·licle inferior i el geniculat medial. La regió està organitzada tonotòpicament: diferents freqüències acústiques activen diferents posicions al llarg del gir, amb les freqüències baixes representades anterolateralment i les altes posteromedialment [cite:da-costa-2011-tonotopy-heschl]. El mapa és simètric en mirall — hi ha dos mapes tonotòpics primaris dins del HG, hA1 i hR, que es troben en una frontera central de freqüència — i la mateixa organització s'observa al llarg de l'àmplia variació morfològica del propi gir.",
      "Més enllà de la tonotopia simple, l'escorça auditiva primària realitza una anàlisi espectrotemporal primerenca: modulacions temporals ràpides, envolupants espectrals, diferències fines de to i les claus binaurals que contribueixen a l'audició espacial. Els còmputs de la regió són ràpids i en bona mesura fidels a l'entrada — el tipus de treball que sosté les anàlisis més elaborades aigües avall de la parla, la música i els sons ambientals que realitzen les regions auditives secundàries i els sistemes de llenguatge i música del lòbul temporal.",
      "L'asimetria esquerra-dreta dins de l'escorça auditiva primària és modesta però real. El HG esquerre està esbiaixat cap a la resolució temporal fina, que sosté les ràpides discriminacions seqüencials necessàries per al processament fonèmic; el HG dret està esbiaixat cap a una resolució espectral més fina, que sosté el processament de to i timbre. Tots dos hemisferis reben entrada auditiva bilateral de cada oïda, de manera que el dany unilateral al HG rarament produeix sordesa completa — calen lesions bilaterals per a això.",
      "Aquesta és una de les regions del lloc per a les quals no s'ofereix una glossa des de la psicologia profunda. L'escorça auditiva primària és maquinària, fidel i necessària. La fenomenologia del sentir — ser interpel·lat per un so, ser commogut per la música, reconèixer una veu — viu una o diverses sinapsis aigües avall. L'Atles honora la distinció: on el pont amb la psicologia profunda és honest, la pàgina el fa; on no ho és, la pàgina no se n'inventa cap.",
    ],
  },
  cellTypesSection: {
    paragraphs: [
      "A diferència de la major part de l'escorça d'associació, l'escorça auditiva primària és escorça granular — té una capa IV clarament desenvolupada que rep la projecció talàmica del geniculat medial. Aquest marcador citoarquitectònic és una de les maneres estàndard en què s'identifiquen els límits de l'escorça sensorial primària en la neuroanatomia clàssica, i distingeix el HG de les escorces disgranulars adjacents que constitueixen les regions auditives secundàries [cite:da-costa-2011-tonotopy-heschl].",
      "Les cèl·lules piramidals de les capes III i V porten les principals sortides còrtic-corticals de la regió — a l'escorça auditiva secundària circumdant, a l'hemisferi contralateral a través del cos callós i (escassament) al planum temporale i de tornada al geniculat medial com a retroalimentació cortical.",
    ],
  },
  connectionsSection: {
    paragraphs: [
      "La radiació auditiva és la principal via d'entrada al HG, portant axons des del nucli geniculat medial del tàlem fins a la riba superior del lòbul temporal. Des del HG, les connexions còrtic-corticals de curt abast s'obren al planum temporale posteriorment i al planum polare anteriorment — les regions auditives secundàries que realitzen els còmputs més elaborats sobre la informació espectrotemporal que el HG proporciona.",
      "Les connexions de llarg abast del HG amb altres regions del lòbul temporal i frontal són majoritàriament indirectes, enrutades a través d'aquestes regions auditives secundàries. Al marc de doble corrent, el HG proporciona l'entrada que els corrents dorsal i ventral elaboren — el corrent dorsal cap a la ruta so-articulació a través del STG posterior i el fascicle arquejat fins a Broca, el corrent ventral cap a la ruta so-significat a través de l'escorça temporal mitjana i el fascicle longitudinal inferior [cite:hickok-poeppel-2007-dual-stream].",
    ],
  },
  clinicalContext: {
    paragraphs: [
      "Les lesions bilaterals del HG produeixen sordesa cortical — un dèficit cridaner en què el pacient no sent conscientment els sons malgrat que la còclea, els nuclis auditius del tronc encefàlic i el tàlem romanen intactes. La condició és rara perquè requereix dany bilateral; les lesions unilaterals del HG causen alteracions auditives més subtils. La sordesa cortical il·lustra que l'experiència conscient del sentir depèn del processament cortical, no de la integritat de l'aparell auditiu perifèric per si sol.",
      "L'agnòsia auditiva — incapacitat selectiva per reconèixer sons (sons de la parla, sons ambientals o ambdós) amb audició preservada — resulta típicament de lesions que afecten l'escorça auditiva secundària adjacent al HG. La dissociació entre sordesa cortical (no pot sentir) i agnòsia auditiva (pot sentir però no pot reconèixer) és una de les demostracions clíniques més netes que el sentir i el reconèixer auditiu són funcionalment separables.",
      "Els acúfens — la percepció persistent de so en absència de font externa — s'associen amb una gamma d'anomalies auditives centrals, inclosa la reorganització maladaptativa de les representacions tonotòpiques al HG. Els acúfens associats a pèrdua auditiva segueixen sovint la pèrdua d'entrada des de regions coclears de freqüència, amb la representació cortical d'aquestes freqüències reassignant-se de maneres que poden subjaure al percepte fantasma.",
    ],
  },
  historyOfDiscovery: {
    paragraphs: [
      "Richard Heschl, anatomista austríac, va descriure els girs temporals transversos que ara porten el seu nom el 1855. L'estatus de la regió com a escorça auditiva primària es va establir a través de la convergència de l'observació clínica del segle XIX, el mapeig citoarquitectònic de principis del XX (Brodmann va identificar BA 41 com a escorça auditiva primària) i els registres electrofisiològics de mitjan XX en animals que van confirmar l'organització tonotòpica.",
      "La imatge contemporània de l'escorça auditiva primària humana — inclosa la correcció que la PAC abasta totes dues divisions de les morfologies de HG duplicades — va ser establerta per l'estudi d'fMRI a 7T d'alt camp de 2011 de Sandra Da Costa, Melissa Saenz i col·legues, que va mapejar la tonotopia en subjectes individuals al llarg de la gamma de morfologies comunes del gir de Heschl [cite:da-costa-2011-tonotopy-heschl]. L'estudi va revisar un supòsit de llarga data i va aclarir on cercar l'escorça auditiva primària a qualsevol cervell individual.",
    ],
  },
};
