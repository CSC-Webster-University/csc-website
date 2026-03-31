export default function CTA() {
  return (
    <section id="join" className="py-40 px-8 text-center bg-surface relative overflow-hidden">
      {/* Binary background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full flex flex-wrap gap-4 p-4 font-mono text-[8px] leading-none text-primary overflow-hidden select-none">
          {'01001101 01001111 01001110 01001111 01001100 01001001 01010100 01001000 '
            .repeat(40)}
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 text-primary">
          Ready to compile?
        </h2>
        <p className="font-body text-on-surface-variant text-xl mb-12 max-w-2xl mx-auto">
          The Computer Science Club at Webster University is always open.
          Whether you&apos;re writing your first line of code or deploying
          production systems — there&apos;s a place for you here.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <a
            href="https://discord.gg/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-headline tracking-widest uppercase text-sm font-bold px-12 py-5 terminal-gradient text-on-primary hover:opacity-90 transition-all"
          >
            Apply_Now
          </a>
          <a
            href="https://github.com/CSclub-Webster-University"
            target="_blank"
            rel="noopener noreferrer"
            className="font-headline tracking-widest uppercase text-sm font-bold px-12 py-5 border border-outline-variant/40 hover:bg-surface-container-high text-primary transition-all"
          >
            View_Repository
          </a>
        </div>
      </div>
    </section>
  );
}
