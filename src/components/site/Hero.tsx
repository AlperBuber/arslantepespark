import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import heroIllustration from "@/assets/hero-illustration.webp";

export default function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-secondary to-background">
      <div className="container relative grid items-center gap-12 pt-28 pb-16 md:pt-36 md:pb-24 lg:min-h-[100svh] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <span className="inline-flex items-center gap-2 text-bronze text-xs md:text-sm font-medium uppercase tracking-[0.24em] mb-6">
            <Sparkles className="w-4 h-4" /> {t.hero.eyebrow}
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-normal text-charcoal leading-[0.95] text-balance">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-gradient-bronze text-charcoal hover:shadow-bronze hover:opacity-95 rounded-full px-7 h-12 font-medium">
              <Link to="/apply">{t.hero.cta1} <ArrowRight className="ml-1 w-4 h-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-charcoal/20 text-charcoal hover:bg-charcoal/5 rounded-full px-7 h-12">
              <a href="#program">{t.hero.cta2}</a>
            </Button>
          </div>

          <dl className="mt-14 grid max-w-md gap-6 md:gap-10 pt-8 border-t border-border">
            {[
              { v: t.hero.stat1, l: t.hero.stat1Label },
            ].map((s) => (
              <div key={s.l}>
                <dt className="font-display text-3xl md:text-4xl text-bronze font-semibold">{s.v}</dt>
                <dd className="text-xs md:text-sm text-muted-foreground mt-1 uppercase tracking-wider">{s.l}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* İlüstrasyonun beyaz zemini multiply ile bölüm zeminine karışır; kutu gibi görünmez.
            Mobilde kenardan kenara uzanır; masaüstünde kenarda kesilen çizgiler maskeyle söner. */}
        <motion.img
          src={heroIllustration}
          alt="Arslantepe Höyüğü'nden yükselen roket, fikir ampulü ve şehir silueti; masa başında çalışan girişimciler"
          width={1698}
          height={926}
          fetchPriority="high"
          className="-mx-8 w-[calc(100%+4rem)] max-w-none h-auto mix-blend-multiply lg:mx-0 lg:w-full lg:[mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </section>
  );
}
