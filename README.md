# Проект сайта «Алвори»

Обновлённый skeleton проекта под GitHub Pages.

## Что внутри

- исправленная конфигурация под GitHub Pages / basePath
- новая итерация Header по макету
- примитивные заглушки остальных секций
- подготовленные места под шрифты Garet и BodyText-FitBold
- lucide-react уже включён в package.json

## Установка

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

## Куда положить логотипы

- `public/brand/header/light/logo.svg`
- `public/brand/header/dark/logo.svg`
- `public/brand/footer/light/logo.svg`
- `public/brand/footer/dark/logo.svg`

## Куда положить шрифты

- `src/fonts/garet/`
- `src/fonts/body-text-fit/`

После добавления файлов можно подключить их в `src/lib/fonts.ts`.

## Текущий статус

В этой версии только Header собран как целевая секция.
Остальные блоки намеренно оставлены простыми заглушками для поэтапной доработки.
