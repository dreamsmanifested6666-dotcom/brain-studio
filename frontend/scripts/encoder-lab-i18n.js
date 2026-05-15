#!/usr/bin/env node
/**
 * Add `encoder.*` i18n namespace for the Encoder Lab page across
 * all 6 locales.
 *
 * Run from frontend/: node scripts/encoder-lab-i18n.js
 */

const fs = require("node:fs");
const path = require("node:path");
const MESSAGES_DIR = path.join(__dirname, "..", "messages");

const ENCODER = {
  en: {
    label: "Encoder Lab",
    title: "Watch a clip, see what the average brain does.",
    intro: "Four short Creative Commons clips, four different cortical systems. Pick one. The brain above re-renders as the video plays — interpolating between editorial keyframes that compose Neurosynth meta-analyses for the moment-by-moment stimulus.",
    modeledOn: "Built in the spirit of Meta's TRIBE v2 demo at aidemos.atmeta.com/tribev2, with two honesty differences: every prediction here is precomputed (not live TRIBE inference), and every clip carries its own provenance + license + Neurosynth term composition. When the author runs the Colab notebook with their HuggingFace facebook/tribev2 access, real TRIBE predictions drop in at the same JSON path — the page renders them without code change.",
    galleryLabel: "Clips",
    provenanceTribe: "TRIBE v2 precomputed (Colab)",
    provenanceNeurosynth: "Neurosynth meta-analysis (preview)",
    clipLabel: "Clip",
    methodologyLabel: "Method",
    keyframeLabel: "Keyframe composition",
    emptyState: "No activation data available yet — generate via build_video_activations_preview.py or the Colab TRIBE notebook.",
    disclaimerLabel: "What this is not",
    disclaimerBody: "Not a measurement of your brain. Not even a measurement of any specific brain. What you're seeing is the activation pattern peer-reviewed fMRI literature aggregates for the term composition above, projected onto a standard cortical surface. The model is not the mind. The aggregate is not the person.",
    videos: {
      water_lily: {
        title: "Water lily opening",
        region: "Scene · perception · reward",
        framing: "A timelapse close-up of a flower opening. Sustained visual perception builds across the clip; subtle reward weighting follows as the bloom completes — the editorial composition tracks the viewer, not the flower."
      },
      piano_grieg: {
        title: "Piano · In the Hall of the Mountain King",
        region: "Music · auditory · motor",
        framing: "Solo piano performance. Auditory cortex tracks pitch and rhythm; the hands visible at the keys engage motor mirror activity; the slow build adds an emotional and reward weighting as the passage intensifies."
      },
      waterfall: {
        title: "Svartifoss · long-exposure timelapse",
        region: "Motion · scene · default mode",
        framing: "A long-exposure timelapse of a waterfall against Icelandic basalt. The smoothed flow weights default-mode and scene-perception over discrete-event terms — what you stare at when a landscape stops being a list of objects."
      },
      davos_speech: {
        title: "Speaker at a podium · Mario Molina at Davos",
        region: "Face · language · mentalizing",
        framing: "A person speaking on camera. Face perception (FFA), speech and language regions, and mentalizing networks all engage — the editorial weighting tracks listener cognition more than the speaker's articulation."
      }
    }
  },
  es: {
    label: "Laboratorio del Encoder",
    title: "Mira un clip, observa lo que hace el cerebro promedio.",
    intro: "Cuatro clips cortos con licencia Creative Commons, cuatro sistemas corticales distintos. Elige uno. El cerebro de arriba se re-renderiza mientras el vídeo se reproduce — interpolando entre fotogramas clave editoriales que componen metaanálisis de Neurosynth para el estímulo momento a momento.",
    modeledOn: "Construido en el espíritu del demo TRIBE v2 de Meta en aidemos.atmeta.com/tribev2, con dos diferencias de honestidad: aquí cada predicción está precalculada (no es inferencia TRIBE en vivo), y cada clip lleva su propia procedencia, licencia y composición de términos de Neurosynth. Cuando el autor ejecute el notebook de Colab con su acceso a facebook/tribev2 en HuggingFace, las predicciones reales de TRIBE caerán en la misma ruta JSON — la página las renderiza sin cambios de código.",
    galleryLabel: "Clips",
    provenanceTribe: "TRIBE v2 precalculado (Colab)",
    provenanceNeurosynth: "Metaanálisis Neurosynth (vista previa)",
    clipLabel: "Clip",
    methodologyLabel: "Método",
    keyframeLabel: "Composición de fotogramas clave",
    emptyState: "Aún no hay datos de activación — genéralos con build_video_activations_preview.py o el notebook de Colab de TRIBE.",
    disclaimerLabel: "Lo que esto no es",
    disclaimerBody: "No es una medida de tu cerebro. Tampoco una medida de ningún cerebro específico. Lo que ves es el patrón de activación que la literatura fMRI revisada por pares agrega para la composición de términos de arriba, proyectado sobre una superficie cortical estándar. El modelo no es la mente. El agregado no es la persona.",
    videos: {
      water_lily: { title: "Nenúfar abriéndose", region: "Escena · percepción · recompensa", framing: "Un primer plano en timelapse de una flor abriéndose. La percepción visual sostenida se acumula a lo largo del clip; un sutil peso de recompensa sigue conforme la flor culmina — la composición editorial sigue al espectador, no a la flor." },
      piano_grieg: { title: "Piano · En la Cueva del Rey de la Montaña", region: "Música · auditivo · motor", framing: "Interpretación de piano solo. La corteza auditiva sigue el tono y el ritmo; las manos visibles en las teclas comprometen la actividad motora en espejo; la lenta construcción añade un peso emocional y de recompensa a medida que el pasaje se intensifica." },
      waterfall: { title: "Svartifoss · timelapse de exposición larga", region: "Movimiento · escena · red por defecto", framing: "Un timelapse de exposición larga de una cascada contra basalto islandés. El flujo suavizado pondera la red por defecto y la percepción de escenas sobre términos de eventos discretos — lo que miras cuando un paisaje deja de ser una lista de objetos." },
      davos_speech: { title: "Orador en un atril · Mario Molina en Davos", region: "Rostro · lenguaje · mentalización", framing: "Una persona hablando a la cámara. La percepción facial (FFA), las regiones del habla y el lenguaje, y las redes de mentalización se activan — la composición editorial sigue la cognición del oyente más que la articulación del hablante." }
    }
  },
  ca: {
    label: "Laboratori de l'Encoder",
    title: "Mira un clip, observa què fa el cervell mitjà.",
    intro: "Quatre clips curts amb llicència Creative Commons, quatre sistemes corticals diferents. Tria'n un. El cervell de dalt es re-renderitza mentre el vídeo es reprodueix — interpolant entre fotogrames clau editorials que componen metaanàlisis de Neurosynth per a l'estímul moment a moment.",
    modeledOn: "Construït amb l'esperit del demo TRIBE v2 de Meta a aidemos.atmeta.com/tribev2, amb dues diferències d'honestedat: aquí cada predicció està precalculada (no és inferència TRIBE en directe), i cada clip duu la seva pròpia procedència, llicència i composició de termes de Neurosynth. Quan l'autor executi el notebook de Colab amb el seu accés a facebook/tribev2 a HuggingFace, les prediccions reals de TRIBE cauran a la mateixa ruta JSON — la pàgina les renderitza sense canvis de codi.",
    galleryLabel: "Clips",
    provenanceTribe: "TRIBE v2 precalculat (Colab)",
    provenanceNeurosynth: "Metaanàlisi Neurosynth (vista prèvia)",
    clipLabel: "Clip",
    methodologyLabel: "Mètode",
    keyframeLabel: "Composició de fotogrames clau",
    emptyState: "Encara no hi ha dades d'activació — genera-les amb build_video_activations_preview.py o el notebook de Colab de TRIBE.",
    disclaimerLabel: "El que això no és",
    disclaimerBody: "No és una mesura del teu cervell. Tampoc una mesura de cap cervell específic. El que veus és el patró d'activació que la literatura fMRI revisada per parells agrega per a la composició de termes de dalt, projectat sobre una superfície cortical estàndard. El model no és la ment. L'agregat no és la persona.",
    videos: {
      water_lily: { title: "Nenúfar obrint-se", region: "Escena · percepció · recompensa", framing: "Un primer pla en timelapse d'una flor obrint-se. La percepció visual sostinguda s'acumula al llarg del clip; un subtil pes de recompensa segueix mentre la flor culmina — la composició editorial segueix l'espectador, no la flor." },
      piano_grieg: { title: "Piano · A la cova del rei de la muntanya", region: "Música · auditiu · motor", framing: "Interpretació de piano sol. L'escorça auditiva segueix el to i el ritme; les mans visibles a les tecles comprometen l'activitat motora mirall; la lenta construcció afegeix un pes emocional i de recompensa a mesura que el passatge s'intensifica." },
      waterfall: { title: "Svartifoss · timelapse d'exposició llarga", region: "Moviment · escena · xarxa per defecte", framing: "Un timelapse d'exposició llarga d'una cascada contra basalt islandès. El flux suavitzat pondera la xarxa per defecte i la percepció d'escenes sobre termes d'esdeveniments discrets — el que mires quan un paisatge deixa de ser una llista d'objectes." },
      davos_speech: { title: "Orador en un faristol · Mario Molina a Davos", region: "Rostre · llenguatge · mentalització", framing: "Una persona parlant a la càmera. La percepció facial (FFA), les regions de la parla i el llenguatge, i les xarxes de mentalització s'activen — la composició editorial segueix la cognició de l'oient més que l'articulació del parlant." }
    }
  },
  th: {
    label: "ห้องปฏิบัติการตัวเข้ารหัส",
    title: "ดูคลิป แล้วดูว่าสมองโดยเฉลี่ยทำอะไร",
    intro: "คลิปสั้น ๆ ภายใต้สัญญาอนุญาต Creative Commons สี่คลิป สี่ระบบเปลือกสมองที่ต่างกัน เลือกหนึ่ง สมองด้านบนจะถูกวาดใหม่ขณะที่วิดีโอเล่น — ทำการประมาณค่าระหว่างคีย์เฟรมเชิงบรรณาธิการที่ประกอบด้วยการวิเคราะห์อภิมานของ Neurosynth สำหรับสิ่งกระตุ้นในแต่ละช่วงเวลา",
    modeledOn: "สร้างขึ้นในจิตวิญญาณของเดโม TRIBE v2 ของ Meta ที่ aidemos.atmeta.com/tribev2 โดยมีสองข้อแตกต่างเชิงซื่อสัตย์: คำทำนายทุกอันที่นี่ถูกคำนวณไว้ล่วงหน้า (ไม่ใช่การอนุมาน TRIBE สด) และทุกคลิปแนบที่มาของตัวเอง สัญญาอนุญาต และส่วนผสมเทอม Neurosynth เมื่อผู้เขียนรันโน้ตบุ๊ก Colab ด้วยสิทธิ์เข้าถึง facebook/tribev2 บน HuggingFace คำทำนายจริงของ TRIBE จะถูกวางลงที่เส้นทาง JSON เดียวกัน — หน้าเว็บจะเรนเดอร์โดยไม่ต้องแก้ไขโค้ด",
    galleryLabel: "คลิป",
    provenanceTribe: "TRIBE v2 คำนวณล่วงหน้า (Colab)",
    provenanceNeurosynth: "การวิเคราะห์อภิมาน Neurosynth (ตัวอย่าง)",
    clipLabel: "คลิป",
    methodologyLabel: "วิธีการ",
    keyframeLabel: "ส่วนผสมคีย์เฟรม",
    emptyState: "ยังไม่มีข้อมูลการกระตุ้น — สร้างด้วย build_video_activations_preview.py หรือโน้ตบุ๊ก Colab TRIBE",
    disclaimerLabel: "สิ่งที่นี่ไม่ใช่",
    disclaimerBody: "ไม่ใช่การวัดสมองของคุณ ไม่ใช่การวัดสมองของผู้ใดผู้หนึ่งโดยเฉพาะ สิ่งที่คุณเห็นคือรูปแบบการกระตุ้นที่งานวิจัย fMRI ที่ผ่านการตรวจสอบโดยผู้ทรงคุณวุฒิรวบรวมไว้สำหรับส่วนผสมเทอมข้างต้น ฉายลงบนพื้นผิวเปลือกสมองมาตรฐาน แบบจำลองไม่ใช่จิต ผลรวมเฉลี่ยไม่ใช่บุคคล",
    videos: {
      water_lily: { title: "ดอกบัวกำลังบาน", region: "ทิวทัศน์ · การรับรู้ · รางวัล", framing: "ภาพไทม์แลปส์ระยะใกล้ของดอกไม้ที่กำลังบาน การรับรู้ทางการมองเห็นที่ต่อเนื่องสะสมขึ้นตลอดคลิป น้ำหนักของรางวัลแบบละมุนตามมาเมื่อดอกบานเต็มที่ — ส่วนผสมเชิงบรรณาธิการติดตามผู้ชม ไม่ใช่ดอกไม้" },
      piano_grieg: { title: "เปียโน · ในถ้ำแห่งราชาภูเขา", region: "ดนตรี · การได้ยิน · การเคลื่อนไหว", framing: "การแสดงเปียโนเดี่ยว คอร์เทกซ์การได้ยินติดตามระดับเสียงและจังหวะ มือที่เห็นบนคีย์ดึงเอากิจกรรมการเคลื่อนไหวแบบกระจกออกมา การก่อตัวอย่างช้า ๆ เพิ่มน้ำหนักทางอารมณ์และรางวัลเมื่อท่อนเพลงเข้มข้นขึ้น" },
      waterfall: { title: "Svartifoss · ไทม์แลปส์เปิดรับแสงนาน", region: "การเคลื่อนไหว · ทิวทัศน์ · โหมดเริ่มต้น", framing: "ไทม์แลปส์เปิดรับแสงนานของน้ำตกบนหินบะซอลต์ไอซ์แลนด์ การไหลที่ราบเรียบให้น้ำหนักโหมดเริ่มต้นและการรับรู้ทิวทัศน์มากกว่าเทอมเหตุการณ์แบบไม่ต่อเนื่อง — สิ่งที่คุณเพ่งมองเมื่อภูมิทัศน์หยุดเป็นเพียงรายการของวัตถุ" },
      davos_speech: { title: "ผู้พูดที่โพเดียม · มาริโอ โมลินา ที่ดาวอส", region: "ใบหน้า · ภาษา · การคาดเดาความคิด", framing: "บุคคลพูดต่อหน้ากล้อง การรับรู้ใบหน้า (FFA) บริเวณภาษาและการพูด และเครือข่ายการคาดเดาความคิดล้วนถูกกระตุ้น — ส่วนผสมเชิงบรรณาธิการติดตามการรับรู้ของผู้ฟังมากกว่าการเปล่งเสียงของผู้พูด" }
    }
  },
  ja: {
    label: "エンコーダ・ラボ",
    title: "クリップを見て、平均的な脳が何をするかを見る。",
    intro: "Creative Commons ライセンスの短いクリップ四本、四つの異なる皮質システム。一本選ぶと、上の脳が動画再生に合わせて再レンダリングされる — 各瞬間の刺激について Neurosynth のメタアナリシスを構成する編集的キーフレーム間を補間する。",
    modeledOn: "Meta の TRIBE v2 デモ aidemos.atmeta.com/tribev2 の精神に倣って構築。誠実さで二つの差異: ここでの予測はすべて事前計算されたもの (ライブ TRIBE 推論ではない)。各クリップに出典、ライセンス、Neurosynth 用語構成を付している。著者が HuggingFace の facebook/tribev2 アクセスで Colab ノートブックを実行すると、実 TRIBE 予測が同じ JSON パスへ落ち、ページはコード変更なしでそれをレンダリングする。",
    galleryLabel: "クリップ",
    provenanceTribe: "TRIBE v2 事前計算 (Colab)",
    provenanceNeurosynth: "Neurosynth メタアナリシス (プレビュー)",
    clipLabel: "クリップ",
    methodologyLabel: "方法",
    keyframeLabel: "キーフレーム構成",
    emptyState: "活性化データがまだない — build_video_activations_preview.py または Colab TRIBE ノートブックで生成。",
    disclaimerLabel: "これは何ではないか",
    disclaimerBody: "あなたの脳の測定ではない。特定の誰かの脳の測定でもない。あなたが見ているのは、査読済み fMRI 研究が上記の用語構成について集計した活性化パターンを標準皮質表面に投影したものだ。モデルは心ではない。集計は個人ではない。",
    videos: {
      water_lily: { title: "睡蓮の開花", region: "シーン · 知覚 · 報酬", framing: "花が開く接写のタイムラプス。視覚的知覚はクリップを通じて積み上がり、開花の頂点でかすかな報酬の重みが続く — 編集的構成は花ではなく観る者を追っている。" },
      piano_grieg: { title: "ピアノ · 山の魔王の宮殿にて", region: "音楽 · 聴覚 · 運動", framing: "独奏ピアノ。聴覚野は音高とリズムを追い、鍵盤上に見える手は運動ミラー活動を引き出し、ゆっくりした高まりが楽節の強度に応じて感情と報酬の重みを加える。" },
      waterfall: { title: "スヴァルティフォス · 長時間露光タイムラプス", region: "運動 · シーン · デフォルトモード", framing: "アイスランドの玄武岩を背にした滝の長時間露光タイムラプス。なめらかな流れはデフォルトモードとシーン知覚を、離散事象的な用語より重く扱う — 風景が対象物のリストでなくなる瞬間にあなたが見入るもの。" },
      davos_speech: { title: "演壇の話者 · ダボスのマリオ・モリーナ", region: "顔 · 言語 · 心の理論", framing: "カメラに向かって話す人物。顔知覚 (FFA)、言葉と言語の領域、心の理論ネットワークがいずれも関与する — 編集的構成は話者の発音より聞き手の認知を追っている。" }
    }
  },
  "zh-CN": {
    label: "编码器实验室",
    title: "看一段视频，看看平均脑在做什么。",
    intro: "四段 Creative Commons 许可的短片，四种不同的皮层系统。挑一个。上方的脑会随视频播放重新渲染 —— 在编辑性的关键帧之间内插，每个关键帧由该瞬间刺激对应的 Neurosynth 元分析合成而来。",
    modeledOn: "在 Meta 的 TRIBE v2 演示页 aidemos.atmeta.com/tribev2 的精神下构建，但有两点诚实差异：此处所有预测都是预先计算的（不是实时 TRIBE 推理），并且每段视频都带有自己的来源、许可与 Neurosynth 词项组合。作者使用 HuggingFace 上的 facebook/tribev2 访问权限运行 Colab 笔记本时，真实的 TRIBE 预测会落到相同的 JSON 路径 —— 页面会在不改代码的情况下渲染它们。",
    galleryLabel: "片段",
    provenanceTribe: "TRIBE v2 预计算（Colab）",
    provenanceNeurosynth: "Neurosynth 元分析（预览）",
    clipLabel: "片段",
    methodologyLabel: "方法",
    keyframeLabel: "关键帧组合",
    emptyState: "尚无激活数据 —— 通过 build_video_activations_preview.py 或 Colab TRIBE 笔记本生成。",
    disclaimerLabel: "这不是什么",
    disclaimerBody: "这不是对你的脑的测量。也不是对任何特定脑的测量。你看到的是经过同行评审的 fMRI 文献对上述词项组合的聚合激活模式，投射在一个标准皮层表面上。模型不是心智。聚合不是个人。",
    videos: {
      water_lily: { title: "睡莲绽放", region: "场景 · 感知 · 奖赏", framing: "一朵花绽放的近距离延时摄影。持续的视觉感知贯穿整个片段；当花开尽时，一缕奖赏的权重随之而至 —— 编辑性的组合追随的是观看者，而不是花。" },
      piano_grieg: { title: "钢琴 · 在山妖王的洞穴中", region: "音乐 · 听觉 · 运动", framing: "独奏钢琴。听觉皮层追踪音高与节奏；可见于琴键上的双手牵动运动镜像活动；缓慢的累积，随乐段强度的提升，在情感与奖赏上加权。" },
      waterfall: { title: "斯瓦尔蒂瀑布 · 长曝光延时", region: "运动 · 场景 · 默认模式", framing: "在冰岛玄武岩前的瀑布长曝光延时。平滑的流动让默认模式与场景知觉超过离散事件词项 —— 当一片风景不再是物体的清单时，你凝望的那一切。" },
      davos_speech: { title: "讲台上的演讲者 · 达沃斯的马里奥·莫利纳", region: "面孔 · 语言 · 心智化", framing: "一个对着镜头说话的人。面孔知觉（FFA）、语言与言语区域、以及心智化网络都参与其中 —— 编辑性的组合追随的是听者的认知，而不是说话者的发音。" }
    }
  }
};

for (const locale of ["en", "es", "ca", "th", "ja", "zh-CN"]) {
  const fp = path.join(MESSAGES_DIR, `${locale}.json`);
  const m = JSON.parse(fs.readFileSync(fp, "utf8"));
  m.encoder = ENCODER[locale];
  // Also add the home rooms encoder card so generateRoomMetadata can find a fallback.
  if (m.home && m.home.rooms) {
    m.home.rooms.encoder = {
      title:
        locale === "en"
          ? "Encoder Lab"
          : locale === "es"
            ? "Laboratorio del Encoder"
            : locale === "ca"
              ? "Laboratori de l'Encoder"
              : locale === "th"
                ? "ห้องปฏิบัติการตัวเข้ารหัส"
                : locale === "ja"
                  ? "エンコーダ・ラボ"
                  : "编码器实验室",
      description: ENCODER[locale].title,
    };
  }
  fs.writeFileSync(fp, JSON.stringify(m, null, 2) + "\n", "utf8");
  console.log(`[wrote] ${locale}.json`);
}
