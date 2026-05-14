#!/usr/bin/env node
/**
 * PR 1 — Copy bug fixes across all 6 locale bundles.
 *
 *   4a atlas.statusNote      — drop self-contradictory tail
 *   4c tours.comingSoon      — all 5 listed tours are shipped; rewrite to honest
 *   4d about.roadmap         — replace phased list with single body paragraph
 *   4e regions.pcc.poeticGloss — vary "still you when you stop trying" duplicate
 *
 * Run from frontend/: node scripts/pr1-copy-bugs.js
 */

const fs = require("node:fs");
const path = require("node:path");
const MESSAGES_DIR = path.join(__dirname, "..", "messages");

// 4a — atlas.statusNote rewrite. All 20 region content files declare
//      status: "complete", so the second sentence ("others render
//      their architecture") was self-contradictory. New copy keeps
//      the ICU variables in place (count may change as architecture
//      shifts) but states the state honestly.
const ATLAS_STATUS = {
  en: "All {complete} of {total} region pages have complete prose.",
  es: "Las {complete} de {total} páginas de regiones tienen prosa completa.",
  ca: "Les {complete} de {total} pàgines de regions tenen prosa completa.",
  th: "หน้าบริเวณสมองทั้ง {complete} จาก {total} หน้ามีงานเขียนสมบูรณ์แล้ว",
  ja: "{total} ページの脳領域のうち {complete} ページがすべて執筆済み。",
  "zh-CN": "{total} 个脑区页面中已有 {complete} 个完成全部文本。",
};

// 4c — tours.comingSoon rewrite. The five tours listed as
//      "forthcoming" are all shipped. New copy acknowledges all six
//      are live and names what genuinely remains as future work
//      (more tours as new content lands).
const TOURS_COMING_SOON = {
  en: "Six tours are currently available. More will appear as new rooms land and the brain encoding model is wired to live inference.",
  es: "Hay seis recorridos disponibles. Aparecerán más a medida que se incorporen nuevas salas y el modelo de codificación cerebral se conecte a la inferencia en vivo.",
  ca: "Hi ha sis recorreguts disponibles. N'apareixeran més a mesura que s'incorporin noves sales i el model de codificació cerebral es connecti a la inferència en directe.",
  th: "ขณะนี้มีทัวร์ทั้งหมดหกรายการ ทัวร์ใหม่จะปรากฏเมื่อมีห้องใหม่เพิ่มเข้ามา และเมื่อโมเดลเข้ารหัสสมองถูกต่อเข้ากับการอนุมานจริง",
  ja: "現在六つのツアーが公開されています。新しい部屋が加わり、脳エンコードモデルがライブ推論につながるにつれて、さらに増える予定です。",
  "zh-CN": "目前共有六个导览。随着新房间陆续上线，以及大脑编码模型接入实时推理，更多导览将逐步加入。",
};

