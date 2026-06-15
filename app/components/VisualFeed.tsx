"use client";

/**
 * VisualFeed — Work showcase with project cards.
 * Grid layout with black cards, rounded corners, and project details.
 */
export function VisualFeed() {
  const projects = [
    {
      id: 1,
      title: "Brand & logo work",
      subtitle: "SUB-COPY TEXT",
      description:
        "Logo systems, brand identities, and visual language for businesses across food, tech, and services. Rooted in BFA craft.",
      label: "Logo design",
      tag: "Brand identity",
      imageColor: "bg-black",
    },
    {
      id: 2,
      title: "AI career guide for Bharat",
      subtitle: "SUB-COPY TEXT",
      description:
        "Career guidance for tier-2 city students in India. AI-powered, voice-first, built around real constraints.",
      label: null,
      tag: null,
      imageColor: "bg-black",
    },
    {
      id: 3,
      title: "Coming soon",
      subtitle: "",
      description: "",
      label: "Coming soon",
      tag: null,
      imageColor: "bg-black",
      comingSoon: true,
    },
  ];

  return (
    <div className="w-full">
      <div className="grid w-full gap-6 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Card 1: Brand & Logo Work */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[3/2.5] overflow-hidden rounded-[24px] bg-black p-8 md:p-10">
              <div className="inline-block rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-white/70 mb-4">
                {projects[0].label}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                    {projects[0].title.split(" ")[0]}
                    <br />
                    {projects[0].title.split(" ").slice(1).join(" ")}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: AI Career Guide */}
          <div className="group cursor-pointer">
            <div className="rounded-[24px] bg-white p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-2">
                {projects[1].title}
              </h3>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                {projects[1].subtitle}
              </p>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
                {projects[1].description}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block rounded-full border border-gray-300 px-4 py-1.5 text-xs font-medium text-gray-600">
                  Brand identity
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-start">
          {/* Card 3: Coming Soon */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[3/3.5] overflow-hidden rounded-[24px] bg-black p-8 md:p-10 flex flex-col justify-between">
              <div className="inline-block rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-white/70 w-fit">
                Coming soon
              </div>
              <div className="flex items-center justify-center flex-1">
                <h3 className="text-5xl md:text-6xl font-bold text-white text-center leading-tight">
                  AI<br />
                  GUIDE
                </h3>
              </div>
              <button className="inline-block rounded-full border border-white/30 px-6 py-2 text-xs font-semibold text-white uppercase tracking-wider hover:bg-white/10 transition">
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
