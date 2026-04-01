export default function Footer() {
  return (
    <footer className="w-full border-t border-[#474747]/20 bg-[#131313]">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 md:px-16 py-12 mx-auto max-w-7xl">
            <div className="flex flex-col items-center md:items-start gap-4 mb-8 md:mb-0">
                <div className="text-lg font-bold text-[#ffffff] font-headline tracking-tight">WEBSTER CS CLUB</div>
                <div className="font-['Inter'] text-[10px] tracking-widest uppercase text-[#c6c6c6]">© 2026 WEBSTER UNIVERSITY CSC. ALL RIGHTS RESERVED.</div>
            </div>
            <div className="flex gap-8 md:gap-16">
                <a className="font-['Inter'] text-[10px] tracking-widest uppercase text-[#c6c6c6] hover:text-[#ffffff] underline decoration-1 underline-offset-4 transition-all duration-200" href="#">Terminal</a>
                <a className="font-['Inter'] text-[10px] tracking-widest uppercase text-[#c6c6c6] hover:text-[#ffffff] underline decoration-1 underline-offset-4 transition-all duration-200" href="#">Repository</a>
                <a className="font-['Inter'] text-[10px] tracking-widest uppercase text-[#c6c6c6] hover:text-[#ffffff] underline decoration-1 underline-offset-4 transition-all duration-200" href="#">Privacy</a>
                <a className="font-['Inter'] text-[10px] tracking-widest uppercase text-[#c6c6c6] hover:text-[#ffffff] underline decoration-1 underline-offset-4 transition-all duration-200" href="#">Logs</a>
            </div>
        </div>
    </footer>
  );
}
