import { cycleAt } from '../core/calendar.js';
import { INGKEL } from '../config/constants.js';

export function getIngkel(dinaIndex) {
  return cycleAt(INGKEL, dinaIndex);
}
