/**
 * Hippocampus (left) — Simplified Chinese translation.
 * Tier-1 machine-assisted; awaiting native review.
 */

import type { AtlasTranslation } from "../types";

export const hippLeftAtlasZhCn: AtlasTranslation = {
  fullName: "海马(左)",
  disorders: {
    alzheimers: {
      name: "阿尔茨海默病",
      oneLine:
        "神经原纤维缠结最早出现的皮层区之一;体积丧失与记忆损害相关。",
    },
    ptsd: {
      name: "创伤后应激障碍",
      oneLine:
        "PTSD 中一致地观察到海马体积减少;因果方向仍有争议。",
    },
    amnesia: {
      name: "顺行性遗忘症(内侧颞型)",
      oneLine:
        "双侧海马损伤产生形成新陈述性记忆能力丧失这一标准状态。",
    },
    "temporal-lobe-epilepsy": {
      name: "颞叶癫痫",
      oneLine:
        "海马是成年人局灶性癫痫中最常见的发作焦点;海马硬化是一种常见的组织病理学发现。",
    },
  },
  anatomyAndLandmarks: {
    paragraphs: [
      "海马是塞入内侧颞叶的弯曲结构,因像海马(seahorse)而得名。在冠状切面中,它显示出赋予该区精确细分的层状架构 ── 齿状回、阿蒙角(CA1、CA2、CA3、CA4)与下托 ── 环绕一层密集的锥体神经元 [cite:amaral-lavenex-2007-hippocampus-anatomy]。",
      "左海马位于海马旁回之下,脑干外侧,侧脑室颞角内侧。其主要传出束 ── 穹隆 ── 向前弓行至乳头体与前丘脑。输入经穿通通路从内嗅皮层到来。",
    ],
  },
  functionSection: {
    paragraphs: [
      "海马中心地参与编码新的情景记忆 ── 事件发生时的自传记录 ── 并把那些事件与其发生的地点、时间与情境相绑定 [cite:squire-1992-medial-temporal-lobe]。此处的损伤产生显著分离:损伤前获得的技能与习惯仍可用,新的运动技能仍可学,但对最近个人事件的审慎、场景丰富的回忆变得不可能 [cite:scoville-milner-1957-hm]。",
      "在记忆之外,同样的回路支撑空间认知。在啮齿动物中的单细胞记录揭示,每当动物占据其环境中的特定位置时即放电的神经元 ── 「位置细胞」── 而人类影像研究确认在认知地图的构造中有一项同源角色 [cite:okeefe-dostrovsky-1971-place-cells]。著名的伦敦出租车司机研究发现,后部海马体积随穿行该市不规则街道的年数而增加,提示成人脑中存在使用依赖性的结构变化 [cite:maguire-2000-taxi-drivers]。",
      "近期工作把海马重新框定为不是被动的储存,而是构造性的发动机:提取过去场景的同一回路,在人想象一个可能的未来场景或一个反事实的过去时被调用 [cite:schacter-addis-2007-constructive-episodic]。记忆与想象共享机器,这是为何记忆不是稳定的录音的部分原因 ── 每次提取都对痕迹稍作改写。",
      "海马内的半球不对称真实但不应被夸大。左海马在言语性情景材料上更一致地被调用;右海马在空间与场景性记忆上更一致地被调用。日常多数回忆都有两者的贡献。",
    ],
  },
  cellTypesSection: {
    paragraphs: [
      "海马计算围绕三类主要的兴奋性细胞类别组织。齿状回颗粒细胞从内嗅皮层接收输入并投射至 CA3;CA3 锥体神经元的循环侧支是自联想性回忆的教科书基础;CA1 锥体神经元接收 CA3 输出(谢弗侧支)与直接的内嗅输入,并构成海马结构的主要输出 [cite:amaral-lavenex-2007-hippocampus-anatomy]。",
      "细胞视图中,可见来自开放档案 ── 包括 NeuroMorpho.org 收藏 ── 的 CA1 与 CA3 锥体神经元与齿状颗粒细胞的重建形态。下行到细胞层,可见此处呈现的群体层信号背后的树突几何。",
    ],
  },
  connectionsSection: {
    paragraphs: [
      "海马通过少数被良好描述的白质束与脑的其余部分通信。穿通通路把来自内嗅皮层第 II 层的信息送入齿状回与 CA 场 ── 主要的皮层输入。穹隆是主导的输出,投射至乳头体、前丘脑与隔核,并经它们至广泛的皮层靶 [cite:amaral-lavenex-2007-hippocampus-anatomy]。",
      "在功能上,海马在记忆提取与未来想象期间参与默认模式网络,与后扣带皮层与角回的耦合尤为显著 [cite:buckner-2008-default-network]。在编码期间,来自杏仁核的显著输入增强固化,这是为何情感加权事件比中性事件被更鲜明记住的机制之一。",
    ],
  },
  clinicalContext: {
    paragraphs: [
      "据某些说法,阿尔茨海默病在此起始。神经原纤维缠结与突触丧失在临床诊断的前若干年出现在内嗅皮层与海马,海马萎缩是早期疾病最可靠的结构生物标志物之一 [cite:small-2011-hippocampal-circuit-disorders]。早期的记忆主诉 ── 忘了最近的对话、新认识者的名字 ── 比后来的、更全局的症状更紧密地追踪区域性病变。",
      "在创伤后应激障碍中,海马体积减少在许多影像研究中有报道,但因果方向仍有争议:较小的海马可能是先存的风险因素、慢性应激的后果,或两者兼有。此处文献确实未定论,审慎的解读是:该关联稳健但尚未是机制。",
      "颞叶癫痫常以海马为发作焦点,海马硬化是常见的组织学发现。颞叶发作的现象学 ── 既视感、强烈未被诱发的情感、场景片段 ── 反映所涉结构。",
    ],
  },
  historyOfDiscovery: {
    paragraphs: [
      "海马功能的现代理解从一位病人开始:亨利·莫莱森(直至 2008 年去世前,文献中仅以 H.M. 为名),1953 年为控制难治性癫痫接受了双侧内侧颞叶切除术。手术使他留下了深远而稳定的顺行性遗忘症,威廉·比彻·斯科维尔与布伦达·米尔纳在 1957 年作了描述 [cite:scoville-milner-1957-hm]。",
      "他被保留的智力、完好的短期记忆,以及学习新运动技能的能力,使把海马视作通用记忆储存变得不可能,迫使该领域发展出我们至今仍工作于其中的「多系统记忆观」[cite:squire-1992-medial-temporal-lobe]。约翰·奥基夫 1971 年在啮齿动物海马中对位置细胞的发现,加入了完成现代图像的空间维度 [cite:okeefe-dostrovsky-1971-place-cells]。",
    ],
  },
};
