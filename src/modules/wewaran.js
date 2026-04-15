import { cycleAt } from '../core/calendar.js';
import { PANCAWARA, SADWARA, SAPTAWARA, TRIWARA_CUSTOM } from '../config/constants.js';

export function getWewaran(dinaIndex) {
  return {
    triwara: cycleAt(TRIWARA_CUSTOM, dinaIndex),
    pancawara: cycleAt(PANCAWARA, dinaIndex),
    saptawara: cycleAt(SAPTAWARA, dinaIndex),
    sadwara: cycleAt(SADWARA, dinaIndex)
  };
}
