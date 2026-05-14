#!/usr/bin/env node
/**
 * PR 3 — Homepage rebuild i18n. Add Instrument + Long Form sections
 * and rewrite the rooms intro across all 6 locale bundles.
 *
 * New i18n keys:
 *   home.rooms.body                       (rewrite — names 4 + 2 + 2)
 *   home.rooms.{atlas,bridges,tours,depthPsychology,fieldNotes}.{title,description}
 *   home.instrument.{section,heading,body}
 *   home.longform.{section,heading,body}
 *
 * The five new RoomCards point at /atlas, /bridges, /tours,
 * /depth-psychology, /field-notes. They consume signaturePatterns
 * that PR 3 just added to lib/regions.ts.
 *
 * Run from frontend/: node scripts/pr3-home-sections.js
 */

const fs = require("node:fs");
const path = require("node:path");
const MESSAGES_DIR = path.join(__dirname, "..", "messages");

// Rewrite of home.rooms.body to name the three-layer architecture
// (4 encoder + 2 depth-psychology + 2 literary). The previous copy
// said "six instruments and two literary installations" which only
// landed because Faust + Dante had just shipped; with Threshold +
// Archetypes accounted for it's the more honest split.
const ROOMS_BODY = {
  en: "Four encoder rooms put the model to work, two depth-psychology rooms drop into older language, two literary rooms read Goethe and Dante alongside the same circuits. Hover a doorway to see the pattern. Step inside when you're ready.",
  es: "Cuatro salas codificadoras ponen el modelo a trabajar, dos salas de psicología profunda descienden a un lenguaje más antiguo, dos salas literarias leen a Goethe y a Dante junto a los mismos circuitos. Pasa el cursor por una puerta para ver el patrón. Entra cuando estés listo.",
  ca: "Quatre sales codificadores posen el model a treballar, dues sales de psicologia profunda baixen a un llenguatge més antic, dues sales literàries llegeixen Goethe i Dante al costat dels mateixos circuits. Passa el cursor per una porta per veure el patró. Entra quan estiguis preparat.",
  th: "ห้องเข้ารหัสสี่ห้องทำให้แบบจำลองได้ทำงาน ห้องจิตวิทยาเชิงลึกสองห้องดิ่งลงไปสู่ภาษาที่เก่ากว่า ห้องวรรณกรรมสองห้องอ่านเกอเทอและดันเตเคียงข้างวงจรเดียวกัน ลองวางเคอร์เซอร์บนประตูเพื่อดูรูปแบบ แล้วเข้าไปเมื่อพร้อม",
  ja: "四つのエンコーダ部屋はモデルを働かせ、二つの深層心理学の部屋はより古い言語へと降下し、二つの文学の部屋はゲーテとダンテを同じ回路の傍らで読む。扉の上にカーソルを置けばパターンが見える。準備ができたら中へ。",
  "zh-CN": "四间编码房间让模型动起来，两间深度心理学房间下沉到更古老的语言，两间文学房间在同一组回路旁阅读歌德与但丁。把指针停在某扇门上就能看见图样，准备好了便走进去。",
};

