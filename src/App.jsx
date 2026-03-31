import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Tracks from './components/Tracks';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="bg-background text-on-background selection:bg-primary selection:text-on-primary">
        <Navbar />

        <main className="pt-24">
          <Hero />
          <About />
          <Tracks />

          {/* Placeholder for Track 2: Events section */}
          <section id="events" className="py-32 px-8 md:px-16 bg-surface-container-low">
            <div className="max-w-[1440px] mx-auto">
              <h2 className="font-headline text-5xl font-black tracking-tighter uppercase mb-4">
                Event_Log
              </h2>
              <p className="mono-data text-sm text-outline mb-16">
                Syncing from Discord API... // No upcoming events.
              </p>
            </div>
          </section>

          <CTA />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
