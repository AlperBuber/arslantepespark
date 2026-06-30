import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Loader2, LogOut } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import logo from "@/assets/logo-mark.png";
// @ts-expect-error JS module without type declarations
import { supabase } from "@/lib/supabase.js";

type ApplicationStatus = "yeni" | "değerlendiriliyor" | "kabul" | "red";

interface Application {
  id: string;
  created_at: string;
  status: ApplicationStatus;
  girisim_adi: string;
  sehir: string;
  web_sitesi: string | null;
  sektor: string;
  asama: string;
  sirketlesmis: boolean;
  kurucu_ad: string;
  email: string;
  telefon: string;
  linkedin: string;
  egitim: string;
  is_deneyimi: string;
  ilk_girisim: boolean;
  haftalik_saat: string;
  problem: string;
  hedef_musteri: string;
  problem_onemi: string;
  mevcut_cozum: string;
  cozum: string;
  farklilik: string;
  mvp_ozellikler: string | null;
  mvp_plan: string | null;
  etiketler: string[] | null;
  hedef_pazar: string;
  pazar_buyuklugu: string | null;
  odeyen_musteri: string;
  gelir_modeli: string;
  olceklenebilirlik: string;
  mevcut_gelir: string;
  gorusme_yapildi: boolean;
  gorusme_sayisi: number;
  basari_gostergeleri: string;
  neden_katilmak: string;
  beklenti: string;
  taahhut: boolean;
  pitch_deck_path: string;
  is_plani_path: string | null;
  demo_link: string | null;
}

const STATUS_OPTIONS: { value: ApplicationStatus; label: string }[] = [
  { value: "yeni", label: "Yeni" },
  { value: "değerlendiriliyor", label: "Değerlendiriliyor" },
  { value: "kabul", label: "Kabul" },
  { value: "red", label: "Red" },
];

function boolLabel(value: boolean | null | undefined): string {
  if (value === true) return "Evet";
  if (value === false) return "Hayır";
  return "—";
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function DetailField({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "md:col-span-2" : undefined}>
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-charcoal/50 mb-1.5">{label}</dt>
      <dd className="text-sm md:text-base text-charcoal whitespace-pre-wrap break-words leading-relaxed">
        {value || "—"}
      </dd>
    </div>
  );
}

function DetailSectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-soft">
      <h2 className="font-display text-xl font-semibold text-charcoal border-b border-border pb-3 mb-6">{title}</h2>
      <dl className="grid md:grid-cols-2 gap-6">{children}</dl>
    </section>
  );
}

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [pitchDeckUrl, setPitchDeckUrl] = useState<string | null>(null);
  const [businessPlanUrl, setBusinessPlanUrl] = useState<string | null>(null);
  const [docUrlsLoading, setDocUrlsLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setAuthLoading(false);
      if (!currentSession) {
        navigate("/management", { replace: true });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      if (!currentSession) {
        navigate("/management", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!session || !id) return;

    const fetchApplication = async () => {
      setLoading(true);
      setError("");

      const { data, error: fetchError } = await supabase
        .from("applications")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        setError("Başvuru yüklenirken bir hata oluştu.");
        toast.error(`Başvuru yüklenemedi: ${fetchError.message}`);
        setApplication(null);
      } else {
        setApplication(data as Application);
      }

      setLoading(false);
    };

    fetchApplication();
  }, [session, id]);

  useEffect(() => {
    if (!application) {
      setPitchDeckUrl(null);
      setBusinessPlanUrl(null);
      return;
    }

    let cancelled = false;

    const loadSignedUrls = async () => {
      setDocUrlsLoading(true);
      setPitchDeckUrl(null);
      setBusinessPlanUrl(null);

      try {
        if (application.pitch_deck_path) {
          const { data, error: urlError } = await supabase.storage
            .from("basvuru-belgeler")
            .createSignedUrl(application.pitch_deck_path, 3600);

          if (urlError) throw urlError;
          if (!cancelled) setPitchDeckUrl(data.signedUrl);
        }

        if (application.is_plani_path) {
          const { data, error: urlError } = await supabase.storage
            .from("basvuru-belgeler")
            .createSignedUrl(application.is_plani_path, 3600);

          if (urlError) throw urlError;
          if (!cancelled) setBusinessPlanUrl(data.signedUrl);
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Belge bağlantıları oluşturulamadı.";
          toast.error(message);
        }
      } finally {
        if (!cancelled) setDocUrlsLoading(false);
      }
    };

    loadSignedUrls();

    return () => {
      cancelled = true;
    };
  }, [application]);

  const handleSignOut = async () => {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      toast.error(`Çıkış yapılamadı: ${signOutError.message}`);
    }
  };

  const handleStatusChange = async (newStatus: ApplicationStatus) => {
    if (!application || !id || application.status === newStatus) return;

    setStatusUpdating(true);

    const { error: updateError } = await supabase
      .from("applications")
      .update({ status: newStatus })
      .eq("id", id);

    if (updateError) {
      toast.error(`Durum güncellenemedi: ${updateError.message}`);
      setStatusUpdating(false);
      return;
    }

    setApplication({ ...application, status: newStatus });
    toast.success("Başvuru durumu güncellendi.");
    setStatusUpdating(false);
  };

  if (authLoading || !session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-bronze animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative print:bg-white">
      <div className="absolute inset-0 filigree-bg pointer-events-none print:hidden" />

      <header className="sticky top-0 z-30 bg-ivory/80 backdrop-blur-md border-b border-border shadow-soft print:static print:shadow-none">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Arslantepe Spark" className="w-10 h-10 object-contain" width={40} height={40} />
            <div>
              <p className="font-display text-base font-semibold text-charcoal">Başvuru Detayı</p>
              <p className="text-[11px] text-charcoal/50 hidden sm:block">{session.user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-charcoal/70 hover:text-bronze transition-colors px-4 py-2 rounded-full hover:bg-charcoal/5 border border-border print:hidden"
          >
            <LogOut className="w-4 h-4" /> Çıkış Yap
          </button>
        </div>
      </header>

      <main className="container relative z-10 py-8 md:py-12 max-w-5xl">
        <Link
          to="/management"
          className="inline-flex items-center gap-2 text-sm font-medium text-charcoal/70 hover:text-bronze transition-colors mb-8 print:hidden"
        >
          <ArrowLeft className="w-4 h-4" /> Listeye Dön
        </Link>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 text-bronze animate-spin" />
          </div>
        ) : error || !application ? (
          <div className="bg-card border border-border rounded-3xl p-12 text-center text-destructive">
            {error || "Başvuru bulunamadı."}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-elegant relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-bronze" />
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div>
                  <span className="eyebrow mb-2">Başvuru</span>
                  <h1 className="font-display text-3xl md:text-4xl font-semibold text-charcoal leading-tight">
                    {application.girisim_adi}
                  </h1>
                  <p className="text-sm text-charcoal/60 mt-2">
                    {application.kurucu_ad} · {application.sehir} · {formatDate(application.created_at)}
                  </p>
                </div>
                <div className="w-full md:w-64 shrink-0">
                  <label htmlFor="status-select" className="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-2">
                    Başvuru Durumu
                  </label>
                  <div className="flex items-center gap-3">
                    <select
                      id="status-select"
                      value={application.status}
                      disabled={statusUpdating}
                      onChange={(e) => handleStatusChange(e.target.value as ApplicationStatus)}
                      className="w-full h-11 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {statusUpdating && <Loader2 className="w-5 h-5 text-bronze animate-spin shrink-0" />}
                  </div>
                </div>
              </div>
            </div>

            <DetailSectionCard title="Temel Bilgiler">
              <DetailField label="Girişim / Proje Adı" value={application.girisim_adi} />
              <DetailField label="Şehir" value={application.sehir} />
              <DetailField label="Web Sitesi" value={application.web_sitesi} />
              <DetailField label="Faaliyet Alanı / Sektör" value={application.sektor} />
              <DetailField label="Girişimin Aşaması" value={application.asama} />
              <DetailField label="Şirketleşmiş mi?" value={boolLabel(application.sirketlesmis)} />
            </DetailSectionCard>

            <DetailSectionCard title="Kurucu Bilgileri">
              <DetailField label="Kurucu Adı Soyadı" value={application.kurucu_ad} />
              <DetailField label="E-posta" value={application.email} />
              <DetailField label="Telefon" value={application.telefon} />
              <DetailField label="LinkedIn" value={application.linkedin} />
              <DetailField label="Eğitim Geçmişi" value={application.egitim} fullWidth />
              <DetailField label="Profesyonel İş Deneyimi" value={application.is_deneyimi} fullWidth />
              <DetailField label="İlk Girişim mi?" value={boolLabel(application.ilk_girisim)} />
              <DetailField label="Haftalık Saat" value={application.haftalik_saat} />
            </DetailSectionCard>

            <DetailSectionCard title="Problem & Fırsat">
              <DetailField label="Hedeflenen Problem" value={application.problem} fullWidth />
              <DetailField label="Hedef Müşteri Kitlesi" value={application.hedef_musteri} fullWidth />
              <DetailField label="Problemin Önemi" value={application.problem_onemi} fullWidth />
              <DetailField label="Mevcut Çözüm Yöntemleri" value={application.mevcut_cozum} fullWidth />
            </DetailSectionCard>

            <DetailSectionCard title="Çözüm & Ürün">
              <DetailField label="Çözüm Açıklaması" value={application.cozum} fullWidth />
              <DetailField label="Farklılık" value={application.farklilik} fullWidth />
              <DetailField label="MVP Özellikleri" value={application.mvp_ozellikler} fullWidth />
              <DetailField label="MVP Geliştirme Planı" value={application.mvp_plan} fullWidth />
              <DetailField
                label="Etiketler"
                value={application.etiketler?.length ? application.etiketler.join(", ") : "—"}
                fullWidth
              />
            </DetailSectionCard>

            <DetailSectionCard title="Pazar & İş Modeli">
              <DetailField label="Hedef Pazar" value={application.hedef_pazar} />
              <DetailField label="Tahmini Pazar Büyüklüğü" value={application.pazar_buyuklugu} />
              <DetailField label="Ücret Ödeyen Müşteri" value={application.odeyen_musteri} fullWidth />
              <DetailField label="Gelir Modeli" value={application.gelir_modeli} fullWidth />
              <DetailField label="Ölçeklenebilirlik" value={application.olceklenebilirlik} fullWidth />
            </DetailSectionCard>

            <DetailSectionCard title="Çekiş & Doğrulama">
              <DetailField label="Mevcut Müşteri / Gelir" value={application.mevcut_gelir} fullWidth />
              <DetailField label="Müşterilerle Görüşüldü mü?" value={boolLabel(application.gorusme_yapildi)} />
              <DetailField label="Görüşme Sayısı" value={String(application.gorusme_sayisi ?? "—")} />
              <DetailField label="Erken Aşama Başarı Göstergeleri" value={application.basari_gostergeleri} fullWidth />
            </DetailSectionCard>

            <DetailSectionCard title="Motivasyon & Uyum">
              <DetailField label="Programa Katılım Nedeni" value={application.neden_katilmak} fullWidth />
              <DetailField label="Beklentiler" value={application.beklenti} fullWidth />
              <DetailField label="Katılım Taahhüdü" value={boolLabel(application.taahhut)} />
            </DetailSectionCard>

            <DetailSectionCard title="Belgeler">
              <div className="md:col-span-2 space-y-4">
                {docUrlsLoading ? (
                  <div className="flex items-center gap-2 text-sm text-charcoal/60">
                    <Loader2 className="w-4 h-4 animate-spin text-bronze" />
                    Belge bağlantıları hazırlanıyor...
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {pitchDeckUrl && (
                      <a
                        href={pitchDeckUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-charcoal text-ivory text-sm font-medium hover:bg-charcoal/90 transition-colors print:hidden"
                      >
                        <ExternalLink className="w-4 h-4" /> Pitch Deck&apos;i Aç
                      </a>
                    )}
                    {businessPlanUrl && (
                      <a
                        href={businessPlanUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border bg-secondary text-charcoal text-sm font-medium hover:bg-secondary/80 transition-colors print:hidden"
                      >
                        <ExternalLink className="w-4 h-4" /> İş Planını Aç
                      </a>
                    )}
                    {!pitchDeckUrl && !businessPlanUrl && !docUrlsLoading && (
                      <p className="text-sm text-charcoal/50">Belge bağlantısı oluşturulamadı.</p>
                    )}
                  </div>
                )}
                {application.demo_link && (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-charcoal/50 mb-1.5">
                      Demo Bağlantısı
                    </dt>
                    <dd>
                      <a
                        href={application.demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm md:text-base text-bronze hover:underline break-all"
                      >
                        {application.demo_link}
                      </a>
                    </dd>
                  </div>
                )}
              </div>
            </DetailSectionCard>
          </div>
        )}
      </main>
    </div>
  );
}
