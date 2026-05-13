/**
 * "Hearing music" — Catalan translation.
 * Tier-1 machine-assisted; awaiting native review.
 */

import type { TourTranslation } from "../types";

export const hearingMusicTourCa: TourTranslation = {
  title: "Escoltar música",
  subtitle: "Un recorregut de dos minuts i mig per les vies auditiva i de recompensa.",
  blurb:
    "Per què et commou un canvi d'acord? Escoltar música recluta una seqüència particular de regions corticals i subcorticals — primer l'escorça auditiva primària, l'hemisferi dret processador de l'espectre, els circuits límbics i de recompensa que tornen el so organitzat en alguna cosa sentida. Aquest recorregut segueix un moment d'escolta.",
  continueLabel: "Continuar al Laboratori de NeuroMúsica",
  scenes: {
    "0-air": {
      narration:
        "Sona un acord. Les ones de pressió de l'aire viatgen de l'altaveu a l'oïda, la còclea les descompon en l'espectre que compon el so, i el senyal comença el seu ascens cap a l'escorça.",
    },
    "1-brainstem": {
      narration:
        "Els nuclis auditius del tronc encefàlic — nucli coclear, oliva superior, col·licle inferior — fan una anàlisi espectrotemporal ràpida. Inici, to, ubicació. Res d'això encara és conscient.",
    },
    "2-hg": {
      narration:
        "El cos geniculat medial del tàlem retransmet el senyal a l'escorça auditiva primària. El gir de Heschl en tots dos costats. Organitzat tonotòpicament — diferents freqüències activen diferents posicions al llarg del gir.",
    },
    "3-right-bias": {
      narration:
        "El Heschl dret s'inclina cap al treball. Mentre l'escorça auditiva esquerra s'especialitza en la precisió temporal de la parla, la dreta s'especialitza en la resolució espectral que el to i el timbre demanen.",
    },
    "4-secondary-auditory": {
      narration:
        "L'escorça auditiva secundària —escorça temporal superior posterior al costat dret— extreu la melodia, l'estructura harmònica, el contorn de la línia. La música com a música comença a acoblar-se aquí.",
    },
    "5-emotion-fork": {
      narration:
        "Una ruta subcortical lliura el senyal a l'amígdala en paral·lel. L'etiquetatge afectiu —aquesta música sona com es sent— corre concurrentment amb l'extracció cortical de l'estructura.",
    },
    "6-vmpfc-reward": {
      narration:
        "Àrea tegmental ventral, nucli accumbens, escorça prefrontal ventromedial — el circuit de recompensa. L'activitat dopaminèrgica segueix el plaer sentit de la música. La resolució anticipada, l'acord que aterra.",
    },
    "7-hippocampus-binds": {
      narration:
        "L'hipocamp lliga la música a escenes. Una cuina, una persona, un any. La famosa capacitat de la música per recuperar autobiografia viu aquí — a la interfície entre la ruta auditiva i la memòria episòdica.",
    },
    "8-default-mode-integration": {
      narration:
        "Les regions de la xarxa per defecte integren el moment. Cingulat posterior, precuni, escorça prefrontal medial. La peça s'integra en el sentit més ampli de qui ets escoltant, i què és aquesta música per a tu.",
    },
    "9-prediction": {
      narration:
        "El cervell corre per davant de la música, predient on anirà la línia. La confirmació i la sorpresa enganxen el circuit de recompensa — gran part del que fa la música plaent és la dansa amb el que esperaves.",
    },
    "10-numinous": {
      narration:
        "Quan una peça arriba amb el pes que Otto va anomenar numinós —alguna cosa més que agradar, alguna cosa que pren— la xarxa de saliència ha parlat. El sentit sentit que alguna cosa importa viatja amb la música.",
    },
    "11-close": {
      narration:
        "La música mou les mateixes regions que et mouen a tu. La via auditiva i la via límbica comparteixen arquitectura; el que estàs sentint i el que estàs sentint no són separables aquí, i la dansa entre els dos és la música.",
    },
  },
};
