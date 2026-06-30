import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Loader2, LogOut, Search, Shield } from "lucide-react";
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

const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "Tümü" },
  ...STATUS_OPTIONS,
];

const CSV_COLUMNS: { key: keyof Application; header: string; format?: (app: Application) => string }[] = [
  { key: "id", header: "ID" },
  { key: "created_at", header: "Tarih", format: (app) => formatDate(app.created_at) },
  { key: "status", header: "Durum", format: (app) => STATUS_OPTIONS.find((s) => s.value === app.status)?.label ?? app.status },
  { key: "girisim_adi", header: "Girişim Adı" },
  { key: "kurucu_ad", header: "Kurucu" },
  { key: "email", header: "E-posta" },
  { key: "telefon", header: "Telefon" },
  { key: "sehir", header: "Şehir" },
  { key: "web_sitesi", header: "Web Sitesi" },
  { key: "sektor", header: "Sektör" },
  { key: "asama", header: "Aşama" },
  { key: "sirketlesmis", header: "Şirketleşmiş", format: (app) => boolLabel(app.sirketlesmis) },
  { key: "linkedin", header: "LinkedIn" },
  { key: "egitim", header: "Eğitim" },
  { key: "is_deneyimi", header: "İş Deneyimi" },
  { key: "ilk_girisim", header: "İlk Girişim", format: (app) => boolLabel(app.ilk_girisim) },
  { key: "haftalik_saat", header: "Haftalık Saat" },
  { key: "problem", header: "Problem" },
  { key: "hedef_musteri", header: "Hedef Müşteri" },
  { key: "problem_onemi", header: "Problem Önemi" },
  { key: "mevcut_cozum", header: "Mevcut Çözüm" },
  { key: "cozum", header: "Çözüm" },
  { key: "farklilik", header: "Farklılık" },
  { key: "mvp_ozellikler", header: "MVP Özellikleri" },
  { key: "mvp_plan", header: "MVP Planı" },
  { key: "etiketler", header: "Etiketler", format: (app) => (app.etiketler?.length ? app.etiketler.join(", ") : "") },
  { key: "hedef_pazar", header: "Hedef Pazar" },
  { key: "pazar_buyuklugu", header: "Pazar Büyüklüğü" },
  { key: "odeyen_musteri", header: "Ödeyen Müşteri" },
  { key: "gelir_modeli", header: "Gelir Modeli" },
  { key: "olceklenebilirlik", header: "Ölçeklenebilirlik" },
  { key: "mevcut_gelir", header: "Mevcut Gelir" },
  { key: "gorusme_yapildi", header: "Görüşme Yapıldı", format: (app) => boolLabel(app.gorusme_yapildi) },
  { key: "gorusme_sayisi", header: "Görüşme Sayısı", format: (app) => String(app.gorusme_sayisi ?? "") },
  { key: "basari_gostergeleri", header: "Başarı Göstergeleri" },
  { key: "neden_katilmak", header: "Neden Katılmak" },
  { key: "beklenti", header: "Beklenti" },
  { key: "taahhut", header: "Taahhüt", format: (app) => boolLabel(app.taahhut) },
  { key: "pitch_deck_path", header: "Pitch Deck Yolu" },
  { key: "is_plani_path", header: "İş Planı Yolu" },
  { key: "demo_link", header: "Demo Link" },
];

