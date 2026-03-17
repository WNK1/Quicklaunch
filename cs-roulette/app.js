/* ===== DATA ===== */
const CASES = [
  { id:1, name:'Изумрудный Дракон', price:399, emoji:'🐉', badge:'HOT', opens:48085, rarity:'legendary' },
  { id:2, name:'Ночной Рейнджер',   price:249, emoji:'🌙', badge:'HOT', opens:379866, rarity:'epic' },
  { id:3, name:'Золотая Коллекция', price:699, emoji:'👑', badge:'',    opens:18845,  rarity:'legendary' },
  { id:4, name:'Кибер Волк',        price:139, emoji:'🐺', badge:'NEW', opens:176045, rarity:'rare' },
  { id:5, name:'Огненный Рыцарь',   price:299, emoji:'🔥', badge:'',    opens:119624, rarity:'epic' },
  { id:6, name:'Снежная Буря',      price:49,  emoji:'❄️', badge:'',    opens:664923, rarity:'common' },
  { id:7, name:'Токсичное Лобби',   price:1299,emoji:'☢️', badge:'HOT', opens:45046,  rarity:'legendary' },
  { id:8, name:'Пегас',             price:399, emoji:'🦄', badge:'NEW', opens:28559,  rarity:'epic' },
];

const CS2_CASES = [
  { id:10, name:'Коллекция 2015',  price:399, emoji:'📦', badge:'',    opens:92000,  rarity:'rare' },
  { id:11, name:'Операция Брако',  price:249, emoji:'🎯', badge:'',    opens:74000,  rarity:'rare' },
  { id:12, name:'Chroma 2',        price:199, emoji:'🌈', badge:'',    opens:110000, rarity:'common' },
  { id:13, name:'Gamma Case',      price:299, emoji:'⚡', badge:'',    opens:86000,  rarity:'epic' },
  { id:14, name:'Prisma 2',        price:149, emoji:'💎', badge:'',    opens:130000, rarity:'common' },
  { id:15, name:'Fracture',        price:349, emoji:'💥', badge:'HOT', opens:67000,  rarity:'epic' },
];

const SKINS = [
  { name:'AK-47 | Вулкан',          price:4200, emoji:'🔫', rarity:'#B44BFF' },
  { name:'AWP | Медуза',             price:9800, emoji:'🎯', rarity:'#FFD700' },
  { name:'M4A4 | Хоулл',            price:3100, emoji:'🔫', rarity:'#B44BFF' },
  { name:'Керамбит | Доплер',       price:18000,emoji:'🔪', rarity:'#FFD700' },
  { name:'Glock | Факс-оружие',      price:420,  emoji:'🔫', rarity:'#4B9EFF' },
  { name:'Desert Eagle | Принтер',  price:890,  emoji:'🔫', rarity:'#9B6BFF' },
  { name:'USP-S | Неонуар',         price:1200, emoji:'🔫', rarity:'#9B6BFF' },
  { name:'AWP | Пронг',             price:650,  emoji:'🎯', rarity:'#4B9EFF' },
  { name:'M4A1-S | Золотая Спираль',price:2300, emoji:'🔫', rarity:'#B44BFF' },
  { name:'AK-47 | Картель',         price:380,  emoji:'🔫', rarity:'#4B9EFF' },
  { name:'Five-SeveN | Обезьяны',   price:720,  emoji:'🔫', rarity:'#9B6BFF' },
  { name:'SG 553 | Сайрекс',        price:560,  emoji:'🔫', rarity:'#4B9EFF' },
];

