// 这个行业的分类体系：类别、标签词表、公司（主体）名录，以及防止张冠李戴的身份词典。
// 模型按这里的词表打标签，主题页（topics.json）按标签归类，筛选栏按类别分组。
// 换行业时：类别的 key 会出现在网址里（/all?category=…），上线后就不要再改；标签和名录可以随时增减。

/**
 * 网页上的类别（筛选栏、卡片角标、RSS 分类订阅）。key 是网址和接口里的身份，上线后不要改。
 * section 是日报里的分节标题（几个类别可以共用一节，按这里的顺序排）；guide 告诉结构抽取模型这一类收什么、
 * 和相邻类别的边界在哪（总的归类原则写在 prompts/structure.md 里）。
 * 分类体系按战略日报的六大跟踪方向收拢：服务器、PC、上游物料、中间制造、大客户、贸易合规，外加友商与行业。
 * tagColor 是飞书推送卡片里跟在标题后面的这一类小标签的颜色（飞书 text_tag 的颜色名）。
 * feedLabel 是分类 RSS 标题里的名字（不写就用 label）。公开接口、RSS 和 MCP 里要把一类并进另一类发布，写在站点设置里（site/site.ts 的 PUBLIC_CATEGORIES）。
 */
export const CATEGORIES = [
  { key: "server", tagColor: "blue", label: "服务器", feedLabel: "服务器", section: "服务器", guide: "服务器整机与 AI 服务器：新品与平台发布、订单与客户定点、出货与需求变化、机架与液冷方案。云厂商资本开支反映的服务器采购需求也归这里，客户本身的动态归 customers。" },
  { key: "pc", tagColor: "orange", label: "PC", feedLabel: "PC", section: "PC", guide: "PC 整机（含笔记本 NB、台式机 DT 与工作站）：新品、出货量、商用换机、代工订单与产能。行业咨询机构通常只细分到 PC 层级，报告统一取 PC 层级，不再单列 NB/DT。" },
  { key: "components", tagColor: "red", label: "上游物料", feedLabel: "上游物料与硬件", section: "上游物料与硬件", guide: "GPU、CPU、内存（DRAM/HBM）、存储（NAND/SSD/HDD）、主板、电源、散热、面板等关键物料与硬件供应商（英伟达这类硬件提供商）的动态：新品、产能、价格、供需与断供风险。" },
  { key: "manufacturing", tagColor: "green", label: "制造与自动化", feedLabel: "制造与自动化", section: "制造与自动化", guide: "与自身工厂相关的中间制造环节：自动化、工业机器人、AGV/AMR、机器视觉、SMT 与装配产线、MES 等工业软件、灯塔工厂与智能制造实践。自动化、数字化的通用行业信息不收，只收与电子整机制造相关或可迁移的。" },
  { key: "customers", tagColor: "violet", label: "大客户", feedLabel: "大客户动态", section: "大客户动态", guide: "阿里、腾讯、字节等主要客户在服务器方面的动态，以及微软、AWS、谷歌等超大规模客户的服务器采购、数据中心建设、自研芯片与资本开支。厂商自己的产品发布归 server/components。" },
  { key: "trade", tagColor: "purple", label: "贸易与合规", feedLabel: "贸易与合规", section: "贸易与合规", guide: "关税与贸易壁垒、出口管制（如对 H100/H200 类高端 GPU 的限制）、物流与运输影响、国际形势带来的管控因素、补贴与产业政策。按已发生的动作归，纯评论不算。" },
  { key: "industry", tagColor: "gray", label: "友商与行业", feedLabel: "友商与行业", section: "友商与行业", guide: "友商动向：财报、订单、并购合作、人事、新项目及其上游情况对比；行业格局与产能利用率变化。新闻由当事人发帖、带有态度，也不因此变成观点。" },
] as const satisfies ReadonlyArray<{ key: string; tagColor: string; label: string; feedLabel?: string; section: string; guide: string; commentary?: true }>;

