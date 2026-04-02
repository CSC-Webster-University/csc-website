import SmoothWavyCanvas from './SmoothWavyCanvas';
import Footer from './Footer';
import { useTheme } from '../hooks/useTheme';
import { cx } from '../utils/css';

/* ── Canvas Configuration by Theme ────────────────────────────── */
const CANVAS_DARK = {
  backgroundColor: '#131313',
  primaryColor: '255, 255, 255',
  secondaryColor: '255, 255, 255',
  accentColor: '255, 255, 255',
  lineOpacity: 0.6,
  animationSpeed: 0.003,
};

const CANVAS_LIGHT = {
  backgroundColor: '#f5f5f5',
  primaryColor: '0, 0, 0',
  secondaryColor: '0, 0, 0',
  accentColor: '0, 0, 0',
  lineOpacity: 0.5,
  animationSpeed: 0.003,
};

/**
 * Call to Action (CTA) Component
 * 
 * The final section before the Footer, encouraging visitors to take action 
 * and join the community. Integrates the animated wavy canvas as a background.
 * 
 * @returns {JSX.Element} The rendered CTA section.
 */
export default function CTA() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const canvasProps = isDark ? CANVAS_DARK : CANVAS_LIGHT;

  return (
    <section id="join" className="relative min-h-screen flex flex-col overflow-hidden">
      
      {/* Background Animation Layer */}
      <SmoothWavyCanvas {...canvasProps} />

      {/* Main Content Center */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-8 text-center w-full">
        <div className="w-full max-w-4xl flex flex-col items-center justify-center mx-auto">
          
          <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 w-full text-center">
            Ready to push to main?
          </h2>

          <p 
            className="font-body text-on-surface-variant text-xl max-w-2xl text-center mx-auto" 
            style={{ marginBottom: '2rem' }}
          >
            Whether you are writing your first &quot;Hello World&quot; or
            deploying production systems, there is a place for you here.
            Join our community.
          </p>

          {/* Primary Action Button */}
          <div className="flex items-center justify-center mt-4 w-full">
            <a
              href="https://discord.gg/tTnSqwCWH7"
              target="_blank"
              rel="noopener noreferrer"
              className={cx(
                'flex items-center justify-center min-w-[200px] min-h-[60px]',
                'font-headline tracking-widest uppercase text-lg font-bold',
                'terminal-gradient text-on-primary',
                'hover:opacity-90 hover:scale-105',
                'animate-pulse-glow transition-transform duration-300'
              )}
            >
              Join_Discord
            </a>
          </div>
        </div>
      </div>

      {/* Embedded Footer */}
      <div className="relative z-20 w-full mt-auto">
        <Footer />
      </div>
    </section>
  );
}
