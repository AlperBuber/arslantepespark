import Section from "./Section";
import { Target, Rocket, HandCoins, GraduationCap, Globe2, Sprout } from "lucide-react";

const goals = [
  { icon: Sprout, t: "Bölgesel yeteneği keşfet", d: "İstanbul sermayesi için görünmez kalacak Anadolu girişimlerini ortaya çıkarıp doğrula." },
  { icon: GraduationCap, t: "Uygulama odaklı eğitim", d: "Yıllarca süren girişimci öğrenme sürecini 12 haftalık Türkçe müfredata sıkıştır." },
  { icon: HandCoins, t: "Yatırıma hazırlık", d: "Her ekibi kurumsal fon toplamaya hazırla — sunum, yatırımcılara sunulan belge arşivi, yatırım şartları belgesi, kurumsal yönetim." },
  { icon: Target, t: "Kurumsal erişim", d: "İstanbul ve ötesindeki stratejik kurumsal ortaklarda deneme projesi ve satın alma kapılarını aç." },
  { icon: Rocket, t: "Ölçeklenmeye hızlandırma", d: "Girişimleri program süresi içinde MVP'den (minimum uygulanabilir ürün) ilk ücretli müşterilere ve fikir aşaması yatırıma taşı." },
  { icon: Globe2, t: "Ekosistemi inşa et", d: "Malatya'da kök salmış, kendi kendine dönen bir mentor, melek yatırımcı ve mezun çarkı kur." },
];

export default function Goals() {
  return (
    <Section
      id="program"
      eyebrow="Program Hedefleri"
      title="Altı taahhüt. Tek bir misyon."
      intro="Her modül, mentor seansı ve Sunum Günü bu hedefler doğrultusunda tasarlanmıştır."
      filigree
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {goals.map((g, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-7 hover:border-bronze/60 hover:shadow-bronze transition-all duration-500">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-11 h-11 rounded-lg bg-secondary flex items-center justify-center text-bronze">
                <g.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-charcoal">{g.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{g.d}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
