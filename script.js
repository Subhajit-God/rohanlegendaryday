/* =====================================================
   EDIT HERE — everything below this block reads from it
   ===================================================== */
// Add real awards from your PDF only. Leave empty until then.
// Example: { icon: "🏏", title: "Award Name", description: "Award description" }
const awards = [];

// Add anyone here and they appear automatically (e.g. Rohan: {role:"CORE MEMBER", message:"..."}).
// Replace these placeholder messages with the friends' own words.
const friends = {
  Subhajit: { role: "HOD", message: "Happy Birthday, Rohan! Keep enjoying the games and keep being a legend. — Edit this message in script.js" },
  Sounak: { role: "ADMIN", message: "Happy Birthday, Rohan! Wishing you a great year ahead. — Edit this message in script.js" },
  Arghya: { role: "HONORARY MEMBER", message: "Happy Birthday, Rohan! Have an amazing day. — Edit this message in script.js" }
};

const DATA = {
  name: "ROHAN PALUI",
  birthday: "27 November 2014",
  birthMonth: 11, birthDay: 27,          // used for the countdown
  age: 12,
  role: "CORE MEMBER",
  group: "WE ARE LEGEND",
  friendshipSince: 2017,
  activities: "Cricket • UNO • Chess • Badminton",
  status: "LEGENDARY • ACTIVE",
  photos: [
    ["rohan-1.jpg", "THE LEGEND"],
    ["rohan-2.jpg", "THE CORE MEMBER"],
    ["rohan-3.jpg", "THE MOMENT"]
  ],
  stats: { Cricket: 100, UNO: 94, Chess: 91, Badminton: 89, Comedy: 96, Friendship: 100, "Legend Level": 100 },
  statIcons: { Cricket: "🏏", UNO: "🃏", Chess: "♟️", Badminton: "🏸", Comedy: "😂", Friendship: "❤️", "Legend Level": "👑" },
  gameStats: ["Cricket", "UNO", "Chess", "Badminton"],  // cricket must stay the highest of these
  awards, friends,
  secretCode: "27112014",
  music: "birthday-music.mp3",
  pdf: "rohan-awards.pdf"
};
/* ===================== END EDIT BLOCK ===================== */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const store = { get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch { return d; } }, set(k, v) { try { localStorage.setItem(k, v); } catch {} } };
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
let toastT;
function toast(t) { const e = $("#toast"); e.textContent = t; e.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => e.classList.remove("on"), 2600); }

/* ---------- starfield ---------- */
(function () {
  const c = $("#stars"), x = c.getContext("2d"); let w, h, st = [];
  function size() { w = c.width = innerWidth; h = c.height = innerHeight; st = Array.from({ length: Math.min(110, w / 9) }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.3 + .2, s: Math.random() * .25 + .05, p: Math.random() * 6 })); }
  function draw(t) { x.clearRect(0, 0, w, h); for (const s of st) { x.globalAlpha = .3 + .5 * Math.abs(Math.sin(t / 1800 + s.p)); x.fillStyle = "#f5e7b0"; x.beginPath(); x.arc(s.x, s.y, s.r, 0, 7); x.fill(); if (!reduced) { s.y -= s.s; if (s.y < 0) s.y = h; } } if (!reduced) requestAnimationFrame(draw); }
  addEventListener("resize", size); size(); requestAnimationFrame(draw);
})();

/* ---------- confetti ---------- */
const confetti = (function () {
  const c = $("#confetti"), x = c.getContext("2d"); let ps = [], run = false;
  const cols = ["#d4af37", "#f5d77a", "#ffffff", "#ffffff", "#5ab0ff", "#ff6ec7"];
  function size() { c.width = innerWidth; c.height = innerHeight; } addEventListener("resize", size); size();
  function loop() {
    x.clearRect(0, 0, c.width, c.height);
    ps = ps.filter(p => p.y < c.height + 20 && p.l > 0);
    for (const p of ps) { p.vy += .12; p.x += p.vx; p.y += p.vy; p.a += p.va; p.l--; x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c; x.globalAlpha = Math.min(1, p.l / 30); x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); x.restore(); }
    if (ps.length) requestAnimationFrame(loop); else { run = false; x.clearRect(0, 0, c.width, c.height); }
  }
  return function (n = 90, ox = c.width / 2, oy = c.height * .35) {
    if (reduced) n = Math.min(n, 25);
    for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, v = Math.random() * 7 + 2; ps.push({ x: ox, y: oy, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 4, a: 0, va: Math.random() * .3 - .15, s: Math.random() * 8 + 5, c: cols[Math.random() * cols.length | 0], l: 140 + Math.random() * 60 }); }
    if (!run) { run = true; requestAnimationFrame(loop); }
  };
})();