/**
 * 这个行业最受关注的一类发布：日报报头的“N 个新工厂”。
 * 现在的定位是战略日报，没有单一类别承担这个口径，设为 null，报头不显示这个数。
 */
export const RELEASE: { category: string; tag: string; unit: string } | null = null;

/** 周报月报的总述可以直接写、不必在报道里找到出处的行业通用词（小写）。站名会自动算进去。 */
export const PLAIN_TERMS: readonly string[] = ["pc", "nb", "dt", "odm", "ems", "smt", "cpu", "gpu", "ssd", "hdd", "dram", "nand", "hbm", "mes", "agv", "amr", "ai", "ceo", "aws", "capex", "pue"];

/**
 * 内容理解一步给每篇资料判的“内容类型”（写在 prompts/content-understanding.md 里，改了类型要同步改那份提示词）。
 * 评分提示词（prompts/selection-score.md）按类型给五个维度不同的权重。
 */
export const ITEM_TYPES = ["product_launch", "market_data", "factory_investment", "policy_change", "supply_shift", "industry_event", "report_analysis"] as const;

// ── 标签词表 ────────────────────────────────────────────────────────────────────────────

/** 每篇资料的第一个标签必须是这些“分类标签”之一。 */
export const CATEGORY_TAGS = [
  "服务器/整机", "PC/整机", "上游物料", "制造/自动化", "大客户", "贸易/合规", "友商/行业", "报告/研究", "其他",
] as const;

/** 可选的主题标签（细分产品与技术主题 + 区域标签）。 */
export const TOPIC_TAGS = [
  "服务器", "AI服务器", "笔记本", "台式机", "工作站", "CPU", "GPU", "内存", "存储", "SSD", "HDD", "HBM", "主板", "电源", "散热", "面板/显示",
  "ODM/EMS", "SMT", "数据中心", "液冷", "自动化", "工业机器人", "AGV/AMR", "机器视觉", "工业软件", "灯塔工厂", "新工厂", "扩产", "关厂",
  "关税", "出口管制", "物流",
  "亚太", "欧洲", "北美", "拉美", "中东非", "中国", "德国", "日本", "韩国", "美国", "印度", "东南亚",
] as const;

/** 可选的实体标签（公司、机构、平台）。 */
export const ENTITY_TAGS = ["Lenovo", "Dell", "HP", "HPE", "Apple", "Asus", "Acer", "Quanta", "Wistron", "Compal", "Pegatron", "Inventec", "Foxconn", "NVIDIA", "AMD", "Intel", "TSMC", "Samsung", "SK Hynix", "Micron", "Seagate", "Western Digital", "Microsoft", "Alibaba", "Tencent", "ByteDance", "Amazon", "Google"] as const;

/** 模型常写的近义词，统一成词表里的写法。 */
export const TAG_SYNONYMS: Readonly<Record<string, string>> = {
  整机: "服务器/整机",
  nb: "PC/整机", dt: "PC/整机", 电脑: "PC/整机",
  零部件: "上游物料", 芯片: "上游物料", 硬盘: "上游物料", 物料: "上游物料",
  机器人: "制造/自动化", 智能制造: "制造/自动化", 产线: "制造/自动化",
  云厂商: "大客户", 互联网大厂: "大客户", 客户: "大客户",
  关税: "贸易/合规", 出口管制: "贸易/合规", 监管: "贸易/合规", 运输: "贸易/合规", 政策: "贸易/合规",
  财报: "友商/行业", 并购: "友商/行业", 收购: "友商/行业", 人事: "友商/行业", 友商: "友商/行业", 竞争对手: "友商/行业", 合作: "友商/行业",
  报告: "报告/研究", 研究: "报告/研究", 白皮书: "报告/研究", 行业: "友商/行业", 动态: "友商/行业",
};

// ── 公司与主体 ──────────────────────────────────────────────────────────────────────────

/**
 * 公司主题：id → 显示名、卡片上显示的标签（null 表示只用 entity:<id> 归类）、别名。
 * aliases 给结构抽取模型看；orgNames 是这家公司发消息时开头用的组织名（公司、实验室、团队），
 * 在它自己的主题页上读者知道说的是谁，可以省去；otherNames 是公司的其他称呼（官方账号名、子品牌）。
 * 所有这些名字都用来认出说的是哪家公司，比如把事实的主体对到发布方。
 */
