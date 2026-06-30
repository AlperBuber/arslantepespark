import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import logo from "@/assets/logo-mark.png";

const sections = ["about", "program", "modules", "mentors", "timeline", "supporters", "faq", "contact"] as const;

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

  const isApplyPage = pathname === "/apply";

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-ivory/85 backdrop-blur-md border-b border-border shadow-soft" : "bg-transparent"}`}>
      <nav className="container flex items-center justify-between h-16 md:h-20" aria-label="Birincil">
        {isApplyPage ? (
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Arslantepe Spark" className="w-12 h-12 md:w-14 md:h-14 object-contain" width={56} height={56} />
            <span className="font-display text-lg md:text-xl font-semibold tracking-tight text-bronze whitespace-nowrap">
              Arslantepe Spark
            </span>
          </Link>
        ) : (
          <a href="#top" className="flex items-center gap-3 group">
            <img src={logo} alt="Arslantepe Spark" className="w-12 h-12 md:w-14 md:h-14 object-contain" width={56} height={56} />
            <span className="font-display text-lg md:text-xl font-semibold tracking-tight text-bronze whitespace-nowrap">
              Arslantepe Spark
            </span>
          </a>
        )}

        <ul className="hidden lg:flex items-center gap-7 text-sm">
          {sections.map((s) => (
            <li key={s}>
              {isApplyPage ? (
                <Link to={`/#${s}`} className="text-charcoal/75 hover:text-bronze transition-colors">
                  {t.nav[s as keyof typeof t.nav]}
                </Link>
              ) : (
                <a href={`#${s}`} className="text-charcoal/75 hover:text-bronze transition-colors">
                  {t.nav[s as keyof typeof t.nav]}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="default" className="bg-charcoal hover:bg-charcoal/90 text-ivory rounded-full px-5">
            <Link to="/apply">{t.nav.apply}</Link>
          </Button>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-charcoal" aria-label="Menüyü aç/kapat" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-ivory border-t border-border shadow-elegant">
          <ul className="container py-5 space-y-1">
            {sections.map((s) => (
              <li key={s}>
                {isApplyPage ? (
                  <Link to={`/#${s}`} onClick={() => setOpen(false)} className="block py-2.5 text-charcoal hover:text-bronze">
                    {t.nav[s as keyof typeof t.nav]}
                  </Link>
                ) : (
                  <a href={`#${s}`} onClick={() => setOpen(false)} className="block py-2.5 text-charcoal hover:text-bronze">
                    {t.nav[s as keyof typeof t.nav]}
                  </a>
                )}
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
