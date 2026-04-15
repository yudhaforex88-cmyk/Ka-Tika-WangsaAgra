export function cycleAt(list, index) {
  const normalized = ((index % list.length) + list.length) % list.length;
  return list[normalized];
}

export function cycleByBlock(list, index, blockSize) {
  const blockIndex = Math.floor(index / blockSize);
  const normalized = ((blockIndex % list.length) + list.length) % list.length;
  return list[normalized];
}
