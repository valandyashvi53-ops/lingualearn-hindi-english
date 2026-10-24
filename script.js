'use strict';

/* ===== 1. LESSON CONTENT (add more lessons/questions here) =====
   t: 'tr' translate (word bank) | 'arr' arrange words | 'mc' multiple choice
      'fill' fill the blank     | 'match' pairs
   p: prompt, q: question, a: correct answer, x: extra wrong words, o: options, m: pairs */
const LESSONS = [
  { title: 'Basics', icon: '🌱', qs: [
    { t: 'tr', p: 'Translate to Hindi', q: 'I am a student.', a: 'मैं एक छात्र हूँ', x: ['है', 'तुम'] },
    { t: 'tr', p: 'Translate to English', q: 'मुझे पानी चाहिए।', a: 'I want water', x: ['milk', 'you'] },
    { t: 'mc', p: 'Choose the correct meaning', q: 'What does "किताब" mean?', o: ['Book', 'Pen', 'Table', 'Door'], a: 'Book' },
    { t: 'arr', p: 'Arrange the words in Hindi', q: 'The boy is reading a book.', a: 'लड़का किताब पढ़ रहा है' },
    { t: 'fill', p: 'Complete the sentence', q: 'मैं रोज़ ___ पीता हूँ।', o: ['दूध', 'किताब', 'घर'], a: 'दूध' },
    { t: 'match', p: 'Match the pairs', m: [['Water', 'पानी'], ['Book', 'किताब'], ['House', 'घर'], ['Milk', 'दूध']] }
  ] },
  { title: 'Greetings', icon: '👋', qs: [
    { t: 'tr', p: 'Translate to Hindi', q: 'How are you?', a: 'आप कैसे हैं', x: ['कहाँ', 'मैं'] },
    { t: 'tr', p: 'Translate to English', q: 'मेरा नाम राहुल है।', a: 'My name is Rahul', x: ['your', 'He'] },
    { t: 'mc', p: 'Choose the correct meaning', q: 'Which word means "Thank you"?', o: ['धन्यवाद', 'नमस्ते', 'अलविदा', 'माफ़ कीजिए'], a: 'धन्यवाद' },
    { t: 'arr', p: 'Arrange the words in Hindi', q: 'What is your name?', a: 'आपका नाम क्या है' },
    { t: 'fill', p: 'Complete the sentence', q: '___, आप कैसे हैं?', o: ['नमस्ते', 'किताब', 'पानी'], a: 'नमस्ते' },
    { t: 'match', p: 'Match the pairs', m: [['Hello', 'नमस्ते'], ['Thank you', 'धन्यवाद'], ['Goodbye', 'अलविदा'], ['Sorry', 'माफ़ कीजिए']] }
  ] },
  { title: 'Family & Food', icon: '🍚', qs: [
    { t: 'tr', p: 'Translate to Hindi', q: 'This is my mother.', a: 'यह मेरी माँ है', x: ['मेरा', 'वह'] },
    { t: 'tr', p: 'Translate to English', q: 'वह खाना खाता है।', a: 'He eats food', x: ['drinks', 'She'] },
    { t: 'mc', p: 'Choose the correct meaning', q: 'What does "पिता" mean?', o: ['Father', 'Mother', 'Brother', 'Sister'], a: 'Father' },
    { t: 'arr', p: 'Arrange the words in Hindi', q: 'I eat rice.', a: 'मैं चावल खाता हूँ' },
    { t: 'fill', p: 'Complete the sentence', q: 'मेरी ___ स्कूल जाती है।', o: ['बहन', 'भाई', 'पिता'], a: 'बहन' },
    { t: 'match', p: 'Match the pairs', m: [['Mother', 'माँ'], ['Brother', 'भाई'], ['Rice', 'चावल'], ['Bread', 'रोटी']] }
  ] },
  { title: 'Everyday Life', icon: '🌤️', qs: [
    { t: 'tr', p: 'Translate to Hindi', q: 'We go to school.', a: 'हम स्कूल जाते हैं', x: ['जाता', 'वह'] },
    { t: 'tr', p: 'Translate to English', q: 'आज मौसम अच्छा है।', a: 'The weather is good today', x: ['bad', 'yesterday'] },
    { t: 'mc', p: 'Choose the correct word', q: 'How do you say "red" in Hindi?', o: ['लाल', 'नीला', 'हरा', 'पीला'], a: 'लाल' },
    { t: 'arr', p: 'Arrange the words in Hindi', q: 'She is drinking tea.', a: 'वह चाय पी रही है' },
    { t: 'fill', p: 'Complete the sentence', q: 'मैं अपने ___ में रहता हूँ।', o: ['घर', 'पानी', 'चाय'], a: 'घर' },
    { t: 'match', p: 'Match the pairs', m: [['Red', 'लाल'], ['Blue', 'नीला'], ['Green', 'हरा'], ['Yellow', 'पीला']] }
  ] }
];