// 4d — about.roadmap rewrite. Replaces phased list with one honest
//      "what's next" body paragraph naming the four genuinely-
//      remaining tasks. Drops phase10/11/12/phaseLabel keys; adds
//      roadmap.body. The page render will be updated to read .body
//      and drop the numbered list iteration.
const ABOUT_ROADMAP_BODY = {
  en: "Four things genuinely remain. Real TRIBE inference wired to a FastAPI backend — the predictor currently runs locally on lexical features and the architecture-faithful model loader is in place, but production inference is not. A native Thai review pass on the machine-assisted translations across every page; the EN/TH toggle exists and the Thai prose is awaiting one careful read. Public-domain or CC-BY audio for the three NeuroMusic Lab slots, plus a contribution affordance for new pairs and recordings on the Cross-Cultural and NeuroMusic rooms. A final accessibility and performance audit across every route, with screen-reader labels on every brain region and OG cards for every page.",
  es: "Quedan genuinamente cuatro cosas. La inferencia real de TRIBE conectada a un backend FastAPI — el predictor se ejecuta localmente sobre rasgos léxicos y el cargador de modelo fiel a la arquitectura ya está, pero la inferencia en producción aún no. Una revisión nativa en tailandés sobre las traducciones asistidas por máquina en cada página; el conmutador EN/TH existe y la prosa tailandesa espera una lectura cuidadosa. Audio de dominio público o CC-BY para las tres pistas de NeuroMusic Lab, más una vía de contribución para nuevos pares y grabaciones en las salas Transcultural y NeuroMusic. Una auditoría final de accesibilidad y rendimiento en cada ruta, con etiquetas de lector de pantalla en cada región cerebral y tarjetas OG para cada página.",
  ca: "Queden genuïnament quatre coses. La inferència real de TRIBE connectada a un backend FastAPI — el predictor s'executa localment sobre trets lèxics i el carregador de model fidel a l'arquitectura ja hi és, però la inferència en producció encara no. Una revisió nativa en tailandès sobre les traduccions assistides per màquina a cada pàgina; el commutador EN/TH existeix i la prosa tailandesa espera una lectura curosa. Àudio de domini públic o CC-BY per a les tres pistes de NeuroMusic Lab, més una via de contribució per a nous parells i enregistraments a les sales Transcultural i NeuroMusic. Una auditoria final d'accessibilitat i rendiment a cada ruta, amb etiquetes de lector de pantalla a cada regió cerebral i targetes OG per a cada pàgina.",
  th: "เหลือสี่อย่างจริง ๆ การอนุมาน TRIBE จริงที่เชื่อมเข้ากับแบ็กเอนด์ FastAPI — ตอนนี้ตัวทำนายทำงานอยู่ในเครื่องบนคุณลักษณะระดับคำ และตัวโหลดโมเดลที่ซื่อตรงต่อสถาปัตยกรรมเข้าที่แล้ว แต่การอนุมานในระดับผลิตจริงยังไม่ถูกต่อ การตรวจทานโดยเจ้าของภาษาไทยต่องานแปลที่ปัญญาประดิษฐ์ช่วยทำในทุกหน้า สวิตช์ EN/TH ใช้ได้แล้ว และฉบับภาษาไทยรอการอ่านอย่างละเอียดสักรอบ เสียงที่อยู่ในสาธารณสมบัติหรือ CC-BY สำหรับทั้งสามแทร็กของห้องปฏิบัติการนิวโรมิวสิก พร้อมช่องทางให้ผู้อ่านส่งคู่กระตุ้นและเพลงใหม่เข้ามายังห้องข้ามวัฒนธรรมและห้องนิวโรมิวสิก การตรวจสอบขั้นสุดท้ายด้านการเข้าถึงและสมรรถนะในทุกเส้นทาง พร้อมป้ายโปรแกรมอ่านหน้าจอบนทุกบริเวณของสมอง และการ์ด OG สำหรับทุกหน้า",
  ja: "本当に残っているのは四つ。FastAPI バックエンドにつながれた実 TRIBE 推論 — 予測器は現在ローカルで語彙的特徴により動作しており、アーキテクチャに忠実なモデルローダーは整っているが、本番推論はまだである。全ページにわたる機械支援タイ語翻訳のネイティブ校閲。EN/TH 切替は機能しており、タイ語の文章は丁寧な一読を待っている。ニューロミュージック・ラボの三つの枠のためのパブリックドメインまたは CC-BY 音源、加えて異文化およびニューロミュージックの各部屋への新規ペアおよび録音の投稿経路。すべてのルートに対するアクセシビリティと性能の最終監査、すべての脳領域へのスクリーンリーダー・ラベル、すべてのページに対する OG カード。",
  "zh-CN": "真正剩下的有四件事。接入 FastAPI 后端的真实 TRIBE 推理 —— 当前预测器在本地基于词汇特征运行，忠于架构的模型加载器已就位，但生产环境的推理尚未接入。对全站机器辅助翻译进行一次泰文母语者审阅；EN/TH 切换已可用，泰文文本静候一次细读。为神经音乐实验室的三条音轨准备公有领域或 CC-BY 授权的音频，并在跨文化和神经音乐两房间增加投稿入口以接收新的刺激对与录音。对每条路径进行最终的可访问性与性能审计：每个脑区都附屏幕阅读器标签，每页都有 OG 卡片。",
};

// 4e — regions.pcc.poeticGloss vary. The Music room essay1.body is
//      the canonical "the part of you that's still you when you
//      stop trying" — kept. The PCC region's poeticGloss reused the
//      exact phrase, which drained the line on the room that owns
//      it. Variation preserves the meaning (default-mode self-
//      maintenance) without echoing the canonical wording.
const PCC_POETIC = {
  en: "What stays lit when you stop attending. The room that holds the model of the ongoing self.",
  es: "Lo que sigue encendido cuando dejas de atender. La sala que sostiene el modelo del yo en marcha.",
  ca: "Allò que continua encès quan deixes d'atendre. La sala que manté el model del jo en marxa.",
  th: "สิ่งที่ยังสว่างอยู่เมื่อคุณหยุดเพ่งความสนใจ ห้องที่เก็บแบบจำลองของตัวตนที่กำลังดำเนินไป",
  ja: "注意を向けるのをやめても、なお灯っているもの。継続する自己の模型を保つ部屋。",
  "zh-CN": "当你停止专注时，仍亮着的那部分。承载着持续的自我模型的房间。",
};

for (const locale of ["en", "es", "ca", "th", "ja", "zh-CN"]) {
  const fp = path.join(MESSAGES_DIR, `${locale}.json`);
  const m = JSON.parse(fs.readFileSync(fp, "utf8"));

  // 4a
  if (m.atlas && m.atlas.statusNote) m.atlas.statusNote = ATLAS_STATUS[locale];
  // 4c
  if (m.tours && m.tours.comingSoon) m.tours.comingSoon = TOURS_COMING_SOON[locale];
  // 4d — replace phased keys with a single roadmap.body. Delete the
  //      phase10/11/12/phaseLabel keys. Keep label + heading.
  if (m.about && m.about.roadmap) {
    delete m.about.roadmap.phase10;
    delete m.about.roadmap.phase11;
    delete m.about.roadmap.phase12;
    delete m.about.roadmap.phaseLabel;
    m.about.roadmap.body = ABOUT_ROADMAP_BODY[locale];
  }
  // 4e
  if (m.regions && m.regions.pcc) m.regions.pcc.poeticGloss = PCC_POETIC[locale];

  fs.writeFileSync(fp, JSON.stringify(m, null, 2) + "\n", "utf8");
  console.log(`[wrote] ${locale}.json`);
}
