import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Section from "./Section";
import { Send, CheckCircle2 } from "lucide-react";

const baseString = (max = 200) => z.string().trim().min(2, "Zorunlu").max(max);
const email = z.string().trim().email("Geçersiz e-posta").max(255);

const applySchema = z.object({
  founder: baseString(120),
  email,
  startup: baseString(120),
  city: baseString(80),
  stage: baseString(60),
  pitch: z.string().trim().min(30, "Biraz daha detay verin (30+ karakter)").max(1500),
});
const mentorSchema = z.object({
  name: baseString(120),
  email,
  expertise: baseString(120),
  linkedin: z.string().trim().url("Geçerli bir URL girin").max(300),
  why: z.string().trim().min(20, "20+ karakter").max(1000),
});
const investorSchema = z.object({
  name: baseString(120),
  email,
  org: baseString(160),
  ticket: baseString(80),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

type ApplyData = z.infer<typeof applySchema>;
type MentorData = z.infer<typeof mentorSchema>;
type InvestorData = z.infer<typeof investorSchema>;

const CONTACT_EMAIL = "info@bconnector.org";

function FieldError({ msg }: { msg?: string }) {
  return msg ? <p className="text-xs text-destructive mt-1.5">{msg}</p> : null;
}

function SuccessNote() {
  return (
    <div className="flex items-center gap-3 p-4 bg-bronze/10 border border-bronze/30 rounded-xl text-sm text-charcoal">
      <CheckCircle2 className="w-5 h-5 text-bronze shrink-0" />
      <p>Teşekkürler — başvurunuz alındı. Arslantepe Spark ekibi en kısa sürede sizinle iletişime geçecek.</p>
    </div>
  );
}

function openMailto(subject: string, body: string) {
  const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = url;
}

export default function Apply() {
  return (
    <Section
      id="apply"
      eyebrow="Sürece Katıl"
      title={<>Başvur, mentorluk yap veya <span className="text-bronze">yatırımcı ol.</span></>}
      intro="Arslantepe Spark'a üç kapı. Sizinkini seçin."
      filigree
    >
      <div className="max-w-3xl">
        <Tabs defaultValue="apply" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-secondary p-1.5 h-auto rounded-full">
            <TabsTrigger value="apply" className="rounded-full data-[state=active]:bg-charcoal data-[state=active]:text-ivory py-2.5">Girişimci olarak başvur</TabsTrigger>
            <TabsTrigger value="mentor" className="rounded-full data-[state=active]:bg-charcoal data-[state=active]:text-ivory py-2.5">Mentor ol</TabsTrigger>
            <TabsTrigger value="invest" className="rounded-full data-[state=active]:bg-charcoal data-[state=active]:text-ivory py-2.5">Yatırımcı ilgisi</TabsTrigger>
          </TabsList>

          <TabsContent value="apply"><ApplyForm /></TabsContent>
          <TabsContent value="mentor"><MentorForm /></TabsContent>
          <TabsContent value="invest"><InvestorForm /></TabsContent>
        </Tabs>
      </div>
    </Section>
  );
}

function ApplyForm() {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ApplyData>({ resolver: zodResolver(applySchema) });
  const onSubmit = async (data: ApplyData) => {
    const body = `Kurucu: ${data.founder}\nE-posta: ${data.email}\nGirişim: ${data.startup}\nŞehir: ${data.city}\nAşama: ${data.stage}\n\nNe inşa ediyorsunuz?\n${data.pitch}`;
    openMailto(`Arslantepe Spark başvurusu — ${data.startup}`, body);
    toast.success("E-posta istemciniz açıldı");
    reset(); setDone(true);
  };
  if (done) return <SuccessNote />;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-soft space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><Label htmlFor="a-founder">Kurucu adı</Label><Input id="a-founder" {...register("founder")} /><FieldError msg={errors.founder?.message} /></div>
        <div><Label htmlFor="a-email">E-posta</Label><Input id="a-email" type="email" {...register("email")} /><FieldError msg={errors.email?.message} /></div>
        <div><Label htmlFor="a-startup">Girişim adı</Label><Input id="a-startup" {...register("startup")} /><FieldError msg={errors.startup?.message} /></div>
        <div><Label htmlFor="a-city">Şehir</Label><Input id="a-city" placeholder="Örn. Malatya" {...register("city")} /><FieldError msg={errors.city?.message} /></div>
        <div className="sm:col-span-2"><Label htmlFor="a-stage">Aşama</Label><Input id="a-stage" placeholder="Fikir / MVP / İlk Gelir / Seed" {...register("stage")} /><FieldError msg={errors.stage?.message} /></div>
      </div>
      <div>
        <Label htmlFor="a-pitch">Ne inşa ediyorsunuz?</Label>
        <Textarea id="a-pitch" rows={5} placeholder="Problem, çözüm ve traction'ınızı kısaca anlatın." {...register("pitch")} />
        <FieldError msg={errors.pitch?.message} />
      </div>
      <Button type="submit" disabled={isSubmitting} className="bg-charcoal hover:bg-charcoal/90 text-ivory rounded-full px-6 h-11">
        Başvuruyu gönder <Send className="ml-2 w-4 h-4" />
      </Button>
    </form>
  );
}

function MentorForm() {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<MentorData>({ resolver: zodResolver(mentorSchema) });
  const onSubmit = async (data: MentorData) => {
    const body = `Ad: ${data.name}\nE-posta: ${data.email}\nUzmanlık: ${data.expertise}\nLinkedIn: ${data.linkedin}\n\nNeden mentorluk yapmak istiyorsunuz?\n${data.why}`;
    openMailto(`Arslantepe Spark — Mentor başvurusu (${data.name})`, body);
    toast.success("E-posta istemciniz açıldı"); reset(); setDone(true);
  };
  if (done) return <SuccessNote />;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-soft space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><Label htmlFor="m-name">Ad Soyad</Label><Input id="m-name" {...register("name")} /><FieldError msg={errors.name?.message} /></div>
        <div><Label htmlFor="m-email">E-posta</Label><Input id="m-email" type="email" {...register("email")} /><FieldError msg={errors.email?.message} /></div>
        <div><Label htmlFor="m-expertise">Uzmanlık alanı</Label><Input id="m-expertise" placeholder="Örn. Büyüme, Ürün, Yatırım" {...register("expertise")} /><FieldError msg={errors.expertise?.message} /></div>
        <div><Label htmlFor="m-linkedin">LinkedIn URL</Label><Input id="m-linkedin" placeholder="https://" {...register("linkedin")} /><FieldError msg={errors.linkedin?.message} /></div>
      </div>
      <div>
        <Label htmlFor="m-why">Neden mentorluk yapmak istiyorsunuz?</Label>
        <Textarea id="m-why" rows={4} {...register("why")} />
        <FieldError msg={errors.why?.message} />
      </div>
      <Button type="submit" disabled={isSubmitting} className="bg-charcoal hover:bg-charcoal/90 text-ivory rounded-full px-6 h-11">Mentor olarak başvur <Send className="ml-2 w-4 h-4" /></Button>
    </form>
  );
}

