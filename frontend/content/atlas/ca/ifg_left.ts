/**
 * Broca's region (left IFG) — Catalan translation.
 * Tier-1 machine-assisted; awaiting native review.
 */

import type { AtlasTranslation } from "../types";

export const ifgLeftAtlasCa: AtlasTranslation = {
  fullName: "Regió de Broca (gir frontal inferior esquerre)",
  disorders: {
    "broca-aphasia": {
      name: "Afàsia de Broca (afàsia no fluent)",
      oneLine:
        "El dany produeix una parla esforçada i telegràfica amb la comprensió relativament preservada; els casos purs per dany focal de Broca són menys comuns del que suggereix l'epònim.",
    },
    "primary-progressive-aphasia-nonfluent": {
      name: "Afàsia progressiva primària (variant no fluent)",
      oneLine:
        "Una síndrome neurodegenerativa amb atròfia selectiva de l'escorça frontal inferior esquerra i de les regions del llenguatge circumdants.",
    },
    stuttering: {
      name: "Tartamudesa del desenvolupament",
      oneLine:
        "Les imatges suggereixen una sobre-regulació i desregulació de les regions motor-de-la-parla del lòbul frontal esquerre, inclosa l'àrea de Broca.",
    },
  },
  anatomyAndLandmarks: {
    paragraphs: [
      "La regió de Broca ocupa la porció posterior del gir frontal inferior esquerre, dividida citoarquitectònicament en les àrees de Brodmann 44 (pars opercularis) i 45 (pars triangularis). La frontera entre BA 44 i BA 45 és subtil a la superfície però distinta al microscopi, i l'extensió precisa de «l'àrea de Broca» varia considerablement entre individus [cite:amunts-1999-brodmann-44-45].",
      "La regió se situa per damunt del solc lateral, anterior al gir precentral, amb la pars orbitalis (BA 47) embolcallant la seva vora inferior. La seva principal connexió de llarg abast — el fascicle arquejat — s'arqueja cap enrere fins a l'escorça temporal posterior.",
    ],
  },
  functionSection: {
    paragraphs: [
      "La regió de Broca es recluta amb més intensitat durant el processament sintàctic i la planificació articulatòria. El dany produeix una afàsia no fluent característica: parla esforçada i telegràfica en què es produeixen paraules de contingut però les paraules funcionals i l'estructura gramatical col·lapsen, mentre que la comprensió pot romandre relativament intacta per al discurs quotidià i ensorrar-se només davant oracions sintàcticament complexes [cite:hagoort-2014-language-architecture].",
      "Més enllà de la sintaxi clàssica, la regió participa en la unificació — la lligadura, moment a moment, dels ítems lèxics en estructures jeràrquiques — i en el control cognitiu necessari per seleccionar entre candidats semàntics i fonològics en competència [cite:friederici-2011-language-network]. La imatge moderna és menys la d'un «centre de producció de la parla» i més la d'un node on processos de control de domini general són reclutats per còmputs específics del llenguatge.",
      "El mapeig d'alta resolució amb fMRI en subjectes individuals ha mostrat que les subregions selectives per al llenguatge de l'àrea de Broca se situen directament adjacents a subregions de control cognitiu de domini general [cite:fedorenko-2014-language-domain-specific]. L'epònim és còmode però obscureix: no es tracta d'una sola unitat funcional sinó d'un petit veïnat de sistemes superposats.",
      "L'homòleg de l'hemisferi dret (IFG-R) no roman silenciós durant les tasques lingüístiques. Contribueix a la prosòdia, al llenguatge figurat i al control inhibitori de la parla.",
    ],
  },
  cellTypesSection: {
    paragraphs: [
      "Com la resta de l'escorça d'associació, el gir frontal inferior està dominat per neurones piramidals glutamatèrgiques a les capes III i V, amb una rica infraestructura inhibitòria d'interneurones positives per a parvalbúmina, somatostatina i VIP. La distinció citoarquitectònica entre BA 44 i BA 45 és principalment qüestió de densitat de la capa granular i de distribució de les cèl·lules piramidals de la capa III [cite:amunts-1999-brodmann-44-45].",
      "Les reconstruccions a nivell cel·lular de neurones piramidals frontals estan disponibles a la vista cel·lular (fes servir el filtre «Frontal»). Mostren les dendrites apicals llargues i àmpliament ramificades característiques de l'escorça d'associació.",
    ],
  },
  connectionsSection: {
    paragraphs: [
      "El fascicle arquejat és el feix de llarg abast de manual que connecta la regió de Broca amb les àrees del llenguatge temporals posteriors. La imatge per difusió ha revisat el quadre clàssic: l'arquejat es descriu millor com una família de fibres amb un segment dorsal que recorre l'escorça frontal i temporal, i una ruta ventral indirecta a través del lòbul parietal inferior [cite:catani-2005-arcuate-fasciculus].",
      "Dins del model de doble corrent del llenguatge, el corrent dorsal — que acobla l'àrea de Broca amb l'escorça temporal posterior a través del fascicle arquejat i parts del fascicle longitudinal superior — mapeja l'entrada acústico-fonètica sobre representacions articulatòries. El corrent ventral, que recorre els fascicles longitudinal inferior i uncinat, mapeja el so de la parla sobre el significat [cite:hickok-poeppel-2007-dual-stream].",
      "Les connexions locals amb l'escorça motora i l'àrea motora suplementària sostenen el costat articulatori de la parla; les connexions amb l'escorça cingulada anterior sostenen el costat del control cognitiu.",
    ],
  },
  clinicalContext: {
    paragraphs: [
      "L'afàsia de Broca pura per una petita lesió focal a BA 44/45 és més rara del que suggereix l'epònim. La síndrome clínica resulta més sovint d'infarts més grans de l'artèria cerebral mitjana que afecten l'àrea de Broca juntament amb la ínsula anterior, l'escorça premotora i la substància blanca subjacent [cite:dronkers-2007-broca-revisited]. Quan els cervells dels dos pacients originals de Paul Broca es van reexaminar amb RM el 2007, tots dos mostraven un dany que s'estenia molt més enllà de la regió que ell havia descrit.",
      "L'afàsia progressiva primària (variant no fluent) es presenta amb una parla agramatical i esforçada que empitjora gradualment i amb atròfia selectiva de l'escorça frontal inferior esquerra i de les regions del llenguatge circumdants. A diferència de l'afàsia post-ictus, el dèficit avança al llarg dels anys i forma part d'un procés neurodegeneratiu.",
      "La implicació clínica és conservadora: el dany a aquesta regió altera el llenguatge, però el «llenguatge» està distribuït per la xarxa perisilviana, i la recuperació en l'afàsia crònica depèn de la integritat tant de les regions intactes com dels feixos de substància blanca que les connecten.",
    ],
  },
  historyOfDiscovery: {
    paragraphs: [
      "Paul Broca va presentar el seu pacient Leborgne davant la Société d'Anthropologie de Paris el 1861. Leborgne portava 21 anys hospitalitzat amb una greu alteració de la parla, capaç de produir poc més que la síl·laba «tan» (per la qual de vegades se'l recorda). Quan Leborgne va morir pocs dies després que Broca l'examinés per primera vegada, l'autòpsia va revelar una gran lesió al lòbul frontal inferior esquerre — la primera localització d'una funció cognitiva superior en una regió cortical específica [cite:broca-1861-aphemie].",
      "La descripció que va fer Carl Wernicke el 1874 d'una lesió temporal posterior que produïa una parla fluent però incomprensible va completar el model fundacional de dues regions. Norman Geschwind va estendre el quadre el 1965 amb el seu marc de «síndromes de desconnexió», en què el dany al fascicle arquejat que connecta Broca i Wernicke produïa l'afàsia de conducció [cite:geschwind-1965-disconnexion-syndromes]. La visió moderna de xarxa va evolucionar a partir d'aquí.",
    ],
  },
};
