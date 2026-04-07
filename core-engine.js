/**
 * CORE ENGINE Ka-Tika
 * - State machine berbasis anchor absolut (25-06-2025 18:00 WITA)
 * - Semua nilai tick/backend disediakan untuk modul internal, bukan untuk UI.
 */
class KaTikaEngine {
  constructor() {
    this.anchor = new Date('2025-06-25T18:00:00+08:00');
    this.msPerHour = 60 * 60 * 1000;
    this.msPerDauh = 8 * this.msPerHour; // 3 dauh per 24 jam
    this.msPerDay = 24 * this.msPerHour;

    this.sasihNames = [
      'Kasa', 'Karo', 'Katiga', 'Kapat', 'Kalima', 'Kanem',
      'Kapitu', 'Kaulu', 'Kasanga', 'Kadasa', 'Jyestha', 'Sadha'
    ];

    this.wukuNames = [
      'Sinta', 'Landep', 'Ukir', 'Kulantir', 'Tolu', 'Gumbreg', 'Wariga', 'Warigadian', 'Julungwangi', 'Sungsang',
      'Dungulan', 'Kuningan', 'Langkir', 'Medangsia', 'Pujut', 'Pahang', 'Krulut', 'Merakih', 'Tambir', 'Medangkungan',
      'Matal', 'Uye', 'Menail', 'Prangbakat', 'Bala', 'Ugu', 'Wayang', 'Kelawu', 'Dukut', 'Watugunung'
    ];

    this.saptawara = ['Redite', 'Soma', 'Anggara', 'Buda', 'Wraspati', 'Sukra', 'Saniscara'];
    this.pancawaraCustom = ['Paing', 'Pon', 'Wage', 'Kliwon', 'Umanis'];
    this.triwaraCustom4 = ['Kajeng', 'Pasah', 'Beteng', 'Pasah'];
    this.caturwara = ['Sri', 'Laba', 'Jaya', 'Menala'];
    this.astawara = ['Sri', 'Indra', 'Guru', 'Yama', 'Ludra', 'Brahma', 'Kala', 'Uma'];
    this.sangawara = ['Dangu', 'Jangur', 'Gigis', 'Nohan', 'Ogan', 'Erangan', 'Urungan', 'Tulus', 'Dadi'];
    this.dasawara = ['Pati', 'Suka', 'Duka', 'Sri', 'Manuh', 'Manusa', 'Raja', 'Dewa', 'Raksasa', 'Pandita'];
    this.dwiwara = ['Menga', 'Pepet'];
    this.ekawara = ['Luang'];
  }

  mod(value, divisor) {
    return ((value % divisor) + divisor) % divisor;
  }

  parseWitaInput(inputString) {
    if (!inputString) {
      throw new Error('Input tanggal wajib diisi.');
    }
    const normalized = inputString.trim().replace(' ', 'T');
    const withSeconds = normalized.length === 16 ? `${normalized}:00` : normalized;
    const parsed = new Date(`${withSeconds}+08:00`);

    if (Number.isNaN(parsed.getTime())) {
      throw new Error('Format tanggal tidak valid. Gunakan YYYY-MM-DD HH:mm atau YYYY-MM-DDTHH:mm.');
    }

    return parsed;
  }

  compute(inputMasehi) {
    const targetDate = this.parseWitaInput(inputMasehi);
    const deltaMs = targetDate.getTime() - this.anchor.getTime();

    const dauhTick = Math.floor(deltaMs / this.msPerDauh);
    const dauh = this.mod(dauhTick, 3) + 1;

    const dinaTick = Math.floor(dauhTick / 3);
    const dina = this.mod(dinaTick, 420) + 1;
    const dinaPattern = dina % 2 === 1 ? 'Gelap' : 'Terang';

    const dayOffset = Math.floor(deltaMs / this.msPerDay);
    const sasih = this.computeSasih(dinaTick);
    const wewaran = this.computeWewaran(dayOffset);

    return {
      inputMasehi,
      isoWita: targetDate.toISOString(),
      backend: {
        deltaMs,
        dayOffset,
        dauhTick,
        dauh,
        dinaTick,
        dina,
        dinaPattern,
        sasihPattern: sasih.pattern,
        sasihCounter: sasih.sasihCounter
      },
      baliCalendar: {
        wuku: wewaran.wuku,
        saptawara: wewaran.saptawara,
        pancawara: wewaran.pancawara,
        triwara: wewaran.triwara,
        dwiwara: wewaran.dwiwara,
        ekawara: wewaran.ekawara,
        sasih: sasih.sasihName,
        faseSasih: sasih.phase,
        labelFaseSasih: `${sasih.phase} ${sasih.sasihName.toLowerCase()}`
      }
    };
  }

  computeSasih(dinaTick) {
    const dinaPerSasih = 24;
    const sasihAbsolute = Math.floor(dinaTick / dinaPerSasih);
    const sasihIndex = this.mod(sasihAbsolute, 12);
    const dayInSasih = this.mod(dinaTick, dinaPerSasih);

    // Pola A-B-A-B...
    const pattern = sasihIndex % 2 === 0 ? 'A' : 'B';

    let phase;
    if (pattern === 'A') {
      phase = dayInSasih < 8 ? 'Tilem' : dayInSasih < 16 ? 'Purnama' : 'Tilem';
    } else {
      phase = dayInSasih < 8 ? 'Purnama' : dayInSasih < 16 ? 'Tilem' : 'Purnama';
    }

    return {
      sasihCounter: sasihIndex + 1,
      sasihName: this.sasihNames[sasihIndex],
      pattern,
      phase
    };
  }

  computeWewaran(dayOffset) {
    return {
      wuku: this.wukuNames[this.mod(Math.floor(dayOffset / 7), 30)],
      saptawara: this.saptawara[this.mod(dayOffset, 7)],
      pancawara: this.pancawaraCustom[this.mod(dayOffset, 5)],
      triwara: this.triwaraCustom4[this.mod(dayOffset, 4)],
      caturwara: this.caturwara[this.mod(dayOffset, 4)],
      astawara: this.astawara[this.mod(dayOffset, 8)],
      sangawara: this.sangawara[this.mod(dayOffset, 9)],
      dasawara: this.dasawara[this.mod(dayOffset, 10)],
      dwiwara: this.dwiwara[this.mod(dayOffset, 2)],
      ekawara: this.ekawara[0]
    };
  }
}

window.KaTikaEngine = KaTikaEngine;
