import { cycleByBlock } from '../core/calendar.js';
import { WUKU } from '../config/constants.js';

export function getWuku(dinaIndex) {
  return cycleByBlock(WUKU, dinaIndex, 7);
}
