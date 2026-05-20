# Скриншоты игр

Клади реальные изображения игр в папки вида:

```text
public/games/slug-igry/cover.jpg
public/games/slug-igry/banner.jpg
public/games/slug-igry/screen-1.jpg
public/games/slug-igry/screen-2.jpg
public/games/slug-igry/screen-3.jpg
```

Потом укажи пути в `lib/games.ts`:

```ts
image: "/games/slug-igry/cover.jpg"
banner: "/games/slug-igry/banner.jpg"
screenshots: ["/games/slug-igry/screen-1.jpg"]
```
