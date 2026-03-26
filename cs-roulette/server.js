require('dotenv').config();
const express  = require('express');
const session  = require('express-session');
const passport = require('passport');
const path     = require('path');

const app      = express();
const PORT     = process.env.PORT || 3000;
const SITE_URL = process.env.SITE_URL || `http://localhost:${PORT}`;

const STEAM_ENABLED = !!process.env.STEAM_API_KEY;

/* ── Steam OpenID strategy (only if API key is set) ────────────── */
if (STEAM_ENABLED) {
  const Steam = require('passport-steam').Strategy;
  passport.use(new Steam(
    {
      returnURL: `${SITE_URL}/auth/steam/return`,
      realm:     SITE_URL,
      apiKey:    process.env.STEAM_API_KEY,
    },
    (_identifier, profile, done) => {
      const user = {
        steamId:    profile.id,
        username:   profile.displayName,
        avatar:     profile.photos?.[2]?.value ?? profile.photos?.[0]?.value ?? '',
        profileUrl: profile._json?.profileurl ?? '',
      };
      return done(null, user);
    }
  ));
}

passport.serializeUser((user, done)   => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

/* ── Middleware ────────────────────────────────────────────────── */
app.use(session({
  secret:            process.env.SESSION_SECRET || 'csdrop-dev-secret-change-in-prod',
  resave:            false,
  saveUninitialized: false,
  cookie: {
    secure:   process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge:   7 * 24 * 60 * 60 * 1000,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

/* ── Static files ──────────────────────────────────────────────── */
app.use(express.static(path.join(__dirname)));

/* ── Auth routes ───────────────────────────────────────────────── */
if (STEAM_ENABLED) {
  app.get('/auth/steam',
    passport.authenticate('steam', { failureRedirect: '/' })
  );

  app.get('/auth/steam/return',
    passport.authenticate('steam', { failureRedirect: '/' }),
    (_req, res) => res.redirect('/')
  );
} else {
  app.get('/auth/steam', (_req, res) => {
    res.redirect('/?steam_auth=disabled');
  });
}

app.get('/auth/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

/* ── API: current user ─────────────────────────────────────────── */
app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

/* ── Global error handler ──────────────────────────────────────── */
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err.stack || err);
  res.status(500).json({ error: 'Internal server error' });
});

/* ── Start ─────────────────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`\n  ✅  CSDROP запущен: ${SITE_URL}`);
  if (STEAM_ENABLED) {
    console.log(`  Steam вход: ${SITE_URL}/auth/steam`);
  } else {
    console.log(`  ⚠️  STEAM_API_KEY не задан — вход через Steam отключён`);
    console.log(`  Скопируй .env.example → .env и заполни STEAM_API_KEY для включения авторизации`);
  }
  console.log();
});
