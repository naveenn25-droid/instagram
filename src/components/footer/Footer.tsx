import { FOOTER_LINKS } from "../../constants/footer";

export const Footer = () => {
  return (
    <footer className="w-full h-[72px] border-t border-[#262626] bg-[#000000] flex flex-col items-center justify-center shrink-0">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 max-w-7xl mx-auto">
        {FOOTER_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="text-[12px] text-[#737373] hover:text-[#e0e0e0] transition-colors"
          >
            {link}
          </a>
        ))}
      </div>
      <div className="flex items-center justify-center mt-2">
        <div className="text-[12px] text-[#737373] flex items-center gap-4">
          <select className="bg-transparent text-[#737373] hover:text-[#e0e0e0] cursor-pointer outline-none border-none">
            <option>English (UK)</option>
            <option>English (US)</option>
          </select>
          <span>© 2026 Instagram from Meta</span>
        </div>
      </div>
    </footer>
  );
};