export const ENTITIES: Record<string, { name: string; displayTag: string | null; aliases: string[]; orgNames?: string[]; otherNames?: string[] }> = {
  lenovo: { name: "Lenovo 联想", displayTag: "Lenovo", aliases: ["Lenovo", "联想", "联想集团", "Lenovo Group"], orgNames: ["Lenovo", "联想", "Lenovo Group"], otherNames: ["联想南方智能基地", "Lenovo South"] },
  dell: { name: "Dell 戴尔", displayTag: "Dell", aliases: ["Dell", "戴尔", "Dell Technologies", "Dell EMC"], orgNames: ["Dell Technologies", "Dell", "戴尔"] },
  hp: { name: "HP 惠普", displayTag: "HP", aliases: ["HP", "惠普", "HP Inc", "Hewlett-Packard"], orgNames: ["HP Inc", "HP", "惠普"] },
  hpe: { name: "HPE 慧与", displayTag: "HPE", aliases: ["HPE", "Hewlett Packard Enterprise", "慧与"], orgNames: ["HPE", "Hewlett Packard Enterprise"] },
  apple: { name: "Apple 苹果", displayTag: "Apple", aliases: ["Apple", "苹果"], orgNames: ["Apple", "苹果"] },
  asus: { name: "Asus 华硕", displayTag: "Asus", aliases: ["Asus", "华硕", "ASUS"], orgNames: ["ASUS", "华硕"] },
  acer: { name: "Acer 宏碁", displayTag: "Acer", aliases: ["Acer", "宏碁"], orgNames: ["Acer", "宏碁"] },
  quanta: { name: "Quanta 广达", displayTag: "Quanta", aliases: ["Quanta", "广达", "广达电脑", "Quanta Computer"], orgNames: ["Quanta Computer", "广达"] },
  wistron: { name: "Wistron 纬创", displayTag: "Wistron", aliases: ["Wistron", "纬创", "纬创资通"], orgNames: ["Wistron", "纬创"] },
  compal: { name: "Compal 仁宝", displayTag: "Compal", aliases: ["Compal", "仁宝", "仁宝电脑"], orgNames: ["Compal Electronics", "仁宝"] },
  pegatron: { name: "Pegatron 和硕", displayTag: "Pegatron", aliases: ["Pegatron", "和硕", "和硕联合科技"], orgNames: ["Pegatron", "和硕"] },
  inventec: { name: "Inventec 英业达", displayTag: "Inventec", aliases: ["Inventec", "英业达"], orgNames: ["Inventec", "英业达"] },
  foxconn: { name: "Foxconn 富士康", displayTag: "Foxconn", aliases: ["Foxconn", "富士康", "鸿海", "鸿海精密", "Hon Hai", "工业富联"], orgNames: ["Foxconn", "富士康", "鸿海精密", "Hon Hai Precision"] },
  nvidia: { name: "NVIDIA 英伟达", displayTag: "NVIDIA", aliases: ["NVIDIA", "Nvidia", "英伟达"], orgNames: ["NVIDIA", "英伟达"] },
  amd: { name: "AMD 超威", displayTag: "AMD", aliases: ["AMD", "超威", "Advanced Micro Devices"], orgNames: ["AMD", "超威"] },
  intel: { name: "Intel 英特尔", displayTag: "Intel", aliases: ["Intel", "英特尔"], orgNames: ["Intel", "英特尔"] },
  tsmc: { name: "TSMC 台积电", displayTag: "TSMC", aliases: ["TSMC", "台积电", "台湾积体电路"], orgNames: ["TSMC", "台积电"] },
  samsung: { name: "Samsung 三星", displayTag: "Samsung", aliases: ["Samsung", "三星", "三星电子"], orgNames: ["Samsung", "三星电子"] },
  skhynix: { name: "SK Hynix 海力士", displayTag: "SK Hynix", aliases: ["SK Hynix", "SK hynix", "海力士", "SK海力士"], orgNames: ["SK Hynix", "SK海力士"] },
  micron: { name: "Micron 美光", displayTag: "Micron", aliases: ["Micron", "美光", "美光科技"], orgNames: ["Micron Technology", "美光"] },
  seagate: { name: "Seagate 希捷", displayTag: "Seagate", aliases: ["Seagate", "希捷"], orgNames: ["Seagate", "希捷"] },
  wdc: { name: "Western Digital 西部数据", displayTag: "Western Digital", aliases: ["Western Digital", "西部数据", "WDC", "SanDisk", "闪迪"], orgNames: ["Western Digital", "SanDisk"] },
  microsoft: { name: "Microsoft 微软", displayTag: "Microsoft", aliases: ["Microsoft", "微软"], orgNames: ["Microsoft", "微软"] },
  alibaba: { name: "Alibaba 阿里巴巴", displayTag: "Alibaba", aliases: ["Alibaba", "阿里巴巴", "阿里", "阿里云", "Alibaba Cloud", "通义"], orgNames: ["Alibaba", "阿里巴巴", "Alibaba Cloud", "阿里云"] },
  tencent: { name: "Tencent 腾讯", displayTag: "Tencent", aliases: ["Tencent", "腾讯", "腾讯云", "Tencent Cloud"], orgNames: ["Tencent", "腾讯", "Tencent Cloud", "腾讯云"] },
  bytedance: { name: "ByteDance 字节跳动", displayTag: "ByteDance", aliases: ["ByteDance", "字节跳动", "字节", "火山引擎", "Volcengine"], orgNames: ["ByteDance", "字节跳动", "火山引擎", "Volcengine"] },
  amazon: { name: "Amazon 亚马逊", displayTag: "Amazon", aliases: ["Amazon", "亚马逊", "AWS", "Amazon Web Services"], orgNames: ["Amazon", "AWS", "Amazon Web Services"] },
  google: { name: "Google 谷歌", displayTag: "Google", aliases: ["Google", "谷歌"], orgNames: ["Google", "谷歌"] },
};

