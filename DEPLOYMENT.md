# PlayFound: запуск, email-код и деплой на Render

## 1. Локальный запуск

```bash
npm install
npm run dev
```

Открой `http://localhost:3000`.

## 2. Переменные окружения для Render

В Render открой:

```text
PlayFound → Environment
```

Добавь переменные:

```text
NEXT_PUBLIC_SITE_URL=https://твоя-ссылка.onrender.com
OTP_SECRET=длинная_секретная_строка_минимум_24_символа
RESEND_API_KEY=твой_ключ_resend
EMAIL_FROM=PlayFound <onboarding@resend.dev>
```

Важно: в поле `VALUE` нельзя писать `NEXT_PUBLIC_SITE_URL=`. Там должна быть только ссылка.

Правильно:

```text
KEY: NEXT_PUBLIC_SITE_URL
VALUE: https://playfound.onrender.com
```

Неправильно:

```text
KEY: NEXT_PUBLIC_SITE_URL
VALUE: NEXT_PUBLIC_SITE_URL=https://playfound.onrender.com
```

## 3. Email-коды

Регистрация сейчас работает только через email:

- `POST /api/auth/send-code` — отправляет 6-значный код на почту.
- `POST /api/auth/verify-code` — проверяет код через подписанную httpOnly cookie.

Для быстрого теста можно использовать:

```text
EMAIL_FROM=PlayFound <onboarding@resend.dev>
```

Для нормального проекта нужно купить домен, подтвердить его в Resend и поставить красивый адрес:

```text
EMAIL_FROM=PlayFound <verify@playfound.ru>
```

Если Resend пишет `domain is not verified`, значит домен отправителя еще не подтвержден в Resend.

## 4. Telegram

Telegram-подтверждение в интерфейсе теперь помечено как `Coming soon` и не используется. Его лучше подключать позже отдельным нормальным flow, чтобы пользователь мог нажать кнопку `Подключить Telegram`, открыть бота и привязать chat_id автоматически.

## 5. Важное ограничение текущей версии

Код подтверждения реально отправляется через API, но аккаунты всё еще хранятся в `localStorage` браузера.
Это подходит для MVP-прототипа, но не для настоящего продукта.

Чтобы пользователи могли входить с разных устройств, нужно подключить базу данных и нормальную авторизацию:

- PostgreSQL/Supabase/Neon;
- таблицы users, sessions, games, developer_profiles;
- хранение паролей через bcrypt/argon2;
- сессии через httpOnly cookies;
- роли player/developer/admin на сервере.

## 6. Деплой на Render

Настройки Web Service:

```text
Language: Node
Branch: main
Root Directory: оставить пустым
Build Command: npm install && npm run build
Start Command: npm run start
```

После изменения переменных окружения нажимай:

```text
Save, rebuild and deploy
```

## 7. Подключение домена

1. Купи домен у регистратора.
2. В Render открой `Settings → Custom Domains`.
3. Добавь домен, например `playfound.ru`.
4. Render покажет DNS-записи.
5. Добавь эти DNS-записи у регистратора.
6. Дождись проверки и HTTPS.

## 8. Индексация в поиске

В проект добавлены:

- `/robots.txt`;
- `/sitemap.xml`.

После деплоя добавь сайт в Google Search Console и Яндекс.Вебмастер, потом отправь sitemap:

```text
https://твой-домен/sitemap.xml
```