// 5 new room cards under Instrument + Long Form sections.
const NEW_CARDS = {
  en: {
    atlas: {
      title: "Region Atlas",
      description:
        "Twenty regions, each with anatomy, function, and which rooms call on them.",
    },
    bridges: {
      title: "Bridges",
      description:
        "How the regions cooperate — eleven canonical patterns under named themes.",
    },
    tours: {
      title: "Six Tours",
      description:
        "Eight to fifteen minutes each. Sentence by sentence with the brain reacting alongside.",
    },
    depthPsychology: {
      title: "Depth Psychology",
      description:
        "Three readings of Jung in conversation with neuroscience: Aion, the Red Book, gestalt closure.",
    },
    fieldNotes: {
      title: "Field Notes",
      description:
        "Short pieces from the seams between disciplines — hippocampus, time, what the brain knows.",
    },
  },
  es: {
    atlas: {
      title: "Atlas de Regiones",
      description:
        "Veinte regiones, cada una con anatomía, función y qué salas las invocan.",
    },
    bridges: {
      title: "Puentes",
      description:
        "Cómo cooperan las regiones — once patrones canónicos bajo temas con nombre.",
    },
    tours: {
      title: "Seis Recorridos",
      description:
        "Ocho a quince minutos cada uno. Frase a frase con el cerebro reaccionando al lado.",
    },
    depthPsychology: {
      title: "Psicología Profunda",
      description:
        "Tres lecturas de Jung en conversación con la neurociencia: Aion, el Libro Rojo, el cierre gestáltico.",
    },
    fieldNotes: {
      title: "Notas de Campo",
      description:
        "Piezas breves desde las costuras entre disciplinas — hipocampo, tiempo, lo que el cerebro sabe.",
    },
  },
  ca: {
    atlas: {
      title: "Atles de Regions",
      description:
        "Vint regions, cadascuna amb anatomia, funció i quines sales les invoquen.",
    },
    bridges: {
      title: "Ponts",
      description:
        "Com cooperen les regions — onze patrons canònics sota temes amb nom.",
    },
    tours: {
      title: "Sis Recorreguts",
      description:
        "Vuit a quinze minuts cadascun. Frase a frase amb el cervell reaccionant al costat.",
    },
    depthPsychology: {
      title: "Psicologia Profunda",
      description:
        "Tres lectures de Jung en conversa amb la neurociència: Aion, el Llibre Vermell, el tancament gestàltic.",
    },
    fieldNotes: {
      title: "Notes de Camp",
      description:
        "Peces breus des de les costures entre disciplines — hipocamp, temps, allò que el cervell sap.",
    },
  },
  th: {
    atlas: {
      title: "แผนที่บริเวณสมอง",
      description:
        "ยี่สิบบริเวณ แต่ละบริเวณมีกายวิภาค หน้าที่ และห้องใดบ้างที่ใช้งานมัน",
    },
    bridges: {
      title: "สะพานเชื่อม",
      description: "บริเวณต่าง ๆ ร่วมมือกันอย่างไร — สิบเอ็ดรูปแบบหลักภายใต้ธีมที่มีชื่อ",
    },
    tours: {
      title: "หกการเดินนำชม",
      description: "ครั้งละแปดถึงสิบห้านาที ทีละประโยคพร้อมสมองที่ตอบสนองเคียงข้าง",
    },
    depthPsychology: {
      title: "จิตวิทยาเชิงลึก",
      description:
        "สามการอ่านของยุงที่สนทนากับประสาทวิทยา: ไอออน หนังสือสีแดง การปิดล้อมแบบเกสตัลท์",
    },
    fieldNotes: {
      title: "บันทึกภาคสนาม",
      description:
        "ชิ้นงานสั้น ๆ จากตะเข็บระหว่างศาสตร์ — ฮิปโปแคมปัส เวลา และสิ่งที่สมองรู้",
    },
  },
  ja: {
    atlas: {
      title: "領域アトラス",
      description:
        "二十の領域それぞれに、解剖、機能、そしてどの部屋がそれを呼び出すかを。",
    },
    bridges: {
      title: "橋",
      description:
        "領域がどのように協働するか — 名づけられたテーマの下の十一の正典的パターン。",
    },
    tours: {
      title: "六つの案内",
      description: "それぞれ八分から十五分。文ごとに、脳がかたわらで反応する。",
    },
    depthPsychology: {
      title: "深層心理学",
      description:
        "ユングと神経科学との対話による三つの読み:アイオーン、赤の書、ゲシュタルトの閉合。",
    },
    fieldNotes: {
      title: "野外覚書",
      description: "分野の継ぎ目から書かれた短篇 — 海馬、時間、脳が知っていること。",
    },
  },
  "zh-CN": {
    atlas: {
      title: "脑区图谱",
      description: "二十个脑区，每一个都附有解剖、功能以及哪些房间会调用它。",
    },
    bridges: {
      title: "桥梁",
      description: "脑区如何协作 —— 在命名主题下展开的十一种规范模式。",
    },
    tours: {
      title: "六场导览",
      description: "每场八到十五分钟。一句一句地阅读，大脑在旁实时回应。",
    },
    depthPsychology: {
      title: "深度心理学",
      description: "荣格与神经科学对话的三种读法：《埃永》、《红书》、格式塔闭合。",
    },
    fieldNotes: {
      title: "田野笔记",
      description: "来自学科接缝处的短篇 —— 海马、时间，以及大脑所知。",
    },
  },
};

