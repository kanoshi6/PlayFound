# Как добавить настоящие скриншоты игр в PlayFound

Сейчас у игр стоят красивые градиенты-заглушки. Сайт уже умеет принимать реальные изображения.

## 1. Куда класть картинки

Создай папку в `public/games/<slug-igry>/`.

Пример:

```text
public/games/cavernkind/cover.jpg
public/games/cavernkind/banner.jpg
public/games/cavernkind/screen-1.jpg
public/games/cavernkind/screen-2.jpg
public/games/cavernkind/screen-3.jpg
```

## 2. Где менять пути

Открой файл:

```text
lib/games.ts
```

Найди игру по `slug`, например:

```ts
slug: "cavernkind"
```

И замени градиенты на пути к файлам:

```ts
image: "/games/cavernkind/cover.jpg",
banner: "/games/cavernkind/banner.jpg",
screenshots: [
  "/games/cavernkind/screen-1.jpg",
  "/games/cavernkind/screen-2.jpg",
  "/games/cavernkind/screen-3.jpg"
]
```

## 3. Какой размер лучше

- `cover.jpg`: 1200x750 или 1600x1000
- `banner.jpg`: 1920x900
- `screen-1.jpg`: 1280x720 или 1920x1080

Не используй чужие логотипы, ключевые арты и скриншоты без разрешения. Для прототипа лучше делать свои изображения или нейтральные mock-скриншоты.
