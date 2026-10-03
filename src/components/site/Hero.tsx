import type { CSSProperties, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import heroIllustration from "@/assets/hero-illustration.webp";

// Zemindeki baklavalar: maketten (1440×810) ölçülen konum, boyut ve renkler.
// Sağ üst grup üste, sol ve sağ alt gruplar alta sabitlenir; yalnızca lg ve üstünde görünür.
const diamonds: (CSSProperties & { size: number; color: string })[] = [
  { right: 164, top: 58, size: 107, color: "#fcf7f2" },
  { right: 240, top: 133, size: 107, color: "#fdfaf8" },
  { right: 58, top: 98, size: 129, color: "#ecf4fb" },
  { right: -57, top: 187, size: 155, color: "#f9f4f1" },
  { right: 53, top: 295, size: 134, color: "#f5f9fd" },
  { left: -83, bottom: 358, size: 124, color: "#fdfbf9" },
  { left: -39, bottom: 177, size: 124, color: "#fbf5f0" },
  { left: 48, bottom: 81, size: 97, color: "#fdfbfa" },
  { right: 32, bottom: 61, size: 97, color: "#fdfaf7" },
  { right: -40, bottom: 128, size: 102, color: "#f6fafd" },
];

function Icon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {children}
    </svg>
  );
}

