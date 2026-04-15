export function renderDetails(state) {
  return `
    <dl class="details-grid">
      <div><dt>Dina Index</dt><dd>${state.dinaIndex}</dd></div>
      <div><dt>Nilai</dt><dd>${state.nilaiState.nilai}</dd></div>
      <div><dt>Nol Ke</dt><dd>${state.nilaiState.nolKe}</dd></div>
      <div><dt>Sadwara</dt><dd>${state.wewaran.sadwara}</dd></div>
    </dl>
  `;
}
