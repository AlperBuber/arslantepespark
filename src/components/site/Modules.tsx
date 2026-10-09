import Section from "./Section";

const modules = [
  { t: "Girişimcilik & İş Modeli", d: "Problem–çözüm uyumu, değer önerisi, iş modeli ve startup mantığı." },
  { t: "Müşteri Doğrulama", d: "Hedef müşteri, kullanıcı görüşmeleri, ihtiyaç analizi ve ürün-pazar uyumu." },
  { t: "Ürün & Teknoloji", d: "MVP yaklaşımı, ürün yol haritası ve teknoloji stratejisi." },
  { t: "Pazarlama & Satış", d: "Pazara giriş, konumlandırma, satış kanalları ve ilk müşteri kazanımı." },
  { t: "Finans & Yatırım", d: "Finansman kaynakları, temel finansal planlama ve yatırımcıya hazırlık." },
  { t: "Pitching", d: "Hikâye kurgusu, pitch deck, yatırımcı sunumu ve soru-cevap hazırlığı." },
  { t: "Kurumsal İş Birliği", d: "Büyük şirketlerle çalışma, PoC tasarımı ve B2B iş geliştirme." },
  { t: "Hukuk & Etik", d: "Şirketleşme, fikri mülkiyet ve girişimcinin temel hukuki sorumlulukları." },
  { t: "Liderlik & Ekip", d: "Kurucu ekip, görev paylaşımı, liderlik ve girişim kültürü." },
  { t: "Sürdürülebilirlik", d: "Etki odaklı girişimcilik ve sürdürülebilir büyüme yaklaşımı." },
  { t: "Büyüme", d: "Ölçeklenebilirlik, KPI'lar ve büyüme stratejileri." },
  { t: "Globalleşme", d: "Yeni pazarlara açılma ve uluslararası iş geliştirme." },
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
