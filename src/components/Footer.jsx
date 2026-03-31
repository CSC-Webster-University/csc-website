export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/20 bg-background">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 md:px-16 py-12 mx-auto max-w-[1440px]">
        <div className="flex flex-col items-center md:items-start gap-4 mb-8 md:mb-0">
          <div className="text-lg font-bold text-primary font-headline tracking-tight">
            CSC_PROTOCOL
          </div>
          <div className="font-body text-[10px] tracking-widest uppercase text-secondary">
            © 2025 CSC AT WEBSTER UNIVERSITY. ALL RIGHTS RESERVED.
          </div>
        </div>

        <div className="flex gap-8 md:gap-16">
          <a
            href="https://discord.gg/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[10px] tracking-widest uppercase text-secondary hover:text-primary underline decoration-1 underline-offset-4 transition-all duration-200"
          >
            Discord
          </a>
          <a
            href="https://github.com/CSclub-Webster-University"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[10px] tracking-widest uppercase text-secondary hover:text-primary underline decoration-1 underline-offset-4 transition-all duration-200"
          >
            Repository
          </a>
          <a
            href="#"
            className="font-body text-[10px] tracking-widest uppercase text-secondary hover:text-primary underline decoration-1 underline-offset-4 transition-all duration-200"
          >
            Privacy
          </a>
          <a
            href="#tracks"
            className="font-body text-[10px] tracking-widest uppercase text-secondary hover:text-primary underline decoration-1 underline-offset-4 transition-all duration-200"
          >
            Tracks
          </a>
        </div>
      </div>
    </footer>
  );
}
