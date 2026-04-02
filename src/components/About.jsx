import SmoothWavyCanvas from './SmoothWavyCanvas';
import { useTheme } from '../hooks/useTheme';
import { cx } from '../utils/css';

/* ── Canvas Configuration by Theme ────────────────────────────── */
const CANVAS_DARK = {
    backgroundColor: '#1b1b1b',
    primaryColor: '255, 255, 255',
    secondaryColor: '255, 255, 255',
    accentColor: '255, 255, 255',
    lineOpacity: 0.5,
    animationSpeed: 0.003,
};

const CANVAS_LIGHT = {
    backgroundColor: '#ededed',
    primaryColor: '0, 0, 0',
    secondaryColor: '0, 0, 0',
    accentColor: '0, 0, 0',
    lineOpacity: 0.4,
    animationSpeed: 0.003,
};

/* ── Static Mission Cards Data ────────────────────────────────── */
const MISSION_CARDS = [
    {
        icon: 'terminal',
        title: 'Learn & Build',
        description: 'From beginner programming workshops to full-stack web development, we provide the resources to grow your technical skills outside the classroom.',
    },
    {
        icon: 'hub',
        title: 'Community & Networking',
        description: 'Connect with peers, alumni, and tech industry professionals. We host regular tech talks, hackathons, and career development events.',
    },
];

/**
 * About Component
 * 
 * Renders the Mission Statement portion of the landing page.
 * Includes inspirational text and info cards describing primary core values.
 * Uses a side-pinned title layout on wider viewports.
 * 
 * @returns {JSX.Element} The rendered About section.
 */
export default function About() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const canvasProps = isDark ? CANVAS_DARK : CANVAS_LIGHT;

    /* ── Shared Card Styles ───────────────────────────────────────── */
    const cardStyles = cx(
        'p-6 cursor-default border-l-4 border-transparent',
        'transition-all duration-500 hover:border-primary hover:-translate-y-1',
        isDark ? 'hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'hover:shadow-[0_0_20px_rgba(0,0,0,0.08)]'
    );

    return (
        <section
            id="about"
            className="relative w-full min-h-screen py-8 px-8 md:px-16 flex flex-col justify-center overflow-hidden"
        >
            {/* Background Animation Layer */}
            <SmoothWavyCanvas {...canvasProps} />

            {/* Structured Content Grid */}
            <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0">

                {/* Left Side: Mission Statement Header */}
                <div className="md:col-span-4" style={{ marginLeft: '2rem' }}>
                    <h2 className="font-headline text-4xl font-bold tracking-tighter uppercase mb-6">
                        Mission_Statement
                    </h2>
                    <div className="w-16 h-1 bg-primary" />
                </div>

                {/* Right Side: Cards and Quote */}
                <div className="md:col-span-8 flex flex-col">
                    
                    {/* Feature Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: '2rem' }}>
                        {MISSION_CARDS.map(({ icon, title, description }) => (
                            <div key={icon} className={cardStyles}>
                                <span className="material-symbols-outlined text-2xl mb-3">
                                    {icon}
                                </span>
                                <h3 className="font-headline text-lg font-bold mb-2 uppercase tracking-tight">
                                    {title}
                                </h3>
                                <p className="font-body text-on-surface-variant leading-relaxed text-sm">
                                    {description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Pull Quote */}
                    <blockquote className={cx(
                        'border-y py-6 transition-colors duration-700 animate-pulse-border',
                        'border-outline-variant/20 hover:border-primary/50'
                    )}>
                        <p className="font-headline text-xl md:text-2xl font-light italic leading-tight text-primary/90">
                            &quot;Programming isn&apos;t just about writing code;
                            it&apos;s about solving problems and building the future.
                            The Club is a space for everyone to create, fail, and learn.&quot;
                        </p>
                        <cite className="block mt-4 mono-data text-sm uppercase text-outline-variant">
                            — CSC Leadership Teams
                        </cite>
                    </blockquote>

                </div>
            </div>
        </section>
    );
}
