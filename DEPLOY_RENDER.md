# Как обновить PlayFound на Render

## 1. Замена файлов

1. Распакуй архив `playfound-platform-v6-release.zip`.
2. Открой распакованную папку.
3. Выдели все файлы: `Ctrl + A`.
4. Скопируй: `Ctrl + C`.
5. Открой свою рабочую папку проекта:

```text
C:\Users\ll\OneDrive\Desktop\playfound
```

6. Вставь файлы: `Ctrl + V`.
7. Согласись на замену файлов.

## 2. Проверка локально

```cmd
cd C:\Users\ll\OneDrive\Desktop\playfound
npm install
npm run typecheck
```

Для локального запуска:

```cmd
npm run dev
```

## 3. Push в GitHub

```cmd
git init
git branch -M main
git remote set-url origin https://github.com/kanoshi6/playfound.git
git add .
git commit -m "Release PlayFound v6"
git push -u origin main --force
```

Если `git remote set-url` выдаёт ошибку, используй:

```cmd
git remote add origin https://github.com/kanoshi6/playfound.git
```

## 4. Render

В Render нажми:

```text
Manual Deploy → Deploy latest commit
```

Build Command:

```bash
npm install && npm run build
```

Start Command:

```bash
npm run start
```

## 5. Переменные Render

В Render → Environment добавь:

```text
NEXT_PUBLIC_SITE_URL = https://твоя-ссылка.onrender.com
OTP_SECRET = длинная_секретная_строка
RESEND_API_KEY = твой_ключ_Resend
EMAIL_FROM = PlayFound <onboarding@resend.dev>
```

Когда купишь и подтвердишь домен в Resend, поменяй отправителя на:

```text
EMAIL_FROM = PlayFound <verify@твой-домен>
```
