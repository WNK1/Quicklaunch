require('dotenv').config();
const express  = require('express');
const session  = require('express-session');
const passport = require('passport');
const Steam    = require('passport-steam').Strategy;
const path     = require('path');

const app      = express();
const PORT     = process.env.PORT || 3000;
const SITE_URL = process.env.SITE_URL || `http://localhost:${PORT}`;

/* ── Steam OpenID strategy ─────────────────────────────────────── */
passport.use(new Steam(
  {
    returnURL: `${SITE_URL}/auth/steam/return`,
    realm:     SITE_URL,
    apiKey:    process.env.STEAM_API_KEY,
  },
  (_identifier, profile, done) => {
    // profile contains what Steam sends us — nothing is hidden from the user
    const user = {
      steamId:    profile.id,
      username:   profile.displayName,
      avatar:     profile.photos?.[2]?.value ?? profile.photos?.[0]?.value ?? '',
      profileUrl: profile._json?.profileurl ?? '',
    };
    return done(null, user);
  }
));

passport.serializeUser((user, done)   => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

/* ── Middleware ────────────────────────────────────────────────── */
app.use(session({
  secret:            process.env.SESSION_SECRET || 'change-this-secret',
  resave:            false,
  saveUninitialized: false,
  cookie: {
    secure:   process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge:   7 * 24 * 60 * 60 * 1000, // 7 days
  },
}));

app.use(passport.initialize());
app.use(passport.session());

/* ── Static files ──────────────────────────────────────────────── */
app.use(express.static(path.join(__dirname)));

/* ── Auth routes ───────────────────────────────────────────────── */

// 1. User clicks "Login with Steam" → redirect to Steam
app.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' })
);

// 2. Steam redirects back here after user approves
app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  (_req, res) => res.redirect('/')
);

// 3. Logout
app.get('/auth/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

/* ── API: current user ─────────────────────────────────────────── */
// Called by the frontend on load to restore session state
app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

/* ── Global error handler ──────────────────────────────────────── */
// Must be defined after all routes; 4-argument signature is required by Express
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err.stack || err);
  res.status(500).json({ error: 'Internal server error' });
});

/* ── Start ─────────────────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`\n  CSDROP server running at ${SITE_URL}`);
  console.log(`  Steam login: ${SITE_URL}/auth/steam\n`);
});
