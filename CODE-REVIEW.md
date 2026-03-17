# CODE REVIEW -- Major Cases

**Reviewer:** Lead Manager (Tech Lead)
**Date:** 2026-03-17
**Scope:** All delivered artifacts -- design, frontend mockup, backend init

---

## 1. Architectural Review

### 1.1 Stack Assessment

| Решение | Вердикт | Комментарий |
|---------|---------|-------------|
| Next.js 15 (App Router) | Корректно | SSR для SEO главной, CSR для игровых страниц. Для gambling-сайта это оправдано. |
| Fastify 5 | Корректно | Быстрее Express в 2-3x, встроенная JSON schema validation -- важно для финансовых операций. |
| PostgreSQL 16 | Корректно | ACID-транзакции обязательны при работе с деньгами. Альтернатив нет. |
| Redis 7 | Корректно | Сессии, rate limiting, Pub/Sub для рулетки -- стандартный выбор. |
| Prisma 6 | С оговоркой | Prisma удобен для миграций, но для сложных финансовых запросов (транзакции с блокировками) придется использовать raw SQL. Это нормально, но команда должна быть готова. |
| Socket.IO 4 | Корректно | Для рулетки реального времени. Альтернатива -- ws (легче), но Socket.IO дает автореконнект, rooms, fallback на polling. |
| BullMQ | Корректно | Steam Trade Bot в отдельном процессе через очередь -- правильное решение. Падение бота не роняет API. |
| Модульный монолит | Корректно | Для команды из 2-4 человек микросервисы -- оверинженеринг. Монолит с четкими границами модулей -- верный выбор на старте. |

**Итог по стеку:** Стек выбран грамотно. Нет ненужных технологий, все решения обоснованы. Единственный риск -- Stripe может отказать gambling-проекту. Нужен fallback-план на другой процессинг (например, NowPayments, CoinPayments).

### 1.2 Архитектурные риски

1. **Двойная WebSocket реализация.** В package.json подключены и `@fastify/websocket` и `socket.io`. Нужно определиться: Socket.IO для рулетки и live drops, Fastify WebSocket убрать -- или наоборот. Два WebSocket-сервера на одном процессе создают путаницу.

2. **tsconfig: `module: "commonjs"`**. При использовании Node.js 22 LTS и современных библиотек лучше перейти на ESM (`"module": "ESNext"`, `"moduleResolution": "bundler"`). Многие npm-пакеты уже ESM-only. CommonJS создаст проблемы при обновлениях.

3. **Отсутствие `@fastify/rate-limit` в зависимостях.** Rate limiting -- критически важен для gambling-сайта (защита от бот-атак на открытие кейсов, ставки в рулетке). Нужно добавить.

---

## 2. Frontend: Соответствие дизайн-системе

### 2.1 CSS-токены: расхождения с design-guide.md

| Параметр | Design Guide | style.css (Mockup) | Проблема |
|----------|-------------|-------------------|----------|
| Фон страницы | `--bg-base: #080B14` | `--bg-deep: #080B14`, `--bg-base: #0D1120` | Переименование токенов. В гайде `--bg-base` = #080B14, в CSS `--bg-base` = #0D1120 (что в гайде `--bg-elevated`). |
| Поверхности | `--bg-surface: #111827` | `--surface: #141928` | Другой HEX. Визуально похоже, но пиксельного совпадения нет. |
| Вторичная поверхность | `--bg-surface-2: #1A2235` | `--surface-el: #1C2338` | Опять отличие. |
| Бордер | `--border: #1E2D47` | `--border: #252D42` | Граница светлее чем в гайде. |
| Radius sm | `4px` | `6px` | Мелочь, но отличается от спеки. |
| Radius md | `8px` | `10px` | Аналогично. |
| Radius lg | `12px` | `16px` | Аналогично. |
| Rarity consumer | `#B0C3D9` | `#B0B0B0` | Другой оттенок серого. CS2-канон: #B0C3D9 (с голубоватым оттенком). |
| Rarity rare/gold | `#E4AE39` | `#FFD700` | Существенно отличается. |
| CTA naming | `--cta` | `--secondary` | Полное переименование. CTA в гайде -- золотой, в CSS назван `--secondary`. |