const INSTRUMENT = {
  en: {
    section: "The Instrument",
    heading: "Underneath the rooms.",
    body: "Twenty regions catalogued one by one, eleven bridges named between them, six guided walks that read short passages with the brain reacting in real time. The source layer for everything above.",
  },
  es: {
    section: "El Instrumento",
    heading: "Debajo de las salas.",
    body: "Veinte regiones catalogadas una por una, once puentes nombrados entre ellas, seis recorridos guiados que leen pasajes breves con el cerebro reaccionando en tiempo real. La capa fuente de todo lo de arriba.",
  },
  ca: {
    section: "L'Instrument",
    heading: "Sota les sales.",
    body: "Vint regions catalogades una a una, onze ponts anomenats entre elles, sis recorreguts guiats que llegeixen passatges breus amb el cervell reaccionant en temps real. La capa font de tot el que hi ha a sobre.",
  },
  th: {
    section: "เครื่องมือ",
    heading: "ใต้ห้องเหล่านี้",
    body: "ยี่สิบบริเวณสมองที่จัดทำรายการทีละบริเวณ สิบเอ็ดสะพานที่ตั้งชื่อระหว่างกัน หกการเดินนำชมที่อ่านข้อความสั้น ๆ พร้อมสมองที่ตอบสนองแบบเรียลไทม์ คือชั้นต้นทางของทุกสิ่งที่อยู่ข้างบน",
  },
  ja: {
    section: "計器",
    heading: "部屋の下にあるもの。",
    body: "二十の領域を一つずつ目録化し、十一の橋を名指しでつなぎ、六つの案内付き歩行が短い一節を読み上げる間、脳はリアルタイムで反応する。上にあるすべての源泉層。",
  },
  "zh-CN": {
    section: "仪器",
    heading: "房间之下。",
    body: "二十个脑区被逐一编目，十一座桥在它们之间命名，六场导览以实时反应的脑读取短文。一切之上的源头层。",
  },
};

const LONGFORM = {
  en: {
    section: "The Long Form",
    heading: "Slow reading.",
    body: "Two ongoing essay series that sit alongside the rooms rather than inside them — where the science gets long enough to argue with itself.",
  },
  es: {
    section: "La Forma Larga",
    heading: "Lectura lenta.",
    body: "Dos series de ensayos en curso que conviven junto a las salas en lugar de dentro de ellas — donde la ciencia se vuelve lo suficientemente larga como para discutir consigo misma.",
  },
  ca: {
    section: "La Forma Llarga",
    heading: "Lectura lenta.",
    body: "Dues sèries d'assaigs en curs que conviuen al costat de les sales en lloc de dins d'elles — on la ciència es torna prou llarga com per discutir amb si mateixa.",
  },
  th: {
    section: "งานเขียนยาว",
    heading: "การอ่านอย่างช้า",
    body: "ชุดเรียงความที่กำลังดำเนินอยู่สองชุดวางอยู่ข้าง ๆ ห้องเหล่านี้ ไม่ได้อยู่ในห้อง — เป็นที่ซึ่งวิทยาศาสตร์ยาวพอจะถกเถียงกับตัวเอง",
  },
  ja: {
    section: "長文",
    heading: "ゆっくり読むこと。",
    body: "進行中の二つのエッセイ連載が、部屋の中ではなく傍らに置かれている — 科学がそれ自身と議論できるほど長くなる場所。",
  },
  "zh-CN": {
    section: "长文",
    heading: "慢读。",
    body: "两个正在进行的随笔系列与房间并置，而非置于房间之内 —— 那是科学长到能够与自身辩论的所在。",
  },
};

for (const locale of ["en", "es", "ca", "th", "ja", "zh-CN"]) {
  const fp = path.join(MESSAGES_DIR, `${locale}.json`);
  const m = JSON.parse(fs.readFileSync(fp, "utf8"));

  if (!m.home) {
    console.warn(`[skip] ${locale}.json missing home namespace`);
    continue;
  }

  // 1. Rewrite home.rooms.body
  m.home.rooms.body = ROOMS_BODY[locale];

  // 2. Add 5 new room cards
  for (const key of [
    "atlas",
    "bridges",
    "tours",
    "depthPsychology",
    "fieldNotes",
  ]) {
    m.home.rooms[key] = NEW_CARDS[locale][key];
  }

  // 3. Add instrument + longform sections
  m.home.instrument = INSTRUMENT[locale];
  m.home.longform = LONGFORM[locale];

  fs.writeFileSync(fp, JSON.stringify(m, null, 2) + "\n", "utf8");
  console.log(`[wrote] ${locale}.json`);
}