function InvestorForm() {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<InvestorData>({ resolver: zodResolver(investorSchema) });
  const onSubmit = async (data: InvestorData) => {
    const body = `Ad: ${data.name}\nE-posta: ${data.email}\nFon / Kuruluş: ${data.org}\nTipik bilet büyüklüğü: ${data.ticket}\n\nNotlar:\n${data.notes ?? ""}`;
    openMailto(`Arslantepe Spark — Yatırımcı ilgisi (${data.org})`, body);
    toast.success("E-posta istemciniz açıldı"); reset(); setDone(true);
  };
  if (done) return <SuccessNote />;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-soft space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><Label htmlFor="i-name">Ad Soyad</Label><Input id="i-name" {...register("name")} /><FieldError msg={errors.name?.message} /></div>
        <div><Label htmlFor="i-email">E-posta</Label><Input id="i-email" type="email" {...register("email")} /><FieldError msg={errors.email?.message} /></div>
        <div><Label htmlFor="i-org">Fon / Kuruluş</Label><Input id="i-org" {...register("org")} /><FieldError msg={errors.org?.message} /></div>
        <div><Label htmlFor="i-ticket">Tipik bilet büyüklüğü</Label><Input id="i-ticket" placeholder="Örn. 50K – 250K USD" {...register("ticket")} /><FieldError msg={errors.ticket?.message} /></div>
      </div>
      <div>
        <Label htmlFor="i-notes">Notlar (opsiyonel)</Label>
        <Textarea id="i-notes" rows={4} {...register("notes")} />
        <FieldError msg={errors.notes?.message} />
      </div>
      <Button type="submit" disabled={isSubmitting} className="bg-charcoal hover:bg-charcoal/90 text-ivory rounded-full px-6 h-11">İlgimi kaydet <Send className="ml-2 w-4 h-4" /></Button>
    </form>
  );
}
