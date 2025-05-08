import React, { useState } from 'react'
import Category from '../Components/Guide/Category'
import Lister from '../Components/Guide/Lister'
import PawSearchBar from '../Components/Guide/PawSearchBar'
import { getAllAnimals } from '../Util/AnimalService'
const ALL_CATEGORIES = [
  { id: 'Dog', name: 'Dog' },
  { id: 'Cat', name: 'Cat' },
  { id: 'Fish', name: 'Fish' },
  { id: 'Bird', name: 'Bird' },
  { id: 'Reptile', name: 'Reptile' },
  { id: 'Rodent', name: 'Rodent' }
]

const GuideDisplay = () => {
  const [selectedCats, setSelectedCats] = useState([])
  // let animals = [
  //   {
  //     id: 'dog-labrador-retriever',
  //     name: 'Labrador Retriever',
  //     img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746294829/labrador_wgzlmn.jpg',
  //     description:
  //       "Labs are outgoing, even-tempered, and affectionate. They're incredibly versatile…"
  //   },
  //   {
  //     id: 'dog-siberian-husky',
  //     name: 'Siberian Husky',
  //     img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746294822/husky_jd42wq.jpg',
  //     description:
  //       "Huskies are known for their striking appearance—thick coat, erect ears…"
  //   },
  //   {
  //     id: 'dog-golden-retriever',
  //     name: 'Golden Retriever',
  //     img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746294809/golden_retriever_pzt5nv.jpg',
  //     description:
  //       "Friendly, intelligent, and eager to please, Golden Retrievers are known…"
  //   },
  
  // {
  //   id: 'dog-german-shepherd',
  //   category: 'Dog',
  //   name: 'German Shepherd',
  //   img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297755/german_shepherd_jvux2r.jpg',
  //   description:
  //     'German Shepherds are intelligent, loyal, and versatile working dogs often used in police and service roles.',
  // },
  // {
  //   id: 'dog-beagle',
  //   category: 'Dog',
  //   name: 'Beagle',
  //   img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746296634/beagle_wi8tmq.jpg',
  //   description:
  //     'Beagles are small hounds with a keen nose, friendly disposition, and boundless energy.',
  // },
  // {
  //   id: 'dog-poodle',
  //   category: 'Dog',
  //   name: 'Poodle',
  //   img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746296657/poodle_asgr2u.jpg',
  //   description:
  //     'Poodles are elegant, highly intelligent dogs coming in standard, miniature, and toy sizes.',
  // },
  // {
  //   id: 'dog-dachshund',
  //   category: 'Dog',
  //   name: 'Dachshund',
  //   img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746296648/dachshund_tsxfdz.jpg',
  //   description:
  //     'Dachshunds, also known as “wiener dogs,” are courageous, curious, and bold little hounds.',
  // },
  // {
  //   id: 'dog-boxer',
  //   category: 'Dog',
  //   name: 'Boxer',
  //   img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746296643/boxer_n73slq.jpg',
  //   description:
  //     'Boxers are playful, patient, and energetic – great family companions with a love for activity.',
  // },

  // // ----- CAT (excludes Siamese) -----
  // {
  //   id: 'cat-persian',
  //   category: 'Cat',
  //   name: 'Persian',
  //   img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746296652/persian_hw2dqt.jpg',
  //   description:
  //     'Persians are long-haired, sweet-faced cats known for their calm, gentle personalities.',
  // },
  // {
  //   id: 'cat-bengal',
  //   category: 'Cat',
  //   name: 'Bengal',
  //   img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746296636/bengal_cat_zvxs6d.jpg',
  //   description:
  //     'Bengals have a wild, leopard-like coat and are active, playful, and very vocal.',
  // },
  // {
  //   id: 'cat-ragdoll',
  //   category: 'Cat',
  //   name: 'Ragdoll',
  //   img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746296655/rangdoll_cat_g8e7fk.jpg',
  //   description:
  //     'Ragdolls are large, affectionate cats that go limp when you pick them up—hence the name.',
  // },
  // {
  //   id: 'cat-british-shorthair',
  //   category: 'Cat',
  //   name: 'British Shorthair',
  //   img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746296645/British_Shorthair_Cat_zvqty5.jpg',
  //   description:
  //     'British Shorthairs are round-faced, plush-coated cats known for their quiet, easygoing nature.',
  // },
  // {
  //   id: 'cat-sphynx',
  //   category: 'Cat',
  //   name: 'Sphynx',
  //   img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297430/Sphynx_Cat_ui3bd7.jpg',
  //   description:
  //     'Sphynxes are hairless cats with a big heart—extremely affectionate and attention-seeking.',
  // },

  // // ----- FISH (excludes Clownfish) -----
  // {
  //   id: 'fish-goldfish',
  //   category: 'Fish',
  //   name: 'Goldfish',
  //   img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297448/gold_fish_elt9oo.jpg',
  //   description:
  //     'Goldfish are hardy, colorful freshwater fish that can thrive in tanks or ponds.',
  // },
  // {
  //   id: 'fish-betta',
  //   category: 'Fish',
  //   name: 'Betta (Siamese Fighting Fish)',
  //   img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297435/Betta_fish_rrxkf9.jpg',
  //   description:
  //     'Bettas boast flowing fins and bold colors; they are best kept singly due to their aggression.',
  // },
  // {
  //   id: 'fish-guppy',
  //   category: 'Fish',
  //   name: 'Guppy',
  //   img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297460/guppy_yotv0l.jpg',
  //   description:
  //     'Guppies are small, live-bearing fish that come in a dazzling array of colors and patterns.',
  // },
  // {
  //   id: 'fish-angelfish',
  //   category: 'Fish',
  //   name: 'Angelfish',
  //   img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297432/angel_fish_nyciov.jpg',
  //   description:
  //     'Angelfish are tall, graceful cichlids that develop interesting adult shapes and long fins.',
  // },
  // {
  //   id: 'fish-neon-tetra',
  //   category: 'Fish',
  //   name: 'Neon Tetra',
  //   img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297454/neon-tetra_fish_l02bqo.jpg',
  //   description:
  //     'Neon Tetras are tiny schooling fish with shimmering blue-and-red stripes—perfect for planted tanks.',
  // },

  // // ----- BIRD (excludes Budgerigar) -----
  // {
  //   id: 'bird-cockatiel',
  //   category: 'Bird',
  //   name: 'Cockatiel',
  //   img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297457/cockatiel_bird_ogy45t.jpg',
  //   description:
  //     'Cockatiels are friendly, crested parrots known for their whistling and easy care.',
  // },
  // {
  //   id: 'bird-african-grey',
  //   category: 'Bird',
  //   name: 'African Grey Parrot',
  //   img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746298268/african_grey_parrot_ia59hh.jpg',
  //   description:
  //     'African Greys are superstar mimics with incredible reasoning skills and affectionate natures.',
  // },
  // {
  //   id: 'bird-macaw',
  //   category: 'Bird',
  //   name: 'Macaw',
  //   img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297451/macaw_bird_nfda79.jpg',
  //   description:
  //     'Macaws are large, brilliantly colored parrots that form strong bonds and need lots of space.',
  // },
  // {
  //   id: 'bird-lovebird',
  //   category: 'Bird',
  //   name: 'Lovebird',
  //   img: 'https://res.cloudinary.com/dvjcvwp61/image/upload/v1746297490/love_bird_wqzyrj.jpg',
  //   description:
  //     'Lovebirds are small, social parrots best kept in pairs; they display bright plumage and big personalities.',
  // },
  // {
  //   id: 'bird-finch',
  //   category: 'Bird',
  //   name: 'Finch',
  //   img: '/images/finch.jpg',
  //   description:
  //     'Finches are tiny, active birds that thrive in flocks and come in a rainbow of colors.',
  // },

  // // ----- REPTILE (excludes Leopard Gecko) -----
  // {
  //   id: 'reptile-bearded-dragon',
  //   category: 'Reptile',
  //   name: 'Bearded Dragon',
  //   img: '/images/bearded-dragon.jpg',
  //   description:
  //     'Bearded Dragons are docile lizards that enjoy being handled and show interesting “arm-washing” behavior.',
  // },
  // {
  //   id: 'reptile-corn-snake',
  //   category: 'Reptile',
  //   name: 'Corn Snake',
  //   img: '/images/corn-snake.jpg',
  //   description:
  //     'Corn Snakes are slender, docile constrictors in a variety of colors—great for beginners.',
  // },
  // {
  //   id: 'reptile-ball-python',
  //   category: 'Reptile',
  //   name: 'Ball Python',
  //   img: '/images/ball-python.jpg',
  //   description:
  //     'Ball Pythons are calm, manageable snakes that curl into a tight ball when stressed.',
  // },
  // {
  //   id: 'reptile-red-eared-slider',
  //   category: 'Reptile',
  //   name: 'Red-Eared Slider',
  //   img: '/images/red-eared-slider.jpg',
  //   description:
  //     'Red-Eared Sliders are semi-aquatic turtles recognized by the red stripe behind each eye.',
  // },
  // {
  //   id: 'reptile-crested-gecko',
  //   category: 'Reptile',
  //   name: 'Crested Gecko',
  //   img: '/images/crested-gecko.jpg',
  //   description:
  //     'Crested Geckos are easy-going arboreal lizards that come in a diversity of patterns.',
  // },

  // // ----- RODENT (new category) -----
  // {
  //   id: 'rodent-hamster',
  //   category: 'Rodent',
  //   name: 'Hamster',
  //   img: '/images/hamster.jpg',
  //   description:
  //     'Hamsters are small, nocturnal rodents that are relatively easy to care for—great starter pets.',
  // },
  // {
  //   id: 'rodent-guinea-pig',
  //   category: 'Rodent',
  //   name: 'Guinea Pig',
  //   img: '/images/guinea-pig.jpg',
  //   description:
  //     'Guinea Pigs are social, gentle rodents that thrive in pairs and love to “popcorn” when happy.',
  // },
  // {
  //   id: 'rodent-rat',
  //   category: 'Rodent',
  //   name: 'Rat',
  //   img: '/images/rat.jpg',
  //   description:
  //     'Fancy Rats are intelligent, affectionate, and surprisingly clean animals when handled regularly.',
  // },
  // {
  //   id: 'rodent-chinchilla',
  //   category: 'Rodent',
  //   name: 'Chinchilla',
  //   img: '/images/chinchilla.jpg',
  //   description:
  //     'Chinchillas have ultra-soft fur and require dust baths; they’re active and social at dawn and dusk.',
  // },
  // {
  //   id: 'rodent-mouse',
  //   category: 'Rodent',
  //   name: 'Mouse',
  //   img: '/images/mouse.jpg',
  //   description:
  //     'Fancy Mice are curious, tiny rodents that enjoy exploring and making simple toys out of paper rolls.',
  // }
  // ]
  let animals = getAllAnimals()
  animals = animals.filter((animal) => {
    if (selectedCats.length === 0) {
      return true
    }
    return selectedCats.includes(animal.category)
  }
  )
  return (
    <div className='w-full h-auto flex flex-col items-center bg-[#101017]'>
      <div className='w-full flex  justify-center items-center  py-4 border-b-[.5px]  border-[#e0e6f8] rounded-md'>
        <div className='mx-4 ' >
        <PawSearchBar/>

        </div>
        <div>
          <Category
          categories={ALL_CATEGORIES}
          selectedCategories={selectedCats}
          onChange={setSelectedCats}/>
        </div>
      </div>
      <div className= "flex flex-col flex-1">
        <Lister animals={animals} />
      </div>

    </div>
  )
}

export default GuideDisplay