const TICKER_DATA = [
  { user:'Dmitry_K', skin:'AWP | Медуза', price:'9 800 G', emoji:'🎯', rare:true },
  { user:'xXSniper',  skin:'AK-47 | Вулкан', price:'4 200 G', emoji:'🔫', rare:true },
  { user:'ProGamer',  skin:'Glock-18 | Синий', price:'120 G', emoji:'🔫', rare:false },
  { user:'killer2k',  skin:'M4A4 | Хоулл', price:'3 100 G', emoji:'🔫', rare:true },
  { user:'shadow99',  skin:'USP-S | Неонуар', price:'1 200 G', emoji:'🔫', rare:false },
  { user:'NightWolf', skin:'Керамбит | Доплер', price:'18 000 G', emoji:'🔪', rare:true },
  { user:'Ваня228',   skin:'Desert Eagle', price:'890 G', emoji:'🔫', rare:false },
  { user:'Maximus',   skin:'AWP | Пронг', price:'650 G', emoji:'🎯', rare:false },
  { user:'Alpha_GO',  skin:'M4A1-S | Золото', price:'2 300 G', emoji:'🔫', rare:true },
  { user:'stealth_x', skin:'AK-47 | Картель', price:'380 G', emoji:'🔫', rare:false },
];

const FLIP_GAMES = [
  { player:'DimaN_pro',  side:'ct', items:3, value:1240, waiting:true },
  { player:'NightKill',  side:'t',  items:5, value:3800, waiting:true },
  { player:'shadow99',   side:'ct', items:2, value:650,  waiting:true },
  { player:'ProPlayer1', side:'t',  items:8, value:7200, waiting:true },
  { player:'xX_Snake_Xx',side:'ct', items:4, value:2100, waiting:true },
];

const BATTLES = [
  { mode:'1v1', p1:'DimaN_pro', p2:null,       cases:['Токсичное Лобби x2','Пегас x1'], total:2997 },
  { mode:'2v2', p1:'Alpha_GO',  p2:'xX_Snake', cases:['Изумрудный Дракон x1','Золотая Коллекция x1'], total:1098 },
  { mode:'1v1', p1:'Maximus',   p2:'killer2k', cases:['Снежная Буря x5'], total:245 },
  { mode:'1v1', p1:'shadow99',  p2:null,        cases:['Кибер Волк x3'], total:417 },
];

const ROULETTE_HISTORY = ['r','b','b','r','g','r','b','r','b','b','r','b','r','r','b','g'];

/* ===== ROUTER ===== */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.dataset.page;
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');
  });
});

/* ===== CANVAS BG ===== */
(function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  const particles = [];
  const N = 60;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < N; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.5 ? '#FF6B00' : '#00E5CC',
      alpha: Math.random() * 0.5 + 0.1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });
    // lines between nearby
    ctx.globalAlpha = 1;
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = particles[i].color;
          ctx.globalAlpha = (1 - d/120) * 0.08;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ===== COUNTER ANIMATION ===== */
function animateCount(el, target) {
  let start = 0;
  const dur = 2000;
  const step = target / (dur / 16);
  const t = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(t); }
    el.textContent = Math.floor(start).toLocaleString('ru');
  }, 16);
}
document.querySelectorAll('.stat-num').forEach(el => {
  animateCount(el, parseInt(el.dataset.count));
});

/* ===== TICKER ===== */
(function buildTicker() {
  const inner = document.getElementById('tickerInner');
  const all = [...TICKER_DATA, ...TICKER_DATA]; // duplicate for loop
  all.forEach(item => {
    const el = document.createElement('div');
    el.className = 'ticker-item' + (item.rare ? ' rare' : '');
    el.innerHTML = `
      <div class="ti-color" style="background:${item.rare ? '#FFD700' : '#8a99b0'}"></div>
      <span class="ti-name">${item.user}</span>
      <span>${item.emoji}</span>
      <span style="color:var(--text)">${item.skin}</span>
      <span class="ti-price">${item.price}</span>
      <span style="color:rgba(255,255,255,0.15)">|</span>
    `;
    inner.appendChild(el);
  });
})();

/* ===== CASES GRID ===== */
function buildCaseCard(c) {
  const badge = c.badge === 'HOT' ? `<div class="case-badge-hot">🔥 HOT</div>` :
                c.badge === 'NEW' ? `<div class="case-badge-new">✨ NEW</div>` : '';
  return `
    <div class="case-card" data-caseid="${c.id}">
      <div class="case-img-wrap">
        <div class="case-img-placeholder">${c.emoji}</div>
        ${badge}
        <div class="case-opens">${c.opens.toLocaleString('ru')}</div>
      </div>
      <div class="case-info">
        <div class="case-name">${c.name}</div>
        <div class="case-price">⚡ ${c.price} G</div>
      </div>
    </div>
  `;
}

document.getElementById('featuredCases').innerHTML = CASES.map(buildCaseCard).join('');
document.getElementById('cs2Cases').innerHTML = CS2_CASES.map(buildCaseCard).join('');

document.querySelectorAll('.case-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = parseInt(card.dataset.caseid);
    const c  = [...CASES, ...CS2_CASES].find(x => x.id === id);
    if (c) openCaseModal(c);
  });
});

/* ===== UPGRADE PAGE ===== */
const skinsGrid = document.getElementById('upgradeSkinsGrid');
SKINS.forEach((skin, i) => {
  const el = document.createElement('div');
  el.className = 'skin-card';
  el.innerHTML = `
    <span class="skin-card-img">${skin.emoji}</span>
    <div class="skin-card-name">${skin.name}</div>
    <div class="skin-card-price">${skin.price.toLocaleString('ru')} G</div>
    <div class="skin-rarity-bar" style="background:${skin.rarity}"></div>
  `;
  el.addEventListener('click', () => {
    document.querySelectorAll('.skin-card').forEach(s => s.classList.remove('selected'));
    el.classList.add('selected');
    selectSkinForUpgrade(skin);
  });
  skinsGrid.appendChild(el);
});

let selectedSkin = null;

function selectSkinForUpgrade(skin) {
  selectedSkin = skin;
  const mySlot = document.getElementById('mySlot');
  mySlot.innerHTML = `
    <div style="text-align:center;padding:8px">
      <div style="font-size:52px">${skin.emoji}</div>
      <div style="font-size:11px;color:var(--text2);margin-top:4px">${skin.name}</div>
    </div>`;
  mySlot.classList.add('filled');
  document.getElementById('myValue').textContent = skin.price.toLocaleString('ru') + ' G';
  document.getElementById('upgradeResult').classList.add('hidden');
  document.getElementById('upgradeBtn').classList.remove('hidden');
  updateUpgradeTarget();
}

function findClosestSkin(targetPrice) {
  // Find skin with price >= targetPrice (next tier up), fallback to closest
  const sorted = [...SKINS].sort((a,b) => a.price - b.price);
  const above = sorted.filter(s => s.price >= targetPrice);
  if (above.length) return above[0];
  return sorted.reduce((a,b) => Math.abs(b.price - targetPrice) < Math.abs(a.price - targetPrice) ? b : a);
}

function updateUpgradeTarget() {
  if (!selectedSkin) return;
  const mult = parseFloat(document.querySelector('.mult-btn.active').dataset.mult);
  const targetPrice = Math.round(selectedSkin.price * mult);
  // chance: higher multiplier = lower chance. x1.5→63%, x2→47%, x5→19%, x10→9.5%, x50→1.9%
  const chanceRaw = (1 / mult) * 95;
  const chance = Math.max(1, Math.min(90, Math.round(chanceRaw)));

  const targetSkin = findClosestSkin(targetPrice);
  document.getElementById('targetValue').textContent = targetSkin.price.toLocaleString('ru') + ' G';

  const targetSlot = document.getElementById('targetSlot');
  targetSlot.innerHTML = `
    <div style="text-align:center;padding:8px">
      <div style="font-size:52px">${targetSkin.emoji}</div>
      <div style="font-size:11px;color:var(--text2);margin-top:4px">${targetSkin.name}</div>
    </div>`;
  targetSlot.classList.add('filled-target');

  document.getElementById('ringPercent').textContent = chance + '%';
  const circumference = 565;
  const offset = circumference - (circumference * chance / 100);
  document.getElementById('ringProgress').setAttribute('stroke-dashoffset', offset);
}

