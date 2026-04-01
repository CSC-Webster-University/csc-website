export default function Tracks() {
  return (
    <section id="tracks" className="w-full min-h-screen py-16 px-8 md:px-16 flex flex-col justify-center items-center">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
            <div>
                <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tighter uppercase">Focus_Areas</h2>
                <p className="mono-data text-sm text-outline mt-4">Select your specialization module.</p>
            </div>
            <div className="hidden md:block mono-data text-[10px] text-outline-variant">
                [ SOFTWARE ] [ AI ] [ COMPETITIVE ] [ CYBER ]
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[450px]">
            <div className="md:col-span-2 md:row-span-2 bg-surface-container-high p-8 flex flex-col justify-between group cursor-pointer hover:bg-surface-bright transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] border border-transparent hover:border-primary/20">
                <div className="flex justify-between items-start">
                    <span className="material-symbols-outlined text-4xl">memory</span>
                    <span className="mono-data text-xs px-3 py-1 bg-primary text-on-primary">ACTIVE</span>
                </div>
                <div>
                    <h3 className="font-headline text-3xl md:text-4xl font-black tracking-tighter mb-4">SOFTWARE_ENGINEERING</h3>
                    <p className="text-on-surface-variant max-w-sm text-sm">Collaborate on real-world projects, learn modern web/mobile frameworks, and build impactful open-source applications.</p>
                </div>
            </div>
            <div className="md:col-span-2 bg-surface-container-low p-8 flex flex-col justify-between group cursor-pointer hover:bg-surface-container-high transition-all duration-500 relative overflow-hidden hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] border border-transparent hover:border-primary/20">
                <img 
                  alt="AI" 
                  className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 group-hover:opacity-20 transition-all duration-700" 
                  data-alt="Close-up of intricate neural network visualizations and mathematical nodes in monochrome high definition" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKiXNPwalxDyA9LQplL0F-oQsbVW6AH3yoHlKJPe9dPUVjklRFtNDA-ZJU6DrDMr3F45pgTFwjF6PezAVbJ4Yz4aFlEEKITUAYPnSqFPCyQq4mreZuN1AVWEzK6QXCVAZPi_T2mKJ2_UZZxaL24rgxx1hI-mvOYIIkUfErH2qGIsmuv6fv9sSZ6IjMDWind-YYTkXLROljZ4CcigMDjRLbWLm4bSczAN1je3nEh0qUSjz3wWQ9l81Iog0_TBvYbV1wutArDbGEpASR"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-[20%] animate-scanline pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex justify-between items-start">
                    <span className="material-symbols-outlined text-3xl">neurology</span>
                    <span className="mono-data text-xs">MODULE_02</span>
                </div>
                <div className="relative z-10">
                    <h3 className="font-headline text-xl md:text-2xl font-bold tracking-tight">AI_&_DATA_SCIENCE</h3>
                </div>
            </div>
            <div className="bg-surface-container-high p-8 flex flex-col justify-between group cursor-pointer hover:bg-primary hover:text-on-primary transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">token</span>
                <h3 className="font-headline text-lg font-bold tracking-tight">COMPETITIVE_CODING</h3>
            </div>
            <div className="bg-surface-container-high p-8 flex flex-col justify-between group cursor-pointer hover:bg-primary hover:text-on-primary transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">security</span>
                <h3 className="font-headline text-lg font-bold tracking-tight">CYBERSECURITY</h3>
            </div>
        </div>
      </div>
    </section>
  );
}
