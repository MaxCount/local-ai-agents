# Telegram CRM Bot

Телеграм-бот для управления лидами с интеграцией Gemini AI и Google Sheets.

## Возможности

- **/add [текст]** — Добавить лида с парсингом через Gemini AI
- **/card** — Распознать визитку (OCR через Gemini Vision)
- **/search [запрос]** — Найти контакт по телефону или имени
- **/stats** — Показать статистику
- **Умная логика** — Не перезаписывает существующие данные, а дополняет пробелы

## Установка

```bash
pip install -r requirements.txt
```

## Настройка

1. Скопируйте `.env.example` в `.env`:
```bash
cp .env.example .env
```

2. Заполните переменные окружения:
- `TELEGRAM_BOT_TOKEN` — токен бота от @BotFather
- `GEMINI_API_KEY` — ключ Gemini AI
- `GOOGLE_SERVICE_ACCOUNT_JSON` — JSON сервисного аккаунта Google
- `SPREADSHEET_ID` — ID таблицы Google Sheets

## Запуск

### Polling (для разработки)
```bash
BOT_MODE=polling python bot_runner.py
```

### Webhook (для продакшена)
```bash
BOT_MODE=webhook WEBHOOK_HOST=https://your-domain.com python bot_runner.py
```

## Структура таблицы Google Sheets

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Дата/Время | Чей контакт | Имя/Должность | Телефон | Город | Сайт/Что продают | Когда перезвонить | Доп. информация | Инфо из визитки | Статус извлечения |

## Deploy на Railway

1. Подключите GitHub репозиторий к Railway
2. Добавьте переменные окружения
3. Railway автоматически соберёт Docker образ

## Примеры использования

```
/add Максим Т, Москва, ООО Ромашка, +375291234567, менеджер Петя

/card — отправьте фото визитки

/search +375291234567

/stats
```
