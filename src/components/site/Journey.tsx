import Section from "./Section";

const stages = [
  { n: "01", t: "Keşif & Başvuru", d: "13 Anadolu ilini kapsayan açık çağrı. Online başvurular, bölgesel tanıtım toplantıları, üniversite ziyaretleri." },
  { n: "02", t: "Seçim Kampı", d: "İlk 30 girişim, mentor ve ortaklarla 3 günlük seçim kampı için Malatya'ya davet edilir." },
  { n: "03", t: "Dönem Açılışı", d: "10–12 girişim seçilir. Arslantepe Spark Malatya merkezinde Türkçe açılış haftası." },
  { n: "04", t: "Eğitim & İnşa", d: "Yoğun Türkçe müfredat, haftalık birebir mentorluk, uygulamalı ürün ve pazara açılma sprintleri." },
  { n: "05", t: "İstanbul Haftası", d: "Program sonunda dereceye giren girişimler yatırımcı ve kurumsal şirketler ile görüşmeler için İstanbul'a gelir." },
  { n: "06", t: "Demo Day & Sonrası", d: "Melek, VC ve kurumsal yatırımcılara açık demo günü — ardından 6 ay süren mezun desteği." },
];

export default function Journey() {
  return (
    <Section
      id="journey"
      eyebrow="Program Yolculuğu"
      title="Bölgesel kıvılcımdan ulusal ölçeğe — altı aşamada."
      filigree
    >
      <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {stages.map((s, i) => (
          <li key={i} className="relative bg-card border border-border rounded-2xl p-7 overflow-hidden group hover:shadow-elegant transition-all duration-500">
            <div className="absolute -top-3 -right-2 font-display text-7xl text-bronze/10 font-semibold select-none">{s.n}</div>
            <div className="relative">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-bronze">Aşama {s.n}</span>
              <h3 className="font-display text-xl font-semibold text-charcoal mt-2">{s.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
