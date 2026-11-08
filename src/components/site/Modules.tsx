import Section from "./Section";
import PromoVideo from "./PromoVideo";

const modules = [
  { t: "Program Başlangıcı ve Girişim Analizi", d: "10 Aralık 2026" },
  { t: "Problem ve Müşteri Keşfi", d: "17 Aralık 2026" },
  { t: "Değer Önerisi ve Ürün-Pazar Uyumu", d: "24 Aralık 2026" },
  { t: "Ürün ve Minimum Uygulanabilir Ürün (MVP)", d: "7 Ocak 2027" },
  { t: "İş Modeli ve Fiyatlandırma", d: "14 Ocak 2027" },
  { t: "Pazara Giriş Stratejisi", d: "21 Ocak 2027" },
  { t: "B2B Satış ve Kurumsal Konsept Doğrulama (PoC)", d: "28 Ocak 2027" },
  { t: "Büyüme ve Dijital Pazarlama", d: "4 Şubat 2027" },
  { t: "Finansal Model ve Girişim Metrikleri", d: "11 Şubat 2027" },
  { t: "Yatırıma Hazırlık ve Değerleme", d: "18 Şubat 2027" },
  { t: "Yatırımcı Sunumu ve Yatırımcı İletişimi", d: "25 Şubat 2027" },
  { t: "Sunum Provaları ve Demo Günü Hazırlığı", d: "4 Mart 2027" },
];

export default function Modules() {
  return (
    <Section
      id="modules"
      eyebrow="Eğitim Programı"
      title="Teoriden çok uygulamaya; girişimcinin bir sonraki adımını atmasını sağlayan içerikler."
      intro="Programda, kurucu zihniyeti ve müşteri keşfinden başlayarak ürün geliştirme, pazara açılma ve büyüme konularına, yatırıma hazırlık süreçlerine, kurumsal iş birliklerine ilişkin eğitimler yer almaktadır. Program, girişimlerin yatırımcılar ve kurumsal ortaklarla buluşacağı bir sunum günüyle tamamlanacaktır."
      variant="dark"
    >
      <PromoVideo />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/10 rounded-2xl overflow-hidden">
        {modules.map((m, i) => (
          <div key={i} className="bg-charcoal p-6 hover:bg-charcoal/60 transition-colors duration-300 group">
            <span className="block mb-3 font-display text-xl text-ivory/30 group-hover:text-bronze-glow transition-colors">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="font-display text-lg text-bronze-glow mb-2 font-medium">{m.t}</h3>
            <p className="text-sm text-ivory/65 leading-relaxed">{m.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