**Вердикт:** Фронтендер создал собственную систему токенов вместо того, чтобы 1:1 перенести из design-guide.md. Это создает системную проблему: дизайнер будет указывать `--bg-surface`, а в коде такого токена нет. Требуется привести CSS-переменные в точное соответствие с design-guide.md.

### 2.2 Компоненты: что реализовано

| Компонент | Статус | Качество |
|-----------|--------|----------|
| Navigation bar | Реализован | Хорошо. Sticky, blur-backdrop, мобильный гамбургер задан. |
| Live Drop Ticker | Реализован | Хорошо. Маска по краям, дублирование для бесшовного скролла. |
| Hero Section | Реализован | Хорошо. Particle canvas placeholder, badge, CTA, stats. |
| Case Cards Grid | Реализован | Хорошо. Responsive grid, hover-эффекты, badges (NEW/HOT). |
| Buttons (Primary/Secondary/Ghost/Danger) | Реализованы | Хорошо. Все состояния (hover, active, disabled). |
| Case Opening Page (Spinner) | Реализован | Хорошо. Indicator, fade-edges, spinner items. |
| Footer | Реализован | Хорошо. 4-column grid, socials, age badge. |
| Win Modal | Не реализован | Отсутствует в CSS. |
| Roulette Page | Не реализован | Ожидаемо для текущего этапа. |
| Inventory Page | Не реализован | Ожидаемо. |
| Profile Page | Не реализован | Ожидаемо. |

### 2.3 Animations (animations.css)

**Качество: Высокое.** Реализованы все ключевые анимации:
- ticker-scroll, shimmer, pulse-online, modal-bounce, fade-in-up, float, glow-pulse
- Утилитарные классы (.anim-fade-in, .anim-float, etc.)
- Staggered delays (.delay-1 ... .delay-6)
- Hover-эффекты по редкостям
- Toast notifications
- Confetti container

**Замечания:**
- Нет `@media (prefers-reduced-motion: reduce)` блока. Design guide его требует (раздел 11). Для accessibility это обязательно.
- Toast z-index: 3000, а в design guide z-index ladder максимум -- 500 (--z-toast). Нужно согласовать.

### 2.4 HTML-файлы

**HTML-файлы mockup отсутствуют.** Есть только CSS. Это означает, что макет нельзя открыть в браузере и проверить визуально. Фронтендер должен создать хотя бы `index.html` с разметкой главной страницы и `case.html` со страницей открытия кейса.

---

## 3. Backend: анализ

### 3.1 Что реализовано

- `package.json` -- зависимости определены корректно
- `tsconfig.json` -- строгая конфигурация TypeScript (strict: true, noUncheckedIndexedAccess и др.)

### 3.2 Что отсутствует

| Элемент | Статус | Критичность |
|---------|--------|-------------|
| Prisma schema (schema.prisma) | Отсутствует | Критично -- без схемы БД невозможно двигаться дальше |
| Docker Compose (docker-compose.yml) | Отсутствует | Высокая -- PG + Redis должны запускаться одной командой |
| Точка входа (src/app.ts) | Отсутствует | Высокая -- нет даже hello-world сервера |
| Модульная структура (src/modules/) | Отсутствует | Средняя -- но архитектура должна быть заложена сразу |
| .env.example | Отсутствует | Средняя -- команда должна знать, какие env-переменные нужны |
| ESLint config | Отсутствует | Средняя -- линтер указан в scripts, но конфига нет |
| Dockerfile | Отсутствует | Низкая пока -- нужен к деплою |

