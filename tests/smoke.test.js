const assert = require('assert');

(async () => {
  const { buildByIndex } = await import('../src/engine/ka-tika-engine.js');
  const { shiftIndex } = await import('../src/utils/navigation.js');

  const day0 = buildByIndex(0);
  assert.equal(day0.nilaiState.nilai, 0);
  assert.equal(day0.nilaiState.nolKe, 1);
  assert.equal(day0.nilaiState.phase, 'tilem');

  const day9 = buildByIndex(9);
  assert.equal(day9.nilaiState.nilai, 0);
  assert.equal(day9.nilaiState.nolKe, 2);
  assert.equal(day9.nilaiState.phase, 'purnama');

  assert.equal(shiftIndex(120, -1), 119);
  assert.equal(shiftIndex(120, 1), 121);

  assert.ok(day0.wewaran.saptawara);
  assert.ok(day0.sasih);
  assert.ok(day0.wuku);

  console.log('All smoke tests passed.');
})();
