import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import lion from "@/assets/logo-lion-tight.png";

type NavItem =
  | { key: "about" | "program" | "who" | "timeline" | "supporters" | "faq"; type: "anchor" }
  | { key: "mentors"; type: "page"; to: string };

const navItems: NavItem[] = [
  { key: "about", type: "anchor" },
  { key: "program", type: "anchor" },
  { key: "who", type: "anchor" },
  { key: "mentors", type: "page", to: "/mentors" },
  { key: "timeline", type: "anchor" },
  { key: "supporters", type: "anchor" },
  { key: "faq", type: "anchor" },
];

// Resmi aslan ikonu + tek satır yazı (giriş bölümü maketindeki logo düzeni)
function Brand() {
  return (
    <span className="flex items-center gap-3 xl:ml-6 xl:gap-4">
      <img src={lion} alt="" className="h-10 xl:h-[49px] w-auto" width={278} height={494} />
      <span className="font-display text-[22px] xl:text-[31px] font-medium leading-none text-bronze-deep whitespace-nowrap">Arslantepe Spark</span>
    </span>
  );
}

export default function Navbar() {
  const { t } = useLang();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  const renderItem = (item: NavItem, className: string, onClick?: () => void) => {
    if (item.type === "page") {
      const isActive = pathname === item.to;
      return (
        <Link to={item.to} onClick={onClick} className={`${className} ${isActive ? "text-bronze font-medium" : ""}`}>
          {t.nav[item.key]}
        </Link>
      );
    }
    return isHome ? (
      <a href={`#${item.key}`} onClick={onClick} className={className}>
        {t.nav[item.key]}
      </a>
    ) : (
      <Link to={`/#${item.key}`} onClick={onClick} className={className}>
        {t.nav[item.key]}
      </Link>
    );
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-ivory/85 backdrop-blur-md border-b border-border shadow-soft" : "bg-transparent"}`}>
      <nav className="container flex items-center justify-between h-16 md:h-20 xl:h-[94px]" aria-label="Birincil">
        {isHome ? (
          <a href="#top" className="flex items-center group" aria-label="Arslantepe Spark — Girişim Hızlandırma Programı">
            <Brand />
          </a>
        ) : (
          <Link to="/" className="flex items-center group" aria-label="Arslantepe Spark — Girişim Hızlandırma Programı">
            <Brand />
          </Link>
        )}

        <ul className="hidden xl:flex xl:ml-[6px] items-center gap-[26px] text-[13px] font-medium">
          {navItems.map((item) => (
            <li key={item.key}>
              {renderItem(item, "text-navy hover:text-bronze-deep transition-colors")}
            </li>
          ))}
        </ul>

        <div className="hidden xl:flex items-center gap-3">
          <Button asChild variant="default" className="bg-bronze-deep hover:bg-bronze-deep/90 text-white h-[47px] w-[149px] px-0 text-[17px] font-normal">
            <Link to="/apply">{t.nav.apply} <ArrowRight className="ml-3 w-[18px] h-[18px]" strokeWidth={1.75} /></Link>
          </Button>
        </div>

        <button onClick={() => setOpen(!open)} className={"xl:hidden p-2 text-navy"} aria-label="Menüyü aç/kapat" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="xl:hidden bg-ivory border-t border-border shadow-elegant">
          <ul className="container py-5 space-y-1">
            {navItems.map((item) => (
              <li key={item.key}>
                {renderItem(item, "block py-2.5 text-navy hover:text-bronze-deep", () => setOpen(false))}
              </li>
            ))}
            <li className="pt-3">
              <Button asChild className="w-full bg-bronze-deep hover:bg-bronze-deep/90 text-white">
                <Link to="/apply" onClick={() => setOpen(false)}>{t.nav.apply}</Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
