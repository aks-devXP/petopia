

const animals = [
  {
    id: 'dog-labrador-retriever',
    category: 'Dog',
    name: 'Labrador Retriever',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746294829/labrador_wgzlmn.jpg',
    temperament: 'Friendly, outgoing & even-tempered', // delete this field
    height: '21.5–24.5 in (m), 20.5–23.5 in (f)',
    energyLevel: 4,
    weight: '65–80 lbs (m), 55–70 lbs (f)',
    lifeExpectancy: '10–12 yrs',
    groomingNeeds: 'Low–moderate: weekly brushing',// delete this field 
    canStayAlone: 3,
    physicalDescription:
      'Medium-large with a short, dense, weather-resistant coat and “otter” tail.',
    dietaryNeeds: [
      { label: 'Chicken & fish (high-quality protein)', icon: 'chicken' },
      { label: 'Beef & mutton options',                   icon: 'meat'    },
      { label: 'Whole grains (brown rice, oatmeal)',       icon: 'grain'   },
      { label: 'Vegetables & fruits (carrots, blueberries)', icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Choco',  icon: 'chocolate' },
      { label: 'Grapes & raisins',  icon: 'grapes'    },
      { label: 'Onions & garlic',   icon: 'onion'     },
      { label: 'Fatty / processed', icon: 'fatty'     },
    ],
    healthIssues: [
      'Hip dysplasia',
      'Elbow dysplasia',
      'Progressive retinal atrophy',
    ],
  },

  {
    id: 'dog-siberian-husky',
    category: 'Dog',
    name: 'Siberian Husky',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746294822/husky_jd42wq.jpg',
    temperament: 'Friendly, alert & energetic',
    height: '21–23.5 in (m), 20–22 in (f)',
    energyLevel: 5,
    weight: '45–60 lbs (m), 35–50 lbs (f)',
    lifeExpectancy: '12–15 yrs',
    groomingNeeds: 'High: heavy shed twice/year, weekly brushing otherwise',
    canStayAlone: 2,
    physicalDescription:
      'Medium build, dense double coat, erect triangular ears and distinctive mask.',
    dietaryNeeds: [
      { label: 'Fish & lean meat (salmon, turkey)', icon: 'fish' },
      { label: 'Whole grains (barley, quinoa)',        icon: 'grain' },
      { label: 'Veg & fruits (spinach, apples)',       icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Chocolate',        icon: 'chocolate' },
      { label: 'Grapes & raisins', icon: 'grapes'    },
      { label: 'Onions & garlic',  icon: 'onion'     },
    ],
    healthIssues: [
      'Hip dysplasia',
      'Corneal dystrophy',
      'Epilepsy',
    ],
  },

  {
    id: 'dog-golden-retriever',
    category: 'Dog',
    name: 'Golden Retriever',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746294809/golden_retriever_pzt5nv.jpg',
    temperament: 'Intelligent, friendly & devoted',
    height: '23–24 in (m), 21.5–22.5 in (f)',
    energyLevel: 4,
    weight: '65–75 lbs (m), 55–65 lbs (f)',
    lifeExpectancy: '10–12 yrs',
    groomingNeeds: 'Moderate: weekly brushing',
    canStayAlone: 3,
    physicalDescription:
      'Strong, muscular body with a water-repellent dense outer coat.',
    dietaryNeeds: [
      { label: 'Chicken & beef (high-quality protein)', icon: 'chicken' },
      { label: 'Oatmeal & rice (wholesome grains)',      icon: 'grain'   },
      { label: 'Berries & leafy greens',                icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Chocolate',        icon: 'chocolate' },
      { label: 'Fatty scraps',     icon: 'fatty'     },
      { label: 'Grapes & raisins', icon: 'grapes'    },
    ],
    healthIssues: [
      'Hip dysplasia',
      'Cancer (hemangiosarcoma)',
      'Hypothyroidism',
    ],
  },

  {
    id: 'dog-german-shepherd',
    category: 'Dog',
    name: 'German Shepherd',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297755/german_shepherd_jvux2r.jpg',
    temperament: 'Alert, courageous & confident',
    height: '22–26 in (m), 20–24 in (f)',
    energyLevel: 5,
    weight: '65–90 lbs (m), 50–70 lbs (f)',
    lifeExpectancy: '9–13 yrs',
    groomingNeeds: 'Moderate: weekly brushing',
    canStayAlone: 2,
    physicalDescription:
      'Large, muscular dog with dense double coat, erect ears & bushy tail.',
    dietaryNeeds: [
      { label: 'Chicken, fish & beef (protein)', icon: 'chicken' },
      { label: 'Brown rice & oats (grains)',        icon: 'grain'   },
      { label: 'Carrots, apples & blueberries',     icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Chocolate',        icon: 'chocolate' },
      { label: 'Grapes & raisins', icon: 'grapes'    },
      { label: 'Onions & garlic',  icon: 'onion'     },
      { label: 'Fatty / processed', icon: 'fatty'    },
    ],
    healthIssues: [
      'Hip & elbow dysplasia',
      'Bloat (gastric torsion)',
      'Degenerative myelopathy',
    ],
  },
  {
    id: 'dog-beagle',
    category: 'Dog',
    name: 'Beagle',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746296634/beagle_wi8tmq.jpg',
    temperament: 'Friendly, curious, and merry',
    height: '13–15 in',
    energyLevel: 5,
    weight: '20–30 lbs',
    lifeExpectancy: '12–15 yrs',
    groomingNeeds: 'Low — occasional brushing',
    canStayAlone: 3,
    physicalDescription:
      'Small hound with a short coat, long velvety ears and an exceptional nose.',
    dietaryNeeds: [
      { label: 'Chicken & turkey (lean protein)', icon: 'chicken' },
      { label: 'Fish (salmon, whitefish)',        icon: 'fish'    },
      { label: 'Whole grains (brown rice, oats)', icon: 'grain'   },
      { label: 'Veg & fruits (carrots, blueberries)', icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Chocolate',      icon: 'chocolate' },
      { label: 'Grapes & raisins', icon: 'grapes'  },
      { label: 'Onions & garlic',  icon: 'onion'   },
      { label: 'Fatty / processed foods', icon: 'fatty' },
    ],
    healthIssues: ['Epilepsy', 'Hip dysplasia', 'Hypothyroidism'],
  },

  {
    id: 'dog-poodle',
    category: 'Dog',
    name: 'Poodle',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746296657/poodle_asgr2u.jpg',
    temperament: 'Intelligent, active, and proud',
    height: '10–15 in (Mini), 15+ in (Std)',
    energyLevel: 4,
    weight: '10–70 lbs (toy→standard)',
    lifeExpectancy: '12–15 yrs',
    groomingNeeds: 'High — daily to weekly grooming',
    canStayAlone: 4,
    physicalDescription:
      'Elegant, square-built dog with a curly coat and proud carriage.',
    dietaryNeeds: [
      { label: 'Chicken & beef (high protein)', icon: 'chicken' },
      { label: 'Fish (cod, salmon)',           icon: 'fish'    },
      { label: 'Whole grains (quinoa, rice)',  icon: 'grain'   },
      { label: 'Veg & fruits (peas, apples)',  icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Chocolate',      icon: 'chocolate' },
      { label: 'Fatty trimmings', icon: 'fatty'    },
      { label: 'Onions & garlic', icon: 'onion'   },
    ],
    healthIssues: [
      'Hip dysplasia',
      'Progressive retinal atrophy',
      'Addison’s disease',
    ],
  },

  {
    id: 'dog-dachshund',
    category: 'Dog',
    name: 'Dachshund',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746296648/dachshund_tsxfdz.jpg',
    temperament: 'Courageous, clever, and lively',
    height: '8–9 in (Std), 5–6 in (Mini)',
    energyLevel: 4,
    weight: '16–32 lbs (Std), 8–11 lbs (Mini)',
    lifeExpectancy: '12–16 yrs',
    groomingNeeds: 'Low — occasional brushing',
    canStayAlone: 3,
    physicalDescription:
      'Long-bodied, short-legged dog with a smooth or wirehaired coat.',
    dietaryNeeds: [
      { label: 'Lean meats (chicken, turkey)', icon: 'chicken' },
      { label: 'Whole grains (oatmeal, barley)', icon: 'grain'   },
      { label: 'Veg & fruits (green beans, apples)', icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Chocolate',       icon: 'chocolate' },
      { label: 'Fatty foods',     icon: 'fatty'   },
      { label: 'Foods high in calcium (bones)', icon: '',      },
    ],
    healthIssues: [
      'Intervertebral disc disease (IVDD)',
      'Obesity',
      'Epilepsy',
    ],
  },

  {
    id: 'dog-boxer',
    category: 'Dog',
    name: 'Boxer',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746296643/boxer_n73slq.jpg',
    temperament: 'Playful, patient, and spirited',
    height: '21–25 in (m), 21–23.5 in (f)',
    energyLevel: 5,
    weight: '65–80 lbs (m), 50–65 lbs (f)',
    lifeExpectancy: '10–12 yrs',
    groomingNeeds: 'Low — weekly brushing',
    canStayAlone: 3,
    physicalDescription:
      'Medium-large athletic dog with a short, smooth coat and strong jaws.',
    dietaryNeeds: [
      { label: 'Beef & chicken (muscle support)', icon: 'meat'    },
      { label: 'Fish & eggs (omega fats)',         icon: 'fish'    },
      { label: 'Whole grains (rice, oats)',        icon: 'grain'   },
      { label: 'Veg & fruits (pumpkin, berries)',  icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Chocolate',       icon: 'chocolate' },
      { label: 'Grapes & raisins', icon: 'grapes'   },
      { label: 'Fatty/processed', icon: 'fatty'    },
    ],
    healthIssues: [
      'Hip dysplasia',
      'Cancer (mast cell tumors)',
      'Heart cardiomyopathy',
    ],
  },

  {
    id: 'cat-persian',
    category: 'Cat',
    name: 'Persian',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746296652/persian_hw2dqt.jpg',
    temperament: 'Calm, gentle, and affectionate',
    height: '8–10 in',
    energyLevel: 2,
    weight: '7–12 lbs',
    lifeExpectancy: '12–17 yrs',
    groomingNeeds: 'High — daily brushing',
    canStayAlone: 4,
    physicalDescription:
      'Round-faced, long-haired cat with a stout body and short muzzle.',
    dietaryNeeds: [
      { label: 'High-quality protein (chicken, turkey)', icon: 'chicken' },
      { label: 'Moderate grains (rice, oats)',                  icon: 'grain'   },
      { label: 'Veg & fruits (pumpkin, blueberries)',           icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Onions & garlic', icon: 'onion' },
      { label: 'Chocolate',       icon: 'chocolate' },
      { label: 'Dairy (if lactose-intolerant)', icon: '' },
    ],
    healthIssues: [
      'Polycystic kidney disease',
      'Respiratory distress',
      'Eye tear duct issues',
    ],
  },

  {
    id: 'cat-bengal',
    category: 'Cat',
    name: 'Bengal',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746296636/bengal_cat_zvxs6d.jpg',
    temperament: 'Active, playful, and vocal',
    height: '8–10 in',
    energyLevel: 5,
    weight: '8–15 lbs',
    lifeExpectancy: '12–16 yrs',
    groomingNeeds: 'Low — weekly brushing',
    canStayAlone: 3,
    physicalDescription:
      'Medium build with a leopard-like spotted or marble coat.',
    dietaryNeeds: [
      { label: 'Chicken & fish (protein)', icon: 'chicken' },
      { label: 'Whole grains (quinoa, rice)', icon: 'grain'   },
      { label: 'Veg (peas, spinach)',           icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Onions & garlic', icon: 'onion' },
      { label: 'Chocolate',       icon: 'chocolate' },
    ],
    healthIssues: [
      'Hypertrophic cardiomyopathy',
      'Progressive retinal atrophy',
    ],
  },

  {
    id: 'cat-ragdoll',
    category: 'Cat',
    name: 'Ragdoll',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746296655/rangdoll_cat_g8e7fk.jpg',
    temperament: 'Docile, affectionate, and calm',
    height: '9–11 in',
    energyLevel: 3,
    weight: '10–20 lbs',
    lifeExpectancy: '12–17 yrs',
    groomingNeeds: 'Moderate — few times/week brushing',
    canStayAlone: 4,
    physicalDescription:
      'Large, muscular cat with semi-longhair and blue eyes that go limp when picked up.',
    dietaryNeeds: [
      { label: 'Chicken & turkey (lean protein)', icon: 'chicken' },
      { label: 'Oats & brown rice (grains)',        icon: 'grain'   },
      { label: 'Veg & fruits (pumpkin, melon)',     icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Onions & garlic', icon: 'onion' },
      { label: 'Chocolate',       icon: 'chocolate' },
    ],
    healthIssues: [
      'Hypertrophic cardiomyopathy',
      'Bladder stones',
    ],
  },

  {
    id: 'cat-british-shorthair',
    category: 'Cat',
    name: 'British Shorthair',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746296645/British_Shorthair_Cat_zvqty5.jpg',
    temperament: 'Calm, easygoing, and dignified',
    height: '8–10 in',
    energyLevel: 3,
    weight: '9–18 lbs',
    lifeExpectancy: '12–17 yrs',
    groomingNeeds: 'Low — once/week brushing',
    canStayAlone: 4,
    physicalDescription:
      'Stocky, round-faced cat with a dense plush coat and copper eyes.',
    dietaryNeeds: [
      { label: 'High-quality protein (chicken, fish)', icon: 'chicken' },
      { label: 'Limited grains (rice, barley)',         icon: 'grain'   },
      { label: 'Veg (pumpkin, green beans)',            icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Fatty treats',       icon: 'fatty'   },
      { label: 'Chocolate & sweets', icon: 'chocolate' },
    ],
    healthIssues: [
      'Hypertrophic cardiomyopathy',
      'Obesity',
    ],
  },
  {
    id: 'cat-sphynx',
    category: 'Cat',
    name: 'Sphynx',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297430/Sphynx_Cat_ui3bd7.jpg',
    temperament: 'Affectionate, energetic, and curious',
    height: '8–10 in',
    energyLevel: 4,
    weight: '6–12 lbs',
    lifeExpectancy: '10–14 yrs',
    groomingNeeds: 'Low — occasional bathing',
    canStayAlone: 3,
    physicalDescription:
      'Hairless, wrinkled skin with large ears and big eyes; feels warm to the touch.',
    dietaryNeeds: [
      { label: 'High-quality protein (chicken, fish)', icon: 'chicken' },
      { label: 'Whole grains (oatmeal, rice)',          icon: 'grain'   },
      { label: 'Veg & fruits (pumpkin, berries)',       icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Onions & garlic', icon: 'onion' },
      { label: 'Chocolate',       icon: 'chocolate' },
      { label: 'Fatty / processed', icon: 'fatty' },
    ],
    healthIssues: [
      'Hypertrophic cardiomyopathy',
      'Skin sensitivity',
      'Respiratory infections',
    ],
  },

  {
    id: 'fish-goldfish',
    category: 'Fish',
    name: 'Goldfish',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297448/gold_fish_elt9oo.jpg',
    temperament: 'Peaceful, social, and hardy',
    height: 'Varies (3–12 in)',
    energyLevel: 2,
    weight: 'N/A',
    lifeExpectancy: '10–15 yrs',
    groomingNeeds: 'Tank maintenance & periodic water changes',
    canStayAlone: 5,
    physicalDescription:
      'Slender to egg-shaped body, bright orange/gold scales, flowing fins.',
    dietaryNeeds: [
      { label: 'Flake or pellet food',       icon: 'grain'   },
      { label: 'Vegetable matter (blanched peas)', icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Overfeeding',  icon: 'fatty' },
      { label: 'Poor water quality', icon: '' },
    ],
    healthIssues: [
      'Swim bladder disease',
      'Ammonia burn',
      'Fin rot',
    ],
  },

  {
    id: 'fish-betta',
    category: 'Fish',
    name: 'Betta (Siamese Fighting Fish)',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297435/Betta_fish_rrxkf9.jpg',
    temperament: 'Territorial, colorful, solitary',
    height: '2–3 in',
    energyLevel: 3,
    weight: 'N/A',
    lifeExpectancy: '3–5 yrs',
    groomingNeeds: 'Tank cleaning & warm water',
    canStayAlone: 5,
    physicalDescription:
      'Long flowing fins, vibrant colors, slender body.',
    dietaryNeeds: [
      { label: 'Betta pellets or flakes',   icon: 'grain'   },
      { label: 'Live/frozen brine shrimp', icon: 'fish'    },
    ],
    dietaryAvoid: [
      { label: 'Overfeeding', icon: 'fatty' },
      { label: 'Cold water',  icon: ''    },
    ],
    healthIssues: [
      'Fin rot',
      'Velvet disease',
      'Swim bladder issues',
    ],
  },

  {
    id: 'fish-guppy',
    category: 'Fish',
    name: 'Guppy',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297460/guppy_yotv0l.jpg',
    temperament: 'Peaceful, active, schooling',
    height: '1.5–2 in',
    energyLevel: 3,
    weight: 'N/A',
    lifeExpectancy: '2–3 yrs',
    groomingNeeds: 'Regular tank upkeep',
    canStayAlone: 5,
    physicalDescription:
      'Small slender body, fan-shaped tail, vivid color patterns.',
    dietaryNeeds: [
      { label: 'Flake/pellet food',    icon: 'grain'   },
      { label: 'Live/frozen daphnia', icon: 'fish'    },
      { label: 'Vegetable flakes',     icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Overfeeding', icon: 'fatty' },
    ],
    healthIssues: [
      'Ich (“white spot”)',
      'Fin rot',
    ],
  },

  {
    id: 'fish-angelfish',
    category: 'Fish',
    name: 'Angelfish',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297432/angel_fish_nyciov.jpg',
    temperament: 'Semi-aggressive, tall-bodied cichlid',
    height: '6 in+ tall fins included',
    energyLevel: 3,
    weight: 'N/A',
    lifeExpectancy: '8–10 yrs',
    groomingNeeds: 'Stable water parameters & tank size',
    canStayAlone: 4,
    physicalDescription:
      'Triangular body with extended dorsal & anal fins, vertical stripes.',
    dietaryNeeds: [
      { label: 'Flake/pellet cichlid food', icon: 'grain'   },
      { label: 'Live/frozen brine shrimp', icon: 'fish'    },
    ],
    dietaryAvoid: [
      { label: 'Overfeeding', icon: 'fatty' },
    ],
    healthIssues: [
      'Ich',
      'Fin rot',
      'Hole-in-head disease',
    ],
  },

  {
    id: 'fish-neon-tetra',
    category: 'Fish',
    name: 'Neon Tetra',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297454/neon-tetra_fish_l02bqo.jpg',
    temperament: 'Peaceful schooling fish',
    height: '1–1.5 in',
    energyLevel: 2,
    weight: 'N/A',
    lifeExpectancy: '5–8 yrs',
    groomingNeeds: 'Maintaining planted, clean tank',
    canStayAlone: 4,
    physicalDescription:
      'Iridescent blue stripe with red tail stripe, slim body.',
    dietaryNeeds: [
      { label: 'Micro-pellets or flakes', icon: 'grain'   },
      { label: 'Micro live/frozen foods', icon: 'fish '   },
    ],
    dietaryAvoid: [
      { label: 'Overfeeding', icon: 'fatty' },
    ],
    healthIssues: [
      'Neon tetra disease',
      'Ich',
    ],
  },

  {
    id: 'bird-cockatiel',
    category: 'Bird',
    name: 'Cockatiel',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297457/cockatiel_bird_ogy45t.jpg',
    temperament: 'Friendly, whistling, social',
    height: '12–14 in',
    energyLevel: 3,
    weight: '75–120 g',
    lifeExpectancy: '15–20 yrs',
    groomingNeeds: 'Moderate — nail & beak trims',
    canStayAlone: 3,
    physicalDescription:
      'Crested parrot with gray body, yellow face & orange cheek patches.',
    dietaryNeeds: [
      { label: 'Seed mix & pellets',      icon: 'grain'      },
      { label: 'Fresh veggies & fruits',  icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Avocado & chocolate', icon: 'chocolate' },
      { label: 'Onions & garlic',     icon: 'onion'     },
    ],
    healthIssues: [
      'Psittacosis',
      'Respiratory infections',
      'Feather plucking',
    ],
  },

  {
    id: 'bird-african-grey',
    category: 'Bird',
    name: 'African Grey Parrot',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746298268/african_grey_parrot_ia59hh.jpg',
    temperament: 'Highly intelligent, talkative, affectionate',
    height: '12–14 in',
    energyLevel: 4,
    weight: '400–600 g',
    lifeExpectancy: '40–60 yrs',
    groomingNeeds: 'Moderate — nail & beak care',
    canStayAlone: 1,
    physicalDescription:
      'Medium parrot with grey plumage, red tail, curved beak.',
    dietaryNeeds: [
      { label: 'Pellets & seed mix',     icon: 'grain'      },
      { label: 'Fruits & veggies',       icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Avocado',               icon: 'onion'     },
      { label: 'Chocolate & caffeine',  icon: 'chocolate' },
    ],
    healthIssues: [
      'Psittacosis',
      'Feather-destructive behavior',
      'Aspergillosis',
    ],
  },

  {
    id: 'bird-macaw',
    category: 'Bird',
    name: 'Macaw',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297451/macaw_bird_nfda79.jpg',
    temperament: 'Social, loud, requires enrichment',
    height: '30–36 in',
    energyLevel: 4,
    weight: '2–4 lbs',
    lifeExpectancy: '50+ yrs',
    groomingNeeds: 'Moderate — beak & nail care',
    canStayAlone: 1,
    physicalDescription:
      'Large parrot with long tail feathers and vivid colors.',
    dietaryNeeds: [
      { label: 'Nut & seed mix',       icon: 'meat'    },
      { label: 'Pellets & fresh produce', icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Avocado & chocolate', icon: 'chocolate' },
      { label: 'Onions & garlic',     icon: 'onion'     },
    ],
    healthIssues: [
      'Psittacosis',
      'Feather plucking',
      'Cardiomyopathy',
    ],
  },

  {
    id: 'bird-lovebird',
    category: 'Bird',
    name: 'Lovebird',
    img:
      'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297490/love_bird_wqzyrj.jpg',
    temperament: 'Affectionate, playful, best in pairs',
    height: '5–7 in',
    energyLevel: 4,
    weight: '1–1.7 oz',
    lifeExpectancy: '10–15 yrs',
    groomingNeeds: 'Low — occasional nail trim',
    canStayAlone: 2,
    physicalDescription:
      'Small parrot with stout body, bright plumage, hooked beak.',
    dietaryNeeds: [
      { label: 'Seed mix & pellets',    icon: 'grain'      },
      { label: 'Veg & fruits (spinach, apple)', icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Avocado & chocolate', icon: 'chocolate' },
    ],
    healthIssues: [
      'Psittacosis',
      'Respiratory issues',
    ],
  },

  {
    id: 'bird-finch',
    category: 'Bird',
    name: 'Finch',
    img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746409728/finch_bird_cmkfer.jpg',
    temperament: 'Active, social, thrives in flocks',
    height: '3–6 in',
    energyLevel: 4,
    weight: '0.5–1 oz',
    lifeExpectancy: '5–10 yrs',
    groomingNeeds: 'Low — cage cleanliness',
    canStayAlone: 5,
    physicalDescription:
      'Small, slender bird with conical beak and varied color morphs.',
    dietaryNeeds: [
      { label: 'Finch seed mix', icon: 'grain'      },
      { label: 'Fresh veg (spinach)', icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Avocado & chocolate', icon: 'chocolate' },
    ],
    healthIssues: [
      'Respiratory infections',
      'Feather mites',
    ],
  },

  {
    id: 'reptile-bearded-dragon',
    category: 'Reptile',
    name: 'Bearded Dragon',
    img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746409739/Bearded_dragon_reptile_gmxos2.jpg',
    temperament: 'Docile, enjoys handling',
    height: '18–24 in',
    energyLevel: 3,
    weight: '400–800 g',
    lifeExpectancy: '8–12 yrs',
    groomingNeeds: 'Low — occasional shedding assistance',
    canStayAlone: 5,
    physicalDescription:
      'Spiny “beard,” broad body, rough scales, varying colors.',
    dietaryNeeds: [
      { label: 'Gut-loaded insects', icon: 'meat'    },
      { label: 'Leafy greens & veggies', icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'High-fat insects',  icon: 'fatty' },
      { label: 'Onions & garlic',  icon: 'onion' },
    ],
    healthIssues: [
      'Metabolic bone disease',
      'Impaction',
    ],
  },

  {
    id: 'reptile-corn-snake',
    category: 'Reptile',
    name: 'Corn Snake',
    img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746409730/CornSnake_t31bwl.jpg',
    temperament: 'Docile, easy to handle',
    height: '3–5 ft',
    energyLevel: 2,
    weight: '1–2 kg',
    lifeExpectancy: '15–20 yrs',
    groomingNeeds: 'Low — occasional shedding',
    canStayAlone: 5,
    physicalDescription:
      'Slender body with orange/red blotches on gray background.',
    dietaryNeeds: [
      { label: 'Frozen/thawed mice', icon: 'meat' },
    ],
    dietaryAvoid: [
      { label: 'Live feeding', icon: '' },
    ],
    healthIssues: [
      'Respiratory infection',
      'Mouth rot',
    ],
  },

  {
    id: 'reptile-ball-python',
    category: 'Reptile',
    name: 'Ball Python',
    img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746410873/Ball_Python_Reptile_tpjpnv.jpg',
    temperament: 'Shy, calm, curls into ball',
    height: '3–5 ft',
    energyLevel: 1,
    weight: '1–5 lbs',
    lifeExpectancy: '20–30 yrs',
    groomingNeeds: 'Low — occasional shedding assistance',
    canStayAlone: 5,
    physicalDescription:
      'Thick-bodied snake with smooth scales and varied pattern morphs.',
    dietaryNeeds: [
      { label: 'Frozen/thawed rats', icon: 'meat' },
    ],
    dietaryAvoid: [
      { label: 'Overhandling after feed', icon: '' },
    ],
    healthIssues: [
      'Respiratory infections',
      'Mites',
    ],
  },

  {
    id: 'reptile-red-eared-slider',
    category: 'Reptile',
    name: 'Red-Eared Slider',
    img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746410882/Red_Eared_Slider_my63dv.jpg',
    temperament: 'Semi-aquatic, basks in groups',
    height: '6–12 in',
    energyLevel: 2,
    weight: '1–3 lbs',
    lifeExpectancy: '20–40 yrs',
    groomingNeeds: 'Tank and basking area upkeep',
    canStayAlone: 5,
    physicalDescription:
      'Aquatic turtle with green shell and red stripe behind each eye.',
    dietaryNeeds: [
      { label: 'Turtle pellets',      icon: 'grain'      },
      { label: 'Leafy greens & veggies', icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Overfeeding', icon: 'fatty' },
    ],
    healthIssues: [
      'Shell rot',
      'Vitamin A deficiency',
    ],
  },

  {
    id: 'reptile-crested-gecko',
    category: 'Reptile',
    name: 'Crested Gecko',
    img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746410898/Crested_Gecko_Reptile_o1lzhs.jpg',
    temperament: 'Calm, arboreal, easy to handle',
    height: '7–10 in',
    energyLevel: 3,
    weight: '45–80 g',
    lifeExpectancy: '10–15 yrs',
    groomingNeeds: 'Low — occasional misting',
    canStayAlone: 5,
    physicalDescription:
      'Arboreal lizard with fringed crest over eyes and tail, varied colors.',
    dietaryNeeds: [
      { label: 'Commercial gecko diet', icon: 'grain'      },
      { label: 'Occasional insects',      icon: 'meat'       },
    ],
    dietaryAvoid: [
      { label: 'Improper calcium ratio', icon: '' },
    ],
    healthIssues: [
      'Metabolic bone disease',
      'Shedding issues',
    ],
  },

  {
    id: 'rodent-hamster',
    category: 'Rodent',
    name: 'Hamster',
    img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746411266/Hamster_vxpm3n.jpg',
    temperament: 'Nocturnal, curious, solitary',
    height: '2–7 in',
    energyLevel: 3,
    weight: '2–3 oz',
    lifeExpectancy: '2–3 yrs',
    groomingNeeds: 'Low — self-grooming',
    canStayAlone: 5,
    physicalDescription:
      'Small, stout rodent with cheek pouches and soft fur.',
    dietaryNeeds: [
      { label: 'Seed & pellet mix',          icon: 'grain'      },
      { label: 'Vegetables (carrots, spinach)', icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Chocolate & sweets', icon: 'chocolate' },
      { label: 'Onions & garlic',   icon: 'onion'     },
      { label: 'Fatty treats',      icon: 'fatty'     },
    ],
    healthIssues: [
      'Wet tail',
      'Dental overgrowth',
    ],
  },
  {
    id: 'rodent-guinea-pig',
    category: 'Rodent',
    name: 'Guinea Pig',
    img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746411316/Guinea_Pig_dbmec5.jpg',
    temperament: 'Social, gentle, and vocal',
    height: '8–10 in',
    energyLevel: 3,
    weight: '1.5–2.6 lbs',
    lifeExpectancy: '4–8 yrs',
    groomingNeeds: 'Low — occasional brushing',
    canStayAlone: 2,
    physicalDescription:
      'Small, stout rodent with no tail, short legs and a round body covered in dense fur.',
    dietaryNeeds: [
      { label: 'Timothy hay (high fiber)',      icon: 'grain'      },
      { label: 'Guinea pig pellets',           icon: 'grain'      },
      { label: 'Fresh veggies (bell pepper)',  icon: 'vegetables' },
      { label: 'Vitamin C fruits (apple slices)', icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Onions & garlic',       icon: 'onion'   },
      { label: 'Chocolate',             icon: 'chocolate' },
      { label: 'Grapes & raisins',      icon: 'grapes'   },
      { label: 'High-sugar treats',     icon: 'fatty'    },
    ],
    healthIssues: [
      'Scurvy (Vitamin C deficiency)',
      'Respiratory infections',
      'Dental overgrowth',
    ],
  },

  {
    id: 'rodent-rat',
    category: 'Rodent',
    name: 'Rat',
    img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746410877/Rat_wpoqyz.jpg',
    temperament: 'Intelligent, curious, and social',
    height: '9–11 in (body), 7–9 in (tail)',
    energyLevel: 4,
    weight: '250–500 g',
    lifeExpectancy: '2–3 yrs',
    groomingNeeds: 'Low — self-grooming; nail trims as needed',
    canStayAlone: 2,
    physicalDescription:
      'Slender rodent with a hairless tail, whiskers, and a pointed snout.',
    dietaryNeeds: [
      { label: 'Lab blocks or rat pellets',  icon: 'grain'      },
      { label: 'Fresh fruits & veggies',    icon: 'vegetables' },
      { label: 'Occasional lean protein',   icon: 'chicken'   },
    ],
    dietaryAvoid: [
      { label: 'Citrus fruits',            icon: 'grapes'    },
      { label: 'Onions & garlic',          icon: 'onion'     },
      { label: 'Chocolate',                icon: 'chocolate' },
    ],
    healthIssues: [
      'Respiratory disease',
      'Tumors (mammary, pituitary)',
      'Parasites (mites)',
    ],
  },

  {
    id: 'rodent-chinchilla',
    category: 'Rodent',
    name: 'Chinchilla',
    img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746410921/Chinchilla_jsiwnx.jpg',
    temperament: 'Shy, active at dawn/dusk, social in groups',
    height: '8–12 in',
    energyLevel: 3,
    weight: '12–20 oz',
    lifeExpectancy: '10–20 yrs',
    groomingNeeds: 'Moderate — weekly dust baths',
    canStayAlone: 3,
    physicalDescription:
      'Plump body, large ears, bushy tail and the densest fur of any land mammal.',
    dietaryNeeds: [
      { label: 'Chinchilla pellets',       icon: 'grain'      },
      { label: 'Timothy hay',              icon: 'grain'      },
      { label: 'Occasional safe treats',   icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'High-fat seeds or nuts', icon: 'fatty '   },
      { label: 'Fresh fruits',          ' icon': 'grapes'   },
      { label: 'Onions & garlic',        icon: 'onion'    },
    ],
    healthIssues: [
      'Dental malocclusion',
      'Gastrointestinal stasis',
      'Fur slip if stressed',
    ],
  },

  {
    id: 'rodent-mouse',
    category: 'Rodent',
    name: 'Mouse',
    img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746410876/mouse_om0cfk.jpg',
    temperament: 'Curious, active, and social',
    height: '2–4 in',
    energyLevel: 5,
    weight: '0.5–1.5 oz',
    lifeExpectancy: '1.5–2 yrs',
    groomingNeeds: 'Low — self-grooming',
    canStayAlone: 3,
    physicalDescription:
      'Small, slender rodent with a pointed snout, large ears, and long tail.',
    dietaryNeeds: [
      { label: 'Mouse blocks or pellets',  icon: 'grain'      },
      { label: 'Fresh veggies & fruits',  icon: 'vegetables' },
    ],
    dietaryAvoid: [
      { label: 'Chocolate',           icon: 'chocolate' },
      { label: 'Onions & garlic',     icon: 'onion'     },
      { label: 'High-fat treats',     icon: 'fatty'    },
    ],
    healthIssues: [
      'Respiratory infections',
      'Tumors (various)',
      'Parasites (mites)',
    ],
  },
]
const getPetCount= async(req,res)=>{
  try{
    let category = req.query.category || [];
    if (typeof category === 'string') {
      category = category.split(',').map(c => c.trim());
    }
    console.log(category);  
    if (category.length>0){
      category = new Set(category.map(c=>c.toLowerCase()));
      const catCount = animals.filter(pet=> category.has(pet.category.toLowerCase())).length;
      return res.status(200).json({success:true ,message:"All Pet count Fetched Successfully",count: catCount });


    }
    
    const petCount = animals.length;
    res.status(200).json({success:true ,message:"All Pet count Fetched Successfully",count: petCount });

  }
  catch(error){
    console.error('Error fetching pet count:', error);
    res.status(500).json({ success:false,message: 'Internal Server Error In The Pet Counting Process' });
  }
}

const getPets = async (req,res)=>{
  try {
    let start = parseInt(req.params.start) || 0;
    
    let category = req.query.category || [];
    if (typeof category === 'string') {
      category = category.split(',').map(c => c.trim());
    }

    const count = parseInt(req.query.count) || 5;
    // console.log(category, start, count);
    start = start*count;
    if (category.length>0){
      category = new Set(category.map(c=>c.toLowerCase()
      ));
    }
    const filteredPets = category.size > 0 ? animals.filter(pet=> category.has(pet.category.toLowerCase())) : animals;
    const end = filteredPets.length-start>=count? start + count : filteredPets.length;
    const petList= filteredPets.slice(start, end);
    // console.log(petList.length);
    res.status(200).json({ success: true, message: 'Pet-list Fetched Successfully', pets: petList });

  }
  catch(error) {
    console.error('Error fetching pet list:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error In The Pet-list Fetching Process' });
  }
}

const getPetByID =(req,res)=>{
   try{
    var petId = req.params.id;
    // will need to convert in mongoDB ObjectID when it is implemented

    const pet = animals.find((p)=>
      p.id === petId||null);
    if(!pet){
      return res.status(404).json({
        success:false,
        message: 'Pet Id is invalid or not found',
      })
    }
    return res.status(200).json({
      success:true,
      message: 'Pet fetched successfully',
      pet: pet
    });

   }
   catch(err){
    // console.error('In controllerError fetching pet by ID:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error In The Pet Fetching Process' });
   }
}
const getAllPetCategories= (req,res)=>{
  try{
    // ... using spread operator we are converting set back into an array
    // new keyword is required here because the inbuilt Set's constructor does not create an instance of itself
    //  Some built-in constructors like Array or Objects do work without the new keyword
    const categories = [...new Set(animals.map(pets=> pets.category))];
    // console.log(categories);
    res.status(200).json({ success: true, message: 'All Pet Categories Fetched Successfully', categories: categories });
  }
  catch(err){
    // console.error('Error fetching all pet categories:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error In The Pet Categories Fetching Process' });

  };
}



module.exports = {
  getPets,
  getPetCount,
  getPetByID,
  getAllPetCategories,
  // getPetByCategories
};  