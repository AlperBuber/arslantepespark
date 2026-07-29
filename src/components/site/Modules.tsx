import Section from "./Section";

const modules = [
  { w: "Hafta 1", t: "Kurucu Zihniyeti & Vizyon", d: "Şirketin hikayesi, temel hedef göstergesi, kurucunun günlük çalışma düzeni ve karar sistemi." },
  { w: "Hafta 2", t: "Müşteri Keşfi", d: "Problem tespitleri, müşteri ihtiyaçları, kanıta dayalı ürün kararları." },
  { w: "Hafta 3", t: "Ürün & MVP Sprintleri", d: "Yalın ürün geliştirme, prototipleme, önceliklendirme sistematiği." },
  { w: "Hafta 4", t: "Pazara Açılma", d: "Kanal tasarımı, konumlandırma, fiyatlama, satış temelleri." },
  { w: "Hafta 5", t: "Büyüme & Analitik", d: "Müşteri kazanım adımları, dönemsel kullanıcı grubu analizi, test edilecek büyüme yolları." },
  { w: "Hafta 6", t: "Marka & Hikâye Anlatımı", d: "Marka hikayesi, içerik üretme sistematiği." },
  { w: "Hafta 7", t: "Finans & Birim Ekonomisi", d: "Ortaklık payı tablosu, nakit dayanma süresi, müşteri ömür boyu değeri, müşteri kazanım maliyeti — tek müşteri başına kâr/zarar hesabı." },
  { w: "Hafta 8", t: "Hukuk & Yönetişim", d: "Şirket yapısı, fikri mülkiyet, sözleşmeler, yatırımcı yönetişimi." },
  { w: "Hafta 9", t: "Yatırıma Hazırlık", d: "Sunum dosyası, yatırımcılara sunulan belge arşivi, yatırım şartları belgesi okuryazarlığı, potansiyel yatırımcı listesi." },
  { w: "Hafta 10", t: "Kurumsal İş Birlikleri", d: "Büyük firmalara nasıl satış yapılır: deneme projeleri, ilk sözleşme, kurumsal satış süreci.", scaleUpOnly: true },
  { w: "Hafta 11", t: "İstanbul Buluşması", d: "Yatırımcı görüşmeleri, ortak atölyeleri, ekosistem derinleşmesi.", scaleUpOnly: true },
  { w: "Hafta 12", t: "Sunum Günü", d: "Melek yatırımcılar, VC'ler, kurumsal ortaklar ve basına açık sunum günü." },
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
          <div
            key={i}
            className={`bg-charcoal p-6 hover:bg-charcoal/60 transition-colors duration-300 group relative ${
              m.scaleUpOnly ? "border-l-2 border-bronze-glow/40" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-bronze-glow font-medium">{m.w}</span>
                {m.scaleUpOnly && (
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-bronze-glow/15 text-bronze-glow border border-bronze-glow/20">
                    Scale-up Özel
                  </span>
                )}
              </div>
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
