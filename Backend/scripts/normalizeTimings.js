function normalizeTimings(timings) {
  if (!timings) return [];
  if (!Array.isArray(timings)) return [];

  // Legacy: [["08:00 AM","10:00 AM"],["12:00 PM","2:00 PM"]]
  if (Array.isArray(timings[0])) {
    return timings
      .filter((slot) => Array.isArray(slot) && slot.length >= 2)
      .map(([start, end]) => ({ start, end }));
  }

  // Already in new shape: [{start,end}, ...]
  if (typeof timings[0] === 'object' && timings[0] !== null) {
    return timings.map((s) => ({
      start: s.start,
      end: s.end,
    }));
  }

  return [];
}

module.exports = normalizeTimings;