/* ---------- modals ---------- */
let lastFocus = null, onLetterClose = null;
function openModal(id) { const m = document.getElementById(id); lastFocus = document.activeElement; m.hidden = false; (m.querySelector("[data-close],input,button") || m).focus?.(); }
function closeModal(m) {
  if (m.hidden) return; m.hidden = true; lastFocus?.focus?.();
  if (m.id === "letterModal" && onLetterClose) { const f = onLetterClose; onLetterClose = null; f(); }
}
const closeAll = () => $$(".modal").forEach(closeModal);
document.addEventListener("click", e => {
  const o = e.target.closest("[data-open]"); if (o) { if (o.dataset.open === "letterModal") $("#letterClone").innerHTML = $("#letterPaper").outerHTML; openModal(o.dataset.open); return; }
  if (e.target.closest("[data-close]")) closeModal(e.target.closest(".modal"));
  else if (e.target.classList?.contains("modal") && e.target.id !== "viewer") closeModal(e.target);
});

/* ---------- image helper with placeholder ---------- */
function photoEl(src, alt, label) {
  const d = document.createElement("div"); d.className = "ph";
  const img = new Image(); img.alt = alt; img.loading = "lazy"; img.decoding = "async";
  img.onerror = () => { d.classList.add("missing"); d.innerHTML = `<span role="img" aria-label="${esc(alt)} (photo not added yet)">📷<br>${esc(label || "Photo")}<br>Add ${esc(src)}</span>`; };
  img.src = src; d.appendChild(img); return d;
}

/* ---------- intro ---------- */
const intro = $("#intro"), site = $("#site"); let introTimers = [];
function enterSite(withConfetti) {
  introTimers.forEach(clearTimeout); store.set("rohanIntroSeen", "1");
  site.hidden = false; intro.classList.add("gone"); setTimeout(() => intro.hidden = true, 950);
  scrollTo(0, 0); if (withConfetti) confetti(110);
}
function playIntro() {
  intro.hidden = false; intro.classList.remove("gone"); site.hidden = true; $("#enterBtn").hidden = true;
  const ls = $$(".il", intro); ls.forEach(l => l.classList.remove("show"));
  let t = 300; ls.forEach((l, i) => {
    introTimers.push(setTimeout(() => { ls.forEach(o => o.classList.remove("show")); l.classList.add("show"); }, t));
    t += i === 2 || i === 4 ? 1900 : 1400;
  });
  introTimers.push(setTimeout(() => { $("#enterBtn").hidden = false; $("#enterBtn").focus(); }, t));
  if (reduced) { introTimers.forEach(clearTimeout); ls.forEach(l => l.classList.add("show")); ls.forEach(l => l.style.gridArea = "auto"); $("#enterBtn").hidden = false; }
}
$("#enterBtn").onclick = () => enterSite(true);
$("#skipIntro").onclick = () => enterSite(false);
$("#replay").onclick = () => { store.set("rohanIntroSeen", ""); playIntro(); };
if (store.get("rohanIntroSeen", "")) { intro.hidden = true; site.hidden = false; } else playIntro();

/* ---------- nav ---------- */
const burger = $("#burger"), menu = $("#menu");
burger.onclick = () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); burger.setAttribute("aria-label", o ? "Close menu" : "Open menu"); };
$$("#menu a").forEach(a => a.onclick = () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); });

