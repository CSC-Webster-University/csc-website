import SmoothWavyCanvas from './SmoothWavyCanvas';
import { useTheme } from '../hooks/useTheme';
import { cx } from '../utils/css';

/* ── Canvas Configuration by Theme ────────────────────────────── */
const CANVAS_DARK = {
    backgroundColor: '#131313',
    primaryColor: '255, 255, 255',
    secondaryColor: '255, 255, 255',
    accentColor: '255, 255, 255',
    lineOpacity: 0.6,
    animationSpeed: 0.004,
};

const CANVAS_LIGHT = {
    backgroundColor: '#f5f5f5',
    primaryColor: '0, 0, 0',
    secondaryColor: '0, 0, 0',
    accentColor: '0, 0, 0',
    lineOpacity: 0.5,
    animationSpeed: 0.004,
};

/**
 * Hero Component
 * 
 * The full-screen landing section of the website. 
 * Displays the main club name, tagline, a primary connect CTA, and animated canvas background.
 * Adapts styling gracefully mapped to the 'dark' and 'light' theme context.
 * 
 * @returns {JSX.Element} The rendered Hero section.
 */
export default function Hero() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const canvasProps = isDark ? CANVAS_DARK : CANVAS_LIGHT;

    return (
        <section id="hero" className="relative w-full min-h-screen overflow-hidden">
            {/* Background Animation Layer */}
            <SmoothWavyCanvas {...canvasProps} />

            {/* Layout Wrapper to ensure horizontal content alignment across sections */}
            <div
                className="relative z-10 w-full min-h-screen flex flex-col pr-12 md:pr-24"
                style={{ paddingLeft: 'clamp(3rem, 8vw, 25rem)' }}
            >
                {/* Vertically Centered Main Typography Area */}
                <div className="flex-1 w-full max-w-7xl flex flex-col justify-center pt-16">

                    {/* Pre-Header Console Detail */}
                    <div
                        className={cx(
                            'flex items-center gap-6 mb-12',
                            'mono-data text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.4em]',
                            'uppercase font-semibold animate-fade-in',
                            isDark ? 'text-[#888888]' : 'text-[#777777]'
                        )}
                    >
                        <div className={cx('w-16 h-[1px]', isDark ? 'bg-[#424242]' : 'bg-[#c0c0c0]')} />
                        Establish Connection // Status: Active
                        <span className={cx('animate-blink font-bold', isDark ? 'text-white' : 'text-black')}>
                            _
                        </span>
                    </div>

                    {/* Primary Hero Header */}
                    <h1
                        className={cx(
                            'mb-20 md:mb-24 uppercase animate-fade-in-up',
                            'font-headline text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.85]',
                            isDark ? 'text-[#e3e3e3]' : 'text-[#1a1a1a]'
                        )}
                        style={{ animationDelay: '0.2s' }}
                    >
                        WEBSTER<br />CS CLUB
                    </h1>

                    {/* Tagline text and CTA container */}
                    <div
                        className={cx(
                            'flex flex-col md:flex-row justify-between items-start md:items-end',
                            'w-full gap-12 md:gap-0 animate-fade-in-up'
                        )}
                        style={{ animationDelay: '0.4s' }}
                    >
                        <p className={cx(
                            'max-w-[500px] relative z-20 font-body text-xl font-medium leading-relaxed text-left',
                            isDark ? 'text-[#c6c6c6]' : 'text-[#555555]'
                        )}>
                            A community of developers, designers, and innovators at Webster
                            University. We build projects, host hackathons, and push the
                            boundaries of technology together.
                        </p>

                        <div className="flex flex-col items-start md:items-end gap-5">
                            <a
                                href="https://discord.gg/tTnSqwCWH7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cx(
                                    'group relative z-20 flex justify-center items-center gap-6 no-underline',
                                    'min-w-[320px] min-h-[80px] px-16 py-7',
                                    'font-headline tracking-tighter uppercase text-2xl font-black',
                                    'transition-all duration-300',
                                    isDark
                                        ? 'bg-[#e3e3e3] text-black hover:bg-white hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]'
                                        : 'bg-[#111111] text-white hover:bg-[#000000] hover:shadow-[0_0_40px_rgba(0,0,0,0.3)]'
                                )}
                            >
                                JOIN US IN DISCORD
                                <span className="material-symbols-outlined text-2xl group-hover:translate-x-2 transition-transform">
                                    arrow_forward
                                </span>
                            </a>

                            <span className={cx(
                                'mono-data text-[10px] uppercase tracking-[0.15em] text-right font-medium',
                                isDark ? 'text-[#6a6a6a]' : 'text-[#999999]'
                            )}>
                                Session: Active // Webster University // Node: Main
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom Scroll Indicator */}
                <div className={cx(
                    'pb-12 flex items-center gap-6 text-[10px] tracking-[0.2em] uppercase font-semibold animate-pulse',
                    isDark ? 'text-[#888888]' : 'text-[#777777]'
                )}>
                    SCROLL TO EXPLORE
                    <div className={cx('w-[1px] h-8', isDark ? 'bg-[#424242]' : 'bg-[#c0c0c0]')} />
                </div>
            </div>
        </section>
    );
}