document.querySelectorAll('.mult-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mult-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateUpgradeTarget();
  });
});

document.getElementById('upgradeBtn').addEventListener('click', () => {
  if (!selectedSkin) { showNotification('Выбери скин для апгрейда!'); return; }

  const mult     = parseFloat(document.querySelector('.mult-btn.active').dataset.mult);
  const chance   = Math.max(1, Math.min(90, Math.round((1 / mult) * 95)));
  const roll     = Math.random() * 100;
  const win      = roll < chance;
  const winSkin  = findClosestSkin(Math.round(selectedSkin.price * mult));

  const btn = document.getElementById('upgradeBtn');
  btn.textContent = 'КРУТИМ...';
  btn.disabled = true;

  // Spin animation on ring
  const ring = document.getElementById('upgradeRing');
  ring.style.animation = 'spin 0.6s linear infinite';

  // Animate ring progress from 0 → result quickly to build tension
  const ringProgress = document.getElementById('ringProgress');
  const circumference = 565;
  ringProgress.setAttribute('stroke-dashoffset', circumference); // reset to 0%
  setTimeout(() => {
    ringProgress.style.transition = 'stroke-dashoffset 1.2s ease-out';
    const fillTo = win ? chance : Math.round(roll); // fill to roll value
    ringProgress.setAttribute('stroke-dashoffset', circumference - (circumference * fillTo / 100));
  }, 100);

  setTimeout(() => {
    ring.style.animation = '';
    ringProgress.style.transition = '';
    btn.disabled = false;

    if (win) {
      showUpgradeResult(winSkin, true);
    } else {
      btn.textContent = 'АПГРЕЙД ↑';
      showFloatingText('❌ Поражение  –' + selectedSkin.price.toLocaleString('ru') + ' G', false);
      showNotification('Не повезло! Попробуй ещё раз');
      // shake effect
      ring.style.animation = 'shake 0.4s ease';
      setTimeout(() => { ring.style.animation = ''; updateUpgradeTarget(); }, 450);
    }
  }, 1800);
});

function showUpgradeResult(skin, win) {
  const btn = document.getElementById('upgradeBtn');
  btn.textContent = 'АПГРЕЙД ↑';
  btn.classList.add('hidden');

  const resultEl = document.getElementById('upgradeResult');
  document.getElementById('urEmoji').textContent  = skin.emoji;
  document.getElementById('urName').textContent   = skin.name;
  document.getElementById('urPrice').textContent  = skin.price.toLocaleString('ru') + ' G';
  resultEl.classList.remove('hidden');
  resultEl.classList.add('win-anim');

  showFloatingText('🎉 +'  + skin.price.toLocaleString('ru') + ' G', true);
}

document.getElementById('urAgainBtn').addEventListener('click', () => {
  document.getElementById('upgradeResult').classList.add('hidden');
  document.getElementById('upgradeBtn').classList.remove('hidden');
  if (selectedSkin) updateUpgradeTarget();
});
document.getElementById('urSellBtn').addEventListener('click', () => {
  const price = parseInt(document.getElementById('urPrice').textContent);
  showNotification('💰 Продано! +' + document.getElementById('urPrice').textContent);
  document.getElementById('upgradeResult').classList.add('hidden');
  document.getElementById('upgradeBtn').classList.remove('hidden');
});

