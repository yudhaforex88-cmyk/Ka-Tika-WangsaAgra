import { toDinaIndex, toNilaiState } from '../core/dina.js';
import { getWewaran } from '../modules/wewaran.js';
import { getWuku } from '../modules/wuku.js';
import { getSasih } from '../modules/sasih.js';
import { getIngkel } from '../modules/ingkel.js';
import { detectHolyDays } from './rules.js';

export function buildKaTikaState(input) {
  const date = input instanceof Date ? input : new Date(input);
  const dinaIndex = toDinaIndex(date);
  return buildByIndex(dinaIndex);
}

export function buildByIndex(dinaIndex) {
  const nilaiState = toNilaiState(dinaIndex);
  const wewaran = getWewaran(dinaIndex);

  const payload = {
    dinaIndex,
    nilaiState,
    wewaran,
    wuku: getWuku(dinaIndex),
    sasih: getSasih(nilaiState.nolKe),
    ingkel: getIngkel(dinaIndex)
  };

  return {
    ...payload,
    holyDays: detectHolyDays(payload)
  };
}
