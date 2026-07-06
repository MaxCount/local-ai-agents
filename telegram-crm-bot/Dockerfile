FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    dumb-init \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED=1
ENV BOT_MODE=webhook

USER root

CMD ["dumb-init", "python", "-m", "bot_runner"]
