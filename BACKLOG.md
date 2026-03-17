# Major Cases — Product Backlog
Дата: 17 марта 2026
Горизонт: 3 спринта (Sprint 1 текущий, Sprint 2–3 следующие)

Приоритеты: P1 = блокирует дальнейшую работу / P2 = нужно в спринте / P3 = желательно

---

## Sprint 1 — Макет и дизайн-система (текущий)
Цель: завершить статические HTML-макеты и зафиксировать дизайн-систему до начала Next.js-разработки.
Ожидаемый результат: 4 рабочих HTML-страницы, финальный логотип, инициализированный backend-скелет.

### Дизайнер

- [ ] Согласовать финальный вариант логотипа с заказчиком — Дизайнер — P1
- [ ] Создать favicon.ico и og-image.png (1200×630) на основе утверждённого логотипа — Дизайнер — P1
- [ ] Макет страницы открытия кейса (case.html) — детальный, со спиннером и win-modal — Дизайнер — P1
- [ ] Макет главной страницы (index.html) — hero, case-grid, live-ticker, stats-bar — Дизайнер — P2
- [ ] Макет рулетки (roulette.html) — стол ставок, таймер раунда, список игроков — Дизайнер — P2
- [ ] Макет инвентаря (inventory.html) — grid скинов, фильтры, кнопки продажи/вывода — Дизайнер — P3

### Frontend

- [ ] Создать index.html: navbar, hero-секция с canvas-частицами, live-ticker, case-grid (заглушки), stats-bar, footer — Frontend — P1
- [ ] Создать case.html: спиннер с рабочей JS-анимацией (GSAP или CSS), controls row (quantity, fast mode), case contents grid — Frontend — P1
- [ ] Создать roulette.html: стол ставок, таймер, список участников раунда — Frontend — P2
- [ ] Создать inventory.html: grid скинов, фильтр по редкости, кнопка "Sell" с подтверждением — Frontend — P2
- [ ] Реализовать win-modal: анимация появления, confetti для редких предметов, кнопки действий — Frontend — P1
- [ ] Реализовать live-ticker: бесшовная прокрутка, дублирование элементов, пауза на hover — Frontend — P2
- [ ] Добавить mobile-адаптив для index.html и case.html (drawer nav, 2-col grid) — Frontend — P3
- [ ] Провести smoke-тест всех страниц в Chrome + Safari + Firefox — Frontend — P2

### Backend

- [ ] Инициализировать структуру проекта (src/modules/, src/plugins/, prisma/) — Backend — P1
- [ ] Настроить Docker Compose: PostgreSQL 16 + Redis 7, .env.example — Backend — P1
- [ ] Создать базовую Prisma-схему: модели User, Case, CaseItem, UserItem, Transaction, Round — Backend — P1
- [ ] Настроить Fastify app.ts: plugins (cors, helmet, cookie, jwt), health-check эндпоинт — Backend — P1
- [ ] Реализовать Steam OpenID 2.0 авторизацию (модуль auth/) — Backend — P2
- [ ] Реализовать JWT: выдача access/refresh токенов, refresh rotation, middleware — Backend — P2

### QA/Debugger

- [ ] Ревью HTML/CSS от frontend: валидность разметки, соответствие дизайн-гайду, кросс-браузерность — Debugger — P2 (после сдачи HTML)
- [ ] Проверить анимацию спиннера: плавность, правильный easing, отсутствие jank — Debugger — P2

---

## Sprint 2 — Разработка фронтенда на Next.js
Цель: перенести статические макеты в Next.js 15 App Router, подключить авторизацию и отображение данных с бэка.
Ожидаемый результат: работающий Next.js-фронтенд с реальными кейсами, Steam Login, и каталогом.

### Frontend

- [ ] Инициализировать Next.js 15 App Router + TypeScript + Tailwind v4 с токенами из дизайн-гайда — Frontend — P1
- [ ] Настроить NextAuth v5: Steam OAuth provider, сессии, защищённые роуты — Frontend — P1
- [ ] Создать shared layout: Header с балансом/аватаром, Footer, LiveTicker (Socket.IO) — Frontend — P1
- [ ] Реализовать страницу каталога кейсов /cases: SSG/ISR, CaseCard-компоненты, фильтр по категориям — Frontend — P1
- [ ] Реализовать страницу кейса /cases/[slug]: SSR, спиннер-компонент (GSAP), загрузка содержимого кейса — Frontend — P1
- [ ] Реализовать Win-modal как React-компонент с canvas-confetti — Frontend — P1
- [ ] Реализовать страницу инвентаря /inventory: список скинов пользователя, продажа на баланс — Frontend — P2
- [ ] Реализовать страницу рулетки /roulette: UI ставок, отображение раунда, WebSocket-подключение — Frontend — P2
- [ ] Реализовать страницу пополнения /deposit: выбор метода (Stripe/Crypto), форма ввода суммы — Frontend — P2
- [ ] Настроить Zustand: store баланса, store инвентаря, store рулетки — Frontend — P2
- [ ] Настроить TanStack Query: запросы к backend API, инвалидация кеша после открытия кейса — Frontend — P2
- [ ] Добавить skeleton-лоадеры для case-grid и инвентаря — Frontend — P3
- [ ] Оптимизировать изображения: next/image для всех скинов, lazy loading — Frontend — P3

