// src/Pages/about/AboutUs.jsx
import ModelViewer from "./ModelViewer";
import dogUrl from "@assets/contact/chillCat.glb?url";

export default function AboutUs() {
  return (
    <section className="bg-app-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
        {/* Equal-height columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          {/* Left: content (fill height + vertical centering) */}
          <div className="h-full flex flex-col justify-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-quicksandBold text-ink-primary">
              About Us
            </div>

            <h1 className="mt-4 text-xl sm:text-2xl lg:text-3xl font-quicksandSemiBold text-ink-primary tracking-tight">
              The smarter way to care for the ones who rely on you.
            </h1>

            <div className="mt-5 space-y-4 text-[15px] leading-7 text-ink-secondary/90">
              <p>
                <span className="font-semibold text-ink-primary">Petopia</span> is built on a
                simple idea: every pet deserves the best care, and every pet parent should have
                the right tools to provide it.
              </p>
              <p>
                Many pet owners rely on scattered information and uncertain advice when it comes
                to their pets’ health. Petopia brings everything together in one reliable,
                easy-to-use platform designed to support everyday care and long-term well-being.
              </p>
              <p>
                Our goal is to create a connected ecosystem where medical records, vet
                consultations, nutrition plans, event updates, and NGO support exist in one
                trusted space. Petopia focuses on proactive, transparent, and accessible care—
                making it simpler to give pets the attention they deserve.
              </p>
              <p>
                What makes Petopia different is its focus on solving real challenges in modern
                pet care. Instead of generic advice, users receive structured guidance, access to
                trusted professionals, and timely reminders to prevent small issues from becoming
                emergencies.
              </p>
              <p className="text-ink-primary">
                Petopia stands for responsible ownership, reliable access to care, and a
                community built on trust and compassion.
              </p>
            </div>
          </div>

          {/* Right: model (fill height; responsive) */}
          <div className="h-full">
            {/* On mobile keep a square; on lg fill height */}
            <div className="relative hover:cursor w-full aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-full rounded-3xl overflow-hidden">
              <ModelViewer
                url={dogUrl}
                width="100%"
                height="100%"

                environmentPreset="city"

                // natural feel, no auto-rotate, cursor-only movement
                enableMouseParallax={false}
                enableHoverRotation={false}
                enableManualRotation={true}
                enableManualZoom={false}
                autoRotate={false}
                showScreenshotButton={false}
                fadeIn

                // initial orientation & distance (top-view Sketchfab Z-up fix via X rot)
                defaultRotationX={-30}   // tweak as needed
                defaultRotationY={0}
                defaultZoom={1.5}        // start reasonably framed
                minZoomDistance={0.8}
                maxZoomDistance={3.5}

                // offsets (use the correct prop names)
                modelXOffset={0}
                modelYOffset={0}

                placeholderSrc=""
                autoFrame
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
