# Roadmap -- Major Cases

**От текущего состояния до Production**
**Дата составления:** 2026-03-17

---

## Текущее состояние

| Область | Готовность | Описание |
|---------|-----------|----------|
| Design System | 90% | Полный guide с токенами, компонентами, breakpoints. Нет Figma-макетов страниц. |
| Логотипы | 100% Sprint 0 | 5 вариантов SVG. Требуется согласование с заказчиком. |
| Frontend CSS | 60% | Все основные компоненты есть, но токены расходятся с design guide. HTML нет. |
| Frontend Animations | 85% | Полный набор keyframes и утилит. Нет prefers-reduced-motion. |
| Backend | 15% | Только package.json + tsconfig. Нет schema, нет сервера, нет docker. |
| Security | 0% | Зависимости подготовлены, реализации нет. |

---

## Milestone 1: Working Mockup (CURRENT -- Завершение)

**Цель:** Статический кликабельный макет, который можно открыть в браузере и показать заказчику.
**Срок:** +3-5 дней от текущей даты

### Задачи

| # | Задача | Исполнитель | Приоритет | Блокер |
|---|--------|-------------|-----------|--------|
| 1.1 | Привести CSS-токены к design-guide.md (единый источник) | Frontend | P0 | Нет |
| 1.2 | Создать index.html -- главная страница | Frontend | P0 | 1.1 |
| 1.3 | Создать case.html -- страница открытия кейса | Frontend | P0 | 1.1 |
| 1.4 | Добавить @media (prefers-reduced-motion) | Frontend | P1 | Нет |
| 1.5 | Согласовать логотип с заказчиком | Designer/PM | P1 | Нет |
| 1.6 | Исправить дату в design-guide.md (2025 -> 2026) | Designer | P2 | Нет |

### Критерий завершения

- Главная страница открывается в браузере и выглядит как design guide
- Страница кейса открывается с spinner-секцией
- Hover-эффекты и анимации работают
- Responsive работает на 375px, 768px, 1440px

---

## Milestone 2: MVP -- Cases

**Цель:** Полностью рабочая система открытия кейсов с балансом, Steam Auth и Provably Fair.
**Срок:** +4-5 недель после Milestone 1

### Backend

| # | Задача | Приоритет | Блокер |
|---|--------|-----------|--------|
| 2.1 | Prisma schema (все таблицы MVP) | P0 | Нет |
| 2.2 | Docker Compose (PostgreSQL + Redis) | P0 | Нет |
| 2.3 | Fastify app.ts с plugins (cors, helmet, jwt, cookie) | P0 | 2.2 |
| 2.4 | Config module: env validation через Zod | P0 | 2.3 |
| 2.5 | Steam OpenID auth + JWT (access + refresh + rotation) | P0 | 2.3 |
| 2.6 | CRUD Cases API (admin creates, public reads) | P0 | 2.1 |
| 2.7 | Provably Fair module (server seed, client seed, HMAC-SHA256) | P0 | Нет |
| 2.8 | Case Opening API (drop algorithm, weighted random, PF integration) | P0 | 2.6, 2.7 |
| 2.9 | Balance service (integer arithmetic, transactions) | P0 | 2.1 |
| 2.10 | Seed data: 5-10 тестовых кейсов с предметами | P1 | 2.6 |
| 2.11 | Rate limiting (@fastify/rate-limit + Redis) | P1 | 2.3 |
| 2.12 | .env.example + README с инструкцией запуска | P1 | 2.2 |

### Frontend (переход на Next.js)