/* ---------- countdown ---------- */
function nextBirthday() { const n = new Date(); let d = new Date(n.getFullYear(), DATA.birthMonth - 1, DATA.birthDay); if (n >= new Date(n.getFullYear(), DATA.birthMonth - 1, DATA.birthDay + 1)) d = new Date(n.getFullYear() + 1, DATA.birthMonth - 1, DATA.birthDay); return d; }
function tick() {
  const n = new Date(), t = nextBirthday(); let ms = t - n;
  if (n.getMonth() + 1 === DATA.birthMonth && n.getDate() === DATA.birthDay) { $("#cd").textContent = "🎉 IT'S ROHAN'S BIRTHDAY!"; return; }
  const s = Math.floor(ms / 1000), d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
  $("#cd").textContent = `${d}d ${h}h ${m}m ${sec}s`;
}
tick(); setInterval(tick, 1000);

/* ---------- profile ---------- */
$("#profilePhoto").appendChild(photoEl(DATA.photos[0][0], "Rohan Palui, Core Member of WE ARE LEGEND", "ROHAN"));
const pp = $("#profilePhoto .ph");
$("#infoCards").innerHTML = [["🎂 Birthday", DATA.birthday], ["🗓️ Friendship", "Since " + DATA.friendshipSince], ["🎯 Activities", DATA.activities], ["👑 Status", DATA.status]].map(([a, b]) => `<div><b>${a}</b>${esc(b)}</div>`).join("");
if (!reduced && matchMedia("(hover:hover)").matches) {
  const f = $("#profilePhoto");
  f.addEventListener("mousemove", e => { const r = f.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; pp.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`; });
  f.addEventListener("mouseleave", () => pp.style.transform = "");
}

/* ---------- gallery + viewer ---------- */
let vi = 0;
DATA.photos.forEach(([src, cap], i) => {
  const b = document.createElement("button"); b.className = "card"; b.setAttribute("aria-label", `Open photo ${i + 1}: ${cap}`);
  b.appendChild(photoEl(src, `Rohan — ${cap}`, cap)); b.insertAdjacentHTML("beforeend", `<p>${esc(cap)}</p>`);
  b.onclick = () => { vi = i; showPhoto(); openModal("viewer"); }; $("#gallery").appendChild(b);
});
function showPhoto() {
  const [src, cap] = DATA.photos[vi], n = DATA.photos.length;
  $("#vImg").replaceChildren(photoEl(src, `Rohan — ${cap}`, cap)); $("#vCap").textContent = cap;
  $("#vCount").textContent = `${String(vi + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
}
const step = d => { vi = (vi + d + DATA.photos.length) % DATA.photos.length; showPhoto(); };
$("#vPrev").onclick = () => step(-1); $("#vNext").onclick = () => step(1);
let tx = null; const v = $("#viewer");
v.addEventListener("touchstart", e => tx = e.touches[0].clientX, { passive: true });
v.addEventListener("touchend", e => { if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); tx = null; });
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeAll();
  if (!v.hidden) { if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1); }
});

/* ---------- stats ---------- */
const sv = DATA.stats, gv = DATA.gameStats.map(k => sv[k]);
if (sv.Cricket < Math.max(...gv)) console.warn("Cricket should stay the highest game stat!");
$("#statBars").innerHTML = Object.entries(sv).map(([k, val]) => `<div class="bar ${k === "Cricket" ? "top-game" : ""}"><div class="top"><span>${DATA.statIcons[k] || "⭐"} ${esc(k)}</span><strong>${val}/100</strong></div><div class="track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${val}" aria-label="${esc(k)} ${val} out of 100"><i data-w="${val}"></i></div></div>`).join("");
const avg = Object.values(sv).reduce((a, b) => a + b, 0) / Object.keys(sv).length;
function countTo(el, to, dec, ms = 1800) { if (reduced) { el.textContent = to.toFixed(dec); return; } const t0 = performance.now(); (function f(t) { const p = Math.min(1, (t - t0) / ms); el.textContent = (to * (1 - Math.pow(1 - p, 3))).toFixed(dec); if (p < 1) requestAnimationFrame(f); })(t0); }

