import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import logo from "@/assets/logo-full.png";

type NavItem =
  | { key: "about" | "program" | "modules" | "timeline" | "supporters" | "faq" | "contact"; type: "anchor" }
  | { key: "mentors"; type: "page"; to: string };

const navItems: NavItem[] = [
  { key: "about", type: "anchor" },
  { key: "program", type: "anchor" },
  { key: "modules", type: "anchor" },
  { key: "mentors", type: "page", to: "/mentors" },
  { key: "timeline", type: "anchor" },
  { key: "supporters", type: "anchor" },
  { key: "faq", type: "anchor" },
  { key: "contact", type: "anchor" },
];

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
  // Ana sayfada header şeffafken koyu hero görselinin üzerinde durur; yazılar okunabilsin diye açık renge geçer.
  const overDark = isHome && !scrolled;

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
      <nav className="container flex items-center justify-between h-16 md:h-20" aria-label="Birincil">
        {isHome ? (
          <a href="#top" className="flex items-center group">
            <img src={logo} alt="Arslantepe Spark — Girişim Hızlandırma Programı" className="h-9 md:h-11 w-auto object-contain" width={463} height={93} />
          </a>
        ) : (
          <Link to="/" className="flex items-center group">
            <img src={logo} alt="Arslantepe Spark — Girişim Hızlandırma Programı" className="h-9 md:h-11 w-auto object-contain" width={463} height={93} />
          </Link>
        )}

        <ul className="hidden lg:flex items-center gap-7 text-sm">
          {navItems.map((item) => (
            <li key={item.key}>
              {renderItem(item, `${overDark ? "text-ivory/85" : "text-charcoal/75"} hover:text-bronze transition-colors`)}
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="default" className="bg-charcoal hover:bg-charcoal/90 text-ivory rounded-full px-5">
            <Link to="/apply">{t.nav.apply}</Link>
          </Button>
        </div>

        <button onClick={() => setOpen(!open)} className={`lg:hidden p-2 ${overDark ? "text-ivory" : "text-charcoal"}`} aria-label="Menüyü aç/kapat" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-ivory border-t border-border shadow-elegant">
          <ul className="container py-5 space-y-1">
            {navItems.map((item) => (
              <li key={item.key}>
                {renderItem(item, "block py-2.5 text-charcoal hover:text-bronze", () => setOpen(false))}
              </li>
            ))}
            <li className="pt-3">
              <Button asChild className="w-full bg-charcoal text-ivory rounded-full">
                <Link to="/apply" onClick={() => setOpen(false)}>{t.nav.apply}</Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
