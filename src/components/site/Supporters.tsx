import Section from "./Section";
import inonu from "@/assets/partner-inonu.png";
import bilgem from "@/assets/partner-bilgem.png";

const supporters = [
  { name: "İnönü Üniversitesi", src: inonu },
  { name: "TÜBİTAK BİLGEM", src: bilgem },
];

export default function Supporters() {
  return (
    <Section
      id="supporters"
      eyebrow="Destekleyenler"
      title="Programımıza güç veren kurumlar."
      intro="Arslantepe Spark, akademi ve teknoloji alanındaki güçlü kurumların desteğiyle inşa edilmektedir."
      variant="sand"
    >
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {supporters.map((s) => (
          <div key={s.name} className="bg-ivory border border-border rounded-2xl p-10 flex items-center justify-center shadow-soft hover:shadow-elegant transition-all duration-500">
            <img src={s.src} alt={s.name} className="max-h-32 w-auto object-contain" loading="lazy" width={1024} height={1024} />
          </div>
        ))}
      </div>
    </Section>
  );
}