const BADGES = [
  ['🎯', 'First Steps', 'Complete a lesson', s => s.done.length >= 1],
  ['⚡', 'XP Hunter', 'Earn 100 XP', s => s.xp >= 100],
  ['🔥', 'On Fire', 'Reach a 3-day streak', () => streak() >= 3],
  ['💯', 'Perfectionist', 'Finish a lesson with no mistakes', s => s.perfect >= 1],
  ['🏆', 'Graduate', 'Complete all lessons', s => s.done.length >= LESSONS.length]
];
const SAMPLE_USERS = [['Aarav_K', 1240], ['Meera.S', 980], ['Rohan_P', 760], ['Diya_J', 540], ['Kabir_M', 320], ['Anaya_R', 180]];
const GOAL = 50;

/* ===== 2. STATE & HELPERS ===== */
const KEY = 'lingualearn_v1';
const DEF = { name: '', xp: 0, streak: 0, last: '', done: [], correct: 0, perfect: 0, sound: true, day: '', dayXp: 0 };
let S = load();
function load() {
  try { return Object.assign({}, DEF, JSON.parse(localStorage.getItem(KEY) || '{}')); }
  catch (e) { return Object.assign({}, DEF); }
}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage unavailable */ } };
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const today = () => iso(new Date());
const yest = () => { const d = new Date(); d.setDate(d.getDate() - 1); return iso(d); };
const streak = () => (S.last === today() || S.last === yest()) ? S.streak : 0;
const dayXp = () => S.day === today() ? S.dayXp : 0;
const norm = s => s.toLowerCase().replace(/[.,!?।]/g, '').replace(/\s+/g, ' ').trim();
const shuf = a => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [r[i], r[j]] = [r[j], r[i]]; } return r; };
const stat = (i, v, l) => `<div class="stat"><span aria-hidden="true">${i}</span><strong>${esc(v)}</strong><small>${l}</small></div>`;
function addXp(n) {
  S.xp += n;
  if (S.day !== today()) { S.day = today(); S.dayXp = 0; }
  S.dayXp += n;
}
let tt;
function toast(m) {
  const t = $('#toast'); t.textContent = m; t.classList.add('show');
  clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2200);
}
function beep(ok) {
  if (!S.sound) return;
  try {
    const c = beep.c || (beep.c = new (window.AudioContext || window.webkitAudioContext)());
    const o = c.createOscillator(), g = c.createGain();
    o.frequency.value = ok ? 660 : 220; g.gain.value = 0.08;
    o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.15);
  } catch (e) { /* audio not available */ }
}

