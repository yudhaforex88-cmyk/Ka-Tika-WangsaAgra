import { STORAGE_KEYS } from '../config/constants.js';

export function saveTheme(theme) {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

export function loadTheme() {
  return localStorage.getItem(STORAGE_KEYS.THEME);
}

export function saveIndex(index) {
  localStorage.setItem(STORAGE_KEYS.INDEX, String(index));
}

export function loadIndex() {
  const value = localStorage.getItem(STORAGE_KEYS.INDEX);
  if (value === null) {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}
