# Development Standards -- Major Cases

**Version:** 1.0
**Обязательно к прочтению всей командой перед началом работы.**

---

## 1. Git Workflow

### Ветки

```
main              -- production-ready код. Деплоится автоматически. Прямые коммиты запрещены.
develop           -- интеграционная ветка. Сюда мержатся все feature-ветки.
feature/<name>    -- новая фича (feature/case-opening, feature/steam-auth)
fix/<name>        -- баг-фикс (fix/balance-rounding, fix/ticker-overflow)
hotfix/<name>     -- срочный фикс в production (hotfix/payment-callback)
```

### Именование веток

```
feature/case-opening-api
feature/spinner-animation
fix/csrf-token-missing
hotfix/stripe-webhook-500
```

Всегда lowercase, через дефис, не длиннее 50 символов.

### Коммиты

Формат: `<type>(<scope>): <description>`

```
feat(cases): add case opening API endpoint
fix(auth): handle expired refresh token correctly
style(nav): adjust mobile hamburger padding
refactor(transactions): extract balance update to service
chore(deps): update prisma to 6.5.1
docs(api): add swagger annotations for /cases
test(provably-fair): add HMAC verification tests
```

Типы: `feat`, `fix`, `style`, `refactor`, `chore`, `docs`, `test`, `perf`, `ci`
Scope: `auth`, `cases`, `roulette`, `inventory`, `transactions`, `trade-bot`, `provably-fair`, `promo`, `admin`, `nav`, `spinner`, `deps`

Правила:
- Описание на английском, lowercase, без точки в конце
- Максимум 72 символа в первой строке
- Если нужно подробнее -- пустая строка + body

### Pull Requests

1. Название PR = описание того, что он делает (не номер задачи)
2. Описание: что сделано, почему, как тестировать
3. Минимум 1 reviewer approve перед мержем
4. Все CI-проверки должны пройти (lint, typecheck, tests)
5. Squash merge в develop (чистая история)
6. Удалять ветку после мержа

---

## 2. Naming Conventions

### Файлы и папки

| Тип | Формат | Пример |
|-----|--------|--------|
| React компоненты | PascalCase | `CaseCard.tsx`, `SpinnerTrack.tsx` |
| Страницы (Next.js App Router) | kebab-case | `app/cases/[slug]/page.tsx` |
| API routes (Next.js) | kebab-case | `app/api/cases/route.ts` |
| Backend модули | kebab-case | `src/modules/cases/cases.service.ts` |
| Backend routes | kebab-case | `src/modules/cases/cases.routes.ts` |
| Утилиты | camelCase | `formatPrice.ts`, `calculateDrop.ts` |
| Типы/интерфейсы | PascalCase | `types/Case.ts`, `types/User.ts` |
| CSS файлы | kebab-case | `case-card.css`, `spinner.css` |
| Тесты | `*.test.ts` / `*.spec.ts` | `cases.service.test.ts` |
| Env | UPPER_SNAKE_CASE | `.env`, `.env.example` |

### Переменные и функции

| Контекст | Формат | Пример |
|----------|--------|--------|
| Переменные | camelCase | `casePrice`, `userBalance`, `serverSeed` |
| Константы | UPPER_SNAKE_CASE | `MAX_CASE_QUANTITY`, `HOUSE_EDGE_PERCENT` |
| Функции | camelCase | `openCase()`, `calculateDrop()`, `verifyHash()` |
| React компоненты | PascalCase | `<CaseCard />`, `<SpinnerTrack />` |
| CSS классы | kebab-case | `.case-card`, `.spinner-indicator` |
| CSS переменные | kebab-case с -- | `--bg-base`, `--primary`, `--rarity-covert` |
| БД таблицы (Prisma) | PascalCase singular | `User`, `Case`, `CaseOpening`, `Transaction` |
| БД поля | camelCase | `steamId`, `avatarUrl`, `createdAt` |
| API endpoints | kebab-case plural | `/api/cases`, `/api/case-openings` |
| Env переменные | UPPER_SNAKE_CASE | `DATABASE_URL`, `REDIS_URL`, `STEAM_API_KEY` |

### TypeScript

- Интерфейсы для объектов: без префикса I (`User`, не `IUser`)
- Types для union/utility: `type CaseStatus = 'active' | 'disabled'`
- Enums: PascalCase ключи, UPPER_SNAKE для значений (или string enums)
- Никогда `any` -- использовать `unknown` + type narrowing
- Strict null checks включены -- всегда обрабатывать undefined/null

---

## 3. Pre-Merge Checklist

Перед тем как нажать "Merge" на любой PR:

### Обязательно (блокирует мерж)

- [ ] TypeScript компилируется без ошибок (`tsc --noEmit`)
- [ ] ESLint проходит без ошибок (`npm run lint`)
- [ ] Нет `console.log` в production-коде (только `logger.info/warn/error`)
- [ ] Нет хардкодных секретов (API ключи, пароли) в коде
- [ ] Нет `any` в новом коде
- [ ] Финансовые операции обернуты в транзакции
- [ ] Input validation через Zod для всех публичных endpoint-ов
- [ ] Reviewer approve получен

### Желательно (не блокирует, но фиксируется)

- [ ] Тесты написаны для новой логики
- [ ] Responsive проверен на 375px, 768px, 1440px
- [ ] Performance: нет лишних ре-рендеров (React DevTools)
- [ ] Accessibility: focusable элементы, aria-атрибуты для модалок

---

## 4. Environment Variables

### Правило #1: НИКОГДА не коммитить .env файлы.

`.gitignore` обязательно содержит:
```
.env
.env.local
.env.development
.env.production
```

### Структура

Каждый сервис имеет `.env.example` с описанием ВСЕХ переменных (без значений):

