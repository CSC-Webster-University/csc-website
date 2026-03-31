export default function Tracks() {
  return (
    <section id="tracks" className="py-32 px-8 md:px-16 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
        <div>
          <h2 className="font-headline text-5xl font-black tracking-tighter uppercase">
            Development_Tracks
          </h2>
          <p className="mono-data text-sm text-outline mt-4">
            Select your specialization module.
          </p>
        </div>
        <div className="hidden md:block mono-data text-[10px] text-outline-variant">
          [ IDENTITY ] [ EVENTS ] [ PROJECTS ] [ COMMUNITY ]
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[800px]">
        {/* Track 1 — Large card (2×2) */}
        <div className="md:col-span-2 md:row-span-2 bg-surface-container-high p-12 flex flex-col justify-between group cursor-pointer hover:bg-surface-bright transition-all duration-300 min-h-[300px]">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-5xl text-on-surface">
              palette
            </span>
            <span className="mono-data text-xs px-3 py-1 bg-primary text-on-primary">
              ACTIVE
            </span>
          </div>
          <div>
            <h3 className="font-headline text-4xl font-black tracking-tighter mb-4 text-primary">
              IDENTITY_ENGINE
            </h3>
            <p className="text-on-surface-variant max-w-sm font-body">
              The face of the club. Build the theme system, hero section, and
              responsive navigation that defines our digital identity.
            </p>
          </div>
        </div>

        {/* Track 2 — Medium card (2×1) */}
        <div className="md:col-span-2 bg-surface-container-low p-12 flex flex-col justify-between group cursor-pointer hover:bg-surface-container-high transition-all duration-300 relative overflow-hidden min-h-[200px]">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-5 group-hover:scale-110 transition-transform duration-700"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 20px, #474747 20px, #474747 21px)',
            }}
          />
          <div className="relative z-10 flex justify-between items-start">
            <span className="material-symbols-outlined text-4xl text-on-surface">
              sync
            </span>
            <span className="mono-data text-xs text-outline-variant">
              MODULE_02
            </span>
          </div>
          <div className="relative z-10">
            <h3 className="font-headline text-2xl font-bold tracking-tight text-primary">
              EVENT_PIPELINE
            </h3>
            <p className="text-on-surface-variant text-sm mt-2 font-body">
              Real-time sync with Discord API. Automated event fetching and
              schedule management.
            </p>
          </div>
        </div>

        {/* Track 3 — Small card */}
        <div className="bg-surface-container-high p-8 flex flex-col justify-between group cursor-pointer hover:bg-primary hover:text-on-primary transition-all duration-300 min-h-[160px]">
          <span className="material-symbols-outlined text-3xl">code</span>
          <h3 className="font-headline text-lg font-bold tracking-tight">
            PROJECT_VAULT
          </h3>
        </div>

        {/* Track 4 — Small card */}
        <div className="bg-surface-container-high p-8 flex flex-col justify-between group cursor-pointer hover:bg-primary hover:text-on-primary transition-all duration-300 min-h-[160px]">
          <span className="material-symbols-outlined text-3xl">
            diversity_3
          </span>
          <h3 className="font-headline text-lg font-bold tracking-tight">
            COMMUNITY_NODE
          </h3>
        </div>
      </div>
    </section>
  );
}
