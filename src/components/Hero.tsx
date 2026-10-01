import React from 'react';

interface HeroProps {
  onGetStarted: () => void;
  onOpenSpaceStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onOpenSpaceStory }) => {
  return (
    <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 overflow-hidden hero-glow-radial text-center px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Main Punchy Title (Matches Screenshot https://www.tradingview.com/) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]">
          Where the world does markets
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-xl text-[#d1d4dc] max-w-2xl font-normal leading-relaxed mb-10 px-2">
          Join 100 million traders and investors taking the future into their own hands.
        </p>

        {/* Hero Slanted Button */}
        <div className="flex flex-col items-center mb-14 sm:mb-16">
          <button
            onClick={onGetStarted}
            className="tv-skew-cta bg-white hover:bg-neutral-200 text-black px-10 py-4 font-bold text-base transition-transform active:scale-95 shadow-[0_10px_35px_rgba(255,255,255,0.18)] cursor-pointer"
          >
            <span className="tv-skew-cta-inner inline-block">
              Get started for free
            </span>
          </button>
          <span className="mt-3.5 text-xs text-[#787b86] font-medium tracking-wide">
            $0 forever, no credit card needed
          </span>
        </div>

        {/* Astronaut Scott Kidd Poteet Space Mission Pill Badge */}
        <button
          onClick={onOpenSpaceStory}
          className="group inline-flex items-center gap-3.5 px-4 py-2 bg-[#131722]/90 hover:bg-[#1e222d] border border-[#2a2e39] hover:border-[#2962ff]/60 rounded-full transition-all duration-200 shadow-lg cursor-pointer text-left"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-800 ring-2 ring-blue-500/40 shrink-0">
            <img
              alt="Scott Kidd Poteet"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAudlDz_amdvIa9a_1hm5XFX4_yKwAoC-gT23dR6U0aCV6y3VFwbOf0eywSl5A9l-pjoOeKOwr2Q7VGYB-_9C_Vri-KyeeuniYE0HcnCLlGH1J4SYRbNnH-XI3kGFdEduJ5unmYJp84UtF_ro1cXYA8gyOFwGM_3BLjerCpCJfpzi6Lpoq67uxmv5JKWcCN4D8qhPzMs4-3PW9ayWktdAdP8pcpI9W6uJU7y7wHJdF3JY2PU1A4XJ_9"
            />
          </div>
          <div className="text-left text-xs">
            <div className="flex items-center font-bold text-white group-hover:text-[#2962ff] transition-colors">
              <span>See our space story</span>
              <svg
                className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
              </svg>
            </div>
            <div className="text-[#787b86] font-normal">With astronaut Scott &quot;Kidd&quot; Poteet</div>
          </div>
        </button>
      </div>
    </section>
  );
};
