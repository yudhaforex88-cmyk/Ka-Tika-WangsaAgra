const assert = require('assert');

global.window = global;
require('../core-engine.js');
require('../databases.js');
require('../features.js');

const engine = new window.KaTikaEngine();
const { WetonService, DayAnalysisService } = window.KaTikaFeatures;

(function testAnchorState() {
  const result = engine.compute('2025-06-25 18:00');
  assert.equal(result.backend.dauh, 1);
  assert.equal(result.backend.dina, 1);
  assert.equal(result.backend.dinaPattern, 'Gelap');
  assert.equal(result.baliCalendar.sasih, 'Kasa');
  assert.equal(result.baliCalendar.wuku, 'Sinta');
  assert.equal(result.baliCalendar.saptawara, 'Redite');
  assert.equal(result.baliCalendar.pancawara, 'Paing');
  assert.equal(result.baliCalendar.triwara, 'Kajeng');
})();

(function testDateFormats() {
  const a = engine.compute('2025-06-25 18:00');
  const b = engine.compute('2025-06-25T18:00');
  assert.deepEqual(a.baliCalendar, b.baliCalendar);
})();

(function testWetonOtonan() {
  const weton = new WetonService(engine);
  const next = weton.getNextOtonan('2025-06-25 18:00', '2025-06-26 00:00');
  assert.equal(next.nextOtonanWita, '2026-01-21 18:00');
})();

(function testAnalysis() {
  const service = new DayAnalysisService(engine, window.KaTikaDB);
  const data = service.analyzeDate('2025-06-25 18:00');
  assert.ok(Array.isArray(data.rainan));
  assert.ok(Array.isArray(data.odalan));
  assert.ok(data.dewasaAyu);
})();

console.log('All smoke tests passed.');
