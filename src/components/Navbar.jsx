import { useTheme } from '../hooks/useTheme';

export default function Navbar() {
  const { toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#1b1b1b]/80 backdrop-blur-xl">
      <div className="flex justify-between items-center w-full px-8 md:px-16 py-6 mx-auto max-w-7xl">
        <div className="text-2xl font-black tracking-tighter text-[#ffffff] font-headline">
          WEBSTER_CSC
        </div>
        <div className="hidden md:flex flex-1 justify-center items-center gap-10 lg:gap-20">
          <a className="font-headline tracking-tight uppercase text-sm font-bold text-[#ffffff] border-b-2 border-[#ffffff] pb-1" href="#about">About</a>
          <a className="font-headline tracking-tight uppercase text-sm font-bold text-[#c6c6c6] hover:text-[#ffffff] transition-colors duration-200" href="#tracks">Tracks</a>
          <a className="font-headline tracking-tight uppercase text-sm font-bold text-[#c6c6c6] hover:text-[#ffffff] transition-colors duration-200" href="#events">Events</a>
          <a className="font-headline tracking-tight uppercase text-sm font-bold text-[#c6c6c6] hover:text-[#ffffff] transition-colors duration-200" href="#join">Join</a>
        </div>
        <div className="flex items-center space-x-6">
          <button className="hidden md:block font-headline tracking-tight uppercase text-sm font-bold px-8 py-2.5 bg-[#e3e3e3] text-black hover:bg-white transition-all duration-200 active:scale-[0.99] hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Connect
          </button>
          <button onClick={toggleTheme} className="material-symbols-outlined text-[#ffffff] hover:bg-[#2a2a2a] p-2 transition-all duration-200">
            dark_mode
          </button>
        </div>
      </div>
    </nav>
  );
}
