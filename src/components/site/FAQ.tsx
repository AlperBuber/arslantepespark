import Section from "./Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";

const faqs = [
  { q: "Arslantepe Spark hisse karşılığında mı?", a: "Programın kendisi hisse almaz. Melek ağımız veya gelecekteki Arslantepe VC fonu üzerinden gelen opsiyonel yatırımlar, ayrı ve standart piyasa koşullarıyla yürütülür." },
  { q: "Program hangi dilde yürütülüyor?", a: "Program tamamen Türkçe yürütülür. Müfredat, atölyeler, mentor seansları ve tüm değerlendirmeler Türkçedir; uluslararası fon toplamaya hazırlık için seçili İngilizce kaynaklar da paylaşılır." },
  { q: "Girişimcilerin Malatya'ya taşınması gerekiyor mu?", a: "Girişimcilerin açılış haftasında, ana yüz yüze sprintlerde ve İstanbul Haftası'nda Malatya'da bulunması beklenir. Bu dönemlerin dışında hibrit katılım desteklenir." },
  { q: "Programın maliyeti nedir?", a: "Programa katılım için herhangi bir nakit ücret talep edilmez. Malatya'daki yüz yüze haftalarda ulaşım ve konaklama program ve ortakları tarafından desteklenir." },
  { q: "Tek başına kurucular başvurabilir mi?", a: "Evet, ancak en az iki kişilik bir kurucu ekibi şiddetle öneririz — müfredat ve iş yükü ekip yürütmesi göz önüne alınarak tasarlanmıştır." },
  { q: "Bir sonraki döneme ne zaman başvurabilirim?", a: "Başvurular Eylül – Ekim 2026 döneminde açıktır. Bültenimize abone olarak başvuru takvimini takip edebilirsiniz." },
];

export default function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <Section id="faq" eyebrow="SSS" title="Sıkça sorulan sorular." variant="sand">
      <Helmet><script type="application/ld+json">{JSON.stringify(jsonLd)}</script></Helmet>
      <div className="max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`f${i}`} className="bg-ivory border border-border rounded-xl px-5 shadow-soft">
              <AccordionTrigger className="text-left font-display text-lg text-charcoal hover:no-underline py-5">{f.q}</AccordionTrigger>
              <AccordionContent className="text-charcoal/75 leading-relaxed pb-5">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
