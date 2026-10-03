import { Fragment } from "react";
import { ArrowRight, Building2, ChartNoAxesColumnIncreasing, Sprout, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import heroIllustration from "@/assets/hero-illustration.webp";

// t.hero.stats ile aynı sırada
const statIcons = [Sprout, Users, Building2, ChartNoAxesColumnIncreasing];

// Zemindeki yumuşak baklava deseni (dekoratif); mobilde yalnızca sağ üstteki ikili görünür
const diamonds = [
  "block -right-10 -top-24 w-44 h-44 lg:right-[7%] lg:-top-20 lg:w-64 lg:h-64 bg-[#faf6f0]",
  "block -right-24 top-4 w-40 h-40 lg:-right-12 lg:top-14 lg:w-60 lg:h-60 bg-[#f2f6fd]",
  "hidden lg:block -right-36 top-[42%] w-56 h-56 bg-[#faf6f0]",
  "hidden lg:block -right-16 bottom-[16%] w-48 h-48 bg-[#f2f6fd]",
  "hidden lg:block right-[11%] -bottom-32 w-56 h-56 bg-[#faf6f0]",
  "hidden lg:block -left-40 bottom-[30%] w-56 h-56 bg-[#faf6f0]",
  "hidden lg:block -left-28 -bottom-16 w-44 h-44 bg-[#f2f6fd]",
];

function EightPointStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" className={className} aria-hidden>
      <polygon points="12,2 14.3,6.46 19.07,4.93 17.54,9.7 22,12 17.54,14.3 19.07,19.07 14.3,17.54 12,22 9.7,17.54 4.93,19.07 6.46,14.3 2,12 6.46,9.7 4.93,4.93 9.7,6.46" />
    </svg>
  );
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

export default function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {diamonds.map((d, i) => (
          <i key={i} className={`absolute rotate-45 rounded-[36px] ${d}`} />
        ))}
      </div>

      <div className="container relative flex flex-col pt-28 pb-14 md:pt-32 lg:min-h-[100svh] lg:pb-12">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-2 lg:gap-10">
          <motion.div {...reveal()}>
            <span className="inline-flex items-center gap-3 text-bronze-deep text-xs md:text-[15px] font-medium uppercase tracking-[0.24em] mb-6">
              <EightPointStar className="w-6 h-6 shrink-0" /> {t.hero.eyebrow}
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-navy leading-[1.02]">
              {t.hero.title}
            </h1>
            <p className="mt-4 max-w-xl font-display text-3xl sm:text-4xl xl:text-5xl text-navy leading-[1.12]">
              {t.hero.tagline}
            </p>
            <p className="mt-6 max-w-xl text-lg md:text-2xl text-navy/70 leading-snug">
              {t.hero.subtitle}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-bronze-deep text-white hover:bg-bronze-deep/90 h-14 px-8 text-lg font-medium">
                <Link to="/apply">{t.hero.cta1} <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white border-[1.5px] border-navy text-navy hover:bg-navy/5 hover:text-navy h-14 px-12 text-lg font-medium">
                <a href="#program">{t.hero.cta2}</a>
              </Button>
            </div>
          </motion.div>

          {/* İlüstrasyonun beyaz zemini multiply ile arkadaki zemine karışır; kutu gibi görünmez.
              Mobilde kenardan kenara uzanır; masaüstünde kenarda kesilen çizgiler maskeyle söner. */}
          <motion.img
            src={heroIllustration}
            alt="Arslantepe Höyüğü'nden yükselen roket, fikir ampulü ve şehir silueti; masa başında çalışan girişimciler"
            width={1698}
            height={926}
            fetchPriority="high"
            className="-mx-8 w-[calc(100%+4rem)] max-w-none h-auto mix-blend-multiply lg:mx-0 lg:w-full lg:[mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]"
            {...reveal(0.15)}
          />
        </div>

        {/* xl'de sütunlar içerik genişliğinde; justify-between ayırıcı çizgileri öğelerin arasına ortalar */}
        <motion.div {...reveal(0.3)} className="mt-14 grid gap-y-8 sm:grid-cols-2 lg:mt-12 xl:flex xl:items-center xl:justify-between">
          {t.hero.stats.map((s, i) => {
            const Icon = statIcons[i];
            return (
              <Fragment key={s.value}>
                {i > 0 && <span className="hidden xl:block w-px self-stretch bg-navy/15" aria-hidden />}
                <div className="flex items-center gap-5">
                  <Icon className="w-12 h-12 shrink-0 text-bronze-deep" strokeWidth={1.25} aria-hidden />
                  <div className="xl:whitespace-nowrap">
                    <p className="font-display text-xl font-semibold text-navy">{s.value}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-navy/65">{s.label}</p>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
