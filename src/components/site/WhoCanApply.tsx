import Section from "./Section";
import { Check } from "lucide-react";

const startupCriteria = [
  "Üniversite öğrencisi veya yeni mezun kurucular",
  "Fikir veya prototip aşamasında olan projeler",
  "Teknoloji ve inovasyon odaklı girişim fikirleri",
  "Geri bildirime ve mentorluğa açıklık",
  "Programa tam katılım taahhüdü",
];

const scaleupCriteria = [
  "Çalışır prototipi veya minimum uygulanabilir ürünü (MVP) olan teknoloji odaklı girişimler",
  "Mentor ve yatırımcı geri bildirimine açık ekipler",
  "Programa ve ortak çalışmalara katılım taahhüdü",
];

export default function WhoCanApply() {
  return (
    <Section
      id="who"
      eyebrow="Kimler Başvurabilir"
      title={<>Anadolu merkezli bir girişimseniz, <span className="text-bronze">Arslantepe Spark sizin için tasarlandı.</span></>}
      variant="sand"
    >
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Startup Card */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-elegant transition-all duration-500 flex flex-col">
          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-bronze bg-bronze/10 px-2.5 py-1 rounded-full">
              Kategori 01
            </span>
            <h3 className="font-display text-2xl font-semibold text-charcoal mt-4">Startup Kategorisi</h3>
            <p className="text-sm text-muted-foreground mt-1">Öğrenci & Fikir Aşaması</p>
          </div>
          
          <div className="h-px bg-border w-full mb-6" />
          
          <ul className="space-y-4 flex-grow">
            {startupCriteria.map((c, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-bronze/15 text-bronze flex items-center justify-center">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
                <span className="text-charcoal/85 text-sm leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scale-up Card */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-elegant transition-all duration-500 flex flex-col">
          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-bronze bg-bronze/10 px-2.5 py-1 rounded-full">
              Kategori 02
            </span>
            <h3 className="font-display text-2xl font-semibold text-charcoal mt-4">Scale-up Kategorisi</h3>
            <p className="text-sm text-muted-foreground mt-1">MVP Sonrası</p>
          </div>
          
          <div className="h-px bg-border w-full mb-6" />
          
          <ul className="space-y-4 flex-grow">
            {scaleupCriteria.map((c, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-bronze/15 text-bronze flex items-center justify-center">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
                <span className="text-charcoal/85 text-sm leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