### 3.3 Рекомендации по Prisma Schema

Минимально необходимые таблицы для MVP:

```
User            -- steam_id, username, avatar_url, balance (Int, центы), role, created_at
Case            -- slug, name, price (Int), image_url, is_active, order
CaseItem        -- case_id, item_id, weight (вероятность), highlighted
Item            -- name, image_url, rarity, exterior, price (Int), steam_market_hash
CaseOpening     -- user_id, case_id, item_id, client_seed, server_seed, nonce, created_at
Transaction     -- user_id, type (deposit/withdraw/case_open/case_win/sell), amount (Int), balance_after (Int), reference_id, created_at
Deposit         -- user_id, provider (stripe/cryptomus), external_id, amount (Int), status, created_at
Withdrawal      -- user_id, item_id, trade_offer_id, status, created_at
PromoCode       -- code, type (balance/bonus), value (Int), max_uses, current_uses, expires_at
UserPromo       -- user_id, promo_id, used_at
```

Ключевые моменты:
- balance в User -- это INTEGER в центах, никогда Float/Decimal
- CaseItem.weight -- integer (например, 1000 из 100000 = 1%), не float
- Transaction.balance_after -- сохранять баланс после каждой операции для аудита
- Все финансовые операции -- через PostgreSQL транзакции с SELECT ... FOR UPDATE

---

## 4. Design: оценка

### 4.1 Design Guide

**Качество: Отличное.** Это один из лучших артефактов в проекте:
- Полная система токенов (цвета, типографика, spacing, radius, shadows, glows)
- Компоненты описаны с pixel-perfect точностью
- Rarity color system соответствует CS2-канону
- Accessibility notes включены (WCAG AA, prefers-reduced-motion, aria-атрибуты)
- Responsive breakpoints заданы

### 4.2 Логотипы

5 вариантов SVG созданы по плану:
- **V1:** Типографический с параллелограммами. Минималистичный.
- **V2:** С иконкой кейса. Узнаваемый, хорош для бренда.
- **V3:** Градиентный текст с ромбами. Премиальный.
- **V4:** Агрессивный gaming-стиль с шевронами и italic. Энергичный.
- **V5:** Эмблема/щит с короной. Подходит для favicon и патча.

**Рекомендация:** V2 (с кейсом) как основной горизонтальный логотип, V5 (эмблема) как favicon/иконка. Требуется согласование с заказчиком.

### 4.3 Замечания

- В design-guide.md дата указана "March 2025" -- вероятно опечатка, должно быть March 2026.
- Отсутствуют Figma-макеты страниц. Design guide описывает компоненты, но готовых визуальных макетов (PNG/Figma) для рулетки, инвентаря и профиля пока нет.

---

## 5. Security Review

### 5.1 Критичные проблемы (нужно решить до MVP)

| # | Проблема | Приоритет | Описание |
|---|----------|-----------|----------|
| 1 | Отсутствует rate limiting | P0 | Без rate limiting бот может открывать кейсы тысячами. Нужен @fastify/rate-limit + Redis-backed throttling. |
| 2 | Нет CSRF-защиты | P0 | Для мутирующих запросов (open case, deposit, withdraw) нужен CSRF-токен или SameSite cookies. |
| 3 | Provably Fair не реализован | P0 | Алгоритм описан в плане (HMAC-SHA256), но кода нет. Это must-have до первого открытия кейса. |
| 4 | Integer arithmetic для денег | P0 | В плане указано правильно, но нет ни одной строки кода, подтверждающей реализацию. Нужно прописать в Prisma schema `Int` для всех денежных полей. |
| 5 | JWT refresh token rotation | P1 | Описано в плане (access 15min, refresh 7d), но не реализовано. Критично для предотвращения session hijacking. |
| 6 | Input validation (Zod) | P1 | Zod есть в зависимостях -- хорошо. Но нет ни одной схемы валидации. Все входящие данные должны валидироваться. |
| 7 | SQL injection через Prisma | P2 | Prisma параметризует запросы автоматически, но при использовании `$queryRaw` нужно быть осторожным. Правило: никогда не конкатенировать строки в raw SQL. |
| 8 | XSS через usernames | P2 | Steam usernames могут содержать HTML/скрипты. Всегда экранировать вывод. В Next.js JSX делает это автоматически, но dangerouslySetInnerHTML запрещен. |
| 9 | Helmet уже подключен | OK | @fastify/helmet есть в зависимостях -- устанавливает security headers (X-Frame-Options, CSP, etc.). Хорошо. |

