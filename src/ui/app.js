import { toDateFromIndex, toDinaIndex } from '../core/dina.js';
import { buildByIndex } from '../engine/ka-tika-engine.js';
import { renderHolyDays } from '../components/day-card.js';
import { renderDetails } from '../components/detail-panel.js';
import { formatDateId } from '../utils/format.js';
import { shiftIndex } from '../utils/navigation.js';
import { loadIndex, loadTheme, saveIndex, saveTheme } from '../utils/storage.js';

const root = {
  dateLabel: document.querySelector('[data-date]'),
  saptawara: document.querySelector('[data-saptawara]'),
  triwara: document.querySelector('[data-triwara]'),
  pancawara: document.querySelector('[data-pancawara]'),
  sasih: document.querySelector('[data-sasih]'),
  wuku: document.querySelector('[data-wuku]'),
  ingkel: document.querySelector('[data-ingkel]'),
  moonBadge: document.querySelector('[data-moon]'),
  holyDays: document.querySelector('[data-holydays]'),
  details: document.querySelector('[data-details]'),
  prev: document.querySelector('[data-prev]'),
  next: document.querySelector('[data-next]'),
  themeToggle: document.querySelector('[data-theme-toggle]'),
  gestureZone: document.querySelector('[data-gesture]')
};

let currentIndex = loadIndex() ?? toDinaIndex(new Date());

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  root.themeToggle.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
  saveTheme(theme);
}

function render() {
  const state = buildByIndex(currentIndex);

  root.dateLabel.textContent = formatDateId(toDateFromIndex(state.dinaIndex));
  root.saptawara.textContent = state.wewaran.saptawara.toUpperCase();
  root.triwara.textContent = state.wewaran.triwara;
  root.pancawara.textContent = state.wewaran.pancawara;
  root.sasih.textContent = state.sasih;
  root.wuku.textContent = state.wuku;
  root.ingkel.textContent = state.ingkel;
  root.holyDays.innerHTML = renderHolyDays(state.holyDays);
  root.details.innerHTML = renderDetails(state);

  if (state.nilaiState.phase) {
    const icon = state.nilaiState.phase === 'tilem' ? '🌑' : '🌕';
    root.moonBadge.textContent = `${icon} ${state.nilaiState.phase.toUpperCase()}`;
    root.moonBadge.classList.add('is-visible');
  } else {
    root.moonBadge.classList.remove('is-visible');
    root.moonBadge.textContent = '';
  }

  saveIndex(currentIndex);
}

export function mountApp() {
  const savedTheme = loadTheme() ?? 'dark';
  applyTheme(savedTheme);
  render();

  root.prev.addEventListener('click', () => {
    currentIndex = shiftIndex(currentIndex, -1);
    render();
  });

  root.next.addEventListener('click', () => {
    currentIndex = shiftIndex(currentIndex, 1);
    render();
  });

  root.themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });

  root.details.addEventListener('click', () => {
    root.details.classList.toggle('expanded');
  });

  let startX = 0;
  root.gestureZone.addEventListener('touchstart', (event) => {
    startX = event.changedTouches[0].clientX;
  });

  root.gestureZone.addEventListener('touchend', (event) => {
    const delta = event.changedTouches[0].clientX - startX;
    if (delta > 45) {
      currentIndex = shiftIndex(currentIndex, -1);
      render();
    }
    if (delta < -45) {
      currentIndex = shiftIndex(currentIndex, 1);
      render();
    }
  });
}
