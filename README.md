README описывает корпоративный сайт «Вингард Автоматика» на базе Payload Website Template и Next.js.​

Overview
Vingard Pro — корпоративный сайт компании «Вингард Автоматика», интегратора промышленных решений HMI/SCADA и АСУТП. Проект построен на официальном Payload Website Template и доработан под структуру сайта: главная, О компании, Проекты, Карьера, Контакты.​

Основные разделы публичной части:

Главная: http://5.35.83.50/

О компании: http://5.35.83.50/about

Проекты (портфолио): http://5.35.83.50/portfolio

Карьера: http://5.35.83.50/jobs

Контакты: http://5.35.83.50/contacts​

Tech Stack
Проект основан на Payload Website Template и использует современный стек:​

Next.js 15.4.8 (App Router)

React 19

TypeScript

Payload CMS 3.67.0

Postgres через @payloadcms/db-postgres (в Docker)

Tailwind CSS 4, tailwindcss-animate

Payload плагины: SEO, Search, Redirects, Nested Docs, Form Builder, Live Preview, Lexical, Admin Bar​

Инфраструктура:

Бэкенд и фронтенд в одном Next.js приложении

Nginx как reverse proxy

Запуск Node-приложения через PM2 на VPS​

Features
Основные возможности проекта:​

Гибкая система страниц на Payload (layout builder, rich text на Lexical)

Предпросмотр черновиков и live preview для контента

Встроенный SEO‑плагин (title, description, Open Graph, индексируемость)

Поиск по сайту через Payload Search

Управление редиректами через Payload Redirects

Формы (обратная связь, заявки) через Payload Form Builder​

Для редакторов и маркетинга:

Управление шапкой и подвалом через globals

Управление метаданными и OG для страниц из админ‑панели

Публикация и планирование контента через drafts/versions​

Project Structure
Проект следует структуре Payload Website Template (основные пути):​

src/payload.config.ts — конфигурация Payload (коллекции, globals, плагины)

src/app — Next.js App Router, страницы и маршруты

src/app/(pages) — публичные страницы сайта

src/app/admin — админ‑панель Payload

src/blocks, src/components — layout‑блоки и UI‑компоненты

public — статические ресурсы (кроме загружаемых медиа)​

Типовая структура контента в Payload (коллекции и globals):

Pages — маркетинговые страницы (главная, О компании, Карьера, Контакты и др.)

Projects/Portfolio — проекты/кейсы компании

Posts/Blog (если включено) — новости и статьи

Forms — конфигурация форм для сайта

Media — загружаемые файлы (изображения и т.д.)

Globals: Header, Footer, SEO/Settings​

Getting Started
Требования
Node.js: ^18.20.2 или >=20.9.0

pnpm: ^9 или ^10

Доступная Postgres БД (локально или в Docker)​

Установка
Клонировать репозиторий:

bash
git clone https://github.com/RuslanKharisov/vingard.git
cd vingard
Скопировать переменные окружения:

bash
cp .env.example .env
Заполнить параметры подключения к Postgres, серверу и домену (URL сайта, SMTP и т.д.).​

Установить зависимости:

bash
pnpm install
Запустить в режиме разработки:

bash
pnpm dev
Приложение будет доступно по адресу http://localhost:3000.​

Полезные скрипты
pnpm dev — запуск dev‑сервера

pnpm build — сборка Next.js приложения

pnpm start — запуск в production‑режиме (next start -H 127.0.0.1 -p 3000)

pnpm ci — миграции + build (payload migrate && npm run build)

pnpm migrate:create — создать миграцию

pnpm migrate:up — применить миграции

pnpm lint / pnpm lint:fix — линтинг

pnpm test, pnpm test:int, pnpm test:e2e — интеграционные и e2e‑тесты​

Draft Preview & Live Preview
Все ключевые коллекции (страницы, проекты и т.п.) настроены для работы с черновиками и предпросмотром:​

Черновики (drafts) позволяют готовить контент без публикации

Draft preview открывает страницу по специальному URL с черновой версией

Live preview позволяет видеть результат изменений в почти реальном времени​

Редакторы могут:

Создавать и сохранять черновики

Просматривать страницу до публикации

Публиковать изменения, после чего страница автоматически обновляется на сайте (через on‑demand revalidation)​

Deployment
Деплой автоматизирован через GitHub Actions и выполняется на VPS.​

CI/CD Workflow
Workflow Deploy to VPS запускается при пуше в ветку main и:​

Проверяет, есть ли изменения в репозитории

Через rsync синхронизирует код на сервер в директорию ~/nextjs-app

Подключается по SSH и выполняет:

Копирование .env из ~/secrets/env

Установку зависимостей: npm install

Миграции + сборку: NODE_OPTIONS="--max-old-space-size=2536 --no-deprecation" npm run ci

Запуск/рестарт приложения через PM2 с использованием ecosystem.config.cjs

pm2 save для сохранения конфигурации​

Сервер
Postgres запущен в Docker‑контейнере

Nginx настроен как reverse proxy для Node‑приложения

Приложение доступно по адресу http://5.35.83.50/ (до привязки домена)​

Environment
Ключевые переменные окружения (имена могут отличаться, уточняются в .env.example):​

Параметры подключения к Postgres (POSTGRES_URL или аналог)

PAYLOAD_SECRET — секрет Payload

NEXT_PUBLIC_SERVER_URL / PAYLOAD_PUBLIC_SERVER_URL — базовый URL сайта

SMTP‑настройки для отправки писем (если используются формы/уведомления)

License
Проект наследует лицензию шаблона — MIT.​
