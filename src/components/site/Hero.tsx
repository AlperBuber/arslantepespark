import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import heroAsset from "@/assets/hero-arslantepe-lions.png";

export default function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="relative min-h-[100svh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroAsset} alt="Arslantepe UNESCO Dünya Mirası — Malatya'daki aslan heykelleri" className="w-full h-full object-cover blur-[2px] scale-105" width={1920} height={1280} fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-charcoal/30" />
      </div>

      <div className="container relative z-10 pb-16 md:pb-24 pt-32">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-[hsl(var(--bronze-glow))] text-xs md:text-sm font-medium uppercase tracking-[0.24em] mb-6">
            <Sparkles className="w-4 h-4" /> {t.hero.eyebrow}
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-ivory leading-[0.95] text-balance">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-ivory/85 leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-gradient-bronze text-charcoal hover:shadow-bronze hover:opacity-95 rounded-full px-7 h-12 font-medium">
              <Link to="/apply">{t.hero.cta1} <ArrowRight className="ml-1 w-4 h-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-ivory/5 border-ivory/30 text-ivory hover:bg-ivory/15 rounded-full px-7 h-12">
              <a href="#program">{t.hero.cta2}</a>
            </Button>
          </div>

          <dl className="mt-14 grid grid-cols-2 max-w-md gap-6 md:gap-10 pt-8 border-t border-ivory/15">
            {[
              { v: t.hero.stat1, l: t.hero.stat1Label },
              { v: t.hero.stat2, l: t.hero.stat2Label },
            ].map((s) => (
              <div key={s.l}>
                <dt className="font-display text-3xl md:text-4xl text-[hsl(var(--bronze-glow))] font-semibold">{s.v}</dt>
                <dd className="text-xs md:text-sm text-ivory/70 mt-1 uppercase tracking-wider">{s.l}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
