/**
 * FEATURE MODULES
 * 1) WetonService
 * 2) DayAnalysisService (search engine hari)
 */

class RuleMatcher {
  static isMatch(calendarState, ruleObject) {
    return Object.entries(ruleObject).every(([key, allowedValues]) => {
      const current = calendarState[key];
      return allowedValues.includes(current);
    });
  }
}

class WetonService {
  constructor(engine) {
    this.engine = engine;
  }

  getBirthProfile(inputMasehi) {
    const result = this.engine.compute(inputMasehi);
    return {
      masehi: inputMasehi,
      wuku: result.baliCalendar.wuku,
      saptawara: result.baliCalendar.saptawara,
      pancawara: result.baliCalendar.pancawara
    };
  }

  getNextOtonan(inputMasehi, fromDateInput) {
    // Otonan menggunakan siklus 210 hari (30 wuku x 7 hari)
    const birthDate = this.engine.parseWitaInput(inputMasehi);
    const fromDate = fromDateInput ? this.engine.parseWitaInput(fromDateInput) : new Date();

    const ms210Days = 210 * 24 * 60 * 60 * 1000;
    let cursor = new Date(birthDate.getTime());

    while (cursor.getTime() <= fromDate.getTime()) {
      cursor = new Date(cursor.getTime() + ms210Days);
    }

    return {
      nextOtonanWita: this.formatDateToWita(cursor),
      cycleDays: 210
    };
  }

  formatDateToWita(date) {
    const shifted = new Date(date.getTime() + 8 * 60 * 60 * 1000);
    return shifted.toISOString().slice(0, 16).replace('T', ' ');
  }
}

class DayAnalysisService {
  constructor(engine, db) {
    this.engine = engine;
    this.db = db;
  }

  analyzeDate(inputMasehi) {
    const core = this.engine.compute(inputMasehi);
    const calendar = core.baliCalendar;

    const dewasa = this.evaluateDewasaAyu(calendar);
    const rainan = this.db.rainanDB.filter((event) => RuleMatcher.isMatch(calendar, event.rule));
    const odalan = this.collectOdalan(calendar);

    return {
      masehi: inputMasehi,
      baliCalendar: calendar,
      rainan,
      odalan,
      dewasaAyu: dewasa,
      backend: core.backend
    };
  }

  evaluateDewasaAyu(calendar) {
    const result = {
      baik: [],
      buruk: [],
      netral: [],
      waspada: []
    };

    const pushRule = (rule) => {
      if (RuleMatcher.isMatch(calendar, rule.match)) {
        result[rule.level]?.push(rule.recommendation);
      }
    };

    this.db.dewasaAyuDB.menikah.forEach(pushRule);
    Object.values(this.db.dewasaAyuDB.yadnya).flat().forEach(pushRule);
    Object.values(this.db.dewasaAyuDB.pertanian).flat().forEach(pushRule);
    Object.values(this.db.dewasaAyuDB.perdagangan).flat().forEach(pushRule);
    Object.values(this.db.dewasaAyuDB.menempaPande).flat().forEach(pushRule);
    this.db.dewasaAyuDB.melautPerikanan.forEach(pushRule);
    Object.values(this.db.dewasaAyuDB.membangun).flat().forEach(pushRule);

    return result;
  }

  collectOdalan(calendar) {
    return Object.values(this.db.odalanDB)
      .flat()
      .filter((record) => RuleMatcher.isMatch(calendar, record.rule));
  }
}

window.KaTikaFeatures = {
  RuleMatcher,
  WetonService,
  DayAnalysisService
};
