"""Bot runner with webhook support."""
import asyncio
import logging
import os
import json

from aiogram import Bot, Dispatcher
from aiogram.filters import Command
from aiogram.types import Update, Message, FSInputFile
from aiogram.webhook.aiohttp import AiohttpRequestHandler
from aiogram.webhook.security import IPFilter
from aiogram.webhook.types import Update, BotAPIServerParams
from aiohttp import web
from dotenv import load_dotenv

from bot import router, init_clients, create_bot


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()


async def on_startup(bot: Bot):
    """Configure webhook on startup."""
    webhook_host = os.getenv("WEBHOOK_HOST")
    if webhook_host:
        await bot.set_webhook(
            f"{webhook_host}/webhook",
            secret_token=os.getenv("WEBHOOK_SECRET", "secret"),
            allowed_updates=router.resolve_used_update_types()
        )
        logger.info(f"Webhook set to {webhook_host}/webhook")


async def on_shutdown(bot: Bot):
    """Cleanup on shutdown."""
    await bot.delete_webhook()
    logger.info("Webhook deleted")


async def health_check(request):
    """Health check endpoint."""
    return web.Response(text="OK")


async def main():
    """Main entry point."""
    telegram_token = os.getenv("TELEGRAM_BOT_TOKEN")
    gemini_key = os.getenv("GEMINI_API_KEY")
    google_creds = os.getenv("GOOGLE_SERVICE_ACCOUNT_JSON")
    spreadsheet_id = os.getenv("SPREADSHEET_ID")

    if not all([telegram_token, gemini_key, google_creds, spreadsheet_id]):
        logger.error("Missing required environment variables")
        return

    init_clients(gemini_key, google_creds, spreadsheet_id)

    bot_mode = os.getenv("BOT_MODE", "polling")

    if bot_mode == "webhook":
        app = web.Application(
            middlewares=[]
        )

        bot, dp = create_bot(telegram_token)

        dp.startup.register(on_startup)
        dp.shutdown.register(on_shutdown)

        Bot.set_current(bot)
        Dispatcher.set_current(dp)

        app["bot"] = bot
        app["dp"] = dp

        app.router.add_get("/health", health_check)
        app.router.add_post("/webhook", AiohttpRequestHandler(
            dp,
            bot=bot,
            request_timeout=55
        ))

        runner = web.AppRunner(app)
        await runner.setup()
        site = web.TCPSite(runner, "0.0.0.0", 8080)
        await site.start()

        logger.info("Bot started in webhook mode on port 8080")

        while True:
            await asyncio.sleep(3600)
    else:
        bot, dp = create_bot(telegram_token)

        await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
