import Section from "./Section";
import { Mountain, Compass, Network, Building2 } from "lucide-react";

const pillars = [
  { icon: Mountain, title: "Köklü Bir Miras", body: "UNESCO Dünya Mirası Arslantepe Höyüğü'nün eteğinde, 6.000 yıllık bir inovasyon ve devletleşme beşiğinde, Malatya'da konumlanmıştır." },
  { icon: Compass, title: "Anadolu'daki Girişimler", body: "Doğu, Güneydoğu ve İç Anadolu'daki girişimcilere açıktır — risk sermayesinin yeterince ulaşamadığı şehirlerdeki yetenekleri ortaya çıkarır." },
  { icon: Network, title: "İstanbul Köprüsü", body: "Girişimcilerin yer değiştirmesine gerek kalmadan, İstanbul'un yatırımcı, mentor ve kurumsal ağına doğrudan koridor sağlar." },
  { icon: Building2, title: "Kamu-Özel Destekli", body: "Kurumsal ortaklar, bölgesel kalkınma ajansları ve özenle seçilmiş melek-yatırım fonu ağıyla birlikte inşa edildi." },
];

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="Program Hakkında"
      title={<>Anadolu'da çakılan kıvılcım, <span className="text-bronze">İstanbul'a ve Globale taşınıyor.</span></>}
      intro="Arslantepe Spark, Anadolu'nun yeni nesil girişimcilerini ortaya çıkarmak, eğitmek ve sermayeyle buluşturmak için tasarlanmış 12 haftalık bir hızlandırma programıdır."
      filigree
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pillars.map((p, i) => (
          <div key={i} className="group relative bg-card border border-border rounded-2xl p-7 shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-bronze flex items-center justify-center mb-5 shadow-bronze">
              <p.icon className="w-5 h-5 text-charcoal" />
            </div>
            <h3 className="font-display text-xl font-semibold text-charcoal mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
