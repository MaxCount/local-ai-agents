"""Telegram CRM Bot - Main entry point."""
import logging
import os
from datetime import datetime
from typing import Optional

from aiogram import Bot, Dispatcher, Router, F
from aiogram.filters import Command, CommandStart
from aiogram.types import Message, InputFile, BufferedInputFile
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.fsm.storage.memory import MemoryStorage

from gemini_client import GeminiClient
from sheets_client import SheetsClient


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Form(StatesGroup):
    waiting_for_card_photo = State()
    waiting_for_card_comment = State()
    waiting_for_merge_confirmation = State()


class BotConfig:
    """Configuration holder for bot dependencies."""
    gemini: GeminiClient
    sheets: SheetsClient


config = BotConfig()
router = Router()


def create_bot(token: str) -> tuple[Bot, Dispatcher]:
    """Create and configure the bot."""
    bot = Bot(token=token)
    dp = Dispatcher(storage=MemoryStorage())
    dp.include_router(router)
    return bot, dp


def init_clients(
    gemini_api_key: str,
    google_credentials: str,
    spreadsheet_id: str
):
    """Initialize Gemini and Sheets clients."""
    config.gemini = GeminiClient(gemini_api_key)
    config.sheets = SheetsClient(google_credentials, spreadsheet_id)
    config.sheets.initialize_headers()


@router.message(CommandStart())
async def cmd_start(message: Message):
    """Handle /start command."""
    welcome_text = """
👋 <b>Добро пожаловать в CRM-бот для лидов!</b>

Я помогу вам собирать и управлять контактами клиентов.

<b>Доступные команды:</b>

📝 <b>/add</b> [текст] — Добавить нового лида
   Пример: /add Максим Т, Москва, ООО Ромашка, +375291234567

🃏 <b>/card</b> — Распознать визитку
   Отправьте фото визитки, и я извлеку данные

🔍 <b>/search</b> [телефон/имя] — Найти контакт

📊 <b>/stats</b> — Показать статистику

❓ <b>/help</b> — Показать эту справку
"""
    await message.answer(welcome_text, parse_mode="HTML")


@router.message(Command("help"))
async def cmd_help(message: Message):
    """Handle /help command."""
    await cmd_start(message)


@router.message(Command("add"))
async def cmd_add(message: Message, state: FSMContext):
    """Handle /add command to add a new lead."""
    text = message.text.replace("/add", "").strip()

    if not text:
        await message.answer(
            "❌ Укажите данные лида.\n"
            "Пример: /add Максим Т, Москва, ООО Ромашка, +375291234567"
        )
        return

    await message.answer("⏳ Обрабатываю данные...")

    try:
        parsed = config.gemini.parse_lead_text(text)

        if "error" in parsed:
            await message.answer(f"❌ Ошибка парсинга: {parsed['error']}")
            return

        phone = parsed.get("phone", "")

        if phone and phone != "не указано":
            existing = config.sheets.find_by_phone(phone)
            if existing:
                updates = config.sheets.merge_record(parsed, existing["row"])
                if updates:
                    result = format_merge_result(existing["row"], updates)
                else:
                    result = f"✅ Данные уже содержатся в записи №{existing['row']}"
                await message.answer(result, parse_mode="HTML")
                await state.clear()
                return

        row = config.sheets.add_record(parsed)
        result = format_lead_result(parsed, row)
        await message.answer(result, parse_mode="HTML")

    except Exception as e:
        logger.error(f"Error in /add: {e}")
        await message.answer(f"❌ Произошла ошибка: {str(e)}")


async def cmd_card_start(message: Message, state: FSMContext):
    """Handle /card command - start card recognition."""
    await message.answer(
        "🃏 Отправьте фото визитки.\n"
        "Можете добавить комментарий к фото."
    )
    await state.set_state(Form.waiting_for_card_photo)


@router.message(Command("card"))
async def cmd_card(message: Message, state: FSMContext):
    """Handle /card command."""
    await cmd_card_start(message, state)


@router.message(F.photo, Form.waiting_for_card_photo)
async def process_card_photo(message: Message, state: FSMContext):
    """Process visiting card photo."""
    photo = message.photo[-1]
    await message.answer("⏳ Распознаю визитку...")

    try:
        photo_data = await download_photo(message.bot, photo.file_id)

        parsed = config.gemini.parse_visiting_card(
            image_data=photo_data,
            additional_text=message.caption or ""
        )

        if "error" in parsed:
            await message.answer(f"❌ Ошибка распознавания: {parsed['error']}")
            await state.clear()
            return

        phone = parsed.get("phone", "")
        existing = None

        if phone and phone != "не указано":
            existing = config.sheets.find_by_phone(phone)

        if existing:
            updates = config.sheets.merge_record(parsed, existing["row"])
            if updates:
                result = format_merge_result(existing["row"], updates)
            else:
                result = f"✅ Данные визитки уже содержатся в записи №{existing['row']}"
            await message.answer(result, parse_mode="HTML")
        else:
            parsed["card_info"] = format_card_info(parsed)
            parsed["status"] = "распознано с визитки"
            row = config.sheets.add_record(parsed)
            result = format_card_result(parsed, row)
            await message.answer(result, parse_mode="HTML")

        await state.clear()

    except Exception as e:
        logger.error(f"Error processing card: {e}")
        await message.answer(f"❌ Ошибка: {str(e)}")
        await state.clear()


