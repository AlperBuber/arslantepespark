import Section from "./Section";

const timeline = [
  { m: "Eylül – Ekim 2026", t: "Başvurular", d: "13 Anadolu ilini kapsayan açık çağrı, üniversite ve inovasyon merkezi tanıtım toplantıları." },
  { m: "Kasım 2026", t: "Program Başlangıcı", d: "Seçilen 10–12 girişim Malatya'da Arslantepe Spark merkezinde Türkçe müfredatla yola çıkar." },
  { m: "Mart 2027", t: "Demo Day", d: "Yatırımcılar, melekler ve kurumsal ortaklara açık kamuya yönelik sunum günü ve mezun aktivasyonu." },
];

export default function Timeline() {
  return (
    <Section
      id="timeline"
      eyebrow="Program Takvimi"
      title="Yılda bir dönem. Üç belirleyici an."
      variant="sand"
    >
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" aria-hidden />
        <ol className="space-y-8">
          {timeline.map((t, i) => (
            <li key={i} className={`relative md:grid md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:col-start-2" : ""}`}>
              <div className={`pl-12 md:pl-0 ${i % 2 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-bronze ring-4 ring-ivory md:-translate-x-1/2 mt-2" />
                <span className="text-xs uppercase tracking-[0.2em] text-bronze font-medium">{t.m}</span>
                <h3 className="font-display text-2xl text-charcoal mt-1">{t.t}</h3>
                <p className="mt-2 text-sm text-charcoal/70 leading-relaxed max-w-md md:ml-auto">{t.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
