import { ChevronDown } from 'lucide-react';
import bg1 from '@/assets/NGO/bg1.png';
import bg2 from '@/assets/NGO/bg2.png';
import bg3 from '@/assets/NGO/bg3.png';
import bg4 from '@/assets/NGO/bg4.png';

const NGOHero = ({ onExploreServices }) => {
  const handleExploreClick = () => {
    if (onExploreServices) onExploreServices();
  };

  return (
    <section className="w-full bg-white px-12">
      {/* Top heading block */}
      <div className="w-full border-b border-slate-100">
        <div className="mx-4 md:mx-12 py-2 md:py-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-quicksandBold text-slate-800 leading-tight">
            A kinder world for
            <span className="block sm:inline"> countless happy tails</span>
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <span className="h-[3px] w-14 rounded-full bg-brand/50" />
            <span className="text-md sm:text-xl text-slate-700">
              Empowering animal welfare with compassion and transparency.
            </span>
          </div>
        </div>
      </div>

      {/* Main hero row */}
      <div className="mx-4 md:mx-12 pb-10">
        <div className="w-full flex flex-col md:flex-row items-stretch">
          
          {/* LEFT COLUMN / Vertical text + circular CTA */}
          <div className="w-full md:w-[260px] lg:w-[300px] flex justify-center md:justify-start">
            <div className="flex flex-col items-center justify-between h-full py-4">
              <p
                className="
                  text-md text-slate-600 tracking-[0.12em]
                  md:[writing-mode:vertical-rl]
                  md:[text-orientation:mixed]
                "
              >
                Partner with NGOs that <br/> prioritize transparency, trust, and <br/> 
                long-term animal welfare.
              </p>

              <button
                type="button"
                onClick={handleExploreClick}
                className="
                  mt-10 inline-flex items-center justify-center
                  h-14 w-14 rounded-full
                  bg-brand text-white
                  shadow-lg shadow-brand/30
                  hover:bg-brand-hover
                  transition
                "
                aria-label="Explore more"
              >
                <ChevronDown className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN / FIXED ROW of 4 images */}
          <div
            className="
              flex flex-row gap-4
              overflow-x-auto
              no-scrollbar
              py-6
            "
          >
            {/* Image 1 */}
            <img
              src={bg1}
              alt="NGO panel 1"
              className="
                h-[280px] md:h-[340px] lg:h-[380px]
                aspect-[9/16]
                object-cover
                rounded-l-3xl
                hover:scale-[1.01] hover:-translate-y-1
                transition-all duration-300 ease-out
                shadow-md hover:shadow-lg
              "
            />

            {/* Image 2 */}
            <img
              src={bg2}
              alt="NGO panel 2"
              className="
                h-[280px] md:h-[340px] lg:h-[380px]
                aspect-[9/16]
                object-cover
                hover:scale-[1.01] hover:-translate-y-1
                transition-all duration-300 ease-out
                shadow-md hover:shadow-lg
              "
            />

            {/* Image 3 */}
            <img
              src={bg3}
              alt="NGO panel 3"
              className="
                h-[280px] md:h-[340px] lg:h-[380px]
                aspect-[9/16]
                object-cover
                hover:scale-[1.01] hover:-translate-y-1
                transition-all duration-300 ease-out
                shadow-md hover:shadow-lg
              "
            />

            {/* Image 4 */}
            <img
              src={bg4}
              alt="NGO panel 4"
              className="
                h-[280px] md:h-[340px] lg:h-[380px]
                aspect-[9/16]
                object-cover
                rounded-r-3xl
                hover:scale-[1.01] hover:-translate-y-1
                transition-all duration-300 ease-out
                shadow-md hover:shadow-lg
              "
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default NGOHero;
