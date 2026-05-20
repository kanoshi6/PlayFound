# Как добавлять игры в PlayFound

Сейчас проект — client-only прототип. Игры каталога лежат в файле:

```text
lib/games.ts
```

## 1. Добавить игру в каталог вручную

Открой `lib/games.ts` и добавь новый объект в массив `games`.

Минимальная структура:

```ts
{
  id: "g-016",
  title: "Название игры",
  slug: "nazvanie-igry",
  genre: "rpg",
  platforms: ["PC", "Web"],
  status: "demo",
  priceType: "free",
  shortDescription: {
    ru: "Короткое описание на русском.",
    en: "Short English description."
  },
  description: {
    ru: "Полное описание игры.",
    en: "Full game description."
  },
  why: {
    ru: ["Причина 1", "Причина 2", "Причина 3"],
    en: ["Reason 1", "Reason 2", "Reason 3"]
  },
  tags: {
    ru: ["тег", "демо"],
    en: ["tag", "demo"]
  },
  rating: 4.6,
  interest: 88,
  image: "/games/my-game/cover.jpg",
  banner: "/games/my-game/banner.jpg",
  screenshots: [
    "/games/my-game/screen-1.jpg",
    "/games/my-game/screen-2.jpg",
    "/games/my-game/screen-3.jpg"
  ],
  links: [
    { label: "Website", url: "https://example.com" },
    { label: "Steam", url: "https://store.steampowered.com/" }
  ],
  requirements: {
    minimum: "Windows 10, 4 GB RAM",
    recommended: "Windows 11, 8 GB RAM"
  },
  releasedAt: "2026-05-20",
  featuredWeek: true,
  newDemo: true
}
```

## 2. Какие значения можно использовать

Жанры:

```ts
"horror" | "rpg" | "platformer" | "survival" | "puzzle" | "visualNovel" | "strategy" | "roguelike"
```

Платформы:

```ts
"PC" | "Android" | "Web" | "Linux" | "Mac"
```

Статусы:

```ts
"demo" | "development" | "earlyAccess" | "release"
```

Цена:

```ts
"free" | "paid"
```

## 3. Как добавить скриншоты

Создай папку в `public/games/`, например:

```text
public/games/cavernkind/
```

Положи туда файлы:

```text
cover.jpg
banner.jpg
screen-1.jpg
screen-2.jpg
screen-3.jpg
```

Потом в `lib/games.ts` укажи пути:

```ts
image: "/games/cavernkind/cover.jpg",
banner: "/games/cavernkind/banner.jpg",
screenshots: [
  "/games/cavernkind/screen-1.jpg",
  "/games/cavernkind/screen-2.jpg",
  "/games/cavernkind/screen-3.jpg"
]
```

Файлы из папки `public` доступны с корня сайта. Поэтому `public/games/cavernkind/cover.jpg` превращается в `/games/cavernkind/cover.jpg`.

## 4. Какие картинки делать

Рекомендуемые размеры:

- `cover.jpg`: 800×1000 или 1200×1500.
- `banner.jpg`: 1920×800.
- `screen-1.jpg`: 1280×720 или 1920×1080.

Форматы:

- `.jpg` для скриншотов.
- `.png` если нужна чёткость интерфейса.
- `.webp` если хочешь меньше вес.

## 5. Как добавить игру через сайт

1. Создай аккаунт.
2. Подтверди его кодом.
3. Открой “Для разработчиков” в футере или кнопку “Стать разработчиком”.
4. Нажми “Стать разработчиком”.
5. Открой “Добавить игру”.
6. Заполни форму.
7. После отправки игра появится в “Мои игры” и в `/admin` как заявка.

Важное отличие: форма `/submit` пока не добавляет игру в основной каталог `lib/games.ts`. Она создаёт заявку в `localStorage`. В полной версии админ после одобрения будет публиковать игру в базе данных.

## 6. Как проверить после изменения

```bash
npm install
npm run typecheck
npm run build
```

Потом:

```bash
git add .
git commit -m "Add new games"
git push
```

И в Render:

```text
Manual Deploy → Deploy latest commit
```
