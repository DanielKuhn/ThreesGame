export function randomFromCandidates(candidates) {
  return candidates[Math.floor(Math.random()*candidates.length)];
}