/* ===== 3. NAVIGATION & RENDERING ===== */
function showView(id) { $$('.view').forEach(e => { e.hidden = e.id !== 'v-' + id; }); }
function go(v) {
  showView(v === 'path' ? 'home' : v);
  $$('.side [data-go], .topnav [data-go]').forEach(b => b.classList.toggle('active', b.dataset.go === v));
  render();
  if (v === 'path') $('#pathSec').scrollIntoView({ behavior: 'smooth' }); else window.scrollTo(0, 0);
}
function badgesHtml() {
  return BADGES.map(([i, n, d, f]) => { const on = f(S); return `<div class="badge ${on ? 'on' : ''}"><span aria-hidden="true">${i}</span><strong>${n}</strong><small>${d}</small><em>${on ? '✔ Unlocked' : '🔒 Locked'}</em></div>`; }).join('');
}
function render() {
  const name = S.name || 'Learner', lvl = Math.floor(S.xp / 100) + 1, pct = Math.round(S.done.length / LESSONS.length * 100);
  $('#welcome').textContent = `Namaste, ${name}! 👋`;
  $('#avatar').textContent = (S.name || '?')[0].toUpperCase();
  const stats = stat('🎖️', 'Level ' + lvl, 'Current level') + stat('⭐', S.xp, 'Total XP') + stat('🔥', streak(), 'Day streak') +
    stat('📘', `${S.done.length}/${LESSONS.length}`, 'Lessons done (' + pct + '%)');
  $('#stats').innerHTML = stats;
  $('#pStats').innerHTML = stats + stat('✅', S.correct, 'Correct answers') + stat('🏅', BADGES.filter(b => b[3](S)).length + '/' + BADGES.length, 'Achievements');
  const dx = Math.min(dayXp(), GOAL);
  $('#goalTxt').textContent = dx >= GOAL ? 'Goal reached today! Great work 🎉' : `${dx} / ${GOAL} XP earned today`;
  $('#goalBar').style.width = dx / GOAL * 100 + '%';
  $('#path').replaceChildren(...LESSONS.map((l, i) => {
    const done = S.done.includes(i), open = i === 0 || S.done.includes(i - 1), cur = open && !done;
    const state = done ? 'completed' : open ? 'available' : 'locked';
    const n = el('div', 'node');
    const b = el('button', 'nb ' + (done ? 'done' : cur ? 'cur' : 'lock'), done ? '✔' : open ? l.icon : '🔒');
    b.type = 'button';
    b.setAttribute('aria-label', `Lesson ${i + 1}: ${l.title}, ${state}`);
    b.onclick = () => open ? start(l.qs, `Lesson ${i + 1}: ${l.title}`, i) : toast('Finish the previous lesson to unlock this one.');
    n.append(b, el('span', 'nl', `${i + 1}. ${l.title}`), el('span', 'ns', done ? 'Completed – tap to replay' : open ? 'Tap to start' : 'Locked'));
    return n;
  }));
  $('#badges').innerHTML = $('#pBadges').innerHTML = badgesHtml();
  const rows = SAMPLE_USERS.concat([[(S.name || 'You'), S.xp, true]]).sort((a, b) => b[1] - a[1]);
  $('#board').innerHTML = rows.map((r, i) => `<li class="${r[2] ? 'you' : ''}"><span class="rk">#${i + 1}</span><span class="nm">${esc(r[0])}${r[2] ? ' (You)' : ' · sample'}</span><span class="xp">${r[1]} XP</span></li>`).join('');
  $('#nameInput').value = S.name;
  syncSound();
}
function syncSound() {
  $('#soundBtn').textContent = S.sound ? '🔊' : '🔇';
  $('#soundBtn').setAttribute('aria-pressed', S.sound);
  $('#soundSet').checked = S.sound;
}