| # | Задача | Приоритет | Блокер |
|---|--------|-----------|--------|
| 2.13 | Init Next.js 15 + Tailwind v4 + перенос design tokens | P0 | M1 завершен |
| 2.14 | Layout (Header, Ticker, Footer) как серверные компоненты | P0 | 2.13 |
| 2.15 | Steam Auth интеграция (NextAuth v5) | P0 | 2.5 |
| 2.16 | Каталог кейсов (ISR, подтягивает из API) | P0 | 2.6 |
| 2.17 | Страница кейса (содержимое, вероятности) | P0 | 2.6 |
| 2.18 | Spinner анимация (GSAP) + интеграция с API | P0 | 2.8 |
| 2.19 | Win Modal с confetti | P1 | 2.18 |
| 2.20 | Balance display (Zustand store, обновление после действий) | P0 | 2.9 |
| 2.21 | Inventory page (список выигранных, продажа на баланс) | P1 | 2.9 |

### Критерий завершения

- Пользователь входит через Steam
- Видит каталог кейсов
- Открывает кейс (баланс списывается)
- Видит анимацию рулетки
- Получает предмет в инвентарь
- Может продать предмет обратно на баланс
- Provably Fair верифицируем (hash + seed раскрытие)
- Rate limiting работает

---

## Milestone 3: + Roulette + Payments

**Цель:** Мультиплеерная рулетка, пополнение баланса, вывод скинов.
**Срок:** +3-4 недели после Milestone 2

### Backend

| # | Задача | Приоритет | Блокер |
|---|--------|-----------|--------|
| 3.1 | Roulette: WebSocket server (Socket.IO) + Redis Pub/Sub | P0 | M2 |
| 3.2 | Roulette: механика раундов (15с таймер, ставки, результат) | P0 | 3.1 |
| 3.3 | Roulette: Provably Fair для раундов | P0 | 2.7 |
| 3.4 | Stripe интеграция (checkout session, webhook) | P0 | M2 |
| 3.5 | Cryptomus интеграция | P0 | M2 |
| 3.6 | Deposit API + webhook handlers | P0 | 3.4, 3.5 |
| 3.7 | Steam Trade Bot (BullMQ worker, отдельный процесс) | P0 | M2 |
| 3.8 | Withdrawal API (запрос вывода, очередь, отправка trade offer) | P0 | 3.7 |
| 3.9 | Промокоды API | P1 | 2.9 |
| 3.10 | Реферальная система | P1 | 2.9 |

### Frontend

| # | Задача | Приоритет | Блокер |
|---|--------|-----------|--------|
| 3.11 | Roulette page (WebSocket подключение, UI ставок, таймер) | P0 | 3.1 |
| 3.12 | Roulette анимация (вращение, результат, winner highlight) | P0 | 3.11 |
| 3.13 | Deposit page (выбор метода, ввод суммы, Stripe Checkout) | P0 | 3.6 |
| 3.14 | Crypto deposit flow | P0 | 3.6 |
| 3.15 | Withdrawal flow (выбор скинов, подтверждение, статус) | P0 | 3.8 |
| 3.16 | Промокод UI (инпут + применение) | P1 | 3.9 |
| 3.17 | Live Drop Ticker -- реальные данные через WebSocket | P1 | 3.1 |
| 3.18 | Profile page (история, статистика, настройки) | P1 | M2 |

### Критерий завершения

- Рулетка работает в реальном времени (несколько пользователей видят одно и то же)
- Пользователь может пополнить баланс через Stripe или крипту
- Пользователь может вывести скин через Steam Trade
- Промокоды работают
- Live ticker показывает реальные дропы

---

## Milestone 4: Production-Ready

**Цель:** Сайт готов к запуску с реальными пользователями.
**Срок:** +2-3 недели после Milestone 3

### Infrastructure

| # | Задача | Приоритет |
|---|--------|-----------|
| 4.1 | Dockerfile для API + frontend | P0 |
| 4.2 | Docker Compose production (с nginx, certbot) | P0 |
| 4.3 | Cloudflare настройка (DNS, CDN, DDoS protection, firewall rules) | P0 |
| 4.4 | nginx reverse proxy (rate limiting, SSL termination, WebSocket proxy) | P0 |
| 4.5 | GitHub Actions CI/CD (lint, typecheck, test, build, deploy) | P0 |
| 4.6 | Мониторинг: health checks, error tracking (Sentry), uptime | P0 |
| 4.7 | Database backups (автоматические, ежедневные) | P0 |
| 4.8 | S3 storage для изображений скинов | P1 |
| 4.9 | Staging environment | P1 |