/* ---------- reveal observer ---------- */
const once = new Set();
function trigger(id) {
  if (once.has(id)) return; once.add(id);
  if (id === "stats") { $$("#statBars i").forEach(i => i.style.width = i.dataset.w + "%"); countTo($("#overall"), avg, 1); }
  if (id === "friendship") { $("#mFill").style.width = "100%"; countTo($("#mPct"), 100, 0, 1800); setTimeout(() => $("#mPct").textContent = "100%", 1900); }
  if (id === "cricket") countTo($("#crNum"), sv.Cricket, 0, 1500);
}
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); trigger(e.target.id); io.unobserve(e.target); } }), { threshold: .15 });
$$(".reveal").forEach(s => io.observe(s));
if (reduced) $$(".reveal").forEach(s => { s.classList.add("in"); trigger(s.id); });
let finalDone = false;
new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting && !finalDone && giftDone) { finalDone = true; confetti(160); } }), { threshold: .4 }).observe($("#final"));

/* ---------- awards ---------- */
if (DATA.awards.length) {
  $("#awardCards").innerHTML = DATA.awards.map((a, i) => `<div class="cert-card"><div class="ic">${esc(a.icon || "🏆")}</div><h3>${esc(a.title)}</h3><p>${esc(a.description)}</p><button class="btn ghost small" data-cert="${i}">VIEW CERTIFICATE</button></div>`).join("");
  $("#awardCards").onclick = e => { const b = e.target.closest("[data-cert]"); if (!b) return; const a = DATA.awards[b.dataset.cert]; $("#certBody").innerHTML = `<p class="label">WE ARE LEGEND • CERTIFICATE</p><div style="font-size:3rem">${esc(a.icon || "🏆")}</div><h3>${esc(a.title)}</h3><p>${esc(a.description)}</p><p>Awarded to <b>${esc(DATA.name)}</b></p>`; openModal("certModal"); };
} else $("#awardEmpty").hidden = false;
const pdfBtn = $("#pdfBtn");
function pdfOk() { pdfBtn.hidden = false; $("#awardEmpty").hidden = !!DATA.awards.length; }
if (location.protocol.startsWith("http")) fetch(DATA.pdf, { method: "HEAD" }).then(r => { if (r.ok) pdfOk(); }).catch(() => { });
else pdfOk(); // file:// can't check for the file; button is shown when opened locally
pdfBtn.href = DATA.pdf;

/* ---------- friends ---------- */
let curF = null;
function renderFriends() {
  const tabs = $("#friendTabs"); tabs.innerHTML = "";
  Object.keys(DATA.friends).forEach(name => {
    const b = document.createElement("button"); b.className = "tab"; b.role = "tab"; b.textContent = name; b.onclick = () => selectFriend(name); tabs.appendChild(b);
  });
  selectFriend(curF && DATA.friends[curF] ? curF : Object.keys(DATA.friends)[0]);
}
function selectFriend(name) {
  curF = name; if (!name) return; const f = DATA.friends[name];
  $$("#friendTabs .tab").forEach(t => t.setAttribute("aria-selected", t.textContent === name));
  $("#friendMsg").innerHTML = `<p>${esc(f.message)}</p><cite>— ${esc(name)}, ${esc(f.role)}</cite>`;
}
renderFriends();

/* ---------- letter ---------- */
$("#printBtn").onclick = () => window.print();

/* ---------- music ---------- */
let audio = null, playing = false; const mb = $("#musicBtn");
mb.onclick = () => {
  if (playing) { audio.pause(); playing = false; mb.textContent = "🎵 Play Music"; return; }
  if (!audio) { audio = new Audio(DATA.music); audio.loop = true; audio.addEventListener("error", () => { playing = false; mb.textContent = "🎵 Play Music"; toast("Add assets/birthday-music.mp3 first."); audio = null; }); }
  audio.play().then(() => { playing = true; mb.textContent = "⏸ Pause Music"; }).catch(() => { toast("Add assets/birthday-music.mp3 first."); audio = null; });
};

/* ---------- gift sequence ---------- */
let giftBusy = false, giftDone = false;
$("#gift").onclick = () => {
  if (giftBusy) return; giftBusy = true; $("#gift").classList.add("open"); $("#giftText").textContent = "💌 Opening your official letter..."; confetti(40);
  setTimeout(() => {
    $("#letterClone").innerHTML = $("#letterPaper").outerHTML;
    onLetterClose = () => { $("#wait").hidden = false; setTimeout(() => { $("#wait").hidden = true; giftDone = true; $("#final").scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); setTimeout(() => { if (!finalDone) { finalDone = true; confetti(180); } }, 900); giftBusy = false; $("#gift").classList.remove("open"); $("#giftText").textContent = "Tap the gift to open it again."; }, 2400); };
    openModal("letterModal");
  }, 1200);
};

