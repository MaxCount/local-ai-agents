# LINUCHI — Интернет-магазин чехлов, сумок и портпледов

E-commerce сайт для белорусской компании ЛИНУЧИ, специализирующейся на производстве чехлов и сумок.

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте http://localhost:3000

---

## Структура проекта

```
linuchi/
├── src/
│   ├── app/                    # Next.js App Router страницы
│   │   ├── page.tsx           # Главная страница
│   │   ├── catalog/           # Каталог товаров
│   │   ├── product/[slug]/    # Страница товара
│   │   ├── contacts/          # Контакты
│   │   ├── delivery/          # Доставка и оплата
│   │   ├── guarantee/         # Гарантия
│   │   └── custom/            # Индивидуальный пошив
│   ├── components/ui/          # UI компоненты
│   ├── lib/
│   │   ├── cart-context.tsx   # Контекст корзины
│   │   └── queries.ts         # Демо-данные
│   └── collections/            # Payload CMS коллекции
└── payload.config.ts           # Конфигурация Payload CMS
```

---

## Деплой на VPS hoster.by

### 1. Регистрация на Neon

1. https://neon.tech - создать проект
2. Скопировать connection string

### 2. Настройка VPS

```bash
# Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# PM2
npm install -g pm2

# Nginx
apt-get install -y nginx
```

### 3. Nginx конфигурация

```nginx
# /etc/nginx/sites-available/linuchi
server {
    listen 80;
    server_name linuchi.by www.linuchi.by;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/linuchi /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

### 4. SSL

```bash
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d linuchi.by -d www.linuchi.by
```

### 5. Деплой

```bash
# На сервере
cd /var/www/linuchi
npm install --production
npm run build

# .env файл
cat > .env << EOF
POSTGRES_URL=postgresql://user:pass@host/db?sslmode=require
PAYLOAD_SECRET=$(openssl rand -base64 32)
NEXT_PUBLIC_SERVER_URL=https://linuchi.by
EOF

pm2 start npm --name "linuchi" -- start
pm2 save
pm2 startup
```

---

## Payload CMS

Для включения админ-панели:

1. `npm install @payloadcms/bundler-webpack @payloadcms/ui`
2. Раскомментировать `admin` в `payload.config.ts`
3. `npm run payload:dev`
4. http://localhost:3000/admin

Документация: https://payloadcms.com/docs

---

## Команды

```bash
npm run dev      # Разработка
npm run build    # Сборка
npm start        # Продакшн
```

---

(c) 2024 LINUCHI