function showFloatingText(text, positive) {
  const el = document.createElement('div');
  el.textContent = text;
  el.style.cssText = `
    position: fixed; top: 40%; left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Rajdhani', sans-serif;
    font-size: 36px; font-weight: 700;
    color: ${positive ? 'var(--teal)' : 'var(--red)'};
    text-shadow: 0 0 20px ${positive ? 'var(--teal)' : 'var(--red)'};
    z-index: 9999;
    pointer-events: none;
    animation: floatUp 1.5s ease-out forwards;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1600);
}

const floatStyle = document.createElement('style');
floatStyle.textContent = `
  @keyframes floatUp {
    0%   { opacity: 1; transform: translate(-50%,-50%); }
    100% { opacity: 0; transform: translate(-50%, -200%); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
`;
document.head.appendChild(floatStyle);

/* ===== COINFLIP PAGE ===== */
(function buildCoinFlip() {
  const list = document.getElementById('coinflipList');
  FLIP_GAMES.forEach(g => {
    const el = document.createElement('div');
    el.className = 'flip-card';
    el.innerHTML = `
      <div class="flip-coin ${g.side}">${g.side === 'ct' ? '🛡️' : '💣'}</div>
      <div class="flip-info">
        <div class="flip-player">${g.player}</div>
        <div class="flip-items">${g.items} скинов</div>
      </div>
      <div class="flip-value">${g.value.toLocaleString('ru')} G</div>
      <div class="flip-vs">VS</div>
      <div class="flip-coin ${g.side === 'ct' ? 't' : 'ct'}" style="opacity:0.3;border:2px dashed rgba(255,255,255,0.1)">❓</div>
      <button class="flip-join-btn">ВОЙТИ</button>
    `;
    list.appendChild(el);
  });

  document.getElementById('createFlipBtn').addEventListener('click', () => {
    showNotification('Выберите скины для создания игры');
  });
})();

/* ===== BATTLE PAGE ===== */
(function buildBattles() {
  const list = document.getElementById('battleList');
  BATTLES.forEach(b => {
    const el = document.createElement('div');
    el.className = 'battle-card';
    const casesHtml = b.cases.map(c => {
      const [name, count] = c.split(' x');
      return `<div class="battle-case-chip"><span>${name}</span><span class="chip-count">x${count}</span></div>`;
    }).join('');
    el.innerHTML = `
      <div class="battle-card-header">
        <div class="battle-mode">${b.mode} БАТЛ</div>
        <div class="battle-total">⚡ ${b.total.toLocaleString('ru')} G</div>
      </div>
      <div class="battle-players">
        <div class="battle-player">
          <div class="battle-avatar">${getAvatar(b.p1)}</div>
          <div class="battle-player-name">${b.p1}</div>
        </div>
        <div class="battle-vs">VS</div>
        <div class="battle-player">
          <div class="battle-avatar ${b.p2 ? '' : 'empty'}">${b.p2 ? getAvatar(b.p2) : '+'}</div>
          <div class="battle-player-name">${b.p2 || 'Ожидаем...'}</div>
        </div>
      </div>
      <div class="battle-cases">${casesHtml}</div>
    `;
    list.appendChild(el);
  });
})();

function getAvatar(name) {
  const emojis = ['🐉','🦊','🐺','🦁','🐯','🐻','🐼','🦅'];
  let hash = 0;
  for (const c of name) hash += c.charCodeAt(0);
  return emojis[hash % emojis.length];
}

/* ===== CONTRACTS PAGE ===== */
(function buildContracts() {
  const slotsEl = document.getElementById('contractSlots');
  const filled = [];
  for (let i = 0; i < 10; i++) {
    const slot = document.createElement('div');
    slot.className = 'contract-slot';
    slot.textContent = '+';
    slot.addEventListener('click', () => {
      if (slot.classList.contains('filled')) {
        slot.textContent = '+';
        slot.classList.remove('filled');
        const idx = filled.indexOf(i);
        if (idx > -1) filled.splice(idx, 1);
      } else {
        const skin = SKINS[Math.floor(Math.random() * SKINS.length)];
        slot.textContent = skin.emoji;
        slot.classList.add('filled');
        filled.push(i);
      }
      const result = document.getElementById('contractResult');
      if (filled.length === 10) {
        result.innerHTML = '<div style="font-size:60px">🎁</div>';
        result.classList.add('ready');
      } else {
        result.innerHTML = `<div class="slot-empty"><span>Добавь ${10 - filled.length} скинов</span></div>`;
        result.classList.remove('ready');
      }
    });
    slotsEl.appendChild(slot);
  }
})();

/* ===== ROULETTE PAGE ===== */
(function buildRoulette() {
  const CELL_W   = 72; // 64px cell + 4px gap on each side = 72px stride
  const TOTAL    = 300; // enough cells so any offset stays in bounds
  // 15 red, 15 black, 2 green per 32 pattern (≈ real CS roulette odds)
  const SEQ  = ['r','r','b','b','r','b','r','b','b','r','b','r','b','r','b','g',
                 'r','b','r','b','b','r','b','b','r','b','r','r','b','b','r','g'];
  const LABEL = { r:'7', b:'◆', g:'0' };

  const inner = document.createElement('div');
  inner.className = 'roulette-inner';
  inner.id = 'rouletteInner';
  for (let i = 0; i < TOTAL; i++) {
    const c    = SEQ[i % SEQ.length];
    const cell = document.createElement('div');
    cell.className  = 'roulette-cell ' + c;
    cell.textContent = LABEL[c];
    inner.appendChild(cell);
  }
  document.getElementById('rouletteTrack').appendChild(inner);

  // history
  const histEl = document.getElementById('rouletteHistory');
  const colorLabels = LABEL;
  ROULETTE_HISTORY.forEach(c => {
    const el = document.createElement('div');
    el.className = 'hist-item ' + c;
    el.textContent = LABEL[c];
    histEl.appendChild(el);
  });

  // demo players
  const redPlayers   = [{ name:'DimaN', amount:500 },{ name:'ProGamer', amount:1200 }];
  const greenPlayers = [{ name:'NightKill', amount:200 }];
  const blackPlayers = [{ name:'shadow99', amount:800 },{ name:'Alpha_GO', amount:3000 },{ name:'xX_Snake', amount:500 }];

  function renderPlayers(id, players) {
    document.getElementById(id).innerHTML = players.map(p => `
      <div class="bet-player-row">
        <span class="bpr-name">${p.name}</span>
        <span class="bpr-amount">${p.amount.toLocaleString('ru')} G</span>
      </div>`).join('');
  }
  renderPlayers('redPlayers',   redPlayers);
  renderPlayers('greenPlayers', greenPlayers);
  renderPlayers('blackPlayers', blackPlayers);

  let spinning   = false;
  let betColor   = null;
  let countdown  = null;
  let timeLeft   = 15;
  const timerEl  = document.getElementById('rouletteTimer');
  const timerBar = document.getElementById('rouletteTimerBar');

  function startCountdown() {
    timeLeft = 15;
    clearInterval(countdown);
    updateTimerUI();
    countdown = setInterval(() => {
      timeLeft--;
      updateTimerUI();
      if (timeLeft <= 0) {
        clearInterval(countdown);
        doSpin();
      }
    }, 1000);
  }

  function updateTimerUI() {
    if (timerEl)  timerEl.textContent  = timeLeft + 's';
    if (timerBar) timerBar.style.width = (timeLeft / 15 * 100) + '%';
  }

  function doSpin() {
    if (spinning) return;
    spinning = true;
    document.querySelectorAll('.bet-btn').forEach(b => { b.disabled = true; });

    const track      = document.getElementById('rouletteTrack');
    const trackW     = track.offsetWidth;
    const trackCenter = trackW / 2;

    // Determine result
    const outcomes = ['r','r','r','b','b','b','b','b','b','g'];
    const result   = outcomes[Math.floor(Math.random() * outcomes.length)];

    // Find a landing cell in the range [200..260] that matches result
    let landIdx = 220 + Math.floor(Math.random() * 30);
    for (let d = 0; d < SEQ.length; d++) {
      const idx = landIdx + d;
      if (SEQ[idx % SEQ.length] === result) { landIdx = idx; break; }
    }
    // Clamp so we never exceed TOTAL
    landIdx = Math.min(landIdx, TOTAL - 5);

    // Pixel offset: place landIdx cell center at trackCenter
    const cellLeft  = landIdx * CELL_W;
    const jitter    = (Math.random() - 0.5) * 40; // ±20px within cell
    const targetPx  = cellLeft - trackCenter + CELL_W / 2 + jitter;

    // 1. Snap back instantly (no visible jump because inner starts at 0)
    inner.style.transition = 'none';
    inner.style.transform  = 'translateX(0)';

    // 2. On next two frames apply animation (double rAF ensures transition:none is painted first)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      inner.style.transition = 'transform 5s cubic-bezier(0.04, 0.92, 0.06, 1)';
      inner.style.transform  = `translateX(-${Math.max(0, targetPx)}px)`;
    }));

    setTimeout(() => {
      // Highlight landed cell
      const cells = inner.querySelectorAll('.roulette-cell');
      cells.forEach(c => c.classList.remove('landed'));
      if (cells[landIdx]) cells[landIdx].classList.add('landed');

      const resultName = result === 'r' ? 'КРАСНЫЙ' : result === 'g' ? 'ЗЕЛЁНЫЙ' : 'ЧЁРНЫЙ';
      const win = betColor
        ? (betColor === 'red'   && result === 'r') ||
          (betColor === 'green' && result === 'g') ||
          (betColor === 'black' && result === 'b')
        : false;

      if (betColor) {
        showNotification(win ? `✅ Победа! Выпал ${resultName}` : `❌ Поражение. Выпал ${resultName}`);
      } else {
        showNotification(`Выпал ${resultName}`);
      }

      // Add to history
      const newHist = document.createElement('div');
      newHist.className = 'hist-item ' + result;
      newHist.textContent = LABEL[result];
      histEl.insertBefore(newHist, histEl.firstChild);
      if (histEl.children.length > 24) histEl.removeChild(histEl.lastChild);

      // Reset for next round
      setTimeout(() => {
        spinning  = false;
        betColor  = null;
        document.querySelectorAll('.bet-btn').forEach(b => { b.disabled = false; });
        startCountdown();
      }, 2500);
    }, 5200);
  }

  document.querySelectorAll('.bet-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (spinning) { showNotification('Дождитесь конца раунда'); return; }
      betColor = btn.dataset.color;
      const label = betColor === 'red' ? 'КРАСНЫЙ' : betColor === 'green' ? 'ЗЕЛЁНЫЙ' : 'ЧЁРНЫЙ';
      showNotification(`Ставка на ${label}!`);
      document.querySelectorAll('.bet-btn').forEach(b => b.classList.remove('bet-active'));
      btn.classList.add('bet-active');
    });
  });

  // Start first round countdown
  startCountdown();
})();

/* ===== CASE OPEN MODAL ===== */
let currentCase = null;

function openCaseModal(c) {
  currentCase = c;
  document.getElementById('modalTitle').textContent = c.name.toUpperCase();
  document.getElementById('openPriceBadge').textContent = c.price + ' G';
  document.getElementById('winResult').classList.add('hidden');
  document.getElementById('openCaseBtn').classList.remove('hidden');
  document.getElementById('openPriceBadge').classList.remove('hidden');
  buildSpinner();
  document.getElementById('caseModal').classList.add('open');
}

function buildSpinner() {
  const spinner = document.getElementById('caseSpinner');
  spinner.innerHTML = '';
  const inner = document.createElement('div');
  inner.className = 'spinner-inner';
  inner.id = 'spinnerInner';
  for (let i = 0; i < 40; i++) {
    const skin = SKINS[Math.floor(Math.random() * SKINS.length)];
    const item = document.createElement('div');
    item.className = 'spinner-item';
    item.innerHTML = `
      <div class="si-emoji">${skin.emoji}</div>
      <div class="si-name">${skin.name}</div>
      <div class="si-price">${skin.price.toLocaleString('ru')} G</div>
    `;
    inner.appendChild(item);
    if (i === 33) item.dataset.winner = 'true'; // winner at position 33
  }
  spinner.appendChild(inner);
}

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('caseModal').classList.remove('open');
});

document.getElementById('caseModal').addEventListener('click', e => {
  if (e.target === document.getElementById('caseModal')) {
    document.getElementById('caseModal').classList.remove('open');
  }
});

document.getElementById('openCaseBtn').addEventListener('click', () => {
  spinCase();
});

document.getElementById('openAgainBtn').addEventListener('click', () => {
  document.getElementById('winResult').classList.add('hidden');
  document.getElementById('openCaseBtn').classList.remove('hidden');
  document.getElementById('openPriceBadge').classList.remove('hidden');
  buildSpinner();
});

document.getElementById('sellWinBtn').addEventListener('click', () => {
  showNotification('Скин продан!');
  document.getElementById('caseModal').classList.remove('open');
});

function spinCase() {
  const inner = document.getElementById('spinnerInner');
  const openBtn = document.getElementById('openCaseBtn');
  const priceBadge = document.getElementById('openPriceBadge');

  openBtn.disabled = true;
  openBtn.textContent = 'КРУТИМ...';

  // target: item at index ~33, which is 33 * 106px from start
  // each item is 100px + 6px gap = 106px
  // center at 106 * 33 - spinner_width/2 + 50
  const spinnerWidth = document.getElementById('caseSpinner').offsetWidth;
  const targetOffset = 106 * 33 - spinnerWidth / 2 + 50;
  const jitter = (Math.random() - 0.5) * 80;

  inner.style.transition = 'transform 5s cubic-bezier(0.05, 0.9, 0.1, 1)';
  inner.style.transform = `translateX(-${targetOffset + jitter}px)`;

  setTimeout(() => {
    openBtn.disabled = false;
    openBtn.classList.add('hidden');
    priceBadge.classList.add('hidden');

    // pick winner skin
    const winner = SKINS[Math.floor(Math.random() * SKINS.length)];
    document.getElementById('winSkinImg').textContent = winner.emoji;
    document.getElementById('winSkinName').textContent = winner.name;
    document.getElementById('winSkinPrice').textContent = winner.price.toLocaleString('ru') + ' G';
    document.getElementById('winResult').classList.remove('hidden');
    openBtn.textContent = 'ОТКРЫТЬ КЕЙС';

    // glow winner cell
    const items = inner.querySelectorAll('.spinner-item');
    if (items[33]) items[33].classList.add('winner');

    showFloatingText(winner.emoji + ' ' + winner.price.toLocaleString('ru') + ' G', true);
  }, 5100);
}

/* ===== NOTIFICATION ===== */
function showNotification(text) {
  const el = document.createElement('div');
  el.textContent = text;
  el.style.cssText = `
    position: fixed; bottom: 24px; right: 24px;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-left: 3px solid var(--orange);
    color: var(--text);
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    z-index: 9999;
    animation: slideInNotif 0.3s ease, fadeOutNotif 0.4s ease 2.6s forwards;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3100);
}

const notifStyle = document.createElement('style');
notifStyle.textContent = `
  @keyframes slideInNotif {
    from { transform: translateX(100%); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
  }
  @keyframes fadeOutNotif {
    from { opacity: 1; }
    to   { opacity: 0; transform: translateX(20px); }
  }
`;
document.head.appendChild(notifStyle);

/* ===== DEMO BALANCE ===== */
document.getElementById('loginBtn').addEventListener('click', () => {
  document.getElementById('loginBtn').textContent = 'ПРОФИЛЬ';
  document.getElementById('balance').textContent = '1 000 G';
  showNotification('Добро пожаловать, Игрок! +1000 G бонус');
});