/* ---------- easter eggs ---------- */
function secretMode(on) { document.body.classList.toggle("secret", on); }
function egg(html) { $("#eggBody").innerHTML = html; openModal("eggModal"); confetti(90); }
let lc = 0, lt; $("#logo").addEventListener("click", () => { lc++; clearTimeout(lt); lt = setTimeout(() => lc = 0, 2500); if (lc === 5) { lc = 0; egg(`<h3>🔐 EASTER EGG UNLOCKED</h3><p class="gold">ROHAN ONLY</p><p>You found the hidden Legend mode.<br>Some legends know where to look. 👑</p>`); } });
let sc = 0; $("#hiddenStar").onclick = () => { sc++; if (sc === 3) { sc = 0; secretMode(true); egg(`<h3>⭐ SECRET MODE</h3><p>Secret Mode is on. The colours have changed.</p>`); } };
$("#secretBtn").onclick = () => { $("#codeErr").textContent = ""; $("#codeIn").value = ""; openModal("codeModal"); };
$("#codeForm").onsubmit = e => {
  e.preventDefault();
  if ($("#codeIn").value.trim() === DATA.secretCode) { closeModal($("#codeModal")); secretMode(true); egg(`<h3>🔓 CODE ACCEPTED</h3><p class="gold">ROHAN ONLY</p><p>Secret Mode unlocked. Some legends know the date. 👑</p>`); }
  else { $("#codeErr").textContent = "Wrong code. Try again."; }
};

/* ---------- mini cricket game ---------- */
const G = { on: false, score: 0, balls: 0, t0: 0, dur: 1500, raf: 0, resolved: false };
const pitch = $("#pitch"), gball = $("#gball");
function gMsg(t) { const m = $("#gMsg"); m.textContent = t; clearTimeout(gMsg.t); gMsg.t = setTimeout(() => m.textContent = "", 900); }
function gUI() { $("#gScore").textContent = G.score; $("#gBalls").textContent = G.balls; }
function bowl() {
  G.resolved = false; G.dur = Math.max(850, 1500 - G.balls * 60); G.t0 = performance.now(); gball.style.display = "block";
  cancelAnimationFrame(G.raf);
  (function f(t) {
    if (!G.on) return; const p = (t - G.t0) / G.dur, w = pitch.clientWidth - 22;
    gball.style.left = Math.min(p, 1) * w + "px";
    if (p >= 1.02 && !G.resolved) { resolve(false); return; }
    G.raf = requestAnimationFrame(f);
  })(G.t0);
}
function resolve(hit) {
  if (G.resolved) return; G.resolved = true; G.balls++; cancelAnimationFrame(G.raf); gball.style.display = "none";
  if (hit) { G.score += 20; gMsg("💥 SIX! +20"); const r = pitch.getBoundingClientRect(); confetti(35, r.left + r.width / 2, r.top + 30); } else gMsg("Miss!");
  gUI();
  if (G.balls >= 10) return setTimeout(endGame, 700);
  setTimeout(() => G.on && bowl(), 800);
}
function endGame() {
  G.on = false; $("#gStart").textContent = "Play again"; $("#gStart").disabled = false;
  if (G.score >= 100) { $("#gResult").innerHTML = "🏏 <b>CENTURY!</b><br>Rohan just hit 100!"; confetti(200); } else $("#gResult").textContent = `Final Score: ${G.score}`;
}
function swing() {
  if (!G.on || G.resolved) return;
  const p = (performance.now() - G.t0) / G.dur;   // 0..1 across the pitch
  resolve(p >= .42 && p <= .58);                  // matches the highlighted bat zone
}
pitch.addEventListener("pointerdown", e => { e.preventDefault(); swing(); });
pitch.addEventListener("keydown", e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); swing(); } });
$("#gStart").onclick = () => { Object.assign(G, { on: true, score: 0, balls: 0 }); $("#gResult").textContent = ""; $("#gStart").disabled = true; $("#gStart").textContent = "Playing..."; gUI(); bowl(); };
