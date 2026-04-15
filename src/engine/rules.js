const RULES = [
  {
    id: 'kajeng-kliwon',
    title: 'Kajeng Kliwon',
    emoji: '🎉',
    when: ({ wewaran }) => wewaran.triwara === 'Kajeng' && wewaran.pancawara === 'Kliwon'
  },
  {
    id: 'saniscara-kliwon',
    title: 'Tumpek',
    emoji: '🎊',
    when: ({ wewaran }) => wewaran.saptawara === 'Saniscara' && wewaran.pancawara === 'Kliwon'
  },
  {
    id: 'purnama-card',
    title: 'Purnama',
    emoji: '🌕',
    when: ({ nilaiState }) => nilaiState.phase === 'purnama'
  }
];

export function detectHolyDays(payload) {
  return RULES.filter((rule) => rule.when(payload)).map(({ id, title, emoji }) => ({ id, title, emoji }));
}