```env
# === Database ===
DATABASE_URL=postgresql://user:password@localhost:5432/major_cases

# === Redis ===
REDIS_URL=redis://localhost:6379

# === Auth ===
STEAM_API_KEY=               # Get from https://steamcommunity.com/dev/apikey
JWT_ACCESS_SECRET=           # Random 64-char string
JWT_REFRESH_SECRET=          # Random 64-char string (different from access)

# === Payments ===
STRIPE_SECRET_KEY=           # sk_test_... or sk_live_...
STRIPE_WEBHOOK_SECRET=       # whsec_...
CRYPTOMUS_API_KEY=
CRYPTOMUS_MERCHANT_ID=

# === Steam Trade Bot ===
STEAM_BOT_USERNAME=
STEAM_BOT_PASSWORD=
STEAM_BOT_SHARED_SECRET=
STEAM_BOT_IDENTITY_SECRET=

# === App ===
NODE_ENV=development         # development | production
APP_URL=http://localhost:3000
API_URL=http://localhost:4000
PORT=4000

# === Provably Fair ===
PROVABLY_FAIR_MASTER_SEED=   # Initial master seed, change per season
```

### Правила работы с env:

1. Новая переменная? Добавь в `.env.example` с комментарием.
2. В коде обращайся через validated config (Zod-схема), не через `process.env` напрямую.
3. Для локальной разработки: `.env` файл. Для production: переменные окружения контейнера.
4. Никогда не логировать значения env-переменных (даже в debug-режиме).
5. JWT секреты и master seed -- генерировать через `openssl rand -hex 32`.

---

## 5. Security Standards

### 5.1 SQL Injection

- Prisma параметризует запросы автоматически -- это основная защита.
- При использовании `$queryRaw` -- ТОЛЬКО параметризованные запросы:

```typescript
// ПРАВИЛЬНО
const result = await prisma.$queryRaw`
  SELECT * FROM "User" WHERE "steamId" = ${steamId}
`;

// ЗАПРЕЩЕНО
const result = await prisma.$queryRaw(
  `SELECT * FROM "User" WHERE "steamId" = '${steamId}'`
);
```

### 5.2 XSS (Cross-Site Scripting)

- React/Next.js экранирует вывод автоматически через JSX.
- **Запрещено:** `dangerouslySetInnerHTML` без санитизации.
- Steam usernames, chat messages -- всегда экранировать перед сохранением и при выводе.
- CSP (Content Security Policy) через Helmet -- настроить строго:
  - `script-src 'self'` (никаких inline-скриптов)
  - `img-src 'self' https://steamcdn-a.akamaihd.net https://avatars.steamstatic.com` (только Steam CDN)

### 5.3 CSRF (Cross-Site Request Forgery)

- Все мутирующие запросы (POST/PUT/DELETE) -- через SameSite=Strict cookies.
- Альтернатива: CSRF-токен в заголовке X-CSRF-Token.
- GET-запросы никогда не должны изменять данные.

### 5.4 Authentication

- Steam OpenID 2.0 для входа.
- JWT access token (15 минут) + refresh token (7 дней).
- Refresh token rotation: каждый раз при обновлении выдается новый refresh token, старый инвалидируется.
- Reuse detection: если использован уже инвалидированный refresh token -- немедленно отозвать ВСЕ сессии пользователя (признак кражи токена).
- Access token -- в httpOnly cookie (не в localStorage, не в Authorization header на клиенте).

### 5.5 Financial Operations

- Все балансы -- INTEGER в центах (1 доллар = 100).
- Операции с балансом -- только через PostgreSQL транзакции.
- Double-spending prevention: SELECT ... FOR UPDATE при списании.
- Каждая транзакция записывает `balance_after` для аудита.
- Idempotency key для deposit callbacks (Stripe webhook может прийти дважды).
- Отрицательный баланс невозможен -- CHECK constraint в БД: `balance >= 0`.

### 5.6 Rate Limiting

Минимальные лимиты:

| Endpoint | Лимит |
|----------|-------|
| POST /auth/login | 5 req/min per IP |
| POST /cases/open | 30 req/min per user |
| POST /deposit | 10 req/min per user |
| POST /withdraw | 5 req/min per user |
| POST /promo/redeem | 5 req/min per user |
| WebSocket connections | 2 per user |
| General API | 100 req/min per IP |

Реализация: @fastify/rate-limit + Redis store.

### 5.7 Logging

- Pino для структурированных логов (уже в зависимостях).
- Логировать: все auth events, все финансовые операции, все ошибки, все admin actions.
- НЕ логировать: пароли, токены, полные номера карт, env-значения.
- Уровни: `fatal`, `error`, `warn`, `info`, `debug`, `trace`.
- Production: уровень `info` и выше.

---

## 6. Code Style

### General

- Indentation: 2 spaces (не tabs)
- Line endings: LF (не CRLF)
- Max line length: 120 символов
- Trailing commas: всегда (`es5` в prettier)
- Semicolons: да
- Quotes: single quotes для JS/TS, double quotes для JSX атрибутов

### Prettier config (.prettierrc)

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 120,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### ESLint

- @typescript-eslint/recommended + strict
- no-explicit-any: error
- no-console: warn (заменять на logger)
- prefer-const: error
- no-unused-vars: error

---

## 7. Design System Compliance

Frontend-разработчик ОБЯЗАН использовать токены из `design/design-guide.md` без изменений.

Если токен не подходит:
1. Обсудить с дизайнером.
2. Дизайнер обновляет design-guide.md.
3. Фронтенд обновляет CSS.

Произвольное создание новых цветов, размеров, шрифтов -- запрещено.

---

*Этот документ обновляется по мере развития проекта. Все изменения стандартов -- через PR с ревью от Lead Manager.*
