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
    image: "/games/signal-from-taiga/cover.svg",
    banner: "/games/signal-from-taiga/banner.svg",
    screenshots: [
      "/games/signal-from-taiga/screen-1.svg",
      "/games/signal-from-taiga/screen-2.svg",
      "/games/signal-from-taiga/screen-3.svg"
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
    image: "/games/mossbound-courier/cover.svg",
    banner: "/games/mossbound-courier/banner.svg",
    screenshots: [
      "/games/mossbound-courier/screen-1.svg",
      "/games/mossbound-courier/screen-2.svg",
      "/games/mossbound-courier/screen-3.svg"
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
    image: "/games/neon-babushka/cover.svg",
    banner: "/games/neon-babushka/banner.svg",
    screenshots: [
      "/games/neon-babushka/screen-1.svg",
      "/games/neon-babushka/screen-2.svg",
      "/games/neon-babushka/screen-3.svg"
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
    image: "/games/polar-colony-9/cover.svg",
    banner: "/games/polar-colony-9/banner.svg",
    screenshots: [
      "/games/polar-colony-9/screen-1.svg",
      "/games/polar-colony-9/screen-2.svg",
      "/games/polar-colony-9/screen-3.svg"
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
    image: "/games/paper-metro/cover.svg",
    banner: "/games/paper-metro/banner.svg",
    screenshots: [
      "/games/paper-metro/screen-1.svg",
      "/games/paper-metro/screen-2.svg",
      "/games/paper-metro/screen-3.svg"
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
    image: "/games/letters-to-orbit/cover.svg",
    banner: "/games/letters-to-orbit/banner.svg",
    screenshots: [
      "/games/letters-to-orbit/screen-1.svg",
      "/games/letters-to-orbit/screen-2.svg",
      "/games/letters-to-orbit/screen-3.svg"
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
    image: "/games/guild-of-rust/cover.svg",
    banner: "/games/guild-of-rust/banner.svg",
    screenshots: [
      "/games/guild-of-rust/screen-1.svg",
      "/games/guild-of-rust/screen-2.svg",
      "/games/guild-of-rust/screen-3.svg"
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
    image: "/games/blackout-garden/cover.svg",
    banner: "/games/blackout-garden/banner.svg",
    screenshots: [
      "/games/blackout-garden/screen-1.svg",
      "/games/blackout-garden/screen-2.svg",
      "/games/blackout-garden/screen-3.svg"
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
    image: "/games/volga-drift-tactics/cover.svg",
    banner: "/games/volga-drift-tactics/banner.svg",
    screenshots: [
      "/games/volga-drift-tactics/screen-1.svg",
      "/games/volga-drift-tactics/screen-2.svg",
      "/games/volga-drift-tactics/screen-3.svg"
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
    image: "/games/tiny-cosmodrome/cover.svg",
    banner: "/games/tiny-cosmodrome/banner.svg",
    screenshots: [
      "/games/tiny-cosmodrome/screen-1.svg",
      "/games/tiny-cosmodrome/screen-2.svg",
      "/games/tiny-cosmodrome/screen-3.svg"
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
    image: "/games/ashen-tram/cover.svg",
    banner: "/games/ashen-tram/banner.svg",
    screenshots: [
      "/games/ashen-tram/screen-1.svg",
      "/games/ashen-tram/screen-2.svg",
      "/games/ashen-tram/screen-3.svg"
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
    image: "/games/lake-exe/cover.svg",
    banner: "/games/lake-exe/banner.svg",
    screenshots: [
      "/games/lake-exe/screen-1.svg",
      "/games/lake-exe/screen-2.svg",
      "/games/lake-exe/screen-3.svg"
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
    image: "/games/cavernkind/cover.svg",
    banner: "/games/cavernkind/banner.svg",
    screenshots: [
      "/games/cavernkind/screen-1.svg",
      "/games/cavernkind/screen-2.svg",
      "/games/cavernkind/screen-3.svg"
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
    image: "/games/greenvale-seasons/cover.svg",
    banner: "/games/greenvale-seasons/banner.svg",
    screenshots: [
      "/games/greenvale-seasons/screen-1.svg",
      "/games/greenvale-seasons/screen-2.svg",
      "/games/greenvale-seasons/screen-3.svg"
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
    image: "/games/starroot-hamlet/cover.svg",
    banner: "/games/starroot-hamlet/banner.svg",
    screenshots: [
      "/games/starroot-hamlet/screen-1.svg",
      "/games/starroot-hamlet/screen-2.svg",
      "/games/starroot-hamlet/screen-3.svg"
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
