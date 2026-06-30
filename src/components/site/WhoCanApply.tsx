import Section from "./Section";
import { Check } from "lucide-react";

const criteria = [
  "MVP'si veya ilk traction'ı olan erken aşama girişim",
  "Agritech, healthtech, deep-tech, iklim, fintech, mobilite, SaaS veya yaratıcı endüstriler alanında teknoloji odaklı girişim",
  "Pre-seed ile seed arasında — genellikle 500K USD altında yatırım almış",
  "Şirketi kurmaya tam zamanlı bağlı kurucular",
  "Mentor ve yatırımcı geri bildirimine açık, öğrenmeye istekli ekip",
  "Program boyunca tüm müfredat ve atölyelere katılabilecek ekip",
];

export default function WhoCanApply() {
  return (
    <Section
      id="who"
      eyebrow="Kimler Başvurabilir"
      title={<>Anadolu'nun her köşesindeki <span className="text-bronze">girişimciler için.</span></>}
      intro="Bu bölgelerden birinde inşa ediyorsanız, Arslantepe Spark sizin için tasarlandı."
      variant="sand"
    >
      <div>
        <div>
          <h3 className="font-display text-2xl text-charcoal mb-5">Uygunluk Kriterleri</h3>
          <ul className="space-y-3">
            {criteria.map((c, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-bronze/15 text-bronze flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
                <span className="text-charcoal/85">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
