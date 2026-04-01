import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Tracks from './components/Tracks';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <ThemeProvider>
      <div className="bg-background text-on-background selection:bg-primary selection:text-on-primary">
        <CustomCursor />
        <Navbar />

        <main className="w-full">
          <Hero />
          <About />
          <Tracks />
          <CTA />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
