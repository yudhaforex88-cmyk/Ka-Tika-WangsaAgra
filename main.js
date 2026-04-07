(function bootstrapKaTikaApp() {
  const engine = new window.KaTikaEngine();
  const { dewasaAyuDB, rainanDB, odalanDB } = window.KaTikaDB;
  const { WetonService, DayAnalysisService } = window.KaTikaFeatures;

  const wetonService = new WetonService(engine);
  const analysisService = new DayAnalysisService(engine, { dewasaAyuDB, rainanDB, odalanDB });

  const searchInput = document.getElementById('search-date');
  const searchButton = document.getElementById('search-button');
  const wetonInput = document.getElementById('weton-date');
  const wetonButton = document.getElementById('weton-button');

  const resultPanel = document.getElementById('result-panel');
  const wetonPanel = document.getElementById('weton-panel');

  searchButton.addEventListener('click', () => {
    try {
      const analysis = analysisService.analyzeDate(searchInput.value);
      renderAnalysis(analysis);
      console.log('Ka-Tika backend ticks:', analysis.backend);
    } catch (error) {
      alert(error.message);
    }
  });

  wetonButton.addEventListener('click', () => {
    try {
      const profile = wetonService.getBirthProfile(wetonInput.value);
      const nextOtonan = wetonService.getNextOtonan(wetonInput.value, searchInput.value || undefined);
      renderWeton(profile, nextOtonan);
    } catch (error) {
      alert(error.message);
    }
  });

  function renderAnalysis(analysis) {
    const c = analysis.baliCalendar;

    setText('masehi-view', analysis.masehi);
    setText('wuku-view', c.wuku);
    setText('sapta-view', c.saptawara);
    setText('panca-view', c.pancawara);
    setText('tri-view', c.triwara);
    setText('sasih-view', c.sasih);
    setText('fase-view', c.labelFaseSasih);

    renderList('rainan-list', analysis.rainan.map((r) => `${r.name}: ${r.note}`), 'Tidak ada rainan khusus.');
    renderList('odalan-list', analysis.odalan.map((o) => `${o.pura} (${o.category})`), 'Tidak ada odalan yang cocok.');

    const dewasa = analysis.dewasaAyu;
    const positives = [...dewasa.baik, ...dewasa.netral].slice(0, 5);
    const negatives = [...dewasa.buruk, ...dewasa.waspada].slice(0, 5);
    setText('dewasa-good', positives.length ? positives.join(' • ') : 'Belum ada kecocokan dewasa ayu positif.');
    setText('dewasa-bad', negatives.length ? negatives.join(' • ') : 'Tidak ada indikasi buruk/waspada dari rule aktif.');

    resultPanel.hidden = false;
  }

  function renderWeton(profile, nextOtonan) {
    setText('weton-meta', `${profile.wuku} | ${profile.saptawara} ${profile.pancawara}`);
    setText('otonan-meta', `${nextOtonan.nextOtonanWita} WITA (Siklus ${nextOtonan.cycleDays} hari)`);
    wetonPanel.hidden = false;
  }

  function renderList(id, items, emptyMessage) {
    const ul = document.getElementById(id);
    ul.innerHTML = '';

    const finalItems = items.length ? items : [emptyMessage];
    finalItems.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      ul.appendChild(li);
    });
  }

  function setText(id, value) {
    document.getElementById(id).textContent = value;
  }
})();
