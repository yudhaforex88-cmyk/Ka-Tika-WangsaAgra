import { ANCHOR_UTC_ISO, MS_PER_DAY } from '../config/constants.js';

const anchorTs = Date.parse(ANCHOR_UTC_ISO);

export function toDinaIndex(date) {
  const ts = date instanceof Date ? date.getTime() : Date.parse(date);
  if (Number.isNaN(ts)) {
    throw new Error('Tanggal tidak valid.');
  }

  return Math.floor((ts - anchorTs) / MS_PER_DAY);
}

export function toDateFromIndex(dinaIndex) {
  return new Date(anchorTs + dinaIndex * MS_PER_DAY);
}

export function toNilaiState(dinaIndex) {
  const nilai = ((dinaIndex % 9) + 9) % 9;
  const nolKe = Math.floor(dinaIndex / 9) + 1;
  const phase = nilai !== 0 ? null : nolKe % 2 === 1 ? 'tilem' : 'purnama';

  return {
    nilai,
    nolKe,
    phase
  };
}
