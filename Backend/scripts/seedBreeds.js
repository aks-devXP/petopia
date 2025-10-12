/*
 Seed breeds into MongoDB from Frontend JSON data.
 - Reads Frontend/src/Data/breedDog.json and breedCat.json
 - Inserts missing breeds (upsert) with empty Cloudinary images
 - Safe to run multiple times; existing breeds are left unchanged
 Usage:
   node Backend/scripts/seedBreeds.js
*/

const path = require('path');
require('dotenv').config();
require('../Models/SetDB');

const Breed = require('../Models/Breed');

function makeSlug(species, breed) {
  const base = `${(species || '').trim()} ${(breed || '').trim()}`.trim().toLowerCase();
  // replace non-alphanumeric with hyphens, collapse repeats, trim hyphens
  return base
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function safeGet(obj, pathArr, fallback) {
  return pathArr.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj) ?? fallback;
}

function normalizeBreed(b) {
  const breed = (b.breed || '').trim();
  const species = (b.species || '').trim();
  const general_info = {
    breedGroup: safeGet(b, ['general_info', 'breedGroup'], '') || '',
    description: safeGet(b, ['general_info', 'description'], '') || '',
    temperament: safeGet(b, ['general_info', 'temperament'], '') || '',
    height: safeGet(b, ['general_info', 'height'], '') || '',
    weight: safeGet(b, ['general_info', 'weight'], '') || '',
    lifeExpectancy: safeGet(b, ['general_info', 'lifeExpectancy'], '') || '',
  };
  const ratings = {
    energyLevel: Number(safeGet(b, ['ratings', 'energyLevel'], 3)) || 0,
    vocalizationLevel: Number(safeGet(b, ['ratings', 'barkingLevel'], safeGet(b, ['ratings', 'vocalizationLevel'], 0))) || 0,
    drooling: Number(safeGet(b, ['ratings', 'drooling'], 0)) || 0,
    shedding: Number(safeGet(b, ['ratings', 'shedding'], 0)) || 0,
    groomingNeeds: Number(safeGet(b, ['ratings', 'groomingNeeds'], 0)) || 0,
    trainability: Number(safeGet(b, ['ratings', 'trainability'], 0)) || 0,
    compatibilityWithKids: Number(safeGet(b, ['ratings', 'compatibilityWithKids'], 0)) || 0,
    compatibilityWithOtherPets: Number(safeGet(b, ['ratings', 'compatibilityWithOtherPets'], 0)) || 0,
    apartmentSuitability: Number(safeGet(b, ['ratings', 'apartmentSuitability'], 0)) || 0,
    canStayAlone: Number(safeGet(b, ['ratings', 'canStayAlone'], 0)) || 0,
    familyFriendly: Number(safeGet(b, ['ratings', 'familyFriendly'], 0)) || 0,
    warmWeatherSuitability: Number(safeGet(b, ['ratings', 'warmWeatherSuitability'], 0)) || 0,
    coldWeatherSuitability: Number(safeGet(b, ['ratings', 'coldWeatherSuitability'], 0)) || 0,
  };
  const physical_characteristics = {
    ears: safeGet(b, ['physical_characteristics', 'ears'], '') || '',
    head: safeGet(b, ['physical_characteristics', 'head'], '') || '',
    fur: safeGet(b, ['physical_characteristics', 'fur'], '') || '',
    body: safeGet(b, ['physical_characteristics', 'body'], '') || '',
    tail: safeGet(b, ['physical_characteristics', 'tail'], '') || '',
  };
  const history = Array.isArray(b.history) ? b.history : [];
  const care = {
    exercise: safeGet(b, ['care', 'exercise'], '') || '',
    grooming: safeGet(b, ['care', 'grooming'], '') || '',
    training: safeGet(b, ['care', 'training'], '') || '',
  };
  const rec = safeGet(b, ['diet', 'recommended'], []);
  const notRec = safeGet(b, ['diet', 'notRecommended'], []);
  const diet = {
    recommended: Array.isArray(rec) ? rec : [],
    notRecommended: Array.isArray(notRec) ? notRec : [],
  };
  const hCommon = safeGet(b, ['health', 'commonIssues'], []);
  const hSymptoms = safeGet(b, ['health', 'symptomsToWatch'], []);
  const hPrevent = safeGet(b, ['health', 'preventiveTips'], []);
  const health = {
    commonIssues: Array.isArray(hCommon) ? hCommon : [],
    symptomsToWatch: Array.isArray(hSymptoms) ? hSymptoms : [],
    preventiveTips: Array.isArray(hPrevent) ? hPrevent : [],
  };
  const owner_tips = Array.isArray(b.owner_tips) ? b.owner_tips : [];

  return {
    breed,
    species,
    slug: makeSlug(species, breed),
    general_info,
    ratings,
    physical_characteristics,
    history,
    care,
    diet,
    health,
    owner_tips,
    // images managed server-side via upload endpoint; initialize empty objects
    images: { primary: {}, secondary: {} },
  };
}

async function main() {
  try {
    const dogsPath = path.join(__dirname, '..', '..', 'Frontend', 'src', 'Data', 'breedDog.json');
    const catsPath = path.join(__dirname, '..', '..', 'Frontend', 'src', 'Data', 'breedCat.json');

    const dogs = require(dogsPath).breeds || [];
    const cats = require(catsPath).breeds || [];
    const all = [...dogs, ...cats];

    // Repair existing docs with missing slug to avoid unique null conflicts
    const existing = await Breed.find({ $or: [ { slug: { $exists: false } }, { slug: null }, { slug: '' } ] });
    for (const doc of existing) {
      const newSlug = makeSlug(doc.species, doc.breed);
      if (newSlug) {
        try { await Breed.updateOne({ _id: doc._id }, { $set: { slug: newSlug } }); } catch (_) {}
      }
    }

    let inserted = 0;
    let skipped = 0;

    for (const raw of all) {
      const doc = normalizeBreed(raw);
      if (!doc.breed || !doc.species) {
        console.warn('Skipping invalid entry (missing breed/species):', raw);
        skipped++;
        continue;
      }
      // Insert only if missing; keep seeding idempotent
      const res = await Breed.updateOne(
        { species: doc.species, breed: doc.breed },
        { $setOnInsert: doc },
        { upsert: true }
      );
      if (res.upsertedCount && res.upsertedCount > 0) inserted++;
      else skipped++;
    }

    console.log(`Seed complete. Inserted: ${inserted}, existing: ${skipped}`);
  } catch (e) {
    console.error('Seed failed:', e);
  } finally {
    const mongoose = require('mongoose');
    await mongoose.connection.close().catch(() => {});
  }
}

main();
