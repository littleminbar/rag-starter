import React from 'react';
import { X, Rocket, Award, ExternalLink, Globe2 } from 'lucide-react';

interface SpaceStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpaceStoryModal: React.FC<SpaceStoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative h-48 sm:h-64 bg-gradient-to-r from-blue-950 via-indigo-950 to-black overflow-hidden flex items-end p-6 border-b border-[#2a2e39]">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-[#787b86] hover:text-white transition-colors z-20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-[#2962ff]/50 bg-black shrink-0">
              <img
                alt="Scott Kidd Poteet"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAudlDz_amdvIa9a_1hm5XFX4_yKwAoC-gT23dR6U0aCV6y3VFwbOf0eywSl5A9l-pjoOeKOwr2Q7VGYB-_9C_Vri-KyeeuniYE0HcnCLlGH1J4SYRbNnH-XI3kGFdEduJ5unmYJp84UtF_ro1cXYA8gyOFwGM_3BLjerCpCJfpzi6Lpoq67uxmv5JKWcCN4D8qhPzMs4-3PW9ayWktdAdP8pcpI9W6uJU7y7wHJdF3JY2PU1A4XJ_9"
              />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#2962ff] flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5" /> Polaris Dawn Mission
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                TradingView in Low Earth Orbit
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300">
                With Mission Pilot &amp; Astronaut Scott &quot;Kidd&quot; Poteet
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-[#d1d4dc] leading-relaxed">
          <div className="p-4 rounded-xl bg-[#090a0d] border border-[#1f232f] flex items-start gap-4">
            <Award className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white text-base">Reaching 1,400 km Above Earth</div>
              <p className="text-xs text-[#787b86] mt-1">
                The highest human spaceflight since the Apollo program in December 1972.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2">The Mission &amp; The Vision</h3>
            <p>
              When astronaut Scott &quot;Kidd&quot; Poteet lifted off aboard the SpaceX Crew Dragon for the historic
              Polaris Dawn mission, he carried more than scientific payloads — he proved that the tools traders
              and analysts depend on on Earth operate at the very edge of technological frontiers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#1e222d]/60 border border-[#2a2e39]">
              <div className="text-xs font-mono text-[#2962ff] font-bold uppercase">Starlink In Space</div>
              <div className="text-lg font-bold text-white mt-1">Orbital Laser Comms</div>
              <p className="text-xs text-[#787b86] mt-1.5">
                Real-time data synchronization between the Dragon spacecraft and terrestrial Supercharts engines
                via optical space laser link.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#1e222d]/60 border border-[#2a2e39]">
              <div className="text-xs font-mono text-[#089981] font-bold uppercase">Precision Charts</div>
              <div className="text-lg font-bold text-white mt-1">Microsecond Analytics</div>
              <p className="text-xs text-[#787b86] mt-1.5">
                Monitoring market volatility, commodities indices, and telemetry feeds with zero-latency canvas rendering.
              </p>
            </div>
          </div>

          <blockquote className="border-l-4 border-[#2962ff] pl-4 italic text-neutral-300">
            &quot;In aviation and space exploration, situational awareness is everything. TradingView brings that exact
            clarity and situational awareness to millions of people analyzing the global economy.&quot;
            <span className="block mt-2 text-xs font-bold not-italic text-white">
              — Scott &quot;Kidd&quot; Poteet, Mission Pilot
            </span>
          </blockquote>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#1f232f]">
            <div className="flex items-center gap-2 text-xs text-[#787b86]">
              <Globe2 className="w-4 h-4 text-[#2962ff]" />
              <span>Broadcast to 100M+ global community members</span>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-[#2962ff] hover:bg-blue-600 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Back to Supercharts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