/* ===== 4. LESSON ENGINE ===== */
let L = null;
function start(qs, title, idx) {
  L = { qs: shuf(qs).map(q => ({ ...q })), i: 0, ok: 0, xp: 0, title, idx, checked: false };
  if (idx != null) L.qs = qs.map(q => ({ ...q })); // lessons keep their designed order
  $$('.side .active, .topnav .active').forEach(b => b.classList.remove('active'));
  showView('lesson'); window.scrollTo(0, 0);
  $('#lt').textContent = title;
  ask();
}
function ask() {
  const q = L.qs[L.i], t = q.t, isTiles = t === 'tr' || t === 'arr', isOpts = t === 'mc' || t === 'fill';
  Object.assign(L, { sel: [], checked: false, miss: 0, pick: null, left: null, matched: 0 });
  const pct = L.i / L.qs.length * 100;
  $('#bar').style.width = pct + '%';
  $('#bar').parentElement.setAttribute('aria-valuenow', Math.round(pct));
  $('#qn').textContent = `Question ${L.i + 1} of ${L.qs.length}`;
  $('#prompt').textContent = q.p;
  $('#qbox').innerHTML = t === 'match' ? '<p class="qtext">Tap a word, then tap its meaning.</p>'
    : `<p class="qtext">${esc(q.q).replace('___', '<span class="blank"></span>')}</p>`;
  ['ans', 'bank', 'opts', 'match'].forEach(id => $('#' + id).replaceChildren());
  $('#ans').hidden = $('#bank').hidden = !isTiles;
  $('#opts').hidden = !isOpts;
  $('#match').hidden = t !== 'match';
  $('#hint').hidden = !isTiles;
  $('#hintTxt').textContent = '';
  $('#fb').className = 'fb'; $('#fb').textContent = '';
  $('#qa').classList.remove('locked');
  const a = $('#act'); a.textContent = 'Check'; a.disabled = true; a.hidden = t === 'match';
  if (isTiles) {
    const words = q.a.split(' ');
    let b; do { b = shuf(words.concat(q.x || [])); } while (!q.x && words.length > 1 && b.join(' ') === words.join(' '));
    L.bank = b; tiles();
  } else if (isOpts) {
    shuf(q.o).forEach(o => {
      const b = el('button', 'opt', o); b.type = 'button'; b.setAttribute('aria-pressed', 'false');
      b.onclick = () => {
        if (L.checked) return;
        $$('#opts .opt').forEach(x => { x.classList.remove('sel'); x.setAttribute('aria-pressed', 'false'); });
        b.classList.add('sel'); b.setAttribute('aria-pressed', 'true'); L.pick = o; a.disabled = false;
      };
      $('#opts').append(b);
    });
  } else matchUI(q);
}
function tiles() {
  const a = $('#ans'), b = $('#bank'); a.replaceChildren(); b.replaceChildren();
  L.sel.forEach(i => {
    const t = el('button', 'tile', L.bank[i]); t.type = 'button'; t.setAttribute('aria-label', 'Remove ' + L.bank[i]);
    t.onclick = () => { if (L.checked) return; L.sel = L.sel.filter(x => x !== i); tiles(); };
    a.append(t);
  });
  L.bank.forEach((w, i) => {
    const t = el('button', 'tile', w); t.type = 'button';
    if (L.sel.includes(i)) { t.disabled = true; t.classList.add('used'); }
    else t.onclick = () => { if (L.checked) return; L.sel.push(i); tiles(); };
    b.append(t);
  });
  $('#act').disabled = !L.sel.length;
}
function matchUI(q) {
  const lw = el('div', 'col'), rw = el('div', 'col');
  shuf(q.m.map(p => p[0])).forEach(w => {
    const b = el('button', 'tile', w); b.type = 'button';
    b.onclick = () => { $$('#match .col:first-child .tile').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); L.left = b; };
    lw.append(b);
  });
  shuf(q.m.map(p => p[1])).forEach(w => {
    const b = el('button', 'tile', w); b.type = 'button';
    b.onclick = () => {
      if (!L.left) { toast('Pick a word on the left first.'); return; }
      if (q.m.some(p => p[0] === L.left.textContent && p[1] === w)) {
        [L.left, b].forEach(x => { x.disabled = true; x.classList.remove('sel'); x.classList.add('good'); });
        L.left = null;
        if (++L.matched === q.m.length) judge(L.miss === 0, q.m.map(p => p[0] + ' = ' + p[1]).join(', '));
      } else {
        L.miss++; b.classList.add('bad'); beep(false); toast('Not a match – try again!');
        setTimeout(() => b.classList.remove('bad'), 500);
      }
    };
    rw.append(b);
  });
  $('#match').append(lw, rw);
}
function check() {
  if (L.checked) return;
  const q = L.qs[L.i];
  const ok = (q.t === 'tr' || q.t === 'arr') ? norm(L.sel.map(i => L.bank[i]).join(' ')) === norm(q.a) : L.pick === q.a;
  judge(ok, q.a);
}
function judge(ok, ans) {
  const q = L.qs[L.i], f = $('#fb'), a = $('#act');
  L.checked = true; $('#qa').classList.add('locked');
  if (ok) { L.ok++; L.xp += 10; addXp(10); S.correct++; f.className = 'fb ok'; f.textContent = '✔ Correct! +10 XP'; }
  else { f.className = 'fb no'; f.textContent = '✖ Not quite. Correct answer: ' + ans + '. Keep going – you are learning!'; }
  if (q.t === 'mc' || q.t === 'fill') $$('#opts .opt').forEach(b => { if (b.textContent === q.a) b.classList.add('good'); else if (b.classList.contains('sel')) b.classList.add('bad'); });
  beep(ok); save();
  a.hidden = false; a.disabled = false; a.textContent = L.i === L.qs.length - 1 ? 'Finish' : 'Continue'; a.focus();
}
function next() { L.i++; if (L.i < L.qs.length) ask(); else finish(); }
function finish() {
  let bonus = 0;
  if (L.idx != null && !S.done.includes(L.idx)) { S.done.push(L.idx); bonus = 20; addXp(20); }
  if (L.ok === L.qs.length) S.perfect++;
  const t = today();
  if (S.last !== t) { S.streak = S.last === yest() ? S.streak + 1 : 1; S.last = t; }
  save(); showView('done'); window.scrollTo(0, 0);
  $('#doneMsg').textContent = `${L.title} finished.` + (bonus ? ' You unlocked the next lesson and earned +20 bonus XP!' : '');
  $('#doneStats').innerHTML = stat('⭐', '+' + (L.xp + bonus), 'XP earned') + stat('✅', `${L.ok}/${L.qs.length}`, 'Correct answers') + stat('🔥', streak(), 'Day streak');
}