### Security Hardening

| # | Задача | Приоритет |
|---|--------|-----------|
| 4.10 | Penetration testing (manual or automated) | P0 |
| 4.11 | Geo-blocking для запрещенных юрисдикций | P0 |
| 4.12 | Anti-fraud: cooling period, velocity checks, suspicious pattern detection | P0 |
| 4.13 | Admin panel с 2FA | P0 |
| 4.14 | Audit log для всех финансовых и admin операций | P0 |
| 4.15 | CSP headers (strict Content Security Policy) | P1 |
| 4.16 | Backup Steam Trade Bot accounts (3-5 ротация) | P1 |

### Quality

| # | Задача | Приоритет |
|---|--------|-----------|
| 4.17 | Full QA cycle: auth, cases, roulette, deposit, withdraw, edge cases | P0 |
| 4.18 | Load testing (k6 или artillery): 1000 concurrent users, 100 rps | P0 |
| 4.19 | Mobile testing (real devices: iOS Safari, Android Chrome) | P0 |
| 4.20 | SEO: meta tags, OG images, sitemap.xml, robots.txt | P1 |
| 4.21 | Legal pages: Terms of Service, Privacy Policy, Responsible Gaming | P0 |
| 4.22 | Pixel-perfect ревью от дизайнера | P1 |
| 4.23 | Performance: Lighthouse 90+ на главной, lazy loading, image optimization | P1 |

### Критерий завершения

- Сайт работает на production-сервере за Cloudflare
- SSL, rate limiting, DDoS protection активны
- Все платежные методы работают с реальными (test-mode) ключами
- Steam Trade Bot отправляет trade offers
- Admin может управлять кейсами и пользователями
- Legal pages на месте
- Мониторинг и алерты настроены
- Load test пройден без degradation

---

## Dependency Graph (что блокирует что)

```
Design Guide (DONE) --> CSS Tokens --> HTML Mockup --> Next.js Migration
                                                           |
Prisma Schema --> Docker Compose --> Fastify App --> Steam Auth
                      |                                |
                      |                         Cases CRUD API --> Case Opening API
                      |                                |               |
                      |                         Provably Fair ----+    |
                      |                                                |
                      +---> Redis -----> Rate Limiting           Frontend Cases
                                  |                                    |
                                  +---> Roulette WS               Spinner + GSAP
                                  |                                    |
                                  +---> BullMQ --> Trade Bot      Win Modal
                                                       |
                                                  Withdrawal API
                                                       |
Stripe Integration ---------> Deposit API ---------> Balance Service
Cryptomus Integration -----/
```

---

## Timeline (оптимистичный)

```
Неделя:  1     2     3     4     5     6     7     8     9    10    11
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
M1:      [=====]
M2:            [===========================]
M3:                                         [====================]
M4:                                                              [==========]
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
Launch:                                                                   ^
```

**Общая оценка до launch:** 10-11 недель при полной загрузке команды (1 designer, 1 frontend, 1 backend).

---

## Risks for Timeline

| Риск | Влияние на сроки | Митигация |
|------|-----------------|-----------|
| Stripe отказывает gambling-проекту | +1-2 недели на альтернативу | Параллельно начать интеграцию Cryptomus, изучить NowPayments |
| Steam Trade Bot банят | +1 неделя на восстановление | Подготовить 3-5 бот-аккаунтов заранее |
| Один человек на backend | Весь M2 и M3 зависит от него | Четко приоритизировать задачи, не распыляться |
| Отсутствие staging | Баги на production | Выделить staging-сервер к M3 |

---

*Roadmap обновляется еженедельно по результатам review.*
