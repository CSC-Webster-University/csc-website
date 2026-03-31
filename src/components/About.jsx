export default function About() {
  return (
    <section id="about" className="py-32 px-8 md:px-16 bg-surface-container-low">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0">
        {/* Left column — Title */}
        <div className="md:col-span-4">
          <h2 className="font-headline text-4xl font-bold tracking-tighter uppercase mb-6">
            Mission_Statement
          </h2>
          <div className="w-16 h-1 bg-primary mb-12" />
        </div>

        {/* Right column — Content */}
        <div className="md:col-span-8 flex flex-col gap-16">
          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-surface-container-high p-12 border-l-4 border-primary">
              <span className="material-symbols-outlined text-4xl mb-6 block text-on-surface">
                terminal
              </span>
              <h3 className="font-headline text-2xl font-bold mb-4 uppercase tracking-tight">
                Core Framework
              </h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                Building a robust community where technology meets collaboration.
                We don&apos;t just write code — we architect solutions that make
                a difference in the real world.
              </p>
            </div>

            <div className="bg-surface-container-high p-12">
              <span className="material-symbols-outlined text-4xl mb-6 block text-on-surface">
                hub
              </span>
              <h3 className="font-headline text-2xl font-bold mb-4 uppercase tracking-tight">
                Open Innovation
              </h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                Pushing boundaries through hands-on projects, hackathons, and
                workshops. Every member is both student and teacher in our
                ecosystem.
              </p>
            </div>
          </div>

          {/* Blockquote */}
          <blockquote className="border-y border-outline-variant/20 py-16">
            <p className="font-headline text-3xl md:text-5xl font-light italic leading-tight text-primary/90">
              &ldquo;In the space between the first line of code and the final
              deployment, we discover who we really are. The Club is not just an
              organization — it is a philosophy of building.&rdquo;
            </p>
            <cite className="block mt-8 mono-data text-sm uppercase text-outline-variant not-italic">
              — CSC Leadership // Webster University
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