### 5.2 Рекомендации по безопасности

1. **Все финансовые операции** (open case, deposit callback, withdraw, sell) -- только через PostgreSQL транзакции с уровнем изоляции SERIALIZABLE или с явным SELECT ... FOR UPDATE.
2. **Anti-fraud для первого вывода** -- 72 часа cooling period после первого депозита (описано в рисках).
3. **Geo-blocking** -- блокировка стран с запретом на gambling (US states, Netherlands, Belgium и др.). Реализовать через Cloudflare или на уровне приложения.
4. **2FA для админов** -- обязательно. Утечка admin-сессии = полный контроль над сайтом.
5. **Audit log** -- логировать все финансовые операции, изменения баланса, действия админов. Таблица `AuditLog` в БД.

---

## 6. Общая оценка

### Готовность к следующему этапу (Milestone 2: MVP с кейсами)

| Область | Оценка (из 10) | Комментарий |
|---------|----------------|-------------|
| Design System | 9/10 | Отличная документация. Минус: нет Figma-макетов страниц. |
| Frontend CSS | 6/10 | Хороший код, но токены расходятся с design guide. HTML-разметки нет. |
| Frontend Animations | 8/10 | Полный набор анимаций. Нет prefers-reduced-motion. |
| Backend Init | 3/10 | Только package.json и tsconfig. Нет схемы БД, нет сервера, нет docker. |
| Security Baseline | 2/10 | Ничего не реализовано. Зависимости подготовлены, но кода нет. |
| Logos | 8/10 | 5 качественных вариантов. Нужно согласование. |
| **ОБЩАЯ** | **5/10** | Сильный фундамент дизайна, слабый backend. |

### Что критически нужно исправить (BLOCKERS)

1. **Backend: создать Prisma schema** -- без этого ни один API эндпоинт не может быть написан.
2. **Backend: создать docker-compose.yml** -- PostgreSQL + Redis должны подниматься локально.
3. **Backend: создать точку входа (src/app.ts)** с базовой настройкой Fastify, plugins, health-check.
4. **Frontend: привести CSS-токены в соответствие с design-guide.md** -- единый источник правды.
5. **Frontend: создать HTML-файлы** с разметкой для главной и страницы кейса.

### Рекомендации по приоритетам (следующие 2 недели)

**Неделя 1:**
- Backend: Prisma schema + docker-compose + app.ts + Steam Auth endpoint
- Frontend: Синхронизация токенов + index.html + case.html

**Неделя 2:**
- Backend: CRUD кейсов API + JWT auth + seed data
- Frontend: Подключение к API (пока моковые данные), интерактивность JS

---

LEAD MANAGER DECISION
=====================
Task: Sprint 0 -- Подготовка проекта
Agent: designer, frontend-developer, backend-developer
Status: REVISION

Comments:
- Designer: APPROVED с замечанием (исправить дату в design-guide.md).
- Frontend: REVISION -- привести CSS-токены к design-guide.md, добавить HTML-разметку, добавить prefers-reduced-motion.
- Backend: REVISION -- критический недостаток: нет Prisma schema, нет docker-compose, нет точки входа. Зависимости корректны, но они не составляют рабочий проект.

Next step: Каждый агент получает список конкретных правок. После исправлений -- повторный review.
