import Section from "./Section";

const modules = [
  { w: "Hafta 1", t: "Kurucu Zihniyeti & Vizyon", d: "Stratejik anlatı, kurucu işletim sistemi, kuzey yıldızı tanımı." },
  { w: "Hafta 2", t: "Müşteri Keşfi", d: "Problem görüşmeleri, JTBD, kanıta dayalı ürün kararları." },
  { w: "Hafta 3", t: "Ürün & MVP Sprintleri", d: "Lean teslim, prototipleme, önceliklendirme çerçeveleri." },
  { w: "Hafta 4", t: "Pazara Açılma", d: "Kanal tasarımı, konumlandırma, fiyatlama, satış temelleri." },
  { w: "Hafta 5", t: "Büyüme & Analitik", d: "Funnel tasarımı, kohort analizi, büyüme deneyleri." },
  { w: "Hafta 6", t: "Marka & Hikâye Anlatımı", d: "Anlatı odaklı marka, içerik motoru, sunum hikâyesi." },
  { w: "Hafta 7", t: "Finans & Birim Ekonomisi", d: "Cap table, runway, modelleme, LTV/CAC, yatırım matematiği." },
  { w: "Hafta 8", t: "Hukuk & Yönetişim", d: "Şirket yapısı, fikri mülkiyet, sözleşmeler, yatırımcı yönetişimi." },
  { w: "Hafta 9", t: "Yatırıma Hazırlık", d: "Sunum dosyası, veri odası, term sheet okuryazarlığı, yatırımcı hattı." },
  { w: "Hafta 10", t: "Kurumsal İş Birlikleri", d: "Erken aşama girişimler için pilotlar, satın alma, kurumsal satış." },
  { w: "Hafta 11", t: "İstanbul Buluşması", d: "Yatırımcı görüşmeleri, ortak atölyeleri, ekosistem derinleşmesi." },
  { w: "Hafta 12", t: "Demo Day", d: "Melek, VC, kurumsal ortak ve basına açık kamuya yönelik sunum günü." },
];

export default function Modules() {
  return (
    <Section
      id="modules"
      eyebrow="Eğitim Modülleri"
      title="Operatörler tarafından kurgulanmış 12 haftalık Türkçe müfredat."
      intro="Akademisyenler yerine uygulayıcılarla tasarlandı. Her modül, kurucuların ertesi sabah kullanabileceği somut bir çıktıyla sona erer. Tüm dersler Türkçe yürütülür."
      variant="dark"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/10 rounded-2xl overflow-hidden">
        {modules.map((m, i) => (
          <div key={i} className="bg-charcoal p-6 hover:bg-charcoal/60 transition-colors duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-[0.2em] text-bronze-glow font-medium">{m.w}</span>
              <span className="font-display text-xl text-ivory/30 group-hover:text-bronze-glow transition-colors">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="font-display text-lg text-ivory mb-2 font-medium">{m.t}</h3>
            <p className="text-sm text-ivory/65 leading-relaxed">{m.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