/**
 * 身份词典：摘要和标题里出现的公司，必须在原文里也出现过，否则退回原标题、丢掉摘要（防止模型张冠李戴）。
 * 行业没有这个问题时可以留空数组。
 */
export const IDENTITY_LEXICON: ReadonlyArray<{ id: string; name: string; patterns: RegExp[] }> = [
  { id: "lenovo", name: "Lenovo", patterns: [/lenovo|联想/i] },
  { id: "dell", name: "Dell", patterns: [/dell|戴尔/i] },
  { id: "hp", name: "HP", patterns: [/\bhp\b|惠普|hewlett[- ]packard/i] },
  { id: "hpe", name: "HPE", patterns: [/\bhpe\b|hewlett\s*packard\s*enterprise|慧与/i] },
  { id: "apple", name: "Apple", patterns: [/\bapple\b|苹果/i] },
  { id: "asus", name: "Asus", patterns: [/asus|华硕/i] },
  { id: "acer", name: "Acer", patterns: [/acer|宏碁/i] },
  { id: "quanta", name: "Quanta", patterns: [/quanta|广达/i] },
  { id: "wistron", name: "Wistron", patterns: [/wistron|纬创/i] },
  { id: "compal", name: "Compal", patterns: [/compal|仁宝/i] },
  { id: "pegatron", name: "Pegatron", patterns: [/pegatron|和硕/i] },
  { id: "inventec", name: "Inventec", patterns: [/inventec|英业达/i] },
  { id: "foxconn", name: "Foxconn", patterns: [/foxconn|富士康|鸿海|hon\s*hai|工业富联/i] },
  { id: "nvidia", name: "NVIDIA", patterns: [/nvidia|英伟达/i] },
  { id: "amd", name: "AMD", patterns: [/\bamd\b|超威|advanced\s*micro\s*devices/i] },
  { id: "intel", name: "Intel", patterns: [/\bintel\b|英特尔/i] },
  { id: "tsmc", name: "TSMC", patterns: [/\btsmc\b|台积电/i] },
  { id: "samsung", name: "Samsung", patterns: [/samsung|三星/i] },
  { id: "skhynix", name: "SK Hynix", patterns: [/sk\s*hynix|海力士/i] },
  { id: "micron", name: "Micron", patterns: [/micron|美光/i] },
  { id: "seagate", name: "Seagate", patterns: [/seagate|希捷/i] },
  { id: "wdc", name: "Western Digital", patterns: [/western\s*digital|西部数据|\bwdc\b|sandisk|闪迪/i] },
  { id: "microsoft", name: "Microsoft", patterns: [/microsoft|微软/i] },
  { id: "alibaba", name: "Alibaba", patterns: [/alibaba|阿里巴巴|阿里云/i] },
  { id: "tencent", name: "Tencent", patterns: [/tencent|腾讯/i] },
  { id: "bytedance", name: "ByteDance", patterns: [/bytedance|字节跳动|火山引擎|volcengine/i] },
  { id: "amazon", name: "Amazon", patterns: [/amazon|\baws\b|亚马逊/i] },
  { id: "google", name: "Google", patterns: [/google|谷歌/i] },
];

