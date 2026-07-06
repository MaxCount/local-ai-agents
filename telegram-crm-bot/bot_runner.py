"""Bot runner with polling and webhook support."""
import asyncio
import logging
import os
from aiohttp import web
from aiogram import Bot
from dotenv import load_dotenv

from bot import router, init_clients, create_bot


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()


async def health_check(request):
    """Health check endpoint."""
    return web.Response(text="OK")


async def handle_webhook(request):
    """Handle incoming webhook updates."""
    try:
        bot = request.app["bot"]
        dp = request.app["dp"]
        
        update_data = await request.json()
        update = dp.resolve_update(update_data)
        await dp.feed_update(bot, update)
    except Exception as e:
        logger.error(f"Error processing webhook: {e}")
    
    return web.Response(text="OK")


async def on_startup(bot: Bot, webhook_host: str):
    """Configure webhook on startup."""
    await bot.set_webhook(f"{webhook_host}/webhook")
    logger.info(f"Webhook set to {webhook_host}/webhook")


async def on_shutdown(bot: Bot):
    """Cleanup on shutdown."""
    await bot.delete_webhook()
    logger.info("Webhook deleted")


async def main():
    """Main entry point."""
    telegram_token = os.getenv("TELEGRAM_BOT_TOKEN")
    gemini_key = os.getenv("GEMINI_API_KEY")
    google_creds = os.getenv("GOOGLE_SERVICE_ACCOUNT_JSON")
    spreadsheet_id = os.getenv("SPREADSHEET_ID")

    if not telegram_token:
        logger.error("Missing TELEGRAM_BOT_TOKEN")
        return

    if not all([gemini_key, google_creds, spreadsheet_id]):
        logger.warning("Missing some Google credentials - Gemini/Sheets features may not work")
    else:
        init_clients(gemini_key, google_creds, spreadsheet_id)

    bot_mode = os.getenv("BOT_MODE", "polling")

    if bot_mode == "webhook":
        webhook_host = os.getenv("WEBHOOK_HOST")
        if not webhook_host:
            logger.error("BOT_MODE=webhook requires WEBHOOK_HOST")
            return

        app = web.Application()
        bot, dp = create_bot(telegram_token)

        dp.startup.register(lambda: on_startup(bot, webhook_host))
        dp.shutdown.register(lambda: on_shutdown(bot))

        app["bot"] = bot
        app["dp"] = dp

        app.router.add_get("/health", health_check)
        app.router.add_post("/webhook", handle_webhook)

        runner = web.AppRunner(app)
        await runner.setup()
        site = web.TCPSite(runner, "0.0.0.0", 8080)
        await site.start()

        logger.info("Bot started in webhook mode on port 8080")

        while True:
            await asyncio.sleep(3600)
    else:
        bot, dp = create_bot(telegram_token)
        logger.info("Bot started in polling mode")
        await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
