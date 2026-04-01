export default function Hero() {
  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col justify-center px-8 md:px-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none overflow-hidden mix-blend-screen">
            <img 
              alt="abstract" 
              className="w-full h-full object-cover grayscale opacity-50" 
              data-alt="Abstract geometric data structure lines glowing softly in a dark digital void with high contrast black and white aesthetic" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAynAc6V1o2QOCXNS4-P57WmR2gZdf5XPIMVeFxBkyY0630fRXBZbCUIQqLNJhcMUAj1TqvmiNzclbh7kbPNxre8aNiapLlSrEz2W6CzlLLQWTppZOc7UOBnKRysCer-ZljuO-RoYcCjJmRJEleI7-m_9pdTkkY_bRgvVV2WJ0t3p-4tAKerm753ftMT35VUT1qyOaHMEsmn-Hro5cbOYj2p5whAlYgYu5n9QmrcuDF5tyqjOOCLcgrwsioEde7ZrxZjYcWwM8k4xix"
            />
            <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-transparent via-[#ffffff]/20 to-transparent animate-scanline pointer-events-none" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col pt-16 h-full justify-center">
            <div className="flex items-center gap-6 mono-data text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.4em] text-[#888888] uppercase mb-12 animate-fade-in font-semibold">
                <div className="w-16 h-[1px] bg-[#424242]"></div>
                Establish Connection // Status: Active<span className="animate-blink font-bold text-white">_</span>
            </div>
            
            <h1 className="font-headline text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.85] mb-20 md:mb-24 text-[#e3e3e3] animate-fade-in-up uppercase" style={{ animationDelay: '0.2s' }}>
                WEBSTER<br/>CS CLUB
            </h1>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-12 md:gap-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <p className="max-w-[500px] font-body text-xl font-medium leading-relaxed text-[#c6c6c6] text-left relative z-20">
                    A community of developers, designers, and innovators at Webster University. We build projects, host hackathons, and push the boundaries of technology together.
                </p>
                
                <div className="flex flex-col items-start md:items-end gap-5">
                    <button className="font-headline tracking-tighter uppercase text-xl font-black px-12 py-5 bg-[#e3e3e3] text-black hover:bg-white transition-all duration-300 group flex justify-between items-center gap-4 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] w-full md:w-auto relative z-20">
                        JOIN US IN DISCORD
                        <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                    </button>
                    <span className="mono-data text-[10px] uppercase text-[#6a6a6a] tracking-[0.15em] text-right font-medium">Session: Active // Webster University // Node: Main</span>
                </div>
            </div>
        </div>

        <div className="absolute bottom-12 left-8 md:left-16 flex items-center gap-6 text-[10px] tracking-[0.2em] uppercase text-[#888888] font-semibold animate-pulse">
            SCROLL TO EXPLORE
            <div className="w-[1px] h-8 bg-[#424242]"></div>
        </div>
    </section>
  );
}
