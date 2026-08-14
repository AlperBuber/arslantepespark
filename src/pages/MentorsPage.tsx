import { useEffect } from "react";
import { Linkedin } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import ContactFooter from "@/components/site/ContactFooter";
import Section from "@/components/site/Section";

import ahmetRizaBalim from "@/assets/mentors/ahmet-riza-balim.jpg";
import ahmetYasagan from "@/assets/mentors/ahmet-yasagan.jpg";
import alperOnar from "@/assets/mentors/alper-onar.jpg";
import barisKarakullukcu from "@/assets/mentors/baris-karakullukcu.png";
import emreGuzer from "@/assets/mentors/emre-guzer.jpg";
import enginSatana from "@/assets/mentors/engin-satana.jpg";
import erdemMumtazHacipasaoglu from "@/assets/mentors/erdem-mumtaz-hacipasaoglu.jpg";
import gonulKamali from "@/assets/mentors/gonul-kamali.jpg";
import gulsahCakir from "@/assets/mentors/gulsah-cakir.jpg";
import hurcanCoskun from "@/assets/mentors/hurcan-coskun.jpg";
import inalcanGulec from "@/assets/mentors/inalcan-gulec.jpg";
import ismailHaznedar from "@/assets/mentors/ismail-haznedar.png";
import merveSusutKurc from "@/assets/mentors/merve-susut-kurc.png";
import mineDedekoca from "@/assets/mentors/mine-dedekoca.jpg";
import nevraDuyguDuru from "@/assets/mentors/nevra-duygu-duru.jpg";
import sadikKoseoglu from "@/assets/mentors/sadik-koseoglu.jpg";
import selimYazici from "@/assets/mentors/selim-yazici.jpg";
import selmaBahcivanoglu from "@/assets/mentors/selma-bahcivanoglu.jpg";
import serhatSener from "@/assets/mentors/serhat-sener.jpg";
import sibelSoyakEsder from "@/assets/mentors/sibel-soyak-esder.png";
import tanselKaya from "@/assets/mentors/tansel-kaya.png";
import timurSirt from "@/assets/mentors/timur-sirt.jpg";
import tuncBerkman from "@/assets/mentors/tunc-berkman.jpg";
import unalAslan from "@/assets/mentors/unal-aslan.jpg";
import utkuGokkaya from "@/assets/mentors/utku-gokkaya.jpg";
import yektaPektas from "@/assets/mentors/yekta-pektas.jpg";

interface Mentor {
  name: string;
  role: string;
  linkedin: string;
  photo?: string;
}

