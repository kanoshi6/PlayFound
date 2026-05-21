# Как добавлять игры в PlayFound

## Через сайт

1. Зарегистрируй аккаунт игрока.
2. Открой страницу “Для авторов” в футере.
3. Нажми “Стать разработчиком”.
4. Открой “Добавить игру”.
5. Заполни название, жанр, платформы, описание, ссылки, трейлер и скриншоты.
6. Отправь заявку на проверку.
7. В “Мои игры” появится карточка заявки со статусом, активностью и событиями модерации.

## Вручную в статический каталог

Основной каталог лежит в файле:

```text
lib/games.ts
```

Картинки игры лежат в папке:

```text
public/games/slug-igry/
```

Пример структуры:

```text
public/games/neon-babushka/cover.jpg
public/games/neon-babushka/banner.jpg
public/games/neon-babushka/screen-1.jpg
public/games/neon-babushka/screen-2.jpg
public/games/neon-babushka/screen-3.jpg
```

В `lib/games.ts` укажи пути:

```ts
image: "/games/neon-babushka/cover.jpg",
banner: "/games/neon-babushka/banner.jpg",
screenshots: [
  "/games/neon-babushka/screen-1.jpg",
  "/games/neon-babushka/screen-2.jpg",
  "/games/neon-babushka/screen-3.jpg"
]
```

Рекомендации по изображениям:

- `cover.jpg`: 800×450 или 1200×675.
- `banner.jpg`: 1600×700 или 1920×840.
- `screen-*.jpg`: 1280×720 или 1920×1080.
- Форматы: `.jpg`, `.png`, `.webp`, `.svg`.
- Не используй чужие скриншоты, логотипы и персонажей без разрешения.
