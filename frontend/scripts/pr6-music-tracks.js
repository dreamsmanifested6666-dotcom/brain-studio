#!/usr/bin/env node
/**
 * PR 6 — Music room track i18n rekey + honest framing.
 *
 * Renames + reframes two of the three music.tracks i18n keys:
 *
 *   sigur-ros-meditation  →  ambient-drone     (Stellardrone CC-BY)
 *   coltrane-naima        →  modal-ballad      (King Oliver 1923 PD)
 *
 * The Thai lullaby slot stays under its existing key. Its framing
 * is unchanged — it describes the genre, not a specific recording,
 * and the slot is intentionally silent until a contributed
 * recording lands (per the About roadmap).
 *
 * Framing copy for the two renamed slots is updated to match the
 * real recordings now playing in them.
 *
 * Run from frontend/: node scripts/pr6-music-tracks.js
 */

const fs = require("node:fs");
const path = require("node:path");
const MESSAGES_DIR = path.join(__dirname, "..", "messages");

const AMBIENT_DRONE = {
  en: {
    era: "Ambient drone",
    framing:
      "A slow drone, no voice, no pulse. The default-mode network warms the way it does in meditation — not because there's a 'meditation circuit,' but because the listener stops trying to follow.",
  },
  es: {
    era: "Drone ambiental",
    framing:
      "Un drone lento, sin voz, sin pulso. La red neuronal por defecto se calienta como lo hace en la meditación — no porque haya un 'circuito de meditación', sino porque el oyente deja de tratar de seguir.",
  },
  ca: {
    era: "Drone ambiental",
    framing:
      "Un drone lent, sense veu, sense pols. La xarxa neuronal per defecte s'escalfa com ho fa en la meditació — no perquè hi hagi un 'circuit de meditació', sinó perquè l'oient deixa de mirar de seguir.",
  },
  th: {
    era: "เสียงคงตัวแอมเบียนต์",
    framing:
      "เสียงคงตัวที่ค่อย ๆ คลี่ ไม่มีเสียงร้อง ไม่มีจังหวะ เครือข่ายโหมดเริ่มต้นอบอุ่นขึ้นแบบเดียวกับตอนนั่งสมาธิ ไม่ใช่เพราะมี \"วงจรสมาธิ\" แต่เพราะผู้ฟังเลิกพยายามตาม",
  },
  ja: {
    era: "アンビエント・ドローン",
    framing:
      "声もなく、拍もない、ゆっくりとしたドローン。デフォルトモードネットワークは瞑想中と同じように温まる — 「瞑想回路」があるからではなく、聴き手が追うのをやめるからだ。",
  },
  "zh-CN": {
    era: "环境长音",
    framing:
      "缓慢的长音，没有人声，没有节拍。默认模式网络以冥想时的方式升温 —— 不是因为存在所谓的“冥想回路”，而是听者不再试图跟上。",
  },
};

const MODAL_BALLAD = {
  en: {
    era: "Early jazz · ensemble",
    framing:
      "Two cornets over a clarinet, a 1923 recording dimmed by a century of shellac. Auditory cortex tracks the call-and-response; warmth comes from prediction — your brain finishes the phrase a beat before the band does.",
  },
  es: {
    era: "Jazz temprano · conjunto",
    framing:
      "Dos cornetines sobre un clarinete, una grabación de 1923 atenuada por un siglo de goma laca. La corteza auditiva sigue la llamada y respuesta; la calidez viene de la predicción — tu cerebro termina la frase un compás antes que la banda.",
  },
  ca: {
    era: "Jazz primerenc · conjunt",
    framing:
      "Dues cornetes sobre un clarinet, una gravació de 1923 atenuada per un segle de goma laca. L'escorça auditiva segueix la crida i resposta; la calidesa ve de la predicció — el teu cervell acaba la frase un compàs abans que la banda.",
  },
  th: {
    era: "แจ๊สยุคต้น · วงดนตรี",
    framing:
      "คอร์เน็ตสองตัวเหนือคลาริเน็ตหนึ่งตัว บันทึกเสียงปี 1923 ที่ถูกเวลาหนึ่งศตวรรษทำให้หม่น สมองส่วนการได้ยินตามจังหวะถาม-ตอบ ความอบอุ่นมาจากการทำนาย — สมองของคุณจบประโยคก่อนวงดนตรีหนึ่งจังหวะ",
  },
  ja: {
    era: "初期ジャズ・アンサンブル",
    framing:
      "クラリネットの上に二本のコルネット、一世紀の蓄音盤に曇らされた1923年の録音。聴覚野はコール・アンド・レスポンスを追い、温かさは予測から来る — 楽団が一拍鳴らす前に、あなたの脳がフレーズを閉じる。",
  },
  "zh-CN": {
    era: "早期爵士 · 合奏",
    framing:
      "两支短号在一支单簧管之上，一段被一个世纪虫胶时间染暗的1923年录音。听觉皮层追踪着问与答；温度来自预测 —— 你的脑子比乐队早一拍把乐句收束。",
  },
};

