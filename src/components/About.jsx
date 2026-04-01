export default function About() {
  return (
    <section id="about" className="w-full min-h-screen py-24 px-8 md:px-16 bg-surface-container-low flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0">
            <div className="md:col-span-4">
                <h2 className="font-headline text-4xl font-bold tracking-tighter uppercase mb-6">Mission_Statement</h2>
                <div className="w-16 h-1 bg-primary mb-12"></div>
            </div>
            <div className="md:col-span-8 flex flex-col gap-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-surface-container-high p-12 border-l-4 border-primary hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500 hover:border-l-8 cursor-default">
                        <span className="material-symbols-outlined text-4xl mb-6">terminal</span>
                        <h3 className="font-headline text-2xl font-bold mb-4 uppercase tracking-tight">Learn & Build</h3>
                        <p className="font-body text-on-surface-variant leading-relaxed">
                            From beginner programming workshops to full-stack web development, we provide the resources to grow your technical skills outside the classroom.
                        </p>
                    </div>
                    <div className="bg-surface-container-high p-12 border-l-4 border-transparent hover:border-primary hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500 cursor-default">
                        <span className="material-symbols-outlined text-4xl mb-6">hub</span>
                        <h3 className="font-headline text-2xl font-bold mb-4 uppercase tracking-tight">Community & Networking</h3>
                        <p className="font-body text-on-surface-variant leading-relaxed">
                            Connect with peers, alumni, and tech industry professionals. We host regular tech talks, hackathons, and career development events.
                        </p>
                    </div>
                </div>
                <blockquote className="border-y border-outline-variant/20 py-16 hover:border-primary/50 transition-colors duration-700 animate-pulse-border">
                    <p className="font-headline text-3xl md:text-5xl font-light italic leading-tight text-primary/90">
                        &quot;Programming isn&apos;t just about writing code; it&apos;s about solving problems and building the future. The Club is a space for everyone to create, fail, and learn.&quot;
                    </p>
                    <cite className="block mt-8 mono-data text-sm uppercase text-outline-variant">— CSC Leadership Teams</cite>
                </blockquote>
            </div>
        </div>
    </section>
  );
}
