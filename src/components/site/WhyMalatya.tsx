import Section from "./Section";

const reasons = [
  { stat: "6.000", label: "Yıllık inovasyon mirası — 2021'den bu yana UNESCO listesinde yer alan Arslantepe Höyüğü." },
  { stat: "#1", label: "Doğu Anadolu'nun lojistik merkezi: İstanbul ve Körfez pazarlarına demir, kara ve hava bağlantıları." },
  { stat: "3", label: "Derin teknoloji, tarım teknolojisi ve sağlık alanında yetenek besleyen üniversite ve araştırma merkezi." },
];

export default function WhyMalatya() {
  return (
    <Section
      id="why"
      eyebrow="Neden Malatya"
      title={<>Anadolu inovasyonunun <span className="text-bronze">yeni cazibe merkezi.</span></>}
      intro="Malatya yalnızca bir ev sahibi şehir değil — stratejik bir düğüm noktasıdır. Maliyet-etkin operasyonlar, yeniden doğuşa hazır bir kayısı ekonomisi ve global standartlarda araçlara aç bir yetenek tabanı."
      variant="sand"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden shadow-elegant">
        {reasons.map((r, i) => (
          <div key={i} className="bg-ivory p-8 md:p-10">
            <div className="font-display text-5xl md:text-6xl font-semibold text-bronze leading-none">{r.stat}</div>
            <p className="mt-4 text-sm md:text-base text-charcoal/75 leading-relaxed">{r.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