// Bilgi şeridi ikonları (maketteki çizimler); t.hero.stats ile aynı sırada
const statIcons: ReactNode[] = [
  // Fidan
  <>
    <path d="M24 46V20" />
    <path d="M24 31C24 19.5 16.5 12 4.5 11.5 4.5 23 12 31 24 31Z" />
    <path d="M24 31 11 18.5" />
    <path d="M24 22C24 10.5 31.5 3 43.5 2.5 43.5 14 36 22 24 22Z" />
    <path d="M24 22 37 9.5" />
  </>,
  // Üç kişilik ekip
  <>
    <circle cx="24" cy="15.5" r="7.5" />
    <path d="M9.5 45V41C9.5 33 16 27.5 24 27.5S38.5 33 38.5 41V45" />
    <path d="M15.2 7.8A7 7 0 0 0 12.5 21.6" />
    <path d="M3 41C3 34.5 6.5 30.5 11.5 29" />
    <path d="M32.8 7.8A7 7 0 0 1 35.5 21.6" />
    <path d="M45 41C45 34.5 41.5 30.5 36.5 29" />
  </>,
  // Bina
  <>
    <path d="M3 45H45" />
    <path d="M7 45V4H29V45" />
    <path d="M29 16H40V45" />
    <path d="M15 45V36H21V45" />
    {[11.5, 18, 24.5].flatMap((y) => [11, 16.5, 22].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" fill="currentColor" stroke="none" />))}
    <rect x="33" y="22" width="3" height="3" fill="currentColor" stroke="none" />
    <rect x="33" y="30" width="3" height="3" fill="currentColor" stroke="none" />
  </>,
  // Yükselen sütunlar
  <>
    <path d="M3 45H45" />
    <path d="M8 45V29H16V45" />
    <path d="M20 45V18H28V45" />
    <path d="M32 45V5H40V45" />
  </>,
];

// Maketteki sekiz köşeli yıldız: ortada sekizgen, her kenarında sivri bir üçgen
function EightPointStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.1} strokeLinejoin="miter" className={className} aria-hidden>
      <polygon points="12,2 14.37,6.27 19.07,4.93 17.73,9.63 22,12 17.73,14.37 19.07,19.07 14.37,17.73 12,22 9.63,17.73 4.93,19.07 6.27,14.37 2,12 6.27,9.63 4.93,4.93 9.63,6.27" />
      <polygon points="14.37,6.27 17.73,9.63 17.73,14.37 14.37,17.73 9.63,17.73 6.27,14.37 6.27,9.63 9.63,6.27" />
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
  const [taglineTop, taglineBottom] = t.hero.tagline;
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        {diamonds.map(({ size, color, ...pos }, i) => (
          <i key={i} className="absolute block rotate-45 rounded-[5px]" style={{ ...pos, width: size, height: size, background: color }} />
        ))}
      </div>

      <div className="container relative flex flex-col pt-28 pb-14 md:pt-32 lg:pt-[105px] lg:min-h-[100svh] lg:pb-12">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-[minmax(0,586fr)_minmax(0,670fr)] lg:gap-0 lg:px-10">
          <motion.div {...reveal()}>
            <span className="inline-flex items-center gap-[10px] text-rust text-xs md:text-[15px] font-medium uppercase tracking-[0.2em] lg:-ml-5">
              <EightPointStar className="w-8 h-8 lg:w-10 lg:h-10 shrink-0" /> {t.hero.eyebrow}
            </span>
            <h1 className="mt-8 lg:mt-[23px] font-display text-5xl sm:text-6xl lg:text-[56px] xl:text-[68px] font-semibold tracking-[-0.01em] text-navy leading-none">
              {t.hero.title}
            </h1>
            <p className="mt-4 font-display text-3xl sm:text-4xl lg:text-[32px] xl:text-[39px] font-medium text-navy leading-[1.1] lg:leading-[36px] xl:leading-[44px]">
              {taglineTop} <br className="hidden lg:inline" />
              {taglineBottom}
            </p>
            <p className="mt-6 lg:mt-[27px] max-w-[490px] text-lg md:text-2xl lg:text-[21px] xl:text-[24.5px] text-periwinkle leading-[1.2] lg:leading-[25px] xl:leading-[28px]">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 lg:mt-[29px] flex flex-wrap gap-5">
              <Button asChild size="lg" className="bg-bronze-deep text-white hover:bg-bronze-deep/90 h-14 lg:h-[57px] w-[220px] lg:w-[200px] xl:w-[220px] px-0 text-[19px] font-normal">
                <Link to="/apply">{t.hero.cta1} <ArrowRight className="ml-3 w-5 h-5" strokeWidth={1.75} /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white border-2 border-navy text-navy hover:bg-navy/5 hover:text-navy h-14 lg:h-[57px] w-[235px] lg:w-[215px] xl:w-[235px] px-0 text-[19px] font-semibold">
                <a href="#program">{t.hero.cta2}</a>
              </Button>
            </div>
          </motion.div>

          {/* İlüstrasyonun zemini beyaz; multiply arkadaki baklavaların üstünde kutu izi bırakmaz.
              Mobilde kenardan kenara uzanır; masaüstünde kenara değen çizgiler maskeyle söner. */}
          <motion.img
            src={heroIllustration}
            alt="Arslantepe Höyüğü'nden yükselen roket, fikir ampulü ve şehir silueti; masa başında çalışan girişimciler"
            width={1698}
            height={774}
            fetchPriority="high"
            className="-mx-8 w-[calc(100%+4rem)] max-w-none h-auto mix-blend-multiply lg:mx-0 lg:w-full lg:mt-[67px] lg:-mb-[67px] lg:[mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)]"
            {...reveal(0.15)}
          />
        </div>

        {/* Sütun genişlikleri maketteki ayırıcı çizgilerin konumundan (1440'ta 367 / 697 / 1013 px) */}
        <motion.div {...reveal(0.3)} className="mt-14 grid gap-y-8 sm:grid-cols-2 lg:mt-12 xl:grid-cols-[284fr_330fr_316fr_350fr] xl:pl-[31px] xl:pr-[25px]">
          {t.hero.stats.map((s, i) => (
            <div key={s.value} className={`flex items-center gap-[23px] xl:min-h-[64px] ${i > 0 ? "xl:border-l xl:border-periwinkle/50 xl:pl-[37px]" : ""}`}>
              <Icon className="w-[50px] h-[50px] shrink-0 text-rust">{statIcons[i]}</Icon>
              <div className="xl:whitespace-nowrap">
                <p className="font-display text-xl xl:text-[19px] font-semibold text-navy">{s.value}</p>
                <p className="mt-1.5 text-[13px] xl:text-[12.4px] font-medium uppercase tracking-[0.12em] text-periwinkle-deep">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