const mentors: Mentor[] = [
  {
    name: "Ahmet Rıza Balım",
    role: "Dijitalpark Teknokent - Teknoloji Transfer Ofisleri Uzmanı",
    linkedin: "https://www.linkedin.com/in/ahmet-r%C4%B1za-bal%C4%B1m-26841347/",
    photo: ahmetRizaBalim,
  },
  {
    name: "Ahmet Yasagan",
    role: "YASAGAN Uluslararası Danışmanlık, Danışman",
    linkedin: "https://www.linkedin.com/in/yasagan/",
    photo: ahmetYasagan,
  },
  {
    name: "Alper Onar",
    role: "BBO Legal, Ortak",
    linkedin: "https://www.linkedin.com/in/alper-onar-452a5558/",
    photo: alperOnar,
  },
  {
    name: "Aytül Erçil",
    role: "Vispera A.Ş. Ortağı, Eş-CEO ve Yönetim Kurulu Başkanı",
    linkedin: "https://www.linkedin.com/in/aytul-ercil-b833b43/",
  },
  {
    name: "Barış Karakullukçu",
    role: "Yapay Zeka ve Teknoloji Derneği Yönetim Kurulu Başkanı ve Aionire Kurucusu",
    linkedin: "https://www.linkedin.com/in/baris-karakullukcu/",
    photo: barisKarakullukcu,
  },
  {
    name: "Emre Güzer",
    role: "Lidio, Kurucu Ortak & Genel Müdür",
    linkedin: "https://www.linkedin.com/in/emreguzer/",
    photo: emreGuzer,
  },
  {
    name: "Erdem Mümtaz Hacıpaşaoğlu",
    role: "Vircon Legal, Teknoloji & Girişim Hukukçusu",
    linkedin: "https://www.linkedin.com/in/mumtazhacipasaoglu/",
    photo: erdemMumtazHacipasaoglu,
  },
  {
    name: "Gönül Kamali",
    role: "KG&BG Group Kurucu Ortağı & THINK BIG Digital Solutions Genel Müdürü",
    linkedin: "https://www.linkedin.com/in/g%C3%B6n%C3%BCl-kamali-a8157b3/",
    photo: gonulKamali,
  },
  {
    name: "Gülşah Çakır",
    role: "XMind Studio, Kurucu",
    linkedin: "https://www.linkedin.com/in/gulsahcakir/",
    photo: gulsahCakir,
  },
  {
    name: "Hürcan Coşkun",
    role: "Kredico, Genel Müdür",
    linkedin: "https://www.linkedin.com/in/hurcan-coskun-6508b15/",
    photo: hurcanCoskun,
  },
  {
    name: "İnalcan Güleç",
    role: "Eksim Ventures, Kıdemli Girişim Sermayesi Yatırımcısı",
    linkedin: "https://www.linkedin.com/in/inalcangulec/",
    photo: inalcanGulec,
  },
  {
    name: "İsmail Haznedar",
    role: "Stratejik İşler - Stratejist & Yönetim Danışmanı (CMC)",
    linkedin: "https://www.linkedin.com/in/ihaznedar/",
    photo: ismailHaznedar,
  },
  {
    name: "M. Engin Satana",
    role: "Dopigo, Kurucu Ortak & Genel Müdür",
    linkedin: "https://www.linkedin.com/in/m-engin-satana-7208054/",
    photo: enginSatana,
  },
  {
    name: "Merve Şuşut Kurç",
    role: "Lookup, İnsan Kaynakları Danışmanı",
    linkedin: "https://www.linkedin.com/in/merve-%C5%9Fu%C5%9Fut-kur%C3%A7-3749a6236/",
    photo: merveSusutKurc,
  },
  {
    name: "Mine Dedekoca",
    role: "HappyWork Studio, Kurucu",
    linkedin: "https://www.linkedin.com/in/minededekoca/",
    photo: mineDedekoca,
  },
  {
    name: "Nevra Duygu Duru",
    role: "B-Connector, Danışman ve Mentor",
    linkedin: "https://www.linkedin.com/in/nevraduyguduru/",
    photo: nevraDuyguDuru,
  },
  {
    name: "Sadık Köseoğlu",
    role: "Şirket Ortağım Melek Yatırımcı Ağı - Direktör",
    linkedin: "https://www.linkedin.com/in/sad%C4%B1k-k%C3%B6seo%C4%9Flu-874b4623/",
    photo: sadikKoseoglu,
  },
  {
    name: "Selim Yazıcı",
    role: "İstanbul Üniversitesi Öğretim Üyesi ve FinTech İstanbul Kurucu Ortağı",
    linkedin: "https://www.linkedin.com/in/selimyazici/",
    photo: selimYazici,
  },
  {
    name: "Selma Bahçıvanoğlu",
    role: "Simya VC, Yönetici Ortak",
    linkedin: "https://www.linkedin.com/in/selmabahcivanoglu/",
    photo: selmaBahcivanoglu,
  },
  {
    name: "Serhat Şener",
    role: "Fintechium, Yönetim Kurulu Üyesi ve Finansal Teknolojiler Uzmanı",
    linkedin: "https://www.linkedin.com/in/serhat-sener/",
    photo: serhatSener,
  },
  {
    name: "Sibel Soyak Esder",
    role: "Rezonans, Kurucu",
    linkedin: "https://www.linkedin.com/in/sibel-soyak-esder/",
    photo: sibelSoyakEsder,
  },
  {
    name: "Tansel Kaya",
    role: "The Mindstone Blockchain Labs, Genel Müdür",
    linkedin: "https://www.linkedin.com/in/tanselkaya/",
    photo: tanselKaya,
  },
  {
    name: "Timur Sırt",
    role: "Girişimcilik Danışmanı, Veri Madenciliği Uzmanı, Girişim ve Teknoloji Gazetecisi, Konuşmacı",
    linkedin: "https://www.linkedin.com/in/timur-sirt-a4b17637/",
    photo: timurSirt,
  },
  {
    name: "Tunç Berkman",
    role: "QMindLab - Partner | Marka & Pazarlama Stratejisti",
    linkedin: "https://www.linkedin.com/in/tuncberkman/",
    photo: tuncBerkman,
  },
  {
    name: "Utku Gökkaya",
    role: "İTÜ Çekirdek, Danışman & Mentor",
    linkedin: "https://www.linkedin.com/in/utku-gokkaya-6b3851b/",
    photo: utkuGokkaya,
  },
  {
    name: "Ünal Aslan",
    role: "IşıkTEKMER Müdürü ve Innowider Kurucusu",
    linkedin: "https://www.linkedin.com/in/unal-aslan/",
    photo: unalAslan,
  },
  {
    name: "Yekta Pektaş",
    role: "Lecta, Kurucu",
    linkedin: "https://www.linkedin.com/in/yekta-pektas/",
    photo: yektaPektas,
  },
];

function WomanIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true" fill="currentColor">
      <path d="M64 16c-19 0-31 14-31 32 0 13 4 22 7 27l-4 12h56l-4-12c3-5 7-14 7-27 0-18-12-32-31-32z" />
      <circle cx="64" cy="53" r="17" className="fill-secondary" />
      <path d="M20 120c5-25 23-35 44-35s39 10 44 35H20z" />
    </svg>
  );
}

function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-3 flex flex-col hover:shadow-bronze transition-all duration-500 hover:-translate-y-1">
      <div className="aspect-square rounded-xl overflow-hidden bg-secondary">
        {mentor.photo ? (
          <img
            src={mentor.photo}
            alt={mentor.name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-end justify-center text-bronze/40">
            <WomanIcon className="w-3/4 h-3/4" />
          </div>
        )}
      </div>
      <div className="px-2.5 pt-4 pb-2.5 flex flex-col flex-1">
        <h3 className="font-display text-lg text-charcoal font-semibold leading-snug">{mentor.name}</h3>
        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{mentor.role}</p>
        <div className="mt-auto pt-4">
          <a
            href={mentor.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${mentor.name} LinkedIn profili`}
            className="inline-flex w-9 h-9 rounded-full bg-[#0A66C2] text-white items-center justify-center hover:opacity-85 hover:scale-105 transition-all"
          >
            <Linkedin className="w-5 h-5" fill="currentColor" strokeWidth={0} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function MentorsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-background">
      <Navbar />
      <div className="pt-16 md:pt-20">
        <Section
          id="mentors-list"
          eyebrow="Mentor Ağı"
          title={<>Mentorlarımız — yol gösteren <span className="text-bronze">deneyimli</span> bir ekip.</>}
          intro="Girişimcilerimize birebir zaman ayıran operatörler, yatırımcılar, kurumsal yöneticiler ve alan uzmanlarından oluşan mentor ağımızla tanışın."
          filigree
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {mentors.map((m) => (
              <MentorCard key={m.name} mentor={m} />
            ))}
          </div>
        </Section>
      </div>
      <ContactFooter />
    </main>
  );
}
