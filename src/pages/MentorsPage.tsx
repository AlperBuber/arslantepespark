import { useEffect } from "react";
import { Linkedin } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import ContactFooter from "@/components/site/ContactFooter";
import Section from "@/components/site/Section";

import ahmetRizaBalim from "@/assets/mentors/ahmet-riza-balim.jpg";
import ahmetYasagan from "@/assets/mentors/ahmet-yasagan.jpg";
import alperOnar from "@/assets/mentors/alper-onar.jpg";
import emreGuzer from "@/assets/mentors/emre-guzer.jpg";
import gonulKamali from "@/assets/mentors/gonul-kamali.jpg";
import hurcanCoskun from "@/assets/mentors/hurcan-coskun.jpg";
import inalcanGulec from "@/assets/mentors/inalcan-gulec.jpg";
import ismailHaznedar from "@/assets/mentors/ismail-haznedar.png";
import merveSusutKurc from "@/assets/mentors/merve-susut-kurc.png";
import mineDedekoca from "@/assets/mentors/mine-dedekoca.jpg";
import nevraDuyguDuru from "@/assets/mentors/nevra-duygu-duru.jpg";
import sadikKoseoglu from "@/assets/mentors/sadik-koseoglu.jpg";
import serhatSener from "@/assets/mentors/serhat-sener.jpg";
import tanselKaya from "@/assets/mentors/tansel-kaya.png";
import timurSirt from "@/assets/mentors/timur-sirt.jpg";
import tuncBerkman from "@/assets/mentors/tunc-berkman.jpg";
import unalAslan from "@/assets/mentors/unal-aslan.jpg";
import utkuGokkaya from "@/assets/mentors/utku-gokkaya.jpg";

interface Mentor {
  name: string;
  role: string;
  linkedin: string;
  photo: string;
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
    role: "YASAGAN International Consultancy - Danışman",
    linkedin: "https://www.linkedin.com/in/yasagan/",
    photo: ahmetYasagan,
  },
  {
    name: "Alper Onar",
    role: "BBO Legal - Partner",
    linkedin: "https://www.linkedin.com/in/alper-onar-452a5558/",
    photo: alperOnar,
  },
  {
    name: "Emre Güzer",
    role: "Lidio - Co-Founder & CEO",
    linkedin: "https://www.linkedin.com/in/emreguzer/",
    photo: emreGuzer,
  },
  {
    name: "Gönül Kamali",
    role: "KG&BG Group Co-Founder & THINK BIG Digital Solutions - CEO",
    linkedin: "https://www.linkedin.com/in/g%C3%B6n%C3%BCl-kamali-a8157b3/",
    photo: gonulKamali,
  },
  {
    name: "Hürcan Coşkun",
    role: "Kredico - CEO",
    linkedin: "https://www.linkedin.com/in/hurcan-coskun-6508b15/",
    photo: hurcanCoskun,
  },
  {
    name: "İnalcan Güleç",
    role: "Eksim Ventures - Senior VC",
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
    name: "Merve Şuşut Kurç",
    role: "Lookup - Human Resources Consultant",
    linkedin: "https://www.linkedin.com/in/merve-%C5%9Fu%C5%9Fut-kur%C3%A7-3749a6236/",
    photo: merveSusutKurc,
  },
  {
    name: "Mine Dedekoca",
    role: "HappyWork Studio - Founder",
    linkedin: "https://www.linkedin.com/in/minededekoca/",
    photo: mineDedekoca,
  },
  {
    name: "Nevra Duygu Duru",
    role: "B-Connector - Marketing Leader & Fractional CMO",
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
    name: "Serhat Şener",
    role: "Fintechium - Board Member & Fintech Expert",
    linkedin: "https://www.linkedin.com/in/serhat-sener/",
    photo: serhatSener,
  },
  {
    name: "Tansel Kaya",
    role: "The Mindstone Blockchain Labs - CEO",
    linkedin: "https://www.linkedin.com/in/tanselkaya/",
    photo: tanselKaya,
  },
  {
    name: "Timur Sırt",
    role: "Gazeteci",
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
    role: "İTÜ Çekirdek - Advisor & Mentor",
    linkedin: "https://www.linkedin.com/in/utku-gokkaya-6b3851b/",
    photo: utkuGokkaya,
  },
  {
    name: "Ünal Aslan",
    role: "IşıkTEKMER - Manager & Innowider - Founder",
    linkedin: "https://www.linkedin.com/in/unal-aslan/",
    photo: unalAslan,
  },
];

function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-3 flex flex-col hover:shadow-bronze transition-all duration-500 hover:-translate-y-1">
      <div className="aspect-square rounded-xl overflow-hidden bg-secondary">
        <img
          src={mentor.photo}
          alt={mentor.name}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
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
