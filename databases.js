/**
 * DATABASE MODULAR
 * Setiap objek didesain agar mudah di-extend tanpa mengubah core engine.
 */

const dewasaAyuDB = {
  menikah: [
    {
      id: 'nikah-utama-1',
      match: { saptawara: ['Sukra', 'Wraspati'], pancawara: ['Kliwon', 'Umanis'] },
      recommendation: 'Baik untuk pawiwahan, utamakan upacara utama sebelum sandikala.',
      level: 'baik'
    },
    {
      id: 'nikah-hindari-1',
      match: { triwara: ['Beteng'], faseSasih: ['Tilem'] },
      recommendation: 'Kurang baik untuk pernikahan sakral, disarankan pilih dina lain.',
      level: 'buruk'
    }
  ],
  yadnya: {
    dewa: [
      { id: 'dewa-1', match: { saptawara: ['Redite'], pancawara: ['Paing'] }, recommendation: 'Baik untuk Dewa Yadnya.', level: 'baik' }
    ],
    manusa: [
      { id: 'manusa-1', match: { saptawara: ['Soma', 'Buda'] }, recommendation: 'Baik untuk Manusa Yadnya.', level: 'baik' }
    ],
    bhuta: [
      { id: 'bhuta-1', match: { triwara: ['Kajeng'] }, recommendation: 'Cocok untuk Bhuta Yadnya / pecaruan.', level: 'netral' }
    ]
  },
  pertanian: {
    buah: [
      { id: 'tanam-buah-1', match: { pancawara: ['Umanis', 'Paing'] }, recommendation: 'Baik memulai tanam buah.', level: 'baik' }
    ],
    umbi: [
      { id: 'tanam-umbi-1', match: { faseSasih: ['Tilem'] }, recommendation: 'Baik untuk tanaman umbi.', level: 'baik' }
    ],
    daun: [
      { id: 'tanam-daun-1', match: { faseSasih: ['Purnama'] }, recommendation: 'Baik untuk tanaman daun/hijau.', level: 'baik' }
    ]
  },
  perdagangan: {
    warung: [
      { id: 'dagang-warung-1', match: { saptawara: ['Buda'], pancawara: ['Pon'] }, recommendation: 'Baik membuka warung/ritel.', level: 'baik' }
    ],
    teknologi: [
      { id: 'dagang-tech-1', match: { wuku: ['Wayang', 'Watugunung'] }, recommendation: 'Baik untuk rilis usaha digital/teknologi.', level: 'baik' }
    ],
    jasa: [
      { id: 'dagang-jasa-1', match: { saptawara: ['Sukra'] }, recommendation: 'Baik untuk negosiasi jasa.', level: 'netral' }
    ]
  },
  menempaPande: {
    senjata: [
      { id: 'pande-senjata-1', match: { triwara: ['Kajeng'], pancawara: ['Kliwon'] }, recommendation: 'Baik untuk menempa senjata.', level: 'baik' }
    ],
    alatTani: [
      { id: 'pande-tani-1', match: { saptawara: ['Anggara'] }, recommendation: 'Baik membuat alat pertanian.', level: 'baik' }
    ]
  },
  melautPerikanan: [
    { id: 'laut-1', match: { faseSasih: ['Purnama'] }, recommendation: 'Waspadai pasang kuat; fokus perikanan dekat pantai.', level: 'waspada' },
    { id: 'laut-2', match: { faseSasih: ['Tilem'] }, recommendation: 'Baik untuk melaut jarak menengah.', level: 'baik' }
  ],
  membangun: {
    rumah: [
      { id: 'bangun-rumah-1', match: { wuku: ['Sinta', 'Landep', 'Ugu'] }, recommendation: 'Baik untuk mulai pondasi rumah.', level: 'baik' }
    ],
    tempatSuci: [
      { id: 'bangun-suci-1', match: { saptawara: ['Wraspati'], pancawara: ['Kliwon'] }, recommendation: 'Baik untuk pembangunan tempat suci.', level: 'baik' }
    ],
    dapur: [
      { id: 'bangun-dapur-1', match: { triwara: ['Pasah'], saptawara: ['Soma', 'Buda'] }, recommendation: 'Baik untuk membangun dapur.', level: 'baik' }
    ]
  }
};

const rainanDB = [
  {
    id: 'galungan',
    name: 'Galungan',
    rule: { wuku: ['Dungulan'], saptawara: ['Buda'], pancawara: ['Kliwon'] },
    note: 'Rainan utama berdasarkan pertemuan Wuku Dungulan, Buda Kliwon.'
  },
  {
    id: 'kajeng-kliwon',
    name: 'Kajeng Kliwon',
    rule: { triwara: ['Kajeng'], pancawara: ['Kliwon'] },
    note: 'Rainan rutin 15-harian (versi kustom mengikuti triwara khusus Ka-Tika).'
  },
  {
    id: 'siwa-ratri',
    name: 'Siwa Ratri',
    rule: { sasih: ['Kapitu'], faseSasih: ['Tilem'] },
    note: 'Malam suci Siwa Ratri (berdasarkan sasih/fase).'
  },
  {
    id: 'nyepi',
    name: 'Nyepi (Caka)',
    rule: { sasih: ['Kasanga'], faseSasih: ['Tilem'] },
    note: 'Nyepi dipetakan dari sasih Kasanga saat Tilem.'
  }
];

const odalanDB = {
  sadKahyangan: [
    {
      id: 'besakih-bhatara-turun-kabeh',
      pura: 'Pura Agung Besakih',
      category: 'Sad Kahyangan',
      rule: { wuku: ['Kadasa', 'Dungulan', 'Watugunung'].filter(Boolean) },
      note: 'Template rule; sesuaikan detail piodalan aktual sesuai lontar lokal.'
    },
    {
      id: 'lempuyang',
      pura: 'Pura Luhur Lempuyang',
      category: 'Sad Kahyangan',
      rule: { saptawara: ['Anggara'], pancawara: ['Kliwon'] },
      note: 'Contoh pola odalan berbasis wewaran.'
    }
  ],
  dangKahyangan: [
    {
      id: 'tanah-lot',
      pura: 'Pura Luhur Tanah Lot',
      category: 'Dang Kahyangan',
      rule: { saptawara: ['Buda'], pancawara: ['Kliwon'] },
      note: 'Contoh pola Dang Kahyangan.'
    },
    {
      id: 'uluwatu',
      pura: 'Pura Luhur Uluwatu',
      category: 'Dang Kahyangan',
      rule: { wuku: ['Medangsia'] },
      note: 'Contoh rule berbasis wuku.'
    }
  ],
  jajarKemiri: [
    {
      id: 'jajar-kemiri-1',
      pura: 'Pura Jajar Kemiri - Contoh 1',
      category: 'Jajar Kemiri',
      rule: { triwara: ['Pasah'], pancawara: ['Pon'] },
      note: 'Placeholder database Jajar Kemiri (non Tri Kahyangan Desa).'
    }
  ]
};

window.KaTikaDB = {
  dewasaAyuDB,
  rainanDB,
  odalanDB
};