/** 这些域名上的文章，发布方就是对应的公司（托管平台如 GitHub、arXiv 不算）。 */
export const PUBLISHER_DOMAINS: ReadonlyArray<{ entityId: string; domains: readonly string[] }> = [
  { entityId: "lenovo", domains: ["lenovo.com", "news.lenovo.com"] },
  { entityId: "dell", domains: ["dell.com", "delltechnologies.com"] },
  { entityId: "hp", domains: ["hp.com"] },
  { entityId: "hpe", domains: ["hpe.com"] },
  { entityId: "apple", domains: ["apple.com", "newsroom.apple.com"] },
  { entityId: "asus", domains: ["asus.com"] },
  { entityId: "acer", domains: ["acer.com"] },
  { entityId: "quanta", domains: ["quantatw.com"] },
  { entityId: "wistron", domains: ["wistron.com"] },
  { entityId: "compal", domains: ["compal.com"] },
  { entityId: "pegatron", domains: ["pegatroncorp.com"] },
  { entityId: "inventec", domains: ["inventec.com"] },
  { entityId: "foxconn", domains: ["foxconn.com", "honhai.com"] },
  { entityId: "nvidia", domains: ["nvidia.com", "nvidianews.nvidia.com"] },
  { entityId: "amd", domains: ["amd.com"] },
  { entityId: "intel", domains: ["intel.com", "newsroom.intel.com", "intc.com"] },
  { entityId: "tsmc", domains: ["tsmc.com"] },
  { entityId: "samsung", domains: ["samsung.com"] },
  { entityId: "skhynix", domains: ["skhynix.com"] },
  { entityId: "micron", domains: ["micron.com"] },
  { entityId: "seagate", domains: ["seagate.com"] },
  { entityId: "wdc", domains: ["wdc.com", "sandisk.com"] },
  { entityId: "microsoft", domains: ["microsoft.com", "news.microsoft.com"] },
  { entityId: "alibaba", domains: ["alibabagroup.com", "alibabacloud.com", "aliyun.com"] },
  { entityId: "tencent", domains: ["tencent.com", "cloud.tencent.com"] },
  { entityId: "bytedance", domains: ["bytedance.com", "volcengine.com"] },
  { entityId: "amazon", domains: ["aboutamazon.com", "aws.amazon.com"] },
  { entityId: "google", domains: ["google.com", "blog.google"] },
];

/** 原文里的这些写法也算提到了对应公司。 */
export const IDENTITY_CONTEXT_ALIASES: ReadonlyArray<{ entityId: string; pattern: RegExp }> = [
  { entityId: "foxconn", pattern: /@HonHaiTechGroup\b/i },
  { entityId: "lenovo", pattern: /@Lenovo\b/i },
  { entityId: "nvidia", pattern: /@nvidia\b/i },
];
