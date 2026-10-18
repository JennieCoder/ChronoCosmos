/**
 * ChronoCosmos - Celestial Age & Zodiac Engine
 * Handles cosmic canvas particles, exact real-time chronological math,
 * astrological profiling, and time-aware greetings.
 */

// --- 1. Zodiac Data Registry ---
const ZODIAC_SIGNS = [
  {
    name: 'Capricorn',
    glyph: '♑',
    element: 'Earth',
    elementEmoji: 'Earth 🌍',
    elementClass: 'element-earth',
    dates: 'Dec 22 – Jan 19',
    planet: 'Saturn',
    modality: 'Cardinal',
    stone: 'Garnet',
    motto: '"I master, therefore I endure."',
    desc: 'Determined, disciplined, and strategic. You possess unwavering ambition and the perseverance to climb every mountain in life.'
  },
  {
    name: 'Aquarius',
    glyph: '♒',
    element: 'Air',
    elementEmoji: 'Air 💨',
    elementClass: 'element-air',
    dates: 'Jan 20 – Feb 18',
    planet: 'Uranus',
    modality: 'Fixed',
    stone: 'Amethyst',
    motto: '"I innovate, therefore I liberate."',
    desc: 'Visionary, humanitarian, and fiercely independent. You look beyond horizons and champion progressive ideas for all humanity.'
  },
  {
    name: 'Pisces',
    glyph: '♓',
    element: 'Water',
    elementEmoji: 'Water 🌊',
    elementClass: 'element-water',
    dates: 'Feb 19 – Mar 20',
    planet: 'Neptune',
    modality: 'Mutable',
    stone: 'Aquamarine',
    motto: '"I dream, therefore I transcend."',
    desc: 'Empathetic, mystical, and creatively boundless. You bridge deep emotional realms and carry an intuitive understanding of the cosmos.'
  },
  {
    name: 'Aries',
    glyph: '♈',
    element: 'Fire',
    elementEmoji: 'Fire 🔥',
    elementClass: 'element-fire',
    dates: 'Mar 21 – Apr 19',
    planet: 'Mars',
    modality: 'Cardinal',
    stone: 'Diamond',
    motto: '"I am, therefore I lead."',
    desc: 'Bold, ambitious, and pioneering. You dive headfirst into challenges with passionate determination and radiant courage.'
  },
  {
    name: 'Taurus',
    glyph: '♉',
    element: 'Earth',
    elementEmoji: 'Earth 🌍',
    elementClass: 'element-earth',
    dates: 'Apr 20 – May 20',
    planet: 'Venus',
    modality: 'Fixed',
    stone: 'Emerald',
    motto: '"I build, therefore I flourish."',
    desc: 'Resilient, grounded, and appreciative of life’s finest beauty. Your tenacity creates empires that stand the test of time.'
  },
  {
    name: 'Gemini',
    glyph: '♊',
    element: 'Air',
    elementEmoji: 'Air 💨',
    elementClass: 'element-air',
    dates: 'May 21 – Jun 20',
    planet: 'Mercury',
    modality: 'Mutable',
    stone: 'Pearl',
    motto: '"I question, therefore I illuminate."',
    desc: 'Expressive, versatile, and endlessly curious. Your quick intellect and social adaptability weave connections across universes.'
  },
  {
    name: 'Cancer',
    glyph: '♋',
    element: 'Water',
    elementEmoji: 'Water 🌊',
    elementClass: 'element-water',
    dates: 'Jun 21 – Jul 22',
    planet: 'Moon',
    modality: 'Cardinal',
    stone: 'Ruby',
    motto: '"I feel, therefore I protect."',
    desc: 'Deeply intuitive, fiercely loyal, and protective. Your empathetic sanctuary gives strength and nourishment to those you cherish.'
  },
  {
    name: 'Leo',
    glyph: '♌',
    element: 'Fire',
    elementEmoji: 'Fire 🔥',
    elementClass: 'element-fire',
    dates: 'Jul 23 – Aug 22',
    planet: 'Sun',
    modality: 'Fixed',
    stone: 'Peridot',
    motto: '"I radiate, therefore I conquer."',
    desc: 'Charismatic, generous, and majestic. Like your celestial ruler the Sun, you infuse warmth, vitality, and creative spark into the world.'
  },
  {
    name: 'Virgo',
    glyph: '♍',
    element: 'Earth',
    elementEmoji: 'Earth 🌍',
    elementClass: 'element-earth',
    dates: 'Aug 23 – Sep 22',
    planet: 'Mercury',
    modality: 'Mutable',
    stone: 'Sapphire',
    motto: '"I refine, therefore I perfect."',
    desc: 'Analytical, resourceful, and devoted to craft. You bring order from chaos and turn intricate details into masterworks.'
  },
  {
    name: 'Libra',
    glyph: '♎',
    element: 'Air',
    elementEmoji: 'Air 💨',
    elementClass: 'element-air',
    dates: 'Sep 23 – Oct 23',
    planet: 'Venus',
    modality: 'Cardinal',
    stone: 'Opal',
    motto: '"I harmonize, therefore I balance."',
    desc: 'Diplomatic, graceful, and devoted to justice and aesthetics. You create equilibrium and beauty wherever discord arises.'
  },
  {
    name: 'Scorpio',
    glyph: '♏',
    element: 'Water',
    elementEmoji: 'Water 🌊',
    elementClass: 'element-water',
    dates: 'Oct 24 – Nov 21',
    planet: 'Pluto & Mars',
    modality: 'Fixed',
    stone: 'Topaz',
    motto: '"I transform, therefore I ascend."',
    desc: 'Intense, magnetic, and profoundly perceptive. You fearlessly navigate the depths, rising renewed like the celestial phoenix.'
  },
  {
    name: 'Sagittarius',
    glyph: '♐',
    element: 'Fire',
    elementEmoji: 'Fire 🔥',
    elementClass: 'element-fire',
    dates: 'Nov 22 – Dec 21',
    planet: 'Jupiter',
    modality: 'Mutable',
    stone: 'Turquoise',
    motto: '"I explore, therefore I expand."',
    desc: 'Optimistic, philosophical, and truth-seeking. Your quest for wisdom and adventure knows neither borders nor celestial boundaries.'
  }
];

