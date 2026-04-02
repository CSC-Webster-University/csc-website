import SmoothWavyCanvas from './SmoothWavyCanvas';
import { useTheme } from '../hooks/useTheme';
import { cx } from '../utils/css';

/* ── Canvas Configuration by Theme ────────────────────────────── */
const CANVAS_DARK = {
  backgroundColor: '#131313',
  primaryColor: '255, 255, 255',
  secondaryColor: '255, 255, 255',
  accentColor: '255, 255, 255',
  lineOpacity: 0.5,
  animationSpeed: 0.005,
};

const CANVAS_LIGHT = {
  backgroundColor: '#f5f5f5',
  primaryColor: '0, 0, 0',
  secondaryColor: '0, 0, 0',
  accentColor: '0, 0, 0',
  lineOpacity: 0.4,
  animationSpeed: 0.005,
};

/* ── Background Image References ──────────────────────────────── */
const NODE_IMAGES = {
  ai: 'https://ayarlabs.com/wp-content/uploads/2024/12/Model-Dimension-AIML.jpg',
  icpc: 'https://acm.psu.edu/files/2024/11/icpc_logo.png',
  cyber: 'https://datos-insights.com/wp-content/uploads/2023/07/what-we-offer_cybersecurity.jpg',
};

/**
 * Tracks Component (Active Nodes)
 * 
 * Displays the active interest groups in the club.
 * Built using a Tailwind CSS Grid (Bento Box style).
 * 
 * Grid behavior: 
 * - Mobile: 1 column. 
 * - Desktop: 4 columns, 2 rows. Features span multiple columns/rows to build the bento layout.
 * 
 * @returns {JSX.Element} The rendered Tracks section.
 */
export default function Tracks() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const canvasProps = isDark ? CANVAS_DARK : CANVAS_LIGHT;

  /* ── Reusable Component Styles ──────────────────────────────── */
  const bentoCardBase = cx(
    'backdrop-blur-sm p-8 flex flex-col justify-between',
    'group cursor-pointer relative overflow-hidden transition-all duration-500',
    'border border-transparent hover:border-primary/20'
  );

  const bentoImageStyle = cx(
    'absolute inset-0 w-full h-full object-cover',
    'opacity-10 grayscale transition-all duration-700',
    'group-hover:scale-110 group-hover:opacity-20'
  );

  const themeHoverEffect = isDark
    ? 'bg-surface-container-high/80 hover:bg-surface-bright hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)]'
    : 'bg-white/60 hover:bg-white hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(0,0,0,0.06)]';

  const themeHoverEffectMedium = isDark
    ? 'bg-surface-container-low/80 hover:bg-surface-container-high hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)]'
    : 'bg-white/50 hover:bg-white hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(0,0,0,0.06)]';

  return (
    <section id="tracks" className="relative w-full min-h-screen py-8 px-8 md:px-16 flex flex-col justify-center items-center overflow-hidden">

      {/* Background Animation Layer */}
      <SmoothWavyCanvas {...canvasProps} />

      <div className="relative z-10 w-full max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex justify-between items-end" style={{ marginBottom: '3rem' }}>
          <div>
            <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tighter uppercase">
              Active_Nodes
            </h2>
            <p className="mono-data text-sm text-outline mt-4">
              Current interest groups and active teams within the club.
            </p>
          </div>
          <div className="hidden md:block mono-data text-[10px] text-outline-variant">
            [ AI/ML ] [ ICPC ] [ CYBER ]
          </div>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-auto md:h-[380px]">

          {/* Large Card: AI & Data Science (Spans 2 columns AND 2 rows) */}
          <div className={cx('md:col-span-2 md:row-span-2', bentoCardBase, themeHoverEffect)}>
            <img alt="AI neural network background" className={bentoImageStyle} src={NODE_IMAGES.ai} />

            {/* Animated scanline overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-[20%] animate-scanline pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="material-symbols-outlined text-4xl">neurology</span>
              <span className="mono-data text-xs px-3 py-1 bg-primary text-on-primary">LEADERSHIP_CORE</span>
            </div>

            <div className="relative z-10">
              <h3 className="font-headline text-3xl md:text-4xl font-black tracking-tighter mb-4">
                AI_ML_DS_DE
              </h3>
              <p className="text-on-surface-variant max-w-sm text-sm">
                We are currently working on a few projects and learning about AI, ML, DS, and DE.
              </p>
            </div>
          </div>

          {/* Medium Card: Competitive Programming (Spans 2 columns, 1 row defaults) */}
          <div className={cx('md:col-span-2', bentoCardBase, themeHoverEffectMedium)}>
            <img alt="ICPC Programming background" className={bentoImageStyle} src={NODE_IMAGES.icpc} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-[20%] animate-scanline pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="material-symbols-outlined text-3xl">token</span>
              <span className="mono-data text-xs text-primary">Leader: Kushal Shrestha</span>
            </div>

            <div className="relative z-10 mt-4">
              <h3 className="font-headline text-xl md:text-2xl font-bold tracking-tight mb-2">
                COMPETITIVE_PROGRAMMING
              </h3>
              <p className="text-on-surface-variant text-sm line-clamp-2">
                We train every Wednesday at 3:30 PM in the library. DM the code team lead if you want to join.
              </p>
            </div>
          </div>

          {/* Medium Card: Cybersecurity (Spans 2 columns, 1 row defaults) */}
          <div className={cx('md:col-span-2', bentoCardBase, themeHoverEffectMedium)}>
            <img alt="Cybersecurity background overlay" className={bentoImageStyle} src={NODE_IMAGES.cyber} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-[20%] animate-scanline pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="material-symbols-outlined text-3xl">security</span>
              <span className="mono-data text-xs text-primary">Leader: Khan</span>
            </div>

            <div className="relative z-10 mt-4">
              <h3 className="font-headline text-xl md:text-2xl font-bold tracking-tight mb-2">
                CYBERSECURITY
              </h3>
              <p className="text-on-surface-variant text-sm line-clamp-2">
                Join forces to tackle CTFs and secure networks.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
