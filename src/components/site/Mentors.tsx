import Section from "./Section";

const mentors = Array.from({ length: 8 }).map((_, i) => ({
  name: `Mentor ${i + 1}`,
  role: ["Seri Girişimci", "Büyüme Operatörü", "VC Ortağı", "CTO", "Ürün Lideri", "Marka Stratejisti", "Melek Yatırımcı", "Kurumsal VC"][i],
  org: ["Series-B SaaS", "Marketplace exit", "İstanbul VC", "Deep-tech", "Fintech unicorn", "Tüketici markası", "Melek ağı", "Kurumsal VC"][i],
}));

export default function Mentors() {
  return (
    <Section
      id="mentors"
      eyebrow="Mentorlar & Yatırımcılar"
      title={<>Sadece takvim değil, <span className="text-bronze">kapı açan</span> bir ağ.</>}
      intro="Her dönem, gerçek zaman ayıran — yalnızca isim vermeyen — operatörler, yatırımcılar ve kurumsal yöneticilerle eşleştirilir."
      filigree
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        {mentors.map((m, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-bronze transition-all duration-500 hover:-translate-y-1">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-bronze shadow-bronze flex items-center justify-center font-display text-2xl text-charcoal font-semibold">
              {m.name.split(" ").map(n => n[0]).join("")}
            </div>
            <h3 className="font-display text-base mt-4 text-charcoal font-semibold">{m.name}</h3>
            <p className="text-xs text-bronze font-medium uppercase tracking-wider mt-1">{m.role}</p>
            <p className="text-xs text-muted-foreground mt-1">{m.org}</p>
          </div>
        ))}
      </div>

    </Section>
  );
}
