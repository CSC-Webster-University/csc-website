export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[921px] flex flex-col justify-center px-8 md:px-16 overflow-hidden"
    >
      {/* Background abstract pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 59px, #474747 59px, #474747 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, #474747 59px, #474747 60px)',
            maskImage: 'radial-gradient(ellipse 80% 80% at 60% 40%, black 10%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 60% 40%, black 10%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-6xl z-10">
        {/* Status line */}
        <div className="mono-data text-xs uppercase tracking-[0.5em] text-on-surface-variant mb-8 flex items-center gap-4">
          <span className="w-12 h-[1px] bg-outline-variant" />
          Establish Connection // Status: Active
        </div>

        {/* Main headline */}
        <h1 className="font-headline text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-12 text-glow text-primary">
          WEBSTER
          <br />
          CS CLUB
        </h1>

        {/* Subtitle + CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-end gap-12 md:gap-24">
          <p className="max-w-md font-body text-lg leading-relaxed text-on-surface-variant">
            An assembly of developers, designers, and innovators at Webster
            University. We engineer solutions, build communities, and push the
            boundaries of what&apos;s possible.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href="https://discord.gg/"
              target="_blank"
              rel="noopener noreferrer"
              id="cta-discord"
              className="font-headline tracking-tighter uppercase text-xl font-black px-12 py-5 terminal-gradient text-on-primary hover:opacity-90 transition-all duration-300 group flex items-center gap-4"
            >
              Initialize Sequence
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </a>
            <span className="mono-data text-[10px] uppercase text-outline px-1">
              Session: Active // Webster University // CSC Division
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-16 hidden md:flex items-center gap-4 animate-bounce">
        <span className="mono-data text-[10px] uppercase tracking-widest text-on-surface-variant">
          Scroll to explore
        </span>
        <span className="w-[1px] h-12 bg-outline-variant" />
      </div>
    </section>
  );
}