/**
 * Returns zodiac sign based on month (1-12) and day (1-31).
 */
function getZodiacSign(month, day) {
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return ZODIAC_SIGNS[0]; // Capricorn
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return ZODIAC_SIGNS[1]; // Aquarius
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return ZODIAC_SIGNS[2]; // Pisces
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return ZODIAC_SIGNS[3]; // Aries
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return ZODIAC_SIGNS[4]; // Taurus
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return ZODIAC_SIGNS[5]; // Gemini
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return ZODIAC_SIGNS[6]; // Cancer
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return ZODIAC_SIGNS[7]; // Leo
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return ZODIAC_SIGNS[8]; // Virgo
  if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) return ZODIAC_SIGNS[9]; // Libra
  if ((month === 10 && day >= 24) || (month === 11 && day <= 21)) return ZODIAC_SIGNS[10]; // Scorpio
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return ZODIAC_SIGNS[11]; // Sagittarius
  return ZODIAC_SIGNS[3]; // Fallback to Aries
}

// --- 2. Interactive Background Starfield & Particle Engine ---
class CosmicCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.confetti = [];
    this.mouse = { x: -1000, y: -1000 };
    this.numStars = 140;

    this.init();
    this.setupEvents();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  init() {
    this.resize();
    this.stars = [];
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.25 + 0.05,
        color: ['#ffffff', '#00f2fe', '#4facfe', '#f355da', '#ffd166'][Math.floor(Math.random() * 5)]
      });
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  setupEvents() {
    window.addEventListener('resize', () => this.init());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  burst(x, y) {
    const colors = ['#00f2fe', '#4facfe', '#f355da', '#ffd166', '#ffffff', '#00f5a0'];
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.confetti.push({
        x: x || this.canvas.width / 2,
        y: y || this.canvas.height / 3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        radius: Math.random() * 3 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.015 + 0.01
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw twinkling stars
    for (const star of this.stars) {
      star.y -= star.speed;
      if (star.y < 0) {
        star.y = this.canvas.height;
        star.x = Math.random() * this.canvas.width;
      }

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = star.color;
      this.ctx.globalAlpha = star.alpha * (0.6 + 0.4 * Math.sin(Date.now() * 0.003 + star.x));
      this.ctx.fill();
    }

    // Draw confetti particles if any
    for (let i = this.confetti.length - 1; i >= 0; i--) {
      const p = this.confetti[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12; // gravity
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.confetti.splice(i, 1);
        continue;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fill();
    }

    this.ctx.globalAlpha = 1;
    requestAnimationFrame(this.animate);
  }
}

// --- 3. Chrono Engine State & Controllers ---
let activeTicker = null;
let currentProfile = null;
let cosmicCanvas = null;

// DOM Elements
const form = document.getElementById('chrono-form');
const inputName = document.getElementById('user-name');
const inputDob = document.getElementById('user-dob');
const inputTime = document.getElementById('user-time');
const inputSection = document.getElementById('input-section');
const resultsSection = document.getElementById('results-section');
const resetBtn = document.getElementById('reset-btn');
const copySummaryBtn = document.getElementById('copy-summary-btn');
const toast = document.getElementById('toast');

// Greeting & Live Time elements
const greetingHeading = document.getElementById('greeting-heading');
const greetingIcon = document.getElementById('greeting-icon');
const ampmBadge = document.getElementById('ampm-badge');
const currentLiveTime = document.getElementById('current-live-time');

// Counter Elements
const valYears = document.getElementById('val-years');
const valMonths = document.getElementById('val-months');
const valDays = document.getElementById('val-days');
const valHours = document.getElementById('val-hours');
const valMinutes = document.getElementById('val-minutes');
const valSeconds = document.getElementById('val-seconds');

// Next Birthday & Stats
const nextBdayText = document.getElementById('next-bday-text');
const birthdayProgressBar = document.getElementById('birthday-progress-bar');
const statTotalDays = document.getElementById('stat-total-days');
const statHeartbeats = document.getElementById('stat-heartbeats');
const statBreaths = document.getElementById('stat-breaths');
const statOrbitDistance = document.getElementById('stat-orbit-distance');

// Zodiac Elements
const zodiacCard = document.getElementById('zodiac-card');
const zodiacElementTag = document.getElementById('zodiac-element-tag');
const zodiacSymbolGlyph = document.getElementById('zodiac-symbol-glyph');
const zodiacSignName = document.getElementById('zodiac-sign-name');
const zodiacDates = document.getElementById('zodiac-dates');
const zodiacMotto = document.getElementById('zodiac-motto');
const zodiacPlanet = document.getElementById('zodiac-planet');
const zodiacElement = document.getElementById('zodiac-element');
const zodiacModality = document.getElementById('zodiac-modality');
const zodiacStone = document.getElementById('zodiac-stone');
const zodiacDescription = document.getElementById('zodiac-description');

/**
 * Initialize Default Constraints & Event Listeners
 */
function setupApp() {
  cosmicCanvas = new CosmicCanvas('space-canvas');

  // Enforce Max DOB date to today (cannot be born in future)
  const today = new Date();
  const maxDateStr = today.toISOString().split('T')[0];
  inputDob.max = maxDateStr;

  // Set default time to 12:00 if empty
  if (!inputTime.value) {
    inputTime.value = '12:00';
  }

  // Handle Form Submit
  form.addEventListener('submit', handleFormSubmit);

  // Handle Reset / Recalculate
  resetBtn.addEventListener('click', handleReset);

  // Handle Copy Summary
  copySummaryBtn.addEventListener('click', handleCopySummary);
}

/**
 * Handle Form Submit
 */
function handleFormSubmit(e) {
  e.preventDefault();

  const name = inputName.value.trim();
  const dobVal = inputDob.value;
  const timeVal = inputTime.value || '12:00';

  if (!name || !dobVal) return;

  const [year, month, day] = dobVal.split('-').map(Number);
  const [hours, minutes] = timeVal.split(':').map(Number);

  const birthDate = new Date(year, month - 1, day, hours, minutes, 0);
  const now = new Date();

  if (birthDate > now) {
    alert("Cosmic anomaly detected: Date of birth cannot be in the future!");
    return;
  }

  const zodiac = getZodiacSign(month, day);

  currentProfile = {
    name,
    birthDate,
    dobVal,
    timeVal,
    month,
    day,
    zodiac
  };

  // Populate Zodiac Information
  renderZodiacProfile(zodiac);

  // Transition View
  inputSection.classList.add('hidden');
  resultsSection.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Trigger cosmic celebratory burst
  cosmicCanvas.burst(window.innerWidth / 2, window.innerHeight / 3);

  // Start real-time ticking loop
  startRealTimeTicker();
}

/**
 * Render Astrological Profile
 */
function renderZodiacProfile(zodiac) {
  // Clear any existing element class
  zodiacCard.classList.remove('element-fire', 'element-earth', 'element-air', 'element-water');
  zodiacCard.classList.add(zodiac.elementClass);

  zodiacElementTag.textContent = `ELEMENT: ${zodiac.element.toUpperCase()}`;
  zodiacSymbolGlyph.textContent = zodiac.glyph;
  zodiacSignName.textContent = zodiac.name;
  zodiacDates.textContent = zodiac.dates;
  zodiacMotto.textContent = zodiac.motto;
  zodiacPlanet.textContent = zodiac.planet;
  zodiacElement.textContent = zodiac.elementEmoji;
  zodiacModality.textContent = zodiac.modality;
  zodiacStone.textContent = zodiac.stone;
  zodiacDescription.textContent = zodiac.desc;
}

/**
 * Calculate precise chronological breakdown between birthDate and now using forward projection.
 */
function calculatePrecisionAge(birthDate, now) {
  if (birthDate > now) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function createDateWithYear(b, targetYear) {
    const maxDay = daysInMonth(targetYear, b.getMonth());
    const day = Math.min(b.getDate(), maxDay);
    return new Date(targetYear, b.getMonth(), day, b.getHours(), b.getMinutes(), b.getSeconds(), b.getMilliseconds());
  }

  // 1. Advance years
  let years = now.getFullYear() - birthDate.getFullYear();
  let projected = createDateWithYear(birthDate, birthDate.getFullYear() + years);
  if (projected > now) {
    years--;
    projected = createDateWithYear(birthDate, birthDate.getFullYear() + years);
  }
  let tempDate = projected;

  // 2. Advance months
  let months = 0;
  while (true) {
    let nextMonth = tempDate.getMonth() + 1;
    let nextYear = tempDate.getFullYear();
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear++;
    }
    const maxDay = daysInMonth(nextYear, nextMonth);
    const day = Math.min(birthDate.getDate(), maxDay);
    const nextDate = new Date(nextYear, nextMonth, day, birthDate.getHours(), birthDate.getMinutes(), birthDate.getSeconds(), birthDate.getMilliseconds());

    if (nextDate <= now) {
      months++;
      tempDate = nextDate;
    } else {
      break;
    }
  }

  // 3. Remaining difference in days, hours, minutes, seconds
  let diffMs = now.getTime() - tempDate.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  diffMs %= (1000 * 60 * 60 * 24);

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  diffMs %= (1000 * 60 * 60);

  const minutes = Math.floor(diffMs / (1000 * 60));
  diffMs %= (1000 * 60);

  const seconds = Math.floor(diffMs / 1000);

  return { years, months, days, hours, minutes, seconds };
}

/**
 * Generate Time-Aware Greeting (AM / PM and Morning/Afternoon/Evening/Night)
 */
function updateGreetingAndTime(now, name) {
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const isPM = hours >= 12;
  const ampm = isPM ? 'PM' : 'AM';

  // Greeting period
  let periodGreeting = 'Good Day';
  let icon = '✨';

  if (hours >= 5 && hours < 12) {
    periodGreeting = 'Good Morning';
    icon = '🌅';
  } else if (hours >= 12 && hours < 17) {
    periodGreeting = 'Good Afternoon';
    icon = '☀️';
  } else if (hours >= 17 && hours < 21) {
    periodGreeting = 'Good Evening';
    icon = '🌆';
  } else {
    periodGreeting = 'Good Night';
    icon = '🌙';
  }

  // Format 12-hour clock
  const displayHours = hours % 12 || 12;
  const displayMin = String(minutes).padStart(2, '0');
  const displaySec = String(seconds).padStart(2, '0');

  ampmBadge.textContent = `${ampm} PERIOD`;
  currentLiveTime.textContent = `${displayHours}:${displayMin}:${displaySec} ${ampm}`;

  greetingHeading.innerHTML = `${periodGreeting}, <span class="highlight-name">${escapeHTML(name)}</span>!`;
  greetingIcon.textContent = icon;
}

/**
 * Calculate Next Birthday Countdown & Progress
 */
function updateNextBirthday(birthDate, now) {
  const currentYear = now.getFullYear();
  let nextBday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate(), birthDate.getHours(), birthDate.getMinutes(), 0);

  if (now > nextBday) {
    nextBday = new Date(currentYear + 1, birthDate.getMonth(), birthDate.getDate(), birthDate.getHours(), birthDate.getMinutes(), 0);
  }

  const diffMs = nextBday - now;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  nextBdayText.textContent = `${days}d ${hours}h ${minutes}m left`;

  // Progress through the birth-year cycle
  const lastBday = new Date(nextBday.getFullYear() - 1, birthDate.getMonth(), birthDate.getDate(), birthDate.getHours(), birthDate.getMinutes(), 0);
  const totalYearMs = nextBday - lastBday;
  const elapsedMs = now - lastBday;
  const progressPct = Math.min(100, Math.max(0, (elapsedMs / totalYearMs) * 100));

  birthdayProgressBar.style.width = `${progressPct.toFixed(1)}%`;
}

/**
 * Calculate Life Milestones / Facts
 */
function updateCosmicStats(birthDate, now) {
  const diffMs = now - birthDate;
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  statTotalDays.textContent = totalDays.toLocaleString();
  statHeartbeats.textContent = `~${(totalDays * 105000).toLocaleString()}`;
  statBreaths.textContent = `~${(totalDays * 21600).toLocaleString()}`;
  statOrbitDistance.textContent = `${(totalDays * 2.57).toFixed(1)}M`;
}

/**
 * Main Real-Time Ticker
 */
function tick() {
  if (!currentProfile) return;

  const now = new Date();
  const { birthDate, name } = currentProfile;

  // 1. Update Greeting & Clock
  updateGreetingAndTime(now, name);

  // 2. Precision Age Calculation
  const age = calculatePrecisionAge(birthDate, now);

  valYears.textContent = age.years;
  valMonths.textContent = age.months;
  valDays.textContent = age.days;
  valHours.textContent = String(age.hours).padStart(2, '0');
  valMinutes.textContent = String(age.minutes).padStart(2, '0');
  valSeconds.textContent = String(age.seconds).padStart(2, '0');

  // 3. Birthday Countdown
  updateNextBirthday(birthDate, now);

  // 4. Update Stats
  updateCosmicStats(birthDate, now);
}

function startRealTimeTicker() {
  if (activeTicker) clearInterval(activeTicker);
  tick(); // Execute immediately
  activeTicker = setInterval(tick, 1000);
}

/**
 * Handle Reset
 */
function handleReset() {
  if (activeTicker) {
    clearInterval(activeTicker);
    activeTicker = null;
  }
  resultsSection.classList.add('hidden');
  inputSection.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Handle Copy Summary
 */
function handleCopySummary() {
  if (!currentProfile) return;

  const now = new Date();
  const age = calculatePrecisionAge(currentProfile.birthDate, now);
  const z = currentProfile.zodiac;

  const text = `🌌 CHRONOCOSMOS CELESTIAL DOSSIER 🌌
Name: ${currentProfile.name}
Birth Coordinates: ${currentProfile.dobVal} at ${currentProfile.timeVal}

⏳ LIVE CHRONOLOGICAL AGE:
• ${age.years} Years, ${age.months} Months, ${age.days} Days
• ${age.hours} Hours, ${age.minutes} Minutes, ${age.seconds} Seconds

✨ ASTROLOGICAL PROFILE:
• Zodiac Sign: ${z.name} ${z.glyph} (${z.dates})
• Element: ${z.element} | Ruling Body: ${z.planet}
• Modality: ${z.modality} | Celestial Stone: ${z.stone}
• Motto: ${z.motto}

Calculated in real-time via ChronoCosmos.`;

  navigator.clipboard.writeText(text).then(() => {
    showToast("Cosmic Dossier copied to clipboard! ✨");
  }).catch(() => {
    showToast("Failed to copy automatically.");
  });
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2800);
}

function escapeHTML(str) {
  const p = document.createElement('p');
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', setupApp);
