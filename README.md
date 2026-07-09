# Plant Doctor — Website

Статический сайт-визитка для приложения Plant Doctor: политика конфиденциальности и страница удаления аккаунта, на 6 языках (ru/en/uk/es/de/fr).

Чистый HTML/CSS/JS, без сборки и зависимостей.

## Структура

```
public/
  privacy.html          # главная страница (Privacy Policy), доступна на "/" и "/privacy"
  delete-account.html   # "/delete-account"
  style.css
  script.js             # переключатель языка + переводы навигации
  fonts.css             # self-hosted @font-face (Alegreya, Commissioner)
  fonts/                # woff2-файлы шрифтов
  icon.png              # иконка приложения
vercel.json              # rewrites для чистых URL + outputDirectory
```

## Локальный просмотр

Любой статический сервер, например:

```
npx serve public
```

## Деплой

Проект подключён к Vercel. При пуше в `main` деплой происходит автоматически (если настроена интеграция GitHub → Vercel), либо вручную:

```
vercel --prod
```
