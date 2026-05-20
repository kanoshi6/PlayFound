import type { Language } from "@/lib/translations";

export type Genre =
  | "horror"
  | "rpg"
  | "platformer"
  | "survival"
  | "puzzle"
  | "visualNovel"
  | "strategy"
  | "roguelike";

export type Platform = "PC" | "Android" | "Web" | "Linux" | "Mac";
export type Status = "demo" | "development" | "earlyAccess" | "release";
export type PriceType = "free" | "paid";

export type LocalizedText = Record<Language, string>;

export type GameLink = {
  label: "Steam" | "VK Play" | "itch.io" | "RuStore" | "Website";
  url: string;
};

export type Game = {
  id: string;
  title: string;
  slug: string;
  genre: Genre;
  platforms: Platform[];
  status: Status;
  priceType: PriceType;
  shortDescription: LocalizedText;
  description: LocalizedText;
  why: Record<Language, string[]>;
  tags: Record<Language, string[]>;
  rating: number;
  interest: number;
  image: string;
  banner: string;
  screenshots: string[];
  links: GameLink[];
  requirements?: {
    minimum: string;
    recommended: string;
  };
  releasedAt: string;
  featuredWeek?: boolean;
  newDemo?: boolean;
};

export const games: Game[] = [
  {
    id: "g-001",
    title: "Signal From Taiga",
    slug: "signal-from-taiga",
    genre: "horror",
    platforms: ["PC", "Linux"],
    status: "demo",
    priceType: "free",
    shortDescription: {
      ru: "Психологический хоррор о радиостанции в северной тайге, где эфир начинает отвечать.",
      en: "A psychological horror about a northern radio station where the signal starts answering back."
    },
    description: {
      ru: "Вы дежурите на старой радиоточке среди хвойного леса, записываете странные частоты и решаете, какие сообщения стоит передать наружу. Каждое решение меняет ночную смену и отношение местных жителей к станции.",
      en: "You watch over an old radio post in a deep northern forest, record strange frequencies and decide which messages should leave the station. Every choice changes the night shift and the way locals treat the tower."
    },
    why: {
      ru: [
        "Камерная история с тревожным звуковым дизайном.",
        "Нелинейные смены и несколько концовок демо.",
        "Идеально для игроков, которые любят медленный страх вместо скримеров."
      ],
      en: [
        "A focused story with tense sound design.",
        "Non-linear shifts and several demo endings.",
        "Built for players who prefer slow dread over jump scares."
      ]
    },
    tags: {
      ru: ["хоррор", "атмосфера", "выборы", "демо"],
      en: ["horror", "atmospheric", "choices", "demo"]
    },
    rating: 4.8,
    interest: 94,
    image: "linear-gradient(135deg, #07150f, #184f34 45%, #6be68e)",
    banner: "linear-gradient(120deg, #020503, #0e3022 38%, #2b7551 72%, #9bf2ad)",
    screenshots: [
      "linear-gradient(135deg, #0b100d, #253a2e, #62d97d)",
      "linear-gradient(135deg, #06130d, #315441, #87eeb0)",
      "linear-gradient(135deg, #141716, #1c3b2e, #34b563)"
    ],
    links: [
      { label: "Steam", url: "https://store.steampowered.com/" },
      { label: "itch.io", url: "https://itch.io/" },
      { label: "Website", url: "https://example.com/signal-from-taiga" }
    ],
    requirements: {
      minimum: "Windows 10 / Linux, Intel i5, 8 GB RAM, GTX 960",
      recommended: "Windows 11 / Linux, Ryzen 5, 16 GB RAM, GTX 1660"
    },
    releasedAt: "2026-04-20",
    featuredWeek: true,
    newDemo: true
  },
  {
    id: "g-002",
    title: "Mossbound Courier",
    slug: "mossbound-courier",
    genre: "rpg",
    platforms: ["PC", "Mac"],
    status: "development",
    priceType: "paid",
    shortDescription: {
      ru: "Уютная RPG про доставку писем между деревнями, которые спорят с лесными духами.",
      en: "A cozy RPG about carrying letters between villages arguing with forest spirits."
    },
    description: {
      ru: "Станьте курьером в регионе, где новости важнее мечей. Общайтесь, выбирайте маршруты, прокачивайте доверие деревень и решайте, кому верить, когда письма начинают менять судьбы поселений.",
      en: "Become a courier in a region where news matters more than swords. Talk, choose routes, grow village trust and decide who to believe when letters begin changing settlements."
    },
    why: {
      ru: [
        "Мир реагирует на доставленные и потерянные письма.",
        "Никакого гринда: прогресс строится на репутации.",
        "Много коротких историй, которые складываются в большую интригу."
      ],
      en: [
        "The world reacts to delivered and lost letters.",
        "No grind: progression is built around reputation.",
        "Many short stories combine into a larger mystery."
      ]
    },
    tags: {
      ru: ["RPG", "уютная", "диалоги", "исследование"],
      en: ["RPG", "cozy", "dialogue", "exploration"]
    },
    rating: 4.6,
    interest: 87,
    image: "linear-gradient(135deg, #0d1811, #356144 48%, #d3b562)",
    banner: "linear-gradient(120deg, #08100b, #2d563d 44%, #73cc83 74%, #f0c85b)",
    screenshots: [
      "linear-gradient(135deg, #111b12, #41674a, #d9be6f)",
      "linear-gradient(135deg, #132117, #4c8051, #78e5a1)",
      "linear-gradient(135deg, #081009, #31583d, #c9a94e)"
    ],
    links: [
      { label: "Steam", url: "https://store.steampowered.com/" },
      { label: "Website", url: "https://example.com/mossbound-courier" }
    ],
    requirements: {
      minimum: "Windows 10 / macOS 13, Intel i3, 4 GB RAM",
      recommended: "Windows 11 / macOS 14, Intel i5, 8 GB RAM"
    },
    releasedAt: "2026-03-09",
    featuredWeek: true
  },
  {
    id: "g-003",
    title: "Neon Babushka",
    slug: "neon-babushka",
    genre: "platformer",
    platforms: ["PC", "Web", "Android"],
    status: "earlyAccess",
    priceType: "free",
    shortDescription: {
      ru: "Скоростной платформер о бабушке-хакере, которая чинит районный киберлифтовой узел.",
      en: "A speed platformer about a hacker granny fixing the district cyber-elevator hub."
    },
    description: {
      ru: "Прыгайте по неоновым крышам, взламывайте лифты на лету и собирайте фрагменты старого городского ИИ. Игра рассчитана на короткие забеги, таблицы времени и честное управление.",
      en: "Jump across neon rooftops, hack elevators mid-run and collect shards of an old city AI. It is built for short runs, time boards and tight controls."
    },
    why: {
      ru: [
        "Быстрые уровни по 60-90 секунд.",
        "Комбо из прыжков, рывков и взлома окружения.",
        "Можно играть в браузере без установки."
      ],
      en: [
        "Fast 60-90 second stages.",
        "Combos of jumps, dashes and environment hacks.",
        "Playable in browser with no installation."
      ]
    },
    tags: {
      ru: ["платформер", "скорость", "киберпанк", "браузер"],
      en: ["platformer", "speedrun", "cyberpunk", "browser"]
    },
    rating: 4.7,
    interest: 91,
    image: "linear-gradient(135deg, #100b18, #0c6f55 44%, #35e878 72%, #45c8ff)",
    banner: "linear-gradient(120deg, #08060f, #123c34 42%, #33d774 68%, #54d6ff)",
    screenshots: [
      "linear-gradient(135deg, #160b25, #0f7259, #38e96d)",
      "linear-gradient(135deg, #0b101a, #1d7c67, #5fd5ff)",
      "linear-gradient(135deg, #110817, #165743, #d7f45a)"
    ],
    links: [
      { label: "itch.io", url: "https://itch.io/" },
      { label: "Website", url: "https://example.com/neon-babushka" }
    ],
    requirements: {
      minimum: "Windows 10, Intel i3, 4 GB RAM, integrated GPU",
      recommended: "Windows 11, Intel i5, 8 GB RAM"
    },
    releasedAt: "2026-02-18",
    featuredWeek: true,
    newDemo: true
  },
  {
    id: "g-004",
    title: "Polar Colony 9",
    slug: "polar-colony-9",
    genre: "survival",
    platforms: ["PC", "Linux"],
    status: "earlyAccess",
    priceType: "paid",
    shortDescription: {
      ru: "Выживание и менеджмент экспедиции на полярной станции после сбоя автономной сети.",
      en: "Survival management on a polar station after an autonomous grid failure."
    },
    description: {
      ru: "Следите за теплом, моралью и ресурсами команды. Исследуйте ледяные модули, чините сеть и решайте, какие научные данные важнее безопасности людей.",
      en: "Manage heat, morale and resources for your crew. Explore frozen modules, repair the grid and decide which scientific data is worth risking people for."
    },
    why: {
      ru: [
        "Выживание без лишней суеты, с упором на решения.",
        "Каждый специалист в команде имеет сильные и слабые стороны.",
        "События станции собираются в драму экспедиции."
      ],
      en: [
        "Survival focused on decisions, not busywork.",
        "Each crew specialist has strengths and weaknesses.",
        "Station events build an expedition drama."
      ]
    },
    tags: {
      ru: ["выживание", "менеджмент", "снег", "ранний доступ"],
      en: ["survival", "management", "snow", "early access"]
    },
    rating: 4.5,
    interest: 83,
    image: "linear-gradient(135deg, #091013, #1b4d46 48%, #b7f4ff)",
    banner: "linear-gradient(120deg, #030607, #143332 42%, #2f887d 72%, #d4fbff)",
    screenshots: [
      "linear-gradient(135deg, #0a1114, #285b58, #b9eff8)",
      "linear-gradient(135deg, #101719, #335a5b, #78e4d2)",
      "linear-gradient(135deg, #050707, #183837, #e7fbff)"
    ],
    links: [
      { label: "VK Play", url: "https://vkplay.ru/" },
      { label: "Steam", url: "https://store.steampowered.com/" }
    ],
    requirements: {
      minimum: "Windows 10 / Linux, Intel i5, 8 GB RAM, GTX 1050",
      recommended: "Windows 11 / Linux, Ryzen 5, 16 GB RAM, RTX 2060"
    },
    releasedAt: "2025-12-14"
  },
  {
    id: "g-005",
    title: "Paper Metro",
    slug: "paper-metro",
    genre: "puzzle",
    platforms: ["Web", "PC", "Mac"],
    status: "release",
    priceType: "free",
    shortDescription: {
      ru: "Логическая игра о рисовании метро на живой бумажной карте, где линии спорят друг с другом.",
      en: "A puzzle game about drawing metro lines on a living paper map where routes argue with each other."
    },
    description: {
      ru: "Проектируйте линии, успокаивайте районы и ищите красивые решения. Карта меняется после каждого уровня, а новые правила появляются через историю города.",
      en: "Design lines, calm districts and search for elegant solutions. The map changes after every level, while new rules arrive through the city story."
    },
    why: {
      ru: [
        "Понятные правила, сложные красивые задачи.",
        "Минималистичная подача с живой картой.",
        "Подходит для коротких игровых сессий."
      ],
      en: [
        "Simple rules, elegant hard puzzles.",
        "Minimal presentation with a living map.",
        "Great for short sessions."
      ]
    },
    tags: {
      ru: ["головоломка", "карта", "минимализм", "релиз"],
      en: ["puzzle", "map", "minimal", "release"]
    },
    rating: 4.9,
    interest: 96,
    image: "linear-gradient(135deg, #f6f0d9, #71c98a 46%, #1f4630)",
    banner: "linear-gradient(120deg, #fff7dc, #a3e0ab 38%, #2b6f46 74%, #08140d)",
    screenshots: [
      "linear-gradient(135deg, #f4eed7, #9ad9a4, #24583a)",
      "linear-gradient(135deg, #fff4d2, #6ec489, #14321f)",
      "linear-gradient(135deg, #e8dfc2, #b6e48e, #336d49)"
    ],
    links: [
      { label: "itch.io", url: "https://itch.io/" },
      { label: "Website", url: "https://example.com/paper-metro" }
    ],
    requirements: {
      minimum: "Windows 10 / macOS 13, 4 GB RAM",
      recommended: "Windows 11 / macOS 14, 8 GB RAM"
    },
    releasedAt: "2026-01-26"
  },
  {
    id: "g-006",
    title: "Letters To Orbit",
    slug: "letters-to-orbit",
    genre: "visualNovel",
    platforms: ["PC", "Android", "Mac"],
    status: "demo",
    priceType: "free",
    shortDescription: {
      ru: "Визуальная новелла о переписке с космонавтом, который не уверен, существует ли Земля.",
      en: "A visual novel about messaging an astronaut who is no longer sure Earth exists."
    },
    description: {
      ru: "Читаете сообщения, выбираете тон ответов и собираете правду из задержек связи. Демо показывает первый акт истории и несколько эмоциональных развилок.",
      en: "Read messages, choose the tone of your replies and assemble truth from signal delays. The demo includes the first act and several emotional branches."
    },
    why: {
      ru: [
        "Сильная камерная история на 40 минут.",
        "Выборы меняют доверие и доступные признания.",
        "Письма, звук и интерфейс работают как единая сцена."
      ],
      en: [
        "A strong 40-minute intimate story.",
        "Choices change trust and available confessions.",
        "Letters, sound and UI work as one stage."
      ]
    },
    tags: {
      ru: ["новелла", "космос", "драма", "демо"],
      en: ["visual novel", "space", "drama", "demo"]
    },
    rating: 4.4,
    interest: 78,
    image: "linear-gradient(135deg, #070915, #23436e 45%, #6be58d)",
    banner: "linear-gradient(120deg, #03040b, #172c4d 45%, #48a782 70%, #d9ffb7)",
    screenshots: [
      "linear-gradient(135deg, #070915, #263c6d, #7ce19d)",
      "linear-gradient(135deg, #0d1020, #1c4e73, #e1f0a5)",
      "linear-gradient(135deg, #05060d, #344478, #6dd9c7)"
    ],
    links: [
      { label: "RuStore", url: "https://www.rustore.ru/" },
      { label: "itch.io", url: "https://itch.io/" }
    ],
    requirements: {
      minimum: "Windows 10 / macOS 13, 4 GB RAM",
      recommended: "Windows 11 / macOS 14, 8 GB RAM"
    },
    releasedAt: "2026-04-02",
    newDemo: true
  },
  {
    id: "g-007",
    title: "Guild of Rust",
    slug: "guild-of-rust",
    genre: "strategy",
    platforms: ["PC", "Linux", "Mac"],
    status: "development",
    priceType: "paid",
    shortDescription: {
      ru: "Пошаговая стратегия о ремесленной гильдии, которая строит экономику на обломках мегаполиса.",
      en: "A turn-based strategy about a craft guild rebuilding an economy on megacity ruins."
    },
    description: {
      ru: "Планируйте производство, заключайте союзы, отправляйте караваны и спорьте с фракциями за редкие детали. Побеждает не самая большая армия, а самая умная цепочка поставок.",
      en: "Plan production, make alliances, send caravans and bargain with factions over rare parts. The smartest supply chain wins, not the largest army."
    },
    why: {
      ru: [
        "Экономика важнее бесконечных битв.",
        "Фракции запоминают сделки и обиды.",
        "Каждая партия строит новую карту интересов."
      ],
      en: [
        "Economy matters more than endless battles.",
        "Factions remember deals and grudges.",
        "Every run builds a new map of interests."
      ]
    },
    tags: {
      ru: ["стратегия", "экономика", "фракции", "инди"],
      en: ["strategy", "economy", "factions", "indie"]
    },
    rating: 4.3,
    interest: 74,
    image: "linear-gradient(135deg, #17120d, #5c5437 45%, #46d977)",
    banner: "linear-gradient(120deg, #0b0805, #3d3828 42%, #907a3d 67%, #52e078)",
    screenshots: [
      "linear-gradient(135deg, #17110b, #5f5130, #41d873)",
      "linear-gradient(135deg, #0d0c09, #4f4637, #b48c3c)",
      "linear-gradient(135deg, #1b140c, #73643b, #83e194)"
    ],
    links: [
      { label: "Steam", url: "https://store.steampowered.com/" },
      { label: "VK Play", url: "https://vkplay.ru/" }
    ],
    requirements: {
      minimum: "Windows 10 / Linux / macOS 13, 8 GB RAM",
      recommended: "Windows 11 / Linux / macOS 14, 16 GB RAM"
    },
    releasedAt: "2025-11-30"
  },
  {
    id: "g-008",
    title: "Blackout Garden",
    slug: "blackout-garden",
    genre: "roguelike",
    platforms: ["PC", "Web"],
    status: "demo",
    priceType: "free",
    shortDescription: {
      ru: "Рогалик про сад в бункере, где растения мутируют после каждого отключения света.",
      en: "A roguelike about a bunker garden where plants mutate after every blackout."
    },
    description: {
      ru: "Сажайте семена, собирайте мутации и переживайте волны тьмы. Каждая попытка открывает новые виды растений, которые могут лечить, защищать или разрушать весь огород.",
      en: "Plant seeds, collect mutations and survive waves of darkness. Every run unlocks species that can heal, defend or destroy the whole garden."
    },
    why: {
      ru: [
        "Быстрые партии с понятными синергиями.",
        "Странные растения вместо привычного оружия.",
        "Демо уже дает законченный игровой цикл."
      ],
      en: [
        "Fast runs with readable synergies.",
        "Strange plants instead of familiar weapons.",
        "The demo already has a complete loop."
      ]
    },
    tags: {
      ru: ["рогалик", "сад", "синергии", "демо"],
      en: ["roguelike", "garden", "synergies", "demo"]
    },
    rating: 4.6,
    interest: 89,
    image: "linear-gradient(135deg, #050804, #18351c 48%, #8af05d)",
    banner: "linear-gradient(120deg, #010302, #102111 44%, #286e2b 72%, #b7ff5b)",
    screenshots: [
      "linear-gradient(135deg, #030602, #21431f, #90ef57)",
      "linear-gradient(135deg, #080c07, #31562b, #d5fb74)",
      "linear-gradient(135deg, #0b0e07, #19361b, #54dd65)"
    ],
    links: [
      { label: "itch.io", url: "https://itch.io/" },
      { label: "Website", url: "https://example.com/blackout-garden" }
    ],
    requirements: {
      minimum: "Windows 10, 4 GB RAM, integrated GPU",
      recommended: "Windows 11, 8 GB RAM"
    },
    releasedAt: "2026-04-29",
    newDemo: true
  },
  {
    id: "g-009",
    title: "Volga Drift Tactics",
    slug: "volga-drift-tactics",
    genre: "strategy",
    platforms: ["PC", "Android"],
    status: "release",
    priceType: "paid",
    shortDescription: {
      ru: "Тактическая гонка, где дрифт, погода и командные приказы важнее максимальной скорости.",
      en: "A tactical racer where drifting, weather and team orders matter more than top speed."
    },
    description: {
      ru: "Командуйте маленькой гоночной командой, выбирайте рискованные траектории и меняйте стратегию прямо во время заезда. Победа зависит от чтения трассы и холодной головы.",
      en: "Command a small racing crew, choose risky lines and change strategy mid-race. Victory depends on reading the track and keeping calm."
    },
    why: {
      ru: [
        "Необычная смесь гонки и тактики.",
        "Короткие напряженные заезды.",
        "Разные погодные сценарии меняют стиль игры."
      ],
      en: [
        "An unusual mix of racing and tactics.",
        "Short high-tension races.",
        "Different weather scenarios change the playstyle."
      ]
    },
    tags: {
      ru: ["тактика", "гонка", "дрифт", "релиз"],
      en: ["tactics", "racing", "drift", "release"]
    },
    rating: 4.2,
    interest: 72,
    image: "linear-gradient(135deg, #0b1010, #1d6362 46%, #37d56f)",
    banner: "linear-gradient(120deg, #040606, #184545 44%, #1fae86 72%, #e4f56c)",
    screenshots: [
      "linear-gradient(135deg, #071010, #216c68, #41d977)",
      "linear-gradient(135deg, #0e1110, #4c7447, #f0d566)",
      "linear-gradient(135deg, #040707, #1f5254, #7ae59e)"
    ],
    links: [
      { label: "VK Play", url: "https://vkplay.ru/" },
      { label: "RuStore", url: "https://www.rustore.ru/" }
    ],
    requirements: {
      minimum: "Windows 10, 8 GB RAM, GTX 970",
      recommended: "Windows 11, 16 GB RAM, GTX 1660"
    },
    releasedAt: "2026-02-06"
  },
  {
    id: "g-010",
    title: "Tiny Cosmodrome",
    slug: "tiny-cosmodrome",
    genre: "puzzle",
    platforms: ["Web", "Android", "PC"],
    status: "development",
    priceType: "free",
    shortDescription: {
      ru: "Физическая головоломка о сборке маленьких ракет из деталей, найденных в гараже.",
      en: "A physics puzzle about building tiny rockets from parts found in a garage."
    },
    description: {
      ru: "Собирайте ракету из странных деталей, тестируйте запуск и исправляйте ошибки. Главное удовольствие - найти простое решение из несовершенных компонентов.",
      en: "Assemble a rocket from strange parts, test launches and fix failures. The main joy is finding simple solutions with imperfect components."
    },
    why: {
      ru: [
        "Игрушечная физика с настоящими задачами.",
        "Каждый уровень можно решить несколькими способами.",
        "Легко показать друзьям прямо в браузере."
      ],
      en: [
        "Toy-like physics with real puzzle problems.",
        "Each level supports several solutions.",
        "Easy to share in browser."
      ]
    },
    tags: {
      ru: ["головоломка", "физика", "космос", "браузер"],
      en: ["puzzle", "physics", "space", "browser"]
    },
    rating: 4.1,
    interest: 69,
    image: "linear-gradient(135deg, #10151b, #3c5f65 46%, #9ce878)",
    banner: "linear-gradient(120deg, #05080b, #233b50 45%, #69a978 72%, #fff08d)",
    screenshots: [
      "linear-gradient(135deg, #111a20, #3e6770, #9fed76)",
      "linear-gradient(135deg, #070d13, #46657d, #f3df76)",
      "linear-gradient(135deg, #0b1015, #2d5468, #72d99b)"
    ],
    links: [
      { label: "itch.io", url: "https://itch.io/" },
      { label: "Website", url: "https://example.com/tiny-cosmodrome" }
    ],
    requirements: {
      minimum: "Windows 10, 4 GB RAM",
      recommended: "Windows 11, 8 GB RAM"
    },
    releasedAt: "2026-01-12"
  },
  {
    id: "g-011",
    title: "Ashen Tram",
    slug: "ashen-tram",
    genre: "horror",
    platforms: ["PC"],
    status: "release",
    priceType: "paid",
    shortDescription: {
      ru: "Короткий хоррор-квест о ночном трамвае, который привозит пассажиров к незавершенным разговорам.",
      en: "A short horror adventure about a night tram that takes passengers to unfinished conversations."
    },
    description: {
      ru: "Осматривайте вагон, слушайте пассажиров и выбирайте, какие истории вернуть в город. Игра рассчитана на один вечер и оставляет пространство для обсуждений.",
      en: "Inspect the car, listen to passengers and choose which stories should return to the city. The game is built for one evening and leaves room for discussion."
    },
    why: {
      ru: [
        "Короткая законченная история.",
        "Городской мистический тон без лишней жестокости.",
        "Решения влияют на финальные остановки."
      ],
      en: [
        "A short complete story.",
        "Urban mystery without excessive gore.",
        "Decisions affect the final stops."
      ]
    },
    tags: {
      ru: ["хоррор", "квест", "мистика", "релиз"],
      en: ["horror", "adventure", "mystery", "release"]
    },
    rating: 4.5,
    interest: 81,
    image: "linear-gradient(135deg, #100c0d, #3d2d32 43%, #42c870)",
    banner: "linear-gradient(120deg, #050304, #2b1f25 42%, #675344 70%, #5cde7d)",
    screenshots: [
      "linear-gradient(135deg, #100b0e, #48323b, #48cb71)",
      "linear-gradient(135deg, #090607, #30262a, #9a7554)",
      "linear-gradient(135deg, #120d0d, #44373a, #68da89)"
    ],
    links: [
      { label: "Steam", url: "https://store.steampowered.com/" },
      { label: "VK Play", url: "https://vkplay.ru/" }
    ],
    requirements: {
      minimum: "Windows 10, Intel i3, 4 GB RAM, GTX 750",
      recommended: "Windows 11, Intel i5, 8 GB RAM, GTX 1050"
    },
    releasedAt: "2025-10-19"
  },
  {
    id: "g-012",
    title: "Lake.exe",
    slug: "lake-exe",
    genre: "visualNovel",
    platforms: ["PC", "Web"],
    status: "earlyAccess",
    priceType: "free",
    shortDescription: {
      ru: "Интерактивная новелла о школьном архиве, который начинает компилировать чужие воспоминания.",
      en: "An interactive novel about a school archive that starts compiling other people's memories."
    },
    description: {
      ru: "Разбирайте файлы, восстанавливайте диалоги и решайте, какие воспоминания нельзя публиковать. История балансирует между ностальгией, техно-тревогой и подростковой тайной.",
      en: "Sort files, reconstruct dialogues and decide which memories should never be published. The story balances nostalgia, techno-anxiety and a teen mystery."
    },
    why: {
      ru: [
        "Необычный интерфейс архива вместо классических сцен.",
        "Деликатная история о памяти и приватности.",
        "Ранний доступ регулярно получает новые главы."
      ],
      en: [
        "An archive interface instead of classic scenes.",
        "A careful story about memory and privacy.",
        "Early access receives regular new chapters."
      ]
    },
    tags: {
      ru: ["новелла", "архив", "тайна", "ранний доступ"],
      en: ["visual novel", "archive", "mystery", "early access"]
    },
    rating: 4.3,
    interest: 76,
    image: "linear-gradient(135deg, #080d13, #21384a 46%, #63dc72)",
    banner: "linear-gradient(120deg, #030508, #1a2b39 44%, #315e5b 72%, #87ef8f)",
    screenshots: [
      "linear-gradient(135deg, #081018, #244053, #6de078)",
      "linear-gradient(135deg, #10161b, #305063, #a2ef87)",
      "linear-gradient(135deg, #05070a, #20323f, #59d6ae)"
    ],
    links: [
      { label: "itch.io", url: "https://itch.io/" },
      { label: "Website", url: "https://example.com/lake-exe" }
    ],
    requirements: {
      minimum: "Windows 10, 4 GB RAM",
      recommended: "Windows 11, 8 GB RAM"
    },
    releasedAt: "2026-03-22",
    newDemo: true
  }
  ,
  {
    id: "g-013",
    title: "Cavernkind",
    slug: "cavernkind",
    genre: "survival",
    platforms: ["PC", "Linux"],
    status: "demo",
    priceType: "paid",
    shortDescription: {
      ru: "Песочница про шахты, крафт, поселение и битвы с подземными боссами.",
      en: "A sandbox about mining, crafting, settlement building and underground boss fights."
    },
    description: {
      ru: "Исследуйте огромные пещеры, стройте базы, создавайте инструменты, собирайте редкие руды и защищайте маленькое поселение от ночных существ. Игра вдохновлена духом 2D-песочниц, но имеет оригинальный мир, биомы и прогрессию.",
      en: "Explore huge caves, build bases, craft tools, gather rare ores and protect a small settlement from night creatures. The game is inspired by the spirit of 2D sandboxes but has its own world, biomes and progression."
    },
    why: {
      ru: [
        "Большая песочница с крафтом и исследованием.",
        "Биомы, боссы и развитие поселения.",
        "Подходит фанатам Terraria-подобных игр, но не копирует их."
      ],
      en: [
        "A large sandbox with crafting and exploration.",
        "Biomes, bosses and settlement growth.",
        "For fans of Terraria-like games without copying them."
      ]
    },
    tags: {
      ru: ["песочница", "крафт", "шахты", "кооператив"],
      en: ["sandbox", "crafting", "mining", "co-op"]
    },
    rating: 4.7,
    interest: 92,
    image: "linear-gradient(135deg, #090b08, #2b5134 44%, #81f7a8)",
    banner: "linear-gradient(120deg, #030504, #15311f 40%, #5b7b42 70%, #99f27e)",
    screenshots: [
      "linear-gradient(135deg, #080807, #3d3325, #79d65e)",
      "linear-gradient(135deg, #0b100b, #315a35, #c0f27a)",
      "linear-gradient(135deg, #050706, #5f3c26, #38d574)"
    ],
    links: [
      { label: "Steam", url: "https://store.steampowered.com/" },
      { label: "itch.io", url: "https://itch.io/" }
    ],
    requirements: {
      minimum: "Windows 10 / Linux, Intel i3, 4 GB RAM",
      recommended: "Windows 11 / Linux, Intel i5, 8 GB RAM"
    },
    releasedAt: "2026-05-01",
    featuredWeek: true,
    newDemo: true
  },
  {
    id: "g-014",
    title: "Greenvale Seasons",
    slug: "greenvale-seasons",
    genre: "rpg",
    platforms: ["PC", "Mac", "Android"],
    status: "earlyAccess",
    priceType: "paid",
    shortDescription: {
      ru: "Уютная фермерская RPG про деревню, отношения, сезонные праздники и маленькие тайны.",
      en: "A cozy farming RPG about a village, relationships, seasonal festivals and small mysteries."
    },
    description: {
      ru: "Вы восстанавливаете старую ферму, выращиваете культуры, общаетесь с жителями и открываете секреты долины. Игра делает упор на настроение, короткие игровые сессии и живой календарь событий.",
      en: "Restore an old farm, grow crops, befriend villagers and uncover valley secrets. The game focuses on mood, short sessions and a living calendar of events."
    },
    why: {
      ru: [
        "Ферма, крафт, рыбалка и отношения с жителями.",
        "Сезонные события и уютный визуальный стиль.",
        "Для любителей Stardew Valley-подобных игр, но со своей историей."
      ],
      en: [
        "Farming, crafting, fishing and relationships.",
        "Seasonal events and cozy visual style.",
        "For fans of Stardew-like games with its own story."
      ]
    },
    tags: {
      ru: ["ферма", "уютная", "RPG", "симулятор жизни"],
      en: ["farming", "cozy", "RPG", "life sim"]
    },
    rating: 4.8,
    interest: 95,
    image: "linear-gradient(135deg, #0e150c, #3e7b3f 45%, #f2cc7a)",
    banner: "linear-gradient(120deg, #071008, #25532d 40%, #65c86b 70%, #f5d47b)",
    screenshots: [
      "linear-gradient(135deg, #0b130b, #4f8e43, #ffda86)",
      "linear-gradient(135deg, #16210e, #82b956, #ffd2a2)",
      "linear-gradient(135deg, #071207, #3a7744, #9cf2a6)"
    ],
    links: [
      { label: "Steam", url: "https://store.steampowered.com/" },
      { label: "Website", url: "https://example.com/greenvale-seasons" }
    ],
    requirements: {
      minimum: "Windows 10 / macOS 13, 4 GB RAM",
      recommended: "Windows 11 / macOS 14, 8 GB RAM"
    },
    releasedAt: "2026-04-27",
    featuredWeek: true
  },
  {
    id: "g-015",
    title: "Starroot Hamlet",
    slug: "starroot-hamlet",
    genre: "puzzle",
    platforms: ["PC", "Web", "Android"],
    status: "development",
    priceType: "free",
    shortDescription: {
      ru: "Ферма на астероиде: выращивайте растения, чините купола и решайте головоломки экосистемы.",
      en: "A farm on an asteroid: grow plants, fix domes and solve ecosystem puzzles."
    },
    description: {
      ru: "Маленькая научная деревня пытается выжить на астероиде. Игрок соединяет системы воды, света и кислорода, чтобы выращивать странные растения и открывать новые зоны поселения.",
      en: "A small science village tries to survive on an asteroid. Connect water, light and oxygen systems to grow strange plants and unlock new settlement zones."
    },
    why: {
      ru: [
        "Фермерство смешано с логическими головоломками.",
        "Можно играть в браузере.",
        "Мягкий sci-fi без перегруза интерфейса."
      ],
      en: [
        "Farming mixed with logic puzzles.",
        "Playable in browser.",
        "Soft sci-fi without interface overload."
      ]
    },
    tags: {
      ru: ["ферма", "головоломка", "sci-fi", "браузер"],
      en: ["farming", "puzzle", "sci-fi", "browser"]
    },
    rating: 4.4,
    interest: 79,
    image: "linear-gradient(135deg, #090d16, #24535d 45%, #a4f28c)",
    banner: "linear-gradient(120deg, #050811, #1b4152 42%, #4ea978 70%, #ddf68b)",
    screenshots: [
      "linear-gradient(135deg, #060a13, #1e4961, #9ded8a)",
      "linear-gradient(135deg, #0d1020, #315f5b, #f3df87)",
      "linear-gradient(135deg, #050a0c, #3f6b82, #6ee7a7)"
    ],
    links: [
      { label: "itch.io", url: "https://itch.io/" },
      { label: "Website", url: "https://example.com/starroot-hamlet" }
    ],
    requirements: {
      minimum: "Browser / Windows 10, 4 GB RAM",
      recommended: "Windows 11, 8 GB RAM"
    },
    releasedAt: "2026-05-10",
    newDemo: true
  }

];

export function getGameBySlug(slug: string) {
  return games.find((game) => game.slug === slug);
}

export function getRelatedGames(game: Game, limit = 3) {
  return games
    .filter((candidate) => candidate.id !== game.id)
    .sort((a, b) => {
      const genreScore =
        Number(b.genre === game.genre) - Number(a.genre === game.genre);
      const platformScore =
        Number(b.platforms.some((platform) => game.platforms.includes(platform))) -
        Number(a.platforms.some((platform) => game.platforms.includes(platform)));
      return genreScore || platformScore || b.interest - a.interest;
    })
    .slice(0, limit);
}
