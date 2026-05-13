/**
 * Posterior superior temporal gyrus (right) — Catalan translation.
 * Tier-1 machine-assisted; awaiting native review.
 */

import type { AtlasTranslation } from "../types";

export const pstgRightAtlasCa: AtlasTranslation = {
  fullName: "Gir temporal superior posterior dret",
  disorders: {
    amusia: {
      name: "Amúsia congènita i adquirida",
      oneLine:
        "Alteració selectiva del processament del to i la melodia, amb el pSTG dret i les regions temporals superiors dretes adjacents consistentment implicades en formes tant del desenvolupament com adquirides.",
    },
    "receptive-aprosodia": {
      name: "Aprosòdia receptiva",
      oneLine:
        "El dany a l'escorça temporal superior posterior dreta altera el reconeixement de la prosòdia de la parla — el pacient sent les paraules però no pot llegir el to afectiu amb què es pronuncien.",
    },
  },
  anatomyAndLandmarks: {
    paragraphs: [
      "El gir temporal superior posterior dret reflecteix anatòmicament el seu homòleg esquerre en l'anatomia gruixuda — l'escorça temporal superior posterior vorejant el solc lateral, posterior al gir de Heschl, superior al gir temporal mitjà. La citoarquitectura és aproximadament simètrica entre hemisferis; l'asimetria funcional reflecteix diferències en com cada costat descompon l'entrada auditiva més que diferències en el circuit local [cite:zatorre-belin-2001-spectral-temporal].",
    ],
  },
  functionSection: {
    paragraphs: [
      "El pSTG dret es recluta de manera més fiable durant el processament del to, la melodia i la forma afectiva de la veu. L'estudi PET de Zatorre i Belin de 2001 va establir el relat canònic del camp sobre l'asimetria hemisfèrica: l'escorça auditiva esquerra està esbiaixada cap a la resolució temporal fina (que sosté les ràpides discriminacions seqüencials del processament fonèmic), mentre que l'escorça auditiva dreta està esbiaixada cap a la resolució espectral fina (que sosté el to, el timbre i el contorn de la melodia) [cite:zatorre-belin-2001-spectral-temporal]. L'asimetria és parcial — tots dos hemisferis fan totes dues coses — però és prou fiable per explicar una porció substancial de per què l'hemisferi dret importa més per a la música i la capa afectiva de la parla.",
      "Més enllà de la música, el pSTG dret és l'àncora cortical de la prosòdia — l'elevació i caiguda del to vocal que transporta informació afectiva i gramatical distinta de les pròpies paraules. El dany al pSTG dret produeix aprosòdia receptiva: el pacient sent les paraules correctament però no pot llegir el to afectiu amb què es pronuncien, i així no pot saber només per la veu si el parlant està preguntant, ordenant o lamentant-se. La síndrome complementària d'aprosòdia motora per dany a l'IFG dret produeix l'alteració paral·lela en *produir* prosòdia.",
      "La regió temporal superior posterior dreta també participa en el reconeixement de la identitat de la veu — distingir la veu d'un parlant familiar de la d'un altre independentment del que digui. La fonagnòsia, la incapacitat selectiva per reconèixer veus, s'associa amb el dany temporal dret. L'especialització de la regió per a l'envolupant espectral del so vocal és el que li dona aquest paper.",
    ],
  },
  cellTypesSection: {
    paragraphs: [
      "El pSTG dret comparteix la seva arquitectura cel·lular amb el seu homòleg esquerre — escorça d'associació de sis capes amb una capa granular IV que reflecteix el paper de la regió com a àrea auditiva d'associació primerenca. Les diferències hemisfèriques en funció reflecteixen diferències en connectivitat i (subtilment) en microestructura cortical — Zatorre i Belin van proposar que l'especialització asimètrica pot estar relacionada amb diferències anatòmiques en mielinització i espaiament de les columnes corticals [cite:zatorre-belin-2001-spectral-temporal].",
    ],
  },
  connectionsSection: {
    paragraphs: [
      "El pSTG dret rep la seva entrada principal del HG dret i de les regions auditives secundàries del planum temporale. Les seves connexions de llarg abast el situen dins de les xarxes de llenguatge i música de l'hemisferi dret a través del fascicle arquejat (a l'IFG dret) i el fascicle longitudinal inferior (a l'escorça temporal anterior dreta).",
      "Dins de la jerarquia auditiva més àmplia, el pSTG dret se situa una etapa per sota de l'escorça auditiva primària i participa en la integració de la informació espectral amb les representacions corticals més àmplies de música, veu i prosòdia emocional [cite:kell-2018-auditory-task-network].",
    ],
  },
  clinicalContext: {
    paragraphs: [
      "L'amúsia congènita (sordesa tonal) i l'amúsia adquirida per ictus de l'hemisferi dret impliquen totes dues el pSTG dret i les regions temporals superiors dretes adjacents. La condició és una de les demostracions més netes que el processament musical del to té un substrat neural dedicat distint del del llenguatge; molts amúsics tenen llenguatge i audició normals però no poden distingir intervals musicals ni detectar violacions de contorn melòdic que la majoria dels oients senten sense esforç.",
      "L'aprosòdia receptiva per ictus de l'hemisferi dret és la síndrome clínica més fortament lligada al dany del pSTG dret. La condició ha estat infradiagnosticada històricament perquè els pacients encara poden parlar i respondre al contingut verbal de la parla — la pèrdua de la comprensió prosòdica és subtil a la superfície i es revela principalment en les dificultats de comunicació social que el pacient troba després.",
      "L'agnòsia d'identitat de la veu (fonagnòsia), selectiva per a la identitat vocal en lloc del contingut acústic, s'associa amb el dany temporal dret i proporciona una demostració paral·lela a l'agnòsia d'identitat facial (prosopagnòsia) — totes dues impliquen una especialització de l'hemisferi dret per al processament perceptual específic de persones.",
    ],
  },
  historyOfDiscovery: {
    paragraphs: [
      "L'asimetria hemisfèrica a l'escorça auditiva s'ha descrit des de les observacions clíniques de principis del segle XX segons les quals les lesions de l'hemisferi esquerre alteraven desproporcionadament el llenguatge, mentre que les del dret alteraven desproporcionadament la música. El relat funcional contemporani s'ancora en l'estudi PET de Zatorre i Belin de 2001 que demostra que les escorces auditives centrals de tots dos hemisferis responen a la variació temporal però amb un biaix esquerre, mentre que les escorces en banda de l'hemisferi dret s'especialitzen en el processament espectral [cite:zatorre-belin-2001-spectral-temporal].",
      "La literatura posterior ha refinat aquesta imatge a través de paradigmes — el treball de Patrik Belin sobre l'escorça selectiva per a la veu (l'àrea temporal de la veu), els estudis continus de Robert Zatorre sobre el processament musical del to, i la demostració d'Andrew Kell i col·legues que les xarxes neuronals optimitzades per a tasques recapitulen la jerarquia auditiva humana d'una manera consistent amb l'asimetria espectral-temporal [cite:kell-2018-auditory-task-network].",
    ],
  },
};
