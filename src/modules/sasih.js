import { cycleAt } from '../core/calendar.js';
import { SASIH } from '../config/constants.js';

export function getSasih(nolKe) {
  return cycleAt(SASIH, nolKe - 1);
}