### Backend

- [ ] CRUD кейсов: GET /cases, GET /cases/:slug (с предметами и вероятностями) — Backend — P1
- [ ] Реализовать Provably Fair: генерация server seed, HMAC-SHA256, страница верификации — Backend — P1
- [ ] Реализовать эндпоинт открытия кейса POST /cases/:id/open: списание баланса, drop-алгоритм с весами, запись в БД — Backend — P1
- [ ] Реализовать модуль инвентаря: GET /inventory, POST /inventory/:id/sell — Backend — P1
- [ ] Реализовать модуль транзакций: GET /balance, вся арифметика в integer (центы), audit log — Backend — P2
- [ ] Seed-скрипт: загрузить тестовые кейсы и предметы в БД — Backend — P2
- [ ] Настроить Socket.IO: namespace /live, событие new-drop для live ticker — Backend — P2

### QA/Debugger

- [ ] Ревью компонентов React: типобезопасность, отсутствие утечек памяти в useEffect — Debugger — P2
- [ ] Проверить Provably Fair: верифицировать несколько результатов вручную по алгоритму — Debugger — P1
- [ ] Тестирование открытия кейса: одновременные запросы, double-spend сценарий — Debugger — P1
- [ ] Проверить Steam OAuth: вход, выход, обновление токена — Debugger — P2

---

## Sprint 3 — Backend-интеграция: рулетка, платежи, вывод
Цель: завершить рулетку с WebSocket, подключить платёжные системы, реализовать вывод скинов через Steam Bot.
Ожидаемый результат: полностью функциональный MVP, готовый к тестированию на staging.

### Frontend

- [ ] Финализировать рулетку: подключить WebSocket-события (round-start, bet-placed, round-end, winner), анимация раунда — Frontend — P1
- [ ] Реализовать страницу профиля /profile: история открытий, статистика, настройки — Frontend — P2
- [ ] Реализовать промокод-форму в /deposit — Frontend — P3
- [ ] Полная mobile-адаптация всех страниц: bottom nav bar на мобайле, проверка на 375px — Frontend — P2
- [ ] Performance-аудит: lighthouse score >80 на /cases и /cases/[slug] — Frontend — P2
- [ ] Добавить micro-анимацию баланса (flash при пополнении/списании, balance-gain keyframe) — Frontend — P3

### Backend

- [ ] Рулетка — WebSocket-сервер: механика раундов 15с, Redis Pub/Sub, ставки, определение победителя — Backend — P1
- [ ] Рулетка — REST API: POST /roulette/bet, GET /roulette/round/current, GET /roulette/history — Backend — P1
- [ ] Интеграция Stripe: webhook-обработчик, зачисление баланса после payment_intent.succeeded — Backend — P1
- [ ] Интеграция Cryptomus: webhook, зачисление баланса, поддержка BTC/ETH/USDT — Backend — P2
- [ ] Steam Trade Bot: BullMQ очередь вывода, отправка трейд-офера, статусы (pending/sent/accepted/failed) — Backend — P1
- [ ] Промокоды: POST /promo/apply, хранение и валидация кодов, one-time и многоразовые — Backend — P3
- [ ] Реферальная система: генерация реф-ссылки, начисление % с депозита приведённого — Backend — P3
- [ ] Rate limiting: nginx-конфиг + Redis-based throttle на /cases/:id/open (max 10/min per user) — Backend — P2
- [ ] Admin API (базовый): GET /admin/stats, управление кейсами, блокировка пользователей — Backend — P2

### QA/Debugger

- [ ] Полный regression-тест: auth → deposit → open case → sell → withdraw — Debugger — P1
- [ ] Нагрузочный тест рулетки: 50+ одновременных подключений через Socket.IO — Debugger — P1
- [ ] Проверить Stripe и Cryptomus webhooks: replay атака, дублирование зачислений — Debugger — P1
- [ ] Тестирование вывода скинов: успешный трейд, отклонённый трейд, таймаут бота — Debugger — P1
- [ ] Проверка edge cases: открытие кейса при нулевом балансе, ставка в рулетке больше баланса — Debugger — P2
- [ ] Security-ревью: SQL injection через Prisma, JWT-подделка, CSRF на POST-эндпоинтах — Debugger — P1
- [ ] Проверить Provably Fair на продовых данных: страница верификации для пользователей — Debugger — P2
- [ ] Accessibility-ревью: focus trap в модалах, aria-live для спиннера, prefers-reduced-motion — Debugger — P3

---

## Backlog (вне спринтов — Фаза 2 после MVP)

- [ ] Апгрейд скинов (/upgrade) — Frontend + Backend
- [ ] Admin-панель с дашбордом (графики выручки, активные пользователи) — Frontend + Backend
- [ ] ЮКасса-интеграция для РФ-рынка — Backend
- [ ] Daily Free Case — бонусная система удержания — Backend + Frontend
- [ ] i18n: EN + RU переключатель (next-intl) — Frontend
- [ ] PWA-манифест и offline-страница — Frontend
- [ ] Система уровней и рейтинг пользователей — Backend + Frontend
- [ ] Чат в рулетке (WebSocket, отдельный namespace) — Backend + Frontend
- [ ] Crash / Coinflip режимы — Backend + Frontend
- [ ] Мобильное приложение (React Native или PWA+ ) — Frontend