// Also rewrite the three music.essay headlines + the home insight
// that referenced "Sigur Rós, Coltrane, and a Thai luk thung lullaby"
// — those name copyrighted recordings we don't have rights to.
// Essay 3 already used a generic "the lullaby" framing; only 1 and 2
// need touching, plus the home insight card2.

const ESSAY_1 = {
  en: {
    headline: "Ambient drone and the default-mode network.",
    body: "The PCC and precuneus warm not because there's a 'meditation circuit,' but because the listener stops trying to follow. Default-mode is shorthand for the part of you that's still you when you stop trying.",
  },
  es: {
    headline: "Drone ambiental y la red neuronal por defecto.",
    body: "El PCC y el precúneo se calientan no porque haya un 'circuito de meditación', sino porque el oyente deja de tratar de seguir. La red por defecto es la abreviatura de la parte de ti que sigue siendo tú cuando dejas de intentarlo.",
  },
  ca: {
    headline: "Drone ambiental i la xarxa neuronal per defecte.",
    body: "El PCC i el precune s'escalfen no perquè hi hagi un 'circuit de meditació', sinó perquè l'oient deixa de mirar de seguir. La xarxa per defecte és l'abreviatura de la part de tu que continua sent tu quan deixes d'intentar-ho.",
  },
  th: {
    headline: "เสียงคงตัวแอมเบียนต์กับเครือข่ายโหมดเริ่มต้น",
    body: "PCC และพรีคูเนียสอบอุ่นขึ้นไม่ใช่เพราะมี \"วงจรสมาธิ\" แต่เพราะผู้ฟังเลิกพยายามตาม โหมดเริ่มต้นคือคำย่อสำหรับส่วนของคุณที่ยังเป็นคุณเมื่อหยุดพยายาม",
  },
  ja: {
    headline: "アンビエント・ドローンとデフォルトモードネットワーク。",
    body: "PCC と楔前部は「瞑想回路」があるから温まるのではなく、聴き手が追うのをやめるから温まる。デフォルトモードとは、努力をやめてもなおあなたであり続ける部分の略称だ。",
  },
  "zh-CN": {
    headline: "环境长音与默认模式网络。",
    body: "PCC 与楔前叶升温，不是因为存在“冥想回路”，而是听者不再试图跟上。默认模式是“当你停止努力时仍然是你的那部分”的简称。",
  },
};

const ESSAY_2 = {
  en: {
    headline: "Early jazz and the limbic warmth.",
    body: "Dippermouth Blues was cut in a single take in 1923, twenty-one-year-old Louis Armstrong on second cornet. The amygdala isn't sounding a fear alarm here — it's weighting salience, marking the call-and-response lines that matter. Feeling and form arriving on the same beat.",
  },
  es: {
    headline: "Jazz temprano y la calidez límbica.",
    body: "Dippermouth Blues se grabó en una sola toma en 1923, con un Louis Armstrong de veintiún años al segundo cornetín. La amígdala no está disparando una alarma de miedo aquí — está ponderando saliencia, marcando las líneas de llamada y respuesta que importan. Sentimiento y forma llegando en el mismo compás.",
  },
  ca: {
    headline: "Jazz primerenc i la calidesa límbica.",
    body: "Dippermouth Blues es va gravar en una sola presa el 1923, amb un Louis Armstrong de vint-i-un anys a la segona cornetina. L'amígdala no està disparant una alarma de por aquí — està ponderant saliencia, marcant les línies de crida i resposta que importen. Sentiment i forma arribant al mateix compàs.",
  },
  th: {
    headline: "แจ๊สยุคต้นกับความอบอุ่นในระบบลิมบิก",
    body: "Dippermouth Blues บันทึกในเทคเดียวเมื่อปี 1923 หลุยส์ อาร์มสตรองวัย 21 ปีเล่นคอร์เน็ตเสริม อะมิกดาลาไม่ได้ส่งสัญญาณเตือนความกลัวที่นี่ มันกำลังถ่วงน้ำหนักความสำคัญ ทำเครื่องหมายเส้นถาม-ตอบที่สำคัญ ความรู้สึกและรูปแบบมาถึงในจังหวะเดียวกัน",
  },
  ja: {
    headline: "初期ジャズと辺縁系の温かさ。",
    body: "「ディッパーマウス・ブルース」は1923年に一発録りされた、二十一歳のルイ・アームストロングがセカンドコルネットを担当している。ここで扁桃体は恐怖のアラームを鳴らしているのではない — 顕著性を重み付けし、肝心なコール・アンド・レスポンスの行を印付けている。感情と形式が同じ拍で到着する。",
  },
  "zh-CN": {
    headline: "早期爵士与边缘系统的温度。",
    body: "《Dippermouth Blues》于1923年一次成型录制，二十一岁的路易斯·阿姆斯特朗担任第二短号。这里的杏仁核并非在拉响恐惧警报 —— 它在为显著性赋权，标记出最重要的问答乐句。情感与形式同时到达拍点。",
  },
};