function boolLabel(value: boolean | null | undefined): string {
  if (value === true) return "Evet";
  if (value === false) return "Hayır";
  return "";
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

function statusBadgeClass(status: string): string {
  switch (status) {
    case "kabul":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "red":
      return "bg-red-100 text-red-800 border-red-200";
    case "değerlendiriliyor":
      return "bg-bronze/15 text-bronze border-bronze/30";
    default:
      return "bg-secondary text-charcoal/70 border-border";
  }
}

function escapeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let str = String(value);
  if (str.includes('"')) str = str.replace(/"/g, '""');
  if (/[",\n\r]/.test(str)) return `"${str}"`;
  return str;
}

function applicationsToCsv(apps: Application[]): string {
  const headerRow = CSV_COLUMNS.map((col) => escapeCsvCell(col.header)).join(",");
  const dataRows = apps.map((app) =>
    CSV_COLUMNS.map((col) => {
      const raw = col.format ? col.format(app) : (app[col.key] as string | number | null | undefined);
      return escapeCsvCell(raw ?? "");
    }).join(",")
  );
  return [headerRow, ...dataRows].join("\r\n");
}

function downloadCsv(apps: Application[]) {
  const csv = `\uFEFF${applicationsToCsv(apps)}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `arslantepe-spark-basvurular-${date}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function ManagementPage() {
  const navigate = useNavigate();

  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [applications, setApplications] = useState<Application[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState("");
  const [exporting, setExporting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchApplications = useCallback(async () => {
    setListLoading(true);
    setListError("");

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setListError("Başvurular yüklenirken bir hata oluştu.");
      toast.error(`Başvurular yüklenemedi: ${error.message}`);
      setApplications([]);
    } else {
      setApplications((data as Application[]) ?? []);
    }

    setListLoading(false);
  }, []);

  useEffect(() => {
    if (session) {
      fetchApplications();
    } else {
      setApplications([]);
    }
  }, [session, fetchApplications]);

  const filteredApplications = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return applications.filter((app) => {
      const matchesSearch =
        !query ||
        app.girisim_adi?.toLowerCase().includes(query) ||
        app.kurucu_ad?.toLowerCase().includes(query) ||
        app.email?.toLowerCase().includes(query);

      const matchesStatus = statusFilter === "all" || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchQuery, statusFilter]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail.trim(),
      password: loginPassword,
    });

    if (error) {
      const message =
        error.message === "Invalid login credentials"
          ? "E-posta veya şifre hatalı."
          : `Giriş başarısız: ${error.message}`;
      setLoginError(message);
      toast.error(message);
    }

    setLoginLoading(false);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(`Çıkış yapılamadı: ${error.message}`);
      return;
    }
    toast.success("Oturum kapatıldı.");
  };

  const handleExportCsv = () => {
    if (applications.length === 0) {
      toast.error("Dışa aktarılacak başvuru bulunamadı.");
      return;
    }

    setExporting(true);
    try {
      downloadCsv(applications);
      toast.success(`${applications.length} başvuru CSV olarak indirildi.`);
    } catch {
      toast.error("CSV dışa aktarımı sırasında bir hata oluştu.");
    } finally {
      setExporting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-bronze animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background relative flex items-center justify-center p-4">
        <div className="absolute inset-0 filigree-bg pointer-events-none" />
        <div className="relative w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-elegant">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-bronze rounded-t-3xl" />
          <div className="flex flex-col items-center text-center mb-8">
            <img src={logo} alt="Arslantepe Spark" className="w-12 h-12 mb-4" width={48} height={48} />
            <span className="eyebrow mb-2">Yönetim Paneli</span>
            <h1 className="font-display text-2xl font-semibold text-charcoal">Değerlendirici Girişi</h1>
            <p className="text-sm text-charcoal/60 mt-2">Başvuruları görüntülemek için oturum açın.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
                E-posta
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="ornek@alanadi.com"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
                Şifre
              </label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="••••••••"
              />
            </div>

            {loginError && (
              <p className="text-sm text-destructive bg-destructive/5 border border-destructive/20 rounded-xl px-4 py-3">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full h-11 rounded-full bg-charcoal hover:bg-charcoal/90 text-ivory font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 filigree-bg pointer-events-none" />

      <header className="sticky top-0 z-30 bg-ivory/80 backdrop-blur-md border-b border-border shadow-soft">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Arslantepe Spark" className="w-10 h-10 object-contain" width={40} height={40} />
            <div>
              <p className="font-display text-base font-semibold text-charcoal">Başvuru Yönetimi</p>
              <p className="text-[11px] text-charcoal/50 hidden sm:block">{session.user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-charcoal/70 hover:text-bronze transition-colors px-4 py-2 rounded-full hover:bg-charcoal/5 border border-border"
          >
            <LogOut className="w-4 h-4" /> Çıkış Yap
          </button>
        </div>
      </header>

      <main className="container relative z-10 py-8 md:py-10">
        <div className="bg-card border border-border rounded-3xl shadow-elegant overflow-hidden relative">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-bronze" />

          <div className="p-6 md:p-8 border-b border-border space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="eyebrow mb-1">Değerlendirme</span>
                <h2 className="font-display text-2xl font-semibold text-charcoal">Başvuru Listesi</h2>
                <p className="text-sm text-charcoal/60 mt-1">
                  {filteredApplications.length} başvuru gösteriliyor
                  {applications.length !== filteredApplications.length && ` (${applications.length} toplam)`}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleExportCsv}
                  disabled={exporting || listLoading || applications.length === 0}
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-border bg-secondary hover:bg-secondary/80 transition-colors disabled:opacity-50"
                >
                  {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  Excel&apos;e Aktar (CSV)
                </button>
                <button
                  type="button"
                  onClick={fetchApplications}
                  disabled={listLoading}
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-border bg-secondary hover:bg-secondary/80 transition-colors disabled:opacity-50"
                >
                  {listLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                  Yenile
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Girişim, kurucu veya e-posta ara..."
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-11 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring sm:min-w-[180px]"
              >
                {STATUS_FILTER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {listLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-bronze animate-spin" />
            </div>
          ) : listError ? (
            <div className="p-8 text-center text-destructive">{listError}</div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-12 text-center text-charcoal/50 text-sm">Eşleşen başvuru bulunamadı.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/40 text-left">
                    <th className="px-6 py-3 font-semibold text-charcoal/70">Girişim Adı</th>
                    <th className="px-6 py-3 font-semibold text-charcoal/70">Kurucu</th>
                    <th className="px-6 py-3 font-semibold text-charcoal/70">Şehir</th>
                    <th className="px-6 py-3 font-semibold text-charcoal/70">E-posta</th>
                    <th className="px-6 py-3 font-semibold text-charcoal/70">Durum</th>
                    <th className="px-6 py-3 font-semibold text-charcoal/70">Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <tr
                      key={app.id}
                      onClick={() => navigate(`/management/${app.id}`)}
                      className="border-b border-border/70 hover:bg-secondary/30 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-charcoal">{app.girisim_adi}</td>
                      <td className="px-6 py-4 text-charcoal/80">{app.kurucu_ad}</td>
                      <td className="px-6 py-4 text-charcoal/80">{app.sehir}</td>
                      <td className="px-6 py-4 text-charcoal/80">{app.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${statusBadgeClass(app.status)}`}>
                          {STATUS_OPTIONS.find((s) => s.value === app.status)?.label ?? app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-charcoal/60 whitespace-nowrap">{formatDate(app.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
