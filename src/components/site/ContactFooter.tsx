import { useState } from "react";
import { MapPin, Mail, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Section from "./Section";
import logo from "@/assets/logo-mark.png";

const partners = ["TÜBİTAK", "KOSGEB", "Anadolu Kalkınma Ajansı", "İnönü Üniversitesi", "İstanbul Teknopark", "Bronze Ventures"];
const CONTACT_EMAIL = "info@bconnector.org";

export default function ContactFooter() {
  const [name, setName] = useState("");
  const [emailVal, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) { toast.error("Lütfen adınızı girin"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal.trim())) { toast.error("Geçerli bir e-posta girin"); return; }
    if (message.trim().length < 10) { toast.error("Lütfen mesajınızı yazın (en az 10 karakter)"); return; }
    setSending(true);
    const body = `Ad: ${name}\nE-posta: ${emailVal}\n\n${message}`;
    const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Arslantepe Spark — İletişim formu")}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    await new Promise(r => setTimeout(r, 400));
    toast.success("E-posta istemciniz açıldı — mesajınızı göndermeyi unutmayın.");
    setName(""); setEmail(""); setMessage(""); setSending(false);
  };

  return (
    <>
      <Section id="contact" eyebrow="İletişim" title="Bize ulaşın." variant="default">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-charcoal/80 leading-relaxed max-w-md">
              Ortaklıklar, basın, üniversite ziyaretleri veya sadece merhaba demek için Arslantepe Spark ekibine ulaşın. Programımız tamamen Türkçe yürütülmektedir.
            </p>
            <ul className="mt-8 space-y-4 text-charcoal/85">
              <li className="flex gap-3"><MapPin className="w-5 h-5 text-bronze shrink-0 mt-0.5" /> Arslantepe Spark Merkezi · Malatya, Türkiye</li>
              <li className="flex gap-3"><Mail className="w-5 h-5 text-bronze shrink-0 mt-0.5" /> <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-bronze">{CONTACT_EMAIL}</a></li>
            </ul>

            <div className="mt-10">
              <h3 className="font-display text-lg text-charcoal mb-3">Ortaklarımız</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden max-w-md">
                {partners.map((p) => (
                  <div key={p} className="bg-ivory aspect-[3/1] flex items-center justify-center text-xs font-medium text-charcoal/60 px-2 text-center">{p}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-sand border border-border rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 filigree-bg" aria-hidden />
            <form onSubmit={submit} className="relative space-y-4">
              <h3 className="font-display text-2xl text-charcoal">Bize yazın</h3>
              <p className="text-sm text-charcoal/70 max-w-sm">
                Mesajınız doğrudan <strong>{CONTACT_EMAIL}</strong> adresine iletilir.
              </p>
              <div>
                <Label htmlFor="c-name">Ad Soyad</Label>
                <Input id="c-name" value={name} onChange={(e) => setName(e.target.value)} className="bg-ivory" />
              </div>
              <div>
                <Label htmlFor="c-email">E-posta</Label>
                <Input id="c-email" type="email" value={emailVal} onChange={(e) => setEmail(e.target.value)} className="bg-ivory" />
              </div>
              <div>
                <Label htmlFor="c-message">Mesajınız</Label>
                <Textarea id="c-message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="bg-ivory" />
              </div>
              <Button type="submit" disabled={sending} className="bg-charcoal text-ivory hover:bg-charcoal/90 rounded-full px-6 h-11">
                Gönder <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </Section>

      <footer className="bg-charcoal text-ivory/75 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="" className="w-8 h-8 brightness-125" width={32} height={32} loading="lazy" />
              <span className="font-display text-base font-semibold text-ivory">
                Arslantepe <span className="text-bronze-glow">Spark</span>
              </span>
            </div>
            <p className="text-xs text-ivory/55 max-w-md">
              Anadolu'nun Girişimcilik Programı — Doğu, Güneydoğu ve İç Anadolu'daki girişimcileri İstanbul'un yatırımcı ve kurumsal ortaklarıyla buluşturur. Tamamen Türkçe yürütülür.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/company/arslantepe-spark/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-bronze-glow transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-ivory/10 flex flex-col md:flex-row justify-between gap-2 text-xs text-ivory/50">
            <span>© {new Date().getFullYear()} Arslantepe Spark. Tüm hakları saklıdır.</span>
            <span>Malatya'da üretildi · Anadolu mirasıyla güçlendirildi.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