const HOME_INSIGHTS_CARD2 = {
  en: {
    headline: "Music moves the same regions that move you.",
    body: "An ambient drone, a 1923 jazz cut, and a Thai luk thung lullaby all bring different fingerprints to the auditory cortex — and to the default-mode network, the part of you that's still you when you stop trying.",
  },
  es: {
    headline: "La música mueve las mismas regiones que te conmueven.",
    body: "Un drone ambiental, una toma de jazz de 1923 y una nana de luk thung tailandés dejan huellas distintas en la corteza auditiva — y en la red neuronal por defecto, la parte de ti que sigue siendo tú cuando dejas de intentarlo.",
  },
  ca: {
    headline: "La música mou les mateixes regions que et commouen.",
    body: "Un drone ambiental, una presa de jazz de 1923 i una cançó de bressol de luk thung tailandès deixen empremtes diferents a l'escorça auditiva — i a la xarxa neuronal per defecte, la part de tu que continua sent tu quan deixes d'intentar-ho.",
  },
  th: {
    headline: "ดนตรีเคลื่อนไหวบริเวณเดียวกับที่ขับเคลื่อนคุณ",
    body: "เสียงคงตัวแอมเบียนต์ บันทึกเสียงแจ๊สปี 1923 และเพลงกล่อมเด็กลูกทุ่งไทย ต่างฝากรอยนิ้วมือคนละแบบไว้บนคอร์เทกซ์การได้ยิน และบนเครือข่ายโหมดเริ่มต้น ส่วนของคุณที่ยังเป็นคุณเมื่อหยุดพยายาม",
  },
  ja: {
    headline: "音楽はあなたを動かすのと同じ領域を動かす。",
    body: "アンビエント・ドローン、1923年のジャズ録音、そしてタイのルークトゥンの子守唄 — それぞれが聴覚野に、そして努力をやめてもなおあなたであり続ける部分であるデフォルトモードネットワークに、異なる指紋を残す。",
  },
  "zh-CN": {
    headline: "音乐调动的，正是触动你的那些脑区。",
    body: "一段环境长音、一段1923年的爵士录音、一首泰国乡村摇篮曲 —— 它们各自在听觉皮层留下不同的指纹，也在默认模式网络上留下印记，也就是当你停止努力时仍然是你的那部分。",
  },
};

for (const locale of ["en", "es", "ca", "th", "ja", "zh-CN"]) {
  const fp = path.join(MESSAGES_DIR, `${locale}.json`);
  const m = JSON.parse(fs.readFileSync(fp, "utf8"));

  if (!m.music || !m.music.tracks) {
    console.warn(`[skip] ${locale}.json missing music.tracks`);
    continue;
  }

  // Rekey + retitle for the two slots that now have real audio
  delete m.music.tracks["sigur-ros-meditation"];
  delete m.music.tracks["coltrane-naima"];
  m.music.tracks["ambient-drone"] = AMBIENT_DRONE[locale];
  m.music.tracks["modal-ballad"] = MODAL_BALLAD[locale];

  // Rewrite essay 1 + 2 (essay 3 already generic; preserve it)
  if (m.music.essay1) m.music.essay1 = ESSAY_1[locale];
  if (m.music.essay2) m.music.essay2 = ESSAY_2[locale];

  // Rewrite the home page insight that named the same recordings.
  if (m.home && m.home.insights && m.home.insights.card2) {
    m.home.insights.card2 = HOME_INSIGHTS_CARD2[locale];
  }

  fs.writeFileSync(fp, JSON.stringify(m, null, 2) + "\n", "utf8");
  console.log(`[wrote] ${locale}.json`);
}
