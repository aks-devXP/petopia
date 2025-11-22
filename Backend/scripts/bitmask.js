exports.VET_FACILITY_BITS = {
  // assign stable bit positions (0..31)
  general_consult: 0,
  surgery: 1,
  dental_care: 2,
  diagnostics: 3,
  pharmacy: 4,
  emergency_24x7: 5,
  teleconsult: 6,
  home_visit: 7,
  boarding: 8,
  grooming: 9,
  pickup_drop: 10,
  insurance_cashless: 11,
};
exports.TRAINER_FACILITY_BITS = {
  obedience_training: 0,
  puppy_training: 1,
  behavior_modification: 2,
  aggression_management: 3,
  home_training: 4,
  board_and_train: 5,
  agility_training: 6,
  leash_training: 7,
  separation_anxiety_program: 8,
  group_classes: 9,
  online_consultation: 10,

};

exports.GROOMER_FACILITY_BITS = {
  basic_grooming: 0,            // Bath, brush, nail trim
  full_grooming: 1,             // Full-service grooming + styling
  spa_bath: 2,                  // Aroma bath, conditioning, massage
  de_shedding: 3,               // Coat thinning & shedding control
  tick_flea_treatment: 4,       // Anti-parasite wash
  home_service: 5,              // Grooming at client's home
  pickup_drop: 6,               // Pickup & drop for pets
  cat_specialist: 7,            // Groomer trained for cats
  styled_haircut: 8,            // Breed-specific / fancy cuts
  dental_cleaning: 9,           // Dental hygiene for pets
};


exports.maskFor =(facilities = [],FACILITY_BITS={})=> {
  let m = 0n; // BigInt to avoid JS overflow while computing
  for (const f of facilities) {
    const bit = FACILITY_BITS[f];
    if (bit == null) continue;
    m |= (1n << BigInt(bit));
  }
  return m;
}

exports.facilitiesFromMask = (mask,FACILITY_BITS={})=> {
  // mask is Number/Long; normalize to BigInt for iteration
  const big = BigInt(mask);
  // console.log(mask);
  // console.log(FACILITY_BITS);
  return Object.entries(FACILITY_BITS)
    .filter(([, bit]) => (big & (1n << BigInt(bit))) !== 0n)
    .map(([name]) => name);
}

exports.hasFacility=(mask, f,FACILITY_BITS={})=> {
  const bit = FACILITY_BITS[f];
  if (bit == null) return false;
  return (BigInt(mask) & (1n << BigInt(bit))) !== 0n;
}
