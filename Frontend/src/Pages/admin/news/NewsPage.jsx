import React, { useEffect } from 'react'
import Heading from '@/components/NewsPage/Heading'
import MainImage from '@/components/NewsPage/MainImage'
import Content from '@/components/NewsPage/Content'
import Sidebar from '@/components/NewsPage/Sidebar'
import { useParams } from 'react-router-dom'

const NewsPage = ({topic,subtopic,time,img,imgSrc,data,author,date}) => {

  const sampleItems = [
    {
      id: 'A',
      image: 'https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/sites/131/2016/06/Istanbul_uberPET-Launch_blog_960x480_r1.jpg',
      title: 'Uber allows Mumbai residents to travel with pets',
      excerpt: 'Uber expands its pet-friendly rides to Mumbai, easing travel for pet parents.',
      badge: 'Trending',
      category: 'Policy',
    },
    {
      id: 'B',
      image: 'https://media.licdn.com/dms/image/v2/D4E12AQFQwXUZ-OurGg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1684406913385?e=2147483647&v=beta&t=QbPSAR02bVfR_6U8Rrjlqaziqpxb8Y4ZJ515GjwvW04',
      title: 'Gen Z drives India\'s pet parenting boom',
      excerpt: 'Survey shows 70% of Gen Z pet owners are first-time pet parents.',
      badge: 'Featured',
      category: 'Inspiration',
    },
    {
      id: 'C',
      image: 'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2023/04/pexels-petra-vajdova-7341095-Cropped-scaled.jpg',
      title: 'Pet insurance market set to reach ₹6,500 Cr',
      excerpt: 'Rising vet costs and awareness boost demand for pet insurance in India.',
      badge: 'Analysis',
      category: 'Health',
    },
    {
      id: 'D',
      image: 'https://d1jyxxz9imt9yb.cloudfront.net/medialib/4030/image/s768x1300/white_tiger_2_Cropped2.jpg',
      title: 'Tiger conservation efforts show promising results',
      excerpt: 'New census indicates uptick in tiger populations due to habitat protection.',
      badge: 'Wildlife',
      category: 'Wildlife',
    },
    {
      id: 'E',
      image: 'https://images.pexels.com/photos/573271/pexels-photo-573271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Community drive helps 200+ street dogs find homes',
      excerpt: 'NGOs and citizens collaborate for a mega adoption weekend across cities.',
      badge: 'Adoption',
      category: 'Adoption',
    },
    {
      id: 'F',
      image: 'https://images.pexels.com/photos/574539/pexels-photo-574539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Study: Pets reduce workplace stress significantly',
      excerpt: 'Research shows employee well-being rises when offices adopt pet-friendly policies.',
      badge: 'Research',
      category: 'Health',
    },
    {
      id: 'G',
      image: 'https://images.pexels.com/photos/5732476/pexels-photo-5732476.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
      title: 'NGOs launch nationwide winter feeding drive',
      excerpt: 'Volunteer groups across 40 cities roll out insulated shelters and feeding stations for street animals.',
      badge: 'Relief',
      category: 'Policy',
    },
    {
      id: 'H',
      image: 'https://images.pexels.com/photos/7210757/pexels-photo-7210757.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
      title: 'First pet blood bank opens in Pune',
      excerpt: 'State-of-the-art canine and feline blood bank promises faster emergency care for pets in Maharashtra.',
      badge: 'Health',
      category: 'Health',
    },
    {
      id: 'I',
      image: 'https://images.pexels.com/photos/5731905/pexels-photo-5731905.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
      title: 'Pet-friendly housing policy gains traction',
      excerpt: 'Housing boards in Bengaluru pilot guidelines to protect pet owners from unfair restrictions.',
      badge: 'Policy',
      category: 'Policy',
    },
    {
      id: 'J',
      image: 'https://images.pexels.com/photos/7210290/pexels-photo-7210290.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
      title: 'Tech startup debuts AI health tracker for dogs',
      excerpt: 'Wearable collar monitors vitals, flags anomalies, and syncs with vets for preventive care.',
      badge: 'Tech',
      category: 'Health',
    },
    {
      id: 'K',
      image: 'https://images.pexels.com/photos/7210636/pexels-photo-7210636.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
      title: 'Adoption festival places 500+ animals in new homes',
      excerpt: 'Weekend mega-camp in Delhi sees record turnout for rescued dogs and cats.',
      badge: 'Adoption',
      category: 'Adoption',
    },
    {
      id: 'L',
      image: 'https://images.pexels.com/photos/7210404/pexels-photo-7210404.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
      title: 'Stray animal vaccination week kicks off nationwide',
      excerpt: 'Municipal bodies and NGOs coordinate free anti-rabies shots with door-to-door awareness drives.',
      badge: 'Health',
      category: 'Health',
    },
    {
      id: 'M',
      image: 'https://images.pexels.com/photos/5957482/pexels-photo-5957482.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
      title: 'Eco-parks to feature pet-friendly trails',
      excerpt: 'New guidelines propose dedicated leashed zones, hydration points, and waste stations in city parks.',
      badge: 'Policy',
      category: 'Policy',
    },
    {
      id: 'N',
      image: 'https://images.pexels.com/photos/7210591/pexels-photo-7210591.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
      title: 'Therapy dogs deployed in exam centers',
      excerpt: 'Schools invite certified therapy animals to help students manage stress during board exams.',
      badge: 'Wellness',
      category: 'Inspiration',
    },
  ]

  // Build NewsData dynamically from sampleItems so every id resolves,
  // then override rich content for A-C.
  const baseFromSamples = sampleItems.reduce((acc, item) => {
    acc[item.id] = {
      topic: item.title,
      subtopic: item.excerpt,
      time: '5',
      img: item.image,
      imgSrc: 'Image',
      data: (
        <>
          <h4>{item.excerpt}</h4>
          <br />
          <h4>
            Stay tuned for a full story on this topic. In the meantime, explore
            more news on Petopia.
          </h4>
        </>
      ),
      author: 'Petopia Newsroom',
      date: 'Updated recently',
    }
    return acc
  }, {})

  const overrides = {
    A: {
      topic: "Uber allows Mumbai residents to travel with pets, Here’s how to book",
      subtopic: "Besides Mumbai, Uber Pet service is available in Delhi and Bengaluru.",
      time: "7",
      img: "https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/sites/131/2016/06/Istanbul_uberPET-Launch_blog_960x480_r1.jpg",
      imgSrc: "Uber Newsroom",
      data: (
        <>
          <h4>
            Uber has expanded its pet-friendly ride service, Uber Pet, to Mumbai,
            joining Delhi and Bengaluru in offering pet-inclusive travel. With
            this move, Uber aims to make commuting easier and more accessible for
            pet owners across three major Indian cities.
          </h4>
          <br />
          <h4>
            Whether it’s a trip to the vet, a playdate at a park, or just a ride
            across town, Uber Pet ensures your furry companions can accompany you
            hassle-free. Booking is easy—just enter your destination in the Uber
            app, select “Uber Pet,” review trip details, and confirm. The feature
            supports both on-demand and scheduled rides, catering to spontaneous
            plans and pre-booked errands. Uber has also collaborated with Heads Up
            For Tails (HUFT) to offer exclusive discounts when traveling to HUFT
            stores and spas in these cities. Presenting your Uber Pet ride receipt
            at the store unlocks added perks, making the experience even more
            delightful.
          </h4>
          <br />
          <h4>
            With this thoughtful expansion, Uber reinforces its commitment to
            comfort, accessibility, and user-centric innovation. By recognizing
            the growing needs of pet parents in urban India, Uber Pet is not just
            a new feature—it's a step toward inclusive mobility where everyone,
            including our animal companions, is considered.
          </h4>
          <br />
          <h4>
            Drivers opting into Uber Pet receive sensitization tips on handling animals,
            carrying a towel or sheet, and ensuring AC comfort. Pet parents are reminded
            to carry leashes and travel crates for safety during peak hours.
          </h4>
          <br />
          <h4>
            Early riders report smoother vet visits and reduced wait times for transport,
            especially in rain-heavy evenings when hailing regular cabs is difficult.
            The rollout will be monitored for demand, with expansion to more cities likely.
          </h4>
        </>
      ),
      author: "Express News Service",
      date: "March 6, 2025 19:17 IST",
    },
    B: {
      topic: "Gen Z Drives India's Pet Parenting Boom",
      subtopic:
        "Mars Petcare's global survey reveals 70% of Indian Gen Z pet owners are first-timers.",
      time: "5",
      img: "https://media.licdn.com/dms/image/v2/D4E12AQFQwXUZ-OurGg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1684406913385?e=2147483647&v=beta&t=QbPSAR02bVfR_6U8Rrjlqaziqpxb8Y4ZJ515GjwvW04",
      imgSrc: "Financial Express",
      data: (
        <>
          <h4>
            A recent global survey by Mars Petcare highlights a significant shift
            in India's pet ownership landscape, with Gen Z leading the charge.
            The study reveals that 70% of Indian Gen Z pet owners are first-time
            pet parents, indicating a burgeoning trend of pet adoption among the
            youth.
          </h4>
          <br />
          <h4>
            This surge is attributed to the desire for companionship, emotional
            support, and the therapeutic benefits pets offer. The nuclearization
            of families and increased urbanization have further fueled this trend,
            as young individuals seek solace and connection through pet ownership.
            Cats, in particular, are gaining popularity for their low-maintenance
            nature and stress-relieving presence.
          </h4>
          <br />
          <h4>
            The pet care industry is responding to this shift by offering
            specialized services and products tailored to the needs of these new
            pet parents. From organic pet food to tech-enabled grooming solutions,
            the market is evolving to cater to the preferences of a younger,
            more informed demographic.
          </h4>
          <br />
          <h4>
            Subscription boxes, app-based training sessions, and pet insurance plans
            are seeing upticks as first-time owners look for guided support.
            Community adoption drives and foster programs have also grown as housing
            societies become more pet-friendly.
          </h4>
          <br />
          <h4>
            Experts caution that education around responsible ownership is essential:
            regular vet checkups, parasite prevention, and socialization are key to
            keeping this generation of pets healthy and well-adjusted.
          </h4>
        </>
      ),
      author: "BrandWagon Online",
      date: "November 27, 2024 13:30 IST",
    },
    C: {
      topic: "India's Pet Insurance Market Set to Reach ₹6,500 Crore by 2025",
      subtopic:
        "Rising pet ownership and veterinary costs drive demand for pet insurance.",
      time: "10",
      img: "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2023/04/pexels-petra-vajdova-7341095-Cropped-scaled.jpg",
      imgSrc: "Business Standard",
      data: (
        <>
          <h4>
            The pet insurance market in India is projected to reach ₹6,500 crore
            by 2025, reflecting the growing awareness and need for financial
            protection among pet owners. This surge is driven by the increasing
            costs of veterinary care and a heightened sense of responsibility
            towards pet health.
          </h4>
          <br />
          <h4>
            Insurance companies are introducing tailored policies to cater to this
            demand, covering a range of services from routine check-ups to
            emergency treatments. The trend signifies a shift in how pets are
            perceived—not just as companions but as integral family members whose
            well-being is paramount.
          </h4>
          <br />
          <h4>
            As the pet care industry continues to expand, the integration of
            financial products like insurance underscores the evolving dynamics of
            pet ownership in India, emphasizing preparedness and comprehensive
            care.
          </h4>
          <br />
          <h4>
            Brokers report more customers opting for accident and surgery riders,
            while wellness add-ons for vaccines and dental care are gaining interest.
            Digital claims and cashless tie-ups with clinics are making policies easier to use.
          </h4>
          <br />
          <h4>
            Analysts expect regulatory clarity on pet insurance standards this year,
            which could streamline pricing and encourage wider adoption beyond metro cities.
          </h4>
        </>
      ),
      author: "Press Trust of India",
      date: "May 8, 2024 17:41 IST",
    },
    D: {
      topic: "Tiger conservation efforts show promising results",
      subtopic:
        "New census indicates uptick in tiger populations due to habitat protection.",
      time: "6",
      img: "https://d1jyxxz9imt9yb.cloudfront.net/medialib/4030/image/s768x1300/white_tiger_2_Cropped2.jpg",
      imgSrc: "National Tiger Census",
      data: (
        <>
          <h4>
            India’s latest tiger census reports a steady rise in numbers across protected reserves,
            crediting expanded corridors, anti-poaching patrols, and community-led conservation.
          </h4>
          <br />
          <h4>
            Forest departments note that buffer zones with regulated eco-tourism have reduced human-wildlife conflict,
            while rapid response teams and improved veterinary care are helping rehabilitate injured big cats.
          </h4>
          <br />
          <h4>
            Experts caution that climate change and habitat fragmentation remain risks; they recommend continued
            funding for corridor projects, camera-trap networks, and local livelihood programs that keep communities invested.
          </h4>
          <br />
          <h4>
            NGOs have called for stricter enforcement against illegal trade and more training for frontline staff.
            The government plans to table new guidelines on conflict mitigation and compensation for affected villages.
          </h4>
        </>
      ),
      author: "Wildlife Desk",
      date: "March 15, 2025 10:05 IST",
    },
    E: {
      topic: "Community drive helps 200+ street dogs find homes",
      subtopic:
        "NGOs and citizens collaborate for a mega adoption weekend across cities.",
      time: "7",
      img: "https://images.pexels.com/photos/573271/pexels-photo-573271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      imgSrc: "Adoptathon Mumbai",
      data: (
        <>
          <h4>
            A coalition of city shelters and citizen volunteers hosted a weekend adoption fair,
            setting up microchip booths, free first vaccines, and behavior assessments for prospective adopters.
          </h4>
          <br />
          <h4>
            Over 200 dogs and cats were paired with families, with post-adoption support groups created on messaging apps
            so new pet parents can get training and veterinary guidance during the first 90 days.
          </h4>
          <br />
          <h4>
            Organizers highlighted the role of foster networks in socializing rescued animals,
            reducing shelter crowding, and improving match quality.
          </h4>
          <br />
          <h4>
            The success has prompted plans for quarterly adoption festivals, with corporate sponsors offering
            starter kits and subsidized insurance to encourage responsible ownership.
          </h4>
        </>
      ),
      author: "City Volunteer Collective",
      date: "February 22, 2025 14:40 IST",
    },
    F: {
      topic: "Study: Pets reduce workplace stress significantly",
      subtopic:
        "Research shows employee well-being rises when offices adopt pet-friendly policies.",
      time: "6",
      img: "https://images.pexels.com/photos/574539/pexels-photo-574539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      imgSrc: "WorkWell Labs",
      data: (
        <>
          <h4>
            A cross-industry survey found that employees in pet-friendly offices reported 25% lower stress scores
            and higher collaboration, citing casual pet interactions as icebreakers and mood boosters.
          </h4>
          <br />
          <h4>
            Companies adopting the policy paired it with hygiene protocols, dedicated pet zones,
            and optional “no-pet days” to accommodate allergies and personal preferences.
          </h4>
          <br />
          <h4>
            HR teams also noted a decline in sick days and improved retention among younger employees
            who value inclusive and flexible workplaces.
          </h4>
          <br />
          <h4>
            The study recommends pilot programs, clear etiquette guidelines, and partnerships with local vets
            for vaccination and behavior screening to ensure safety.
          </h4>
        </>
      ),
      author: "Workplace Wellbeing Desk",
      date: "January 18, 2025 09:20 IST",
    },
    G: {
      topic: "NGOs launch nationwide winter feeding drive",
      subtopic:
        "Volunteer groups across 40 cities roll out insulated shelters and feeding stations for street animals.",
      time: "5",
      img: "https://images.pexels.com/photos/5732476/pexels-photo-5732476.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2",
      imgSrc: "Community Relief",
      data: (
        <>
          <h4>
            With temperatures dipping, NGOs and RWAs are deploying straw-lined kennels, thermal blankets,
            and evening feeding points to keep strays warm and nourished.
          </h4>
          <br />
          <h4>
            Volunteers are mapping high-risk zones—markets, bus depots, and construction sites—
            to ensure vulnerable animals have access to shelter and clean water through the night.
          </h4>
          <br />
          <h4>
            The drive includes awareness workshops on humane feeding practices and a hotline for reporting
            injured animals; rapid response teams coordinate with local vets for emergency care.
          </h4>
          <br />
          <h4>
            Donors can sponsor a shelter unit or monthly food packs; organizers plan to publish impact dashboards
            showing how many animals are served per locality.
          </h4>
        </>
      ),
      author: "Relief Network Bureau",
      date: "December 12, 2024 21:05 IST",
    },
    H: {
      topic: "First pet blood bank opens in Pune",
      subtopic:
        "State-of-the-art canine and feline blood bank promises faster emergency care for pets in Maharashtra.",
      time: "7",
      img: "https://images.pexels.com/photos/7210757/pexels-photo-7210757.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2",
      imgSrc: "Pune Pet Health",
      data: (
        <>
          <h4>
            A dedicated pet blood bank with cold-chain storage, cross-matching labs, and on-call logistics
            has launched in Pune, reducing wait times for transfusions in critical cases.
          </h4>
          <br />
          <h4>
            The facility has enrolled donor dogs and cats screened for diseases, and is partnering with clinics
            to establish drop-off points and mobile collection drives.
          </h4>
          <br />
          <h4>
            Pet parents can register healthy animals as donors, receiving annual health checkups in return,
            while vets get 24/7 access to packed cells and plasma for surgeries and trauma care.
          </h4>
          <br />
          <h4>
            The founders aim to replicate the model in Mumbai and Bengaluru within a year,
            creating a regional network to share inventory during shortages.
          </h4>
        </>
      ),
      author: "HealthTech Desk",
      date: "January 5, 2025 12:10 IST",
    },
    I: {
      topic: "Pet-friendly housing policy gains traction",
      subtopic:
        "Housing boards in Bengaluru pilot guidelines to protect pet owners from unfair restrictions.",
      time: "6",
      img: "https://images.pexels.com/photos/5731905/pexels-photo-5731905.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2",
      imgSrc: "Civic Matters",
      data: (
        <>
          <h4>
            Resident Welfare Associations in Bengaluru are adopting model bylaws that affirm pet ownership rights,
            ban breed discrimination, and set fair rules for leash use, hygiene, and quiet hours.
          </h4>
          <br />
          <h4>
            Legal experts note these guidelines align with Animal Welfare Board advisories and reduce disputes between
            residents by clarifying responsibilities for both pet parents and non-pet neighbors.
          </h4>
          <br />
          <h4>
            Training workshops for security staff and facility teams are being rolled out to ensure humane handling
            and to avoid unlawful restrictions on elevators or common areas.
          </h4>
          <br />
          <h4>
            City civic bodies are watching the pilot closely; if successful, the framework could be recommended
            statewide, giving pet owners more stability when renting or buying homes.
          </h4>
        </>
      ),
      author: "Urban Living Beat",
      date: "February 2, 2025 16:00 IST",
    },
    J: {
      topic: "Tech startup debuts AI health tracker for dogs",
      subtopic:
        "Wearable collar monitors vitals, flags anomalies, and syncs with vets for preventive care.",
      time: "5",
      img: "https://images.pexels.com/photos/7210290/pexels-photo-7210290.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2",
      imgSrc: "PawTech Labs",
      data: (
        <>
          <h4>
            A Bengaluru startup has launched an AI-powered collar that tracks heart rate variability,
            activity, sleep patterns, and scratching behavior to predict health issues early.
          </h4>
          <br />
          <h4>
            The device syncs with a vet dashboard, sending alerts for anomalies like rising temperature,
            reduced mobility, or excessive licking that could indicate pain or allergies.
          </h4>
          <br />
          <h4>
            Users get personalized care plans, nudges for vaccines and deworming, and a telehealth integration
            for quick consults; early trials report faster intervention for GI upsets and joint flare-ups.
          </h4>
          <br />
          <h4>
            PawTech Labs plans to add ECG-grade sensors and cat-specific form factors next year,
            while partnering with insurers for preventive-care discounts.
          </h4>
        </>
      ),
      author: "Tech & Wellness",
      date: "March 2, 2025 11:35 IST",
    },
    K: {
      topic: "Adoption festival places 500+ animals in new homes",
      subtopic:
        "Weekend mega-camp in Delhi sees record turnout for rescued dogs and cats.",
      time: "7",
      img: "https://images.pexels.com/photos/7210636/pexels-photo-7210636.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2",
      imgSrc: "Adopt Delhi",
      data: (
        <>
          <h4>
            Shelters from Delhi-NCR hosted a two-day festival with on-site vets, trainers, and behavior counselors
            helping families pick the right companion from senior dogs to energetic puppies and calm cats.
          </h4>
          <br />
          <h4>
            Adoption fees were waived for senior animals and special-needs pets, while every adoption
            included microchipping, first vaccines, and a starter kit from sponsors.
          </h4>
          <br />
          <h4>
            Workshops on decompression, diet transitions, and crate training prepared adopters for the first week at home,
            reducing returns and boosting long-term placement success.
          </h4>
          <br />
          <h4>
            Organizers plan follow-up community walks and socialization events to build a support network for new pet parents
            and encourage responsible care.
          </h4>
        </>
      ),
      author: "Adoption Desk",
      date: "January 28, 2025 18:10 IST",
    },
  }

  const NewsData = { ...baseFromSamples, ...overrides };
  

  const { id } = useParams();

  // normalize data into an array with explicit ids
  const newsArray = Object.entries(NewsData).map(([key, value]) => ({
    ...value,
    id: value.id || key,
    image: value.image || value.img,
  }));

  const item = newsArray.find((news) => news.id === id) || newsArray[0];

  // pick 3 related from NewsData excluding current
  const related = newsArray.filter((news) => news.id !== item?.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-app-bg via-app-surface to-app-bg pb-12">
        <Heading topic={item.topic} subtopic={item.subtopic} time={item.time}></Heading>
        <MainImage img={item.img} imgSrc={item.imgSrc}></MainImage>
        <div className='flex justify-evenly h-fit pb-5 px-6 gap-10 max-w-6xl mx-auto'>
            <Content data={item.data}></Content>
            <Sidebar author={item.author} date={item.date} related={related}></Sidebar>
        </div>
    </div>
  )
}

export default NewsPage