async def download_photo(bot: Bot, file_id: str) -> bytes:
    """Download photo bytes from Telegram."""
    file = await bot.get_file(file_id)
    return await bot.download_file(file.file_path)


@router.message(Command("search"))
async def cmd_search(message: Message):
    """Handle /search command."""
    query = message.text.replace("/search", "").strip()

    if not query:
        await message.answer("❌ Укажите номер телефона или имя для поиска.")
        return

    await message.answer("🔍 Ищу...")

    existing = None

    if any(char.isdigit() for char in query):
        existing = config.sheets.find_by_phone(query)
    else:
        matches = config.sheets.find_by_name(query)
        if matches:
            await message.answer(format_search_results(matches))
            return

    if existing:
        result = format_record(existing["data"], existing["row"])
        await message.answer(result, parse_mode="HTML")
    else:
        await message.answer("❌ Контакт не найден.")


@router.message(Command("stats"))
async def cmd_stats(message: Message):
    """Handle /stats command."""
    stats = config.sheets.get_stats(30)
    result = (
        "📊 <b>Статистика CRM</b>\n\n"
        f"📈 Всего лидов: <b>{stats['total_leads']}</b>\n"
        f"📅 За последние {stats['period_days']} дней: <b>{stats['leads_last_days']}</b>"
    )
    await message.answer(result, parse_mode="HTML")


def format_lead_result(data: dict, row: int) -> str:
    """Format lead addition result."""
    return (
        f"✅ <b>Лид добавлен!</b>\n\n"
        f"📋 Запись №{row}\n"
        f"👤 Имя: {data.get('name', 'не указано')}\n"
        f"📱 Телефон: {data.get('phone', 'не указано')}\n"
        f"🏢 Компания: {data.get('website', 'не указано')}\n"
        f"🌆 Город: {data.get('city', 'не указано')}\n"
        f"💼 Должность: {data.get('position', 'не указано')}\n"
        f"📝 Доп. инфо: {data.get('additional_info', 'не указано')}"
    )


def format_card_result(data: dict, row: int) -> str:
    """Format card recognition result."""
    return (
        f"✅ <b>Визитка распознана!</b>\n\n"
        f"📋 Запись №{row}\n"
        f"👤 Имя: {data.get('name', 'не указано')}\n"
        f"📱 Телефон: {data.get('phone', 'не указано')}\n"
        f"🏢 Компания: {data.get('company', 'не указано')}\n"
        f"💼 Должность: {data.get('position', 'не указано')}\n"
        f"📧 Email: {data.get('email', 'не указано')}\n"
        f"🌐 Сайт: {data.get('website', 'не указано')}"
    )


def format_card_info(data: dict) -> str:
    """Format visiting card info for storage."""
    parts = []
    for key in ["name", "position", "company", "email", "website", "address", "city"]:
        val = data.get(key)
        if val and val != "не указано":
            parts.append(f"{key}: {val}")
    return "; ".join(parts)


def format_merge_result(row: int, updates: dict) -> str:
    """Format merge result."""
    result = [f"✅ <b>Запись №{row} обновлена!</b>\n\n"]
    result.append("<b>Обновлённые поля:</b>\n")
    for field, changes in updates.items():
        result.append(f"• {field}: «{changes['old']}» → «{changes['new']}»")
    return "\n".join(result)


def format_record(record: dict, row: int) -> str:
    """Format single record for display."""
    return (
        f"📋 <b>Запись №{row}</b>\n\n"
        f"👤 Имя: {record.get('Имя/Должность', 'не указано')}\n"
        f"📱 Телефон: {record.get('Телефон', 'не указано')}\n"
        f"🌆 Город: {record.get('Город', 'не указано')}\n"
        f"🏢 Компания: {record.get('Сайт/Что продают', 'не указано')}\n"
        f"📅 Дата: {record.get('Дата/Время', 'не указано')}\n"
        f"📝 Доп. инфо: {record.get('Доп. информация', 'не указано')}"
    )


def format_search_results(matches: list) -> str:
    """Format search results."""
    if not matches:
        return "❌ Ничего не найдено."

    result = [f"🔍 <b>Найдено {len(matches)} записей:</b>\n"]
    for m in matches[:10]:
        record = m["data"]
        result.append(
            f"\n📋 Запись №{m['row']}:\n"
            f"  👤 {record.get('Имя/Должность', 'не указано')}\n"
            f"  📱 {record.get('Телефон', 'не указано')}"
        )

    if len(matches) > 10:
        result.append(f"\n...и ещё {len(matches) - 10} записей")

    return "\n".join(result)
