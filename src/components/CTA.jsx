import Footer from './Footer';

export default function CTA() {
  return (
    <section id="join" className="min-h-screen flex flex-col bg-surface relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[200%] opacity-5 pointer-events-none flex flex-col animate-marquee-y">
            <div className="w-full flex-1 flex flex-wrap gap-4 p-4 font-mono text-[8px] leading-none text-primary overflow-hidden">
                {('01001101 01001111 01001110 01001111 01001100 01001001 01010100 01001000 '
                 .repeat(150))}
            </div>
            <div className="w-full flex-1 flex flex-wrap gap-4 p-4 font-mono text-[8px] leading-none text-primary overflow-hidden">
                {('01001101 01001111 01001110 01001111 01001100 01001001 01010100 01001000 '
                 .repeat(150))}
            </div>
        </div>
        <div className="flex-1 flex w-full max-w-4xl mx-auto flex-col justify-center items-center relative z-10 px-8 text-center">
            <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8">Ready to push to main?</h2>
            <p className="font-body text-on-surface-variant text-xl mb-12 max-w-2xl mx-auto">
                Whether you are writing your first &quot;Hello World&quot; or deploying production systems, there is a place for you here. Join our community.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
                <button className="font-headline tracking-widest uppercase text-sm font-bold px-12 py-5 terminal-gradient text-on-primary hover:opacity-90 animate-pulse-glow hover:scale-105 transition-transform duration-300">Join_Discord</button>
                <button className="font-headline tracking-widest uppercase text-sm font-bold px-12 py-5 border border-outline-variant/40 hover:bg-surface-container-high text-primary hover:border-primary/60 transition-colors duration-300">GitHub</button>
            </div>
        </div>
        <div className="relative z-20 w-full mt-auto">
            <Footer />
        </div>
    </section>
  );
}
