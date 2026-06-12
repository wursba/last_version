/* ── CARTA ── */
function closeLetter() {
  document.getElementById('letter-overlay').classList.add('hidden');
  startHearts();
  startPhrases();
}

/* ── CONTADOR ── */
const START = new Date('2025-10-25T00:00:00');
function updateCounter() {
  const now = new Date();
  const diff = now - START;
  const s   = Math.floor(diff / 1000);
  const m   = Math.floor(s / 60);
  const h   = Math.floor(m / 60);
  const d   = Math.floor(h / 24);
  document.getElementById('cnt-days').textContent  = d;
  document.getElementById('cnt-hours').textContent = h % 24;
  document.getElementById('cnt-mins').textContent  = m % 60;
  document.getElementById('cnt-secs').textContent  = s % 60;
}
updateCounter();
setInterval(updateCounter, 1000);

/* ── CORAÇÕES FLUTUANTES ── */
const hearts = ['❤️','💕','💗','💖','💓','🌸','✨'];
function spawnHeart() {
  const el = document.createElement('div');
  el.className = 'fheart';
  el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  el.style.left = Math.random() * 100 + 'vw';
  const dur = 7 + Math.random() * 8;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay   = Math.random() * 3 + 's';
  el.style.fontSize = (.9 + Math.random() * 1.4) + 'rem';
  document.getElementById('hearts-canvas').appendChild(el);
  setTimeout(() => el.remove(), (dur + 3) * 1000);
}
function startHearts() {
  for (let i = 0; i < 10; i++) spawnHeart();
  setInterval(spawnHeart, 1200);
}

/* ── FRASES ROMÂNTICAS ── */
const phrases = [
  'Você é minha razão de sorrir…',
  'Eu te amooo…',
  'Meu coração te escolhe todos os dias…',
  'Você é minha paz…',
  'Obrigado por tudo…',
  'Te amo mais do que as palavras dizem…',
];
let phraseIdx = 0;
function showPhrase() {
  const el = document.createElement('div');
  el.className = 'floating-phrase';
  el.textContent = phrases[phraseIdx % phrases.length];
  phraseIdx++;
  el.style.top  = (15 + Math.random() * 65) + 'vh';
  el.style.left = (5 + Math.random() * 70) + 'vw';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 6200);
}
function startPhrases() {
  setTimeout(showPhrase, 3000);
  setInterval(showPhrase, 9000);
}

/* ── SURPRESA ── */
function revealSurprise() {
  const rev = document.getElementById('surprise-reveal');
  rev.classList.add('show');
  for (let i = 0; i < 20; i++) setTimeout(spawnHeart, i * 120);
  document.querySelector('.surprise-btn').style.display = 'none';
}

/* ── TIMELINE SCROLL ── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .2 });
document.querySelectorAll('.tl-item').forEach(el => obs.observe(el));

/* auto-start hearts após 200ms (caso a carta já tenha sido fechada em cache) */
setTimeout(() => {
  if (document.getElementById('letter-overlay').classList.contains('hidden')) {
    startHearts(); startPhrases();
  }
}, 200);
