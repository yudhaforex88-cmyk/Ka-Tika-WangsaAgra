export function renderHolyDays(holyDays) {
  if (!holyDays.length) {
    return '<p class="muted">Belum ada hari raya pada hari ini.</p>';
  }

  return holyDays
    .map(
      (day) => `
        <article class="holy-card">
          <p class="holy-kicker">${day.emoji} Hari Raya</p>
          <h3>${day.title}</h3>
        </article>
      `
    )
    .join('');
}