/* ===== 5. EVENTS (each attached once) ===== */
document.addEventListener('click', e => {
  const b = e.target.closest('[data-go]');
  if (b) { e.preventDefault(); go(b.dataset.go); }
});
$('#act').onclick = () => L.checked ? next() : check();
$('#hint').onclick = () => {
  const q = L.qs[L.i]; $('#hintTxt').textContent = `Hint: the sentence starts with "${q.a.split(' ')[0]}".`;
};
$('#quit').onclick = () => { if (confirm('Quit this lesson? Your progress in this lesson will be lost.')) go('home'); };
$('#startPractice').onclick = () => {
  const pool = LESSONS.slice(0, Math.min(S.done.length + 1, LESSONS.length)).flatMap(l => l.qs);
  start(shuf(pool).slice(0, 8), 'Mixed practice', null);
};
$('#nameForm').onsubmit = e => {
  e.preventDefault(); S.name = $('#nameInput').value.trim().slice(0, 20); save(); render(); toast('Name saved!');
};
$('#soundBtn').onclick = () => { S.sound = !S.sound; save(); syncSound(); };
$('#soundSet').onchange = e => { S.sound = e.target.checked; save(); syncSound(); };
$('#resetBtn').onclick = () => {
  if (confirm('Reset all progress? This cannot be undone.')) {
    try { localStorage.removeItem(KEY); } catch (err) { /* ignore */ }
    S = Object.assign({}, DEF); go('home'); toast('Progress reset.');
  }
};

go('home');
