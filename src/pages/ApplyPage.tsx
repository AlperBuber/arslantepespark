import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  UploadCloud, 
  Check, 
  FileText, 
  Loader2, 
  Sparkles, 
  CheckCircle2, 
  Trash2, 
  Download, 
  Home, 
  AlertCircle 
} from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo-mark.png";
import { supabase } from "@/lib/supabase.js";

const INITIAL_FORM_DATA = {
  startupName: "",
  city: "",
  website: "",
  sector: "",
  stage: "",
  isIncorporated: "",
  founderName: "",
  email: "",
  phone: "",
  linkedin: "",
  education: "",
  experience: "",
  isFirstStartup: "",
  weeklyHours: "",
  problem: "",
  targetAudience: "",
  problemImportance: "",
  currentSolutions: "",
  solution: "",
  differentiation: "",
  mvpFeatures: "",
  mvpPlan: "",
  tags: [] as string[],
  otherTag: "",
  targetMarket: "",
  marketSize: "",
  payingCustomer: "",
  revenueModel: "",
  scalabilityReason: "",
  tractionMvp: "",
  hasSpokenToCustomers: "",
  interviewCount: "",
  tractionMetrics: "",
  whyProgram: "",
  expectations: "",
  attendanceCommitment: "",
  pitchDeckName: "",
  pitchDeckSize: "",
  businessPlanName: "",
  businessPlanSize: "",
  demoUrl: ""
};

const toBool = (value: string) => value === "Evet";

const TURKISH_CITIES = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
  "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
  "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari",
  "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
  "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
  "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
  "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
  "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
];

const SECTORS_TAGS = [
  "Fintech", 
  "Oyun (Gaming)", 
  "Yapay Zekâ (AI)", 
  "Perakende (Retail)", 
  "Endüstri 4.0", 
  "Tarım Teknolojileri (Agritech)", 
  "Enerji Teknolojileri, İklim Teknolojileri ve Sürdürülebilirlik", 
  "E-Ticaret, Perakende ve Moda", 
  "Mobilite", 
  "Donanım (Hardware)", 
  "Gayrimenkul Teknolojileri (Proptech) ve İnşaat Teknolojileri (Contech)", 
  "Turizm ve Konaklama (Hospitality)"
];

const STEPS = [
  { id: 1, title: "Temel Bilgiler", desc: "Girişim ve konum" },
  { id: 2, title: "Kurucu Bilgileri", desc: "Ekip ve deneyim" },
  { id: 3, title: "Problem & Fırsat", desc: "Piyasadaki açık" },
  { id: 4, title: "Çözüm & Ürün", desc: "Ürün ve özellikler" },
  { id: 5, title: "Pazar & İş Modeli", desc: "Pazar ve gelir" },
  { id: 6, title: "Çekiş & Doğrulama", desc: "Traction ve müşteri" },
  { id: 7, title: "Motivasyon & Uyum", desc: "Programa katılım" },
  { id: 8, title: "Belgeler & Gönder", desc: "Sunum ve dosyalar" }
];

interface CustomRadioProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

function CustomRadio({ label, checked, onChange }: CustomRadioProps) {
  return (
    <button 
      type="button"
      onClick={onChange}
      className={`flex items-center gap-3.5 p-4 rounded-xl border text-left w-full transition-all cursor-pointer mb-3.5 ${
        checked 
          ? "bg-secondary border-charcoal ring-1 ring-charcoal shadow-soft" 
          : "bg-background border-border/85 hover:bg-secondary/40"
      }`}
    >
      <div className="relative flex items-center justify-center shrink-0">
        <div className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center ${
          checked 
            ? "border-charcoal bg-charcoal/10" 
            : "border-charcoal/30 bg-background"
        }`}>
          {checked && (
            <div className="w-2.5 h-2.5 rounded-full bg-charcoal" />
          )}
        </div>
      </div>
      <span className={`text-xs md:text-sm transition-colors ${
        checked ? "text-charcoal font-bold" : "text-charcoal/80"
      }`}>
        {label}
      </span>
    </button>
  );
}

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStage, setSubmitStage] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refCode, setRefCode] = useState("");
  const [downloadSnapshot, setDownloadSnapshot] = useState<typeof INITIAL_FORM_DATA | null>(null);
  const [pitchDeckFile, setPitchDeckFile] = useState<File | null>(null);
  const [businessPlanFile, setBusinessPlanFile] = useState<File | null>(null);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setPitchDeckFile(null);
    setBusinessPlanFile(null);
    setErrors({});
    setCurrentStep(1);
  };

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Handle standard inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Handle Radio Inputs
  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Handle tags multi-select
  const handleTagToggle = (tag: string) => {
    setFormData(prev => {
      const isSelected = prev.tags.includes(tag);
      const nextTags = isSelected 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags: nextTags };
    });
  };

  // Mock File Uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'pitchDeck' | 'businessPlan') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Yalnızca PDF formatındaki belgeler kabul edilmektedir.");
        return;
      }
      const sizeStr = (file.size / (1024 * 1024)).toFixed(2) + " MB";
      setFormData(prev => ({
        ...prev,
        [`${fieldName}Name`]: file.name,
        [`${fieldName}Size`]: sizeStr
      }));
      if (fieldName === "pitchDeck") {
        setPitchDeckFile(file);
      } else {
        setBusinessPlanFile(file);
      }
      toast.success(`${file.name} başarıyla yüklendi.`);
      
      const fileErrorName = fieldName === 'pitchDeck' ? 'pitchDeckName' : 'businessPlanName';
      if (errors[fileErrorName]) {
        setErrors(prev => {
          const next = { ...prev };
          delete next[fileErrorName];
          return next;
        });
      }
    }
  };

  const removeFile = (fieldName: 'pitchDeck' | 'businessPlan') => {
    setFormData(prev => ({
      ...prev,
      [`${fieldName}Name`]: "",
      [`${fieldName}Size`]: ""
    }));
    if (fieldName === "pitchDeck") {
      setPitchDeckFile(null);
    } else {
      setBusinessPlanFile(null);
    }
  };

  // Validate fields for the active step
  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

    if (step === 1) {
      if (!formData.startupName) newErrors.startupName = "Girişim adı zorunludur.";
      if (!formData.city) newErrors.city = "Lütfen bir şehir seçin.";
      if (!formData.sector) newErrors.sector = "Faaliyet alanı / sektör alanı zorunludur.";
      if (!formData.stage) newErrors.stage = "Girişimin aşamasını seçmeniz gerekir.";
      if (!formData.isIncorporated) newErrors.isIncorporated = "Şirketleşme durumunu belirtin.";
    } 
    else if (step === 2) {
      if (!formData.founderName) newErrors.founderName = "Kurucu adı soyadı zorunludur.";
      if (!formData.email) {
        newErrors.email = "E-posta adresi zorunludur.";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Geçersiz e-posta formatı.";
      }
      if (!formData.phone) newErrors.phone = "Telefon numarası zorunludur.";
      if (!formData.linkedin) {
        newErrors.linkedin = "LinkedIn profil adresi zorunludur.";
      } else if (!formData.linkedin.startsWith("http")) {
        newErrors.linkedin = "Lütfen geçerli bir URL girin (http:// veya https:// ile başlayan).";
      }
      if (!formData.education) newErrors.education = "Eğitim geçmişi bilgisi zorunludur.";
      if (!formData.experience) newErrors.experience = "Profesyonel iş deneyimi zorunludur.";
      if (!formData.isFirstStartup) newErrors.isFirstStartup = "Bu alanı işaretlemeniz zorunludur.";
      if (!formData.weeklyHours) newErrors.weeklyHours = "Haftalık ayırabileceğiniz saati belirtin.";
    } 
    else if (step === 3) {
      if (!formData.problem) {
        newErrors.problem = "Hedeflenen problem tanımı zorunludur.";
      } else if (wordCount(formData.problem) > 300) {
        newErrors.problem = `Maksimum 300 kelime sınırını aştınız (Mevcut: ${wordCount(formData.problem)} kelime).`;
      }
      if (!formData.targetAudience) newErrors.targetAudience = "Hedef müşteri kitlesi zorunludur.";
      if (!formData.problemImportance) newErrors.problemImportance = "Bu alanın doldurulması zorunludur.";
      if (!formData.currentSolutions) newErrors.currentSolutions = "Bu alanın doldurulması zorunludur.";
    } 
    else if (step === 4) {
      if (!formData.solution) {
        newErrors.solution = "Çözüm açıklaması zorunludur.";
      } else if (wordCount(formData.solution) > 300) {
        newErrors.solution = `Maksimum 300 kelime sınırını aştınız (Mevcut: ${wordCount(formData.solution)} kelime).`;
      }
      if (!formData.differentiation) newErrors.differentiation = "Farklılıklar alanı zorunludur.";
      
      // Stage MVP condition
      if (formData.stage && formData.stage.includes("MVP")) {
        if (!formData.mvpFeatures) newErrors.mvpFeatures = "Lütfen MVP özelliklerinizi, kullanıcı ve gelir detaylarınızı girin.";
      } else if (formData.stage && formData.stage === "Fikir Aşaması") {
        if (!formData.mvpPlan) newErrors.mvpPlan = "Lütfen MVP geliştirme planınızı girin.";
      } else {
        if (!formData.mvpFeatures && !formData.mvpPlan) {
          newErrors.mvpFeatures = "Lütfen MVP özelliklerinizi veya MVP geliştirme planınızı yazın.";
        }
      }

      if (formData.tags.length === 0 && !formData.otherTag) {
        newErrors.tags = "En az bir etiket seçin veya diğer alanını doldurun.";
      }
    } 
    else if (step === 5) {
      if (!formData.targetMarket) newErrors.targetMarket = "Hedef pazar bilgisi zorunludur.";
      if (!formData.payingCustomer) newErrors.payingCustomer = "Ödeme yapan müşteri tanımı zorunludur.";
      if (!formData.revenueModel) newErrors.revenueModel = "Gelir modeli bilgisi zorunludur.";
      if (!formData.scalabilityReason) newErrors.scalabilityReason = "Ölçeklenebilirlik gerekçesi zorunludur.";
    } 
    else if (step === 6) {
      if (!formData.tractionMvp) newErrors.tractionMvp = "Mevcut müşteri/gelir durumu bilgisi zorunludur.";
      if (!formData.hasSpokenToCustomers) newErrors.hasSpokenToCustomers = "Bu alanın doldurulması zorunludur.";
      if (!formData.interviewCount) newErrors.interviewCount = "Görüşme sayısı zorunludur.";
      if (!formData.tractionMetrics) newErrors.tractionMetrics = "Erken aşama başarı göstergeleri bilgisi zorunludur.";
    } 
    else if (step === 7) {
      if (!formData.whyProgram) newErrors.whyProgram = "Programa katılım motivasyonunuz zorunludur.";
      if (!formData.expectations) newErrors.expectations = "Beklentileriniz zorunludur.";
      if (!formData.attendanceCommitment) newErrors.attendanceCommitment = "Taahhüt durumu belirtilmelidir.";
    } 
    else if (step === 8) {
      if (!pitchDeckFile) newErrors.pitchDeckName = "Pitch Deck (PDF) yüklenmesi zorunludur.";
      if (formData.demoUrl && !formData.demoUrl.startsWith("http")) {
        newErrors.demoUrl = "Lütfen geçerli bir URL girin.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 8) {
        setCurrentStep(prev => prev + 1);
      }
    } else {
      toast.error("Lütfen zorunlu alanları eksiksiz ve kurallara uygun doldurun.");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const uploadPdf = async (file: File): Promise<string> => {
    const path = `${crypto.randomUUID()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("basvuru-belgeler")
      .upload(path, file, { contentType: "application/pdf" });

    if (error) throw error;
    return data.path;
  };

  const buildEtiketler = (): string[] => {
    const etiketler = [...formData.tags];
    if (formData.otherTag.trim()) {
      etiketler.push(formData.otherTag.trim());
    }
    return etiketler;
  };

  const handleSubmit = async () => {
    if (!validateStep(8)) {
      toast.error("Lütfen zorunlu belgeleri yükleyin.");
      return;
    }
    if (!pitchDeckFile) {
      toast.error("Pitch Deck (PDF) yüklenmesi zorunludur.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStage(1);

    try {
      setSubmitStage(2);
      const pitchDeckPath = await uploadPdf(pitchDeckFile);

      let businessPlanPath: string | null = null;
      if (businessPlanFile) {
        businessPlanPath = await uploadPdf(businessPlanFile);
      }

      setSubmitStage(3);

      const { error } = await supabase
        .from("applications")
        .insert({
          girisim_adi: formData.startupName,
          sehir: formData.city,
          web_sitesi: formData.website || null,
          sektor: formData.sector,
          asama: formData.stage,
          sirketlesmis: toBool(formData.isIncorporated),
          kurucu_ad: formData.founderName,
          email: formData.email,
          telefon: formData.phone,
          linkedin: formData.linkedin,
          egitim: formData.education,
          is_deneyimi: formData.experience,
          ilk_girisim: toBool(formData.isFirstStartup),
          haftalik_saat: formData.weeklyHours,
          problem: formData.problem,
          hedef_musteri: formData.targetAudience,
          problem_onemi: formData.problemImportance,
          mevcut_cozum: formData.currentSolutions,
          cozum: formData.solution,
          farklilik: formData.differentiation,
          mvp_ozellikler: formData.mvpFeatures || null,
          mvp_plan: formData.mvpPlan || null,
          etiketler: buildEtiketler(),
          hedef_pazar: formData.targetMarket,
          pazar_buyuklugu: formData.marketSize || null,
          odeyen_musteri: formData.payingCustomer,
          gelir_modeli: formData.revenueModel,
          olceklenebilirlik: formData.scalabilityReason,
          mevcut_gelir: formData.tractionMvp,
          gorusme_yapildi: toBool(formData.hasSpokenToCustomers),
          gorusme_sayisi: Number(formData.interviewCount),
          basari_gostergeleri: formData.tractionMetrics,
          neden_katilmak: formData.whyProgram,
          beklenti: formData.expectations,
          taahhut: toBool(formData.attendanceCommitment),
          pitch_deck_path: pitchDeckPath,
          is_plani_path: businessPlanPath,
          demo_link: formData.demoUrl || null
        });

      if (error) throw error;

      const code = `SPK-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      setDownloadSnapshot({ ...formData });
      setRefCode(code);
      setIsSuccess(true);
      resetForm();
      toast.success("Başvurunuz başarıyla gönderildi!");
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error
          ? err.message
          : "Başvuru gönderilirken beklenmeyen bir hata oluştu.";
      toast.error(`Başvuru gönderilemedi: ${message}`);
    } finally {
      setIsSubmitting(false);
      setSubmitStage(0);
    }
  };

  // Download summary file utility
  const handleDownload = () => {
    const summary = downloadSnapshot ?? formData;
    const textContent = `===========================================================
               ARSLANTEPE SPARK HIZLANDIRMA PROGRAMI
                     BAŞVURU ÖZET BELGESİ
===========================================================
Referans Numarası: ${refCode}
Tarih: ${new Date().toLocaleDateString("tr-TR")}

BÖLÜM 1 — TEMEL BİLGİLER
-----------------------------------------------------------
Girişim / Proje Adı: ${summary.startupName}
Şehir: ${summary.city}
Web Sitesi: ${summary.website || "Belirtilmedi"}
Faaliyet Alanı / Sektör: ${summary.sector}
Girişim Aşaması: ${summary.stage}
Yasal Şirketleşme Durumu: ${summary.isIncorporated}

BÖLÜM 2 — KURUCU BİLGİLERİ
-----------------------------------------------------------
Kurucu(lar) Adı Soyadı: ${summary.founderName}
E-posta: ${summary.email}
Telefon: ${summary.phone}
LinkedIn Profili: ${summary.linkedin}
Eğitim Geçmişi: ${summary.education}
Profesyonel İş Deneyimi: ${summary.experience}
İlk Girişim mi?: ${summary.isFirstStartup}
Haftalık Ayrılacak Süre (Saat): ${summary.weeklyHours}

BÖLÜM 3 — PROBLEM VE FIRSAT
-----------------------------------------------------------
Hedeflenen Problem: ${summary.problem}
Hedef Müşteri Kitlesi: ${summary.targetAudience}
Problemin Önemi: ${summary.problemImportance}
Mevcut Çözüm Yöntemleri: ${summary.currentSolutions}

BÖLÜM 4 — ÇÖZÜM VE ÜRÜN
-----------------------------------------------------------
Çözüm Açıklaması: ${summary.solution}
Mevcut Alternatiflerden Farkı: ${summary.differentiation}
MVP Özellikleri (Varsa): ${summary.mvpFeatures || "Belirtilmedi"}
MVP Geliştirme Planı (Yoksa): ${summary.mvpPlan || "Belirtilmedi"}
Etiketler: ${[...summary.tags, summary.otherTag].filter(Boolean).join(", ")}

BÖLÜM 5 — PAZAR VE İŞ MODELİ
-----------------------------------------------------------
Hedef Pazar (Ülke / Bölge): ${summary.targetMarket}
Tahmini Pazar Büyüklüğü: ${summary.marketSize || "Belirtilmedi"}
Ücret Ödeyen Müşteri: ${summary.payingCustomer}
Gelir Modeli: ${summary.revenueModel}
Ölçeklenebilirlik Nedeni: ${summary.scalabilityReason}

BÖLÜM 6 — ÇEKİŞ (TRACTION) VE DOĞRULAMA
-----------------------------------------------------------
Mevcut Müşteri ve Gelir: ${summary.tractionMvp}
Müşterilerle Görüşüldü mü?: ${summary.hasSpokenToCustomers}
Görüşme Sayısı: ${summary.interviewCount}
Erken Aşama Başarı Göstergeleri: ${summary.tractionMetrics}

BÖLÜM 7 — MOTİVASYON VE UYGUNLUK
-----------------------------------------------------------
Programa Katılım Nedeni: ${summary.whyProgram}
Programdan Beklentiler: ${summary.expectations}
Katılım Taahhütü: ${summary.attendanceCommitment}

BÖLÜM 8 — YÜKLENECEK BELGELER
-----------------------------------------------------------
Pitch Deck Dosyası: ${summary.pitchDeckName} (${summary.pitchDeckSize})
İş Planı Dosyası: ${summary.businessPlanName || "Yüklenmedi"}
Ürün Demo Bağlantısı: ${summary.demoUrl || "Belirtilmedi"}

-----------------------------------------------------------
Arslantepe Spark ekibi başvurunuzu değerlendirip 7 iş günü
içerisinde sizinle iletişime geçecektir. Başvurunuz için teşekkürler!
===========================================================`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Arslantepe_Spark_Basvuru_${summary.startupName.replace(/\s+/g, "_")}_${refCode}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Başvuru özeti başarıyla indirildi.");
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col selection:bg-bronze/20 selection:text-bronze">
      {/* Decorative hittite background texture overlay */}
      <div className="absolute inset-0 filigree-bg pointer-events-none z-0" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-ivory/80 backdrop-blur-md border-b border-border shadow-soft">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Arslantepe Spark" className="w-10 h-10 md:w-12 md:h-12 object-contain" width={48} height={48} />
            <span className="font-display text-base md:text-lg font-semibold tracking-tight text-bronze whitespace-nowrap">
              Arslantepe Spark
            </span>
          </Link>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-charcoal/70 hover:text-bronze transition-colors px-3 py-1.5 rounded-full hover:bg-charcoal/5"
          >
            <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
          </Link>
        </div>
      </header>

      {/* Main Body */}
      <div className="container relative z-10 flex-1 py-8 md:py-12 max-w-6xl">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            /* Success Screen Card */
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="max-w-2xl mx-auto bg-card border border-border rounded-3xl p-8 md:p-12 shadow-elegant text-center relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-bronze" />
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-bronze/10 rounded-full flex items-center justify-center text-bronze border border-bronze/20 shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
              </div>
              <span className="eyebrow mb-3">Tebrikler</span>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal font-semibold mb-4 leading-tight">
                Başvurunuz Başarıyla Alındı!
              </h2>
              <p className="text-charcoal/75 text-sm md:text-base max-w-md mx-auto mb-8">
                Arslantepe Spark Startup Hızlandırma Programı'na gösterdiğiniz ilgi için teşekkür ederiz. Başvurunuz ön değerlendirme sürecine alınmıştır.
              </p>

              {/* Reference Box */}
              <div className="bg-secondary/70 border border-border rounded-2xl p-6 mb-8 inline-block w-full max-w-md">
                <span className="text-xs uppercase tracking-wider text-charcoal/50 block mb-1">
                  Başvuru Referans Kodu
                </span>
                <span className="font-display text-2xl font-bold tracking-widest text-bronze">
                  {refCode}
                </span>
                <p className="text-xs text-charcoal/60 mt-2">
                  Lütfen bu kodu ilerideki yazışmalar için not edin.
                </p>
              </div>

              {/* Next Steps */}
              <div className="text-left bg-secondary/30 rounded-2xl p-6 border border-border/50 max-w-md mx-auto mb-10 text-xs md:text-sm text-charcoal/80 space-y-2">
                <h4 className="font-semibold text-charcoal mb-2">Süreç Nasıl İlerleyecek?</h4>
                <p>1. Başvurunuz uzman kurul tarafından değerlendirilecektir.</p>
                <p>2. Uygun görülen girişimler mülakat aşamasına davet edilecektir.</p>
                <p>3. Gelişmeler ve sonuçlar kurucu e-posta adresine bildirilecektir.</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-charcoal font-medium rounded-full px-6 py-3 border border-border transition-colors text-sm"
                >
                  <Download className="w-4 h-4" /> Başvuru Özetini İndir (.txt)
                </button>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-charcoal/90 text-ivory font-medium rounded-full px-6 py-3 transition-colors text-sm shadow-soft"
                >
                  <Home className="w-4 h-4" /> Ana Sayfaya Dön
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Multi-step Form Content */
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Side: Desktop Sidebar Navigation */}
              <aside className="hidden lg:block lg:col-span-4 sticky top-28 bg-card border border-border rounded-2xl p-5 shadow-soft">
                <div className="mb-4 pb-4 border-b border-border/80">
                  <h3 className="font-display font-semibold text-charcoal text-base">Başvuru Bölümleri</h3>
                  <p className="text-xs text-charcoal/50 mt-0.5">Arslantepe Spark Hızlandırma Formu</p>
                </div>
                <nav className="space-y-1">
                  {STEPS.map((s) => {
                    const isActive = s.id === currentStep;
                    const isCompleted = s.id < currentStep;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          if (s.id < currentStep || validateStep(currentStep)) {
                            setCurrentStep(s.id);
                          }
                        }}
                        className={`w-full flex items-center gap-3.5 p-3 rounded-xl text-left transition-all ${
                          isActive 
                            ? "bg-secondary text-charcoal font-medium border border-border" 
                            : "hover:bg-charcoal/5 text-charcoal/60"
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border shrink-0 transition-all ${
                          isCompleted
                            ? "bg-bronze border-bronze text-ivory"
                            : isActive
                              ? "bg-charcoal border-charcoal text-ivory"
                              : "bg-background border-border text-charcoal/70"
                        }`}>
                          {isCompleted ? <Check className="w-4 h-4" strokeWidth={2.5} /> : s.id}
                        </div>
                        <div>
                          <p className={`text-xs font-semibold uppercase tracking-wider ${isActive ? "text-bronze" : "text-charcoal/70"}`}>
                            {s.title}
                          </p>
                          <p className="text-[10px] text-charcoal/40 font-normal leading-none mt-0.5">
                            {s.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </aside>

              {/* Right Side: Step Card Panel */}
              <div className="lg:col-span-8 space-y-6">
                {/* Mobile Step Indicator Header */}
                <div className="lg:hidden bg-card border border-border rounded-xl p-4 shadow-soft">
                  <div className="flex items-center justify-between text-xs text-charcoal/60 mb-2">
                    <span className="font-medium text-bronze uppercase tracking-wider">
                      Adım {currentStep} / 8: {STEPS[currentStep - 1].title}
                    </span>
                    <span className="font-semibold">{Math.round((currentStep / 8) * 100)}% Tamamlandı</span>
                  </div>
                  {/* Progress Line */}
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-bronze transition-all duration-300"
                      style={{ width: `${(currentStep / 8) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Form Card Content */}
                <form onSubmit={(e) => e.preventDefault()} className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-elegant space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-bronze" />

                  {/* Animation for stepping */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div>
                        <span className="eyebrow mb-1">BÖLÜM {currentStep}</span>
                        <h2 className="font-display text-2xl md:text-3xl text-charcoal font-semibold tracking-tight">
                          {STEPS[currentStep - 1].title}
                        </h2>
                        <p className="text-xs md:text-sm text-charcoal/60 mt-1">
                          Lütfen bu bölüme ait istenen tüm alanları eksiksiz bir şekilde doldurun.
                        </p>
                      </div>

                      <hr className="border-border/80 mt-1 mb-14" />

                      {/* --- STEP 1: Temel Bilgiler --- */}
                      {currentStep === 1 && (
                        <div className="grid md:grid-cols-2 gap-5">
                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="startupName">
                              1. Girişim / Proje Adı *
                            </label>
                            <input
                              type="text"
                              id="startupName"
                              name="startupName"
                              value={formData.startupName}
                              onChange={handleChange}
                              placeholder="Örn. Spark Tech"
                              className={`w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all ${
                                errors.startupName ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.startupName && <p className="text-[11px] text-destructive mt-1.5">{errors.startupName}</p>}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="city">
                              2. Şehir *
                            </label>
                            <select
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              className={`w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all ${
                                errors.city ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            >
                              <option value="">Lütfen şehir seçin</option>
                              {TURKISH_CITIES.map(c => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                            {errors.city && <p className="text-[11px] text-destructive mt-1.5">{errors.city}</p>}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="website">
                              3. Web Sitesi (Varsa)
                            </label>
                            <input
                              type="text"
                              id="website"
                              name="website"
                              value={formData.website}
                              onChange={handleChange}
                              placeholder="https://girişiminiz.com"
                              className="w-full h-11 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="sector">
                              4. Faaliyet Alanı / Sektör *
                            </label>
                            <input
                              type="text"
                              id="sector"
                              name="sector"
                              value={formData.sector}
                              onChange={handleChange}
                              placeholder="Örn. Akıllı Tarım, E-ticaret Lojistiği vb."
                              className={`w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all ${
                                errors.sector ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.sector && <p className="text-[11px] text-destructive mt-1.5">{errors.sector}</p>}
                          </div>

                          <div className="md:col-span-2">
                            <span className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-3">
                              5. Girişimin Aşaması *
                            </span>
                            <div className="flex flex-col gap-3.5">
                              {[
                                "Fikir Aşaması",
                                "MVP Öncesi (Pre-MVP)",
                                "MVP Hazır",
                                "1-5 Ödeyen Müşteri Var",
                                "5+ Ödeyen Müşteri Var"
                              ].map(opt => (
                                <CustomRadio
                                  key={opt}
                                  label={opt}
                                  checked={formData.stage === opt}
                                  onChange={() => handleRadioChange("stage", opt)}
                                />
                              ))}
                            </div>
                            {errors.stage && <p className="text-[11px] text-destructive mt-1.5">{errors.stage}</p>}
                          </div>

                          <div className="md:col-span-2">
                            <span className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-3">
                              6. Girişiminiz yasal olarak şirketleşmiş durumda mı? *
                            </span>
                            <div className="grid grid-cols-2 gap-4">
                              {["Evet", "Hayır"].map(opt => (
                                <CustomRadio
                                  key={opt}
                                  label={opt}
                                  checked={formData.isIncorporated === opt}
                                  onChange={() => handleRadioChange("isIncorporated", opt)}
                                />
                              ))}
                            </div>
                            {errors.isIncorporated && <p className="text-[11px] text-destructive mt-1.5">{errors.isIncorporated}</p>}
                          </div>

                          <div className="md:col-span-2 bg-secondary/50 p-4 rounded-2xl border border-border/50 text-[11px] md:text-xs text-charcoal/70 flex items-start gap-2.5">
                            <AlertCircle className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                            <p>
                              <strong>Not:</strong> Bu lokasyon bilgisi eğitimler ve ara değerlendirmeler için kullanılacaktır. Büyük Demo Day etkinliği ise program bitiminde Malatya'da gerçekleştirilecektir.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* --- STEP 2: Kurucu Bilgileri --- */}
                      {currentStep === 2 && (
                        <div className="grid md:grid-cols-2 gap-5">
                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="founderName">
                              1. Kurucu(lar)ın Adı Soyadı *
                            </label>
                            <input
                              type="text"
                              id="founderName"
                              name="founderName"
                              value={formData.founderName}
                              onChange={handleChange}
                              placeholder="Örn. Ahmet Yılmaz, Ayşe Kaya"
                              className={`w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all ${
                                errors.founderName ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.founderName && <p className="text-[11px] text-destructive mt-1.5">{errors.founderName}</p>}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="email">
                              2. E-posta Adresi *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="ornek@alanadi.com"
                              className={`w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all ${
                                errors.email ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.email && <p className="text-[11px] text-destructive mt-1.5">{errors.email}</p>}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="phone">
                              3. Telefon Numarası *
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="Örn. +90 (555) 123 45 67"
                              className={`w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all ${
                                errors.phone ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.phone && <p className="text-[11px] text-destructive mt-1.5">{errors.phone}</p>}
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="linkedin">
                              4. LinkedIn Profili *
                            </label>
                            <input
                              type="text"
                              id="linkedin"
                              name="linkedin"
                              value={formData.linkedin}
                              onChange={handleChange}
                              placeholder="https://linkedin.com/in/kullanıcıadı"
                              className={`w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all ${
                                errors.linkedin ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.linkedin && <p className="text-[11px] text-destructive mt-1.5">{errors.linkedin}</p>}
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="education">
                              5. Eğitim Geçmişi *
                            </label>
                            <textarea
                              id="education"
                              name="education"
                              rows={3}
                              value={formData.education}
                              onChange={handleChange}
                              placeholder="Örn. Üniversite adı, bölüm ve mezuniyet yılı"
                              className={`w-full p-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-y ${
                                errors.education ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.education && <p className="text-[11px] text-destructive mt-1.5">{errors.education}</p>}
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="experience">
                              6. Profesyonel İş Deneyimi *
                            </label>
                            <textarea
                              id="experience"
                              name="experience"
                              rows={3}
                              value={formData.experience}
                              onChange={handleChange}
                              placeholder="Önceki şirketler, unvanlar ve edindiğiniz tecrübeleri kısaca açıklayın."
                              className={`w-full p-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-y ${
                                errors.experience ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.experience && <p className="text-[11px] text-destructive mt-1.5">{errors.experience}</p>}
                          </div>

                          <div className="md:col-span-2">
                            <span className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-3">
                              7. Bu ilk girişiminiz mi? *
                            </span>
                            <div className="grid grid-cols-2 gap-4">
                              {["Evet", "Hayır"].map(opt => (
                                <CustomRadio
                                  key={opt}
                                  label={opt}
                                  checked={formData.isFirstStartup === opt}
                                  onChange={() => handleRadioChange("isFirstStartup", opt)}
                                />
                              ))}
                            </div>
                            {errors.isFirstStartup && <p className="text-[11px] text-destructive mt-1.5">{errors.isFirstStartup}</p>}
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="weeklyHours">
                              8. Haftada bu girişime kaç saat ayırabilirsiniz? *
                            </label>
                            <input
                              type="text"
                              id="weeklyHours"
                              name="weeklyHours"
                              value={formData.weeklyHours}
                              onChange={handleChange}
                              placeholder="Örn. 40+ saat, tam zamanlı vb."
                              className={`w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all ${
                                errors.weeklyHours ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.weeklyHours && <p className="text-[11px] text-destructive mt-1.5">{errors.weeklyHours}</p>}
                          </div>
                        </div>
                      )}

                      {/* --- STEP 3: Problem ve Fırsat --- */}
                      {currentStep === 3 && (
                        <div className="space-y-5">
                          <div>
                            <div className="flex justify-between items-baseline mb-2">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80" htmlFor="problem">
                                1. Çözmeyi hedeflediğiniz gerçek problem nedir? *
                              </label>
                              <span className={`text-[10px] ${getWordCount(formData.problem) > 300 ? "text-destructive font-bold" : "text-charcoal/40"}`}>
                                {getWordCount(formData.problem)} / 300 kelime
                              </span>
                            </div>
                            <textarea
                              id="problem"
                              name="problem"
                              rows={5}
                              value={formData.problem}
                              onChange={handleChange}
                              placeholder="Müşterinizin yaşadığı en can yakıcı problemi anlatın..."
                              className={`w-full p-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-y ${
                                errors.problem ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.problem && <p className="text-[11px] text-destructive mt-1">{errors.problem}</p>}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="targetAudience">
                              2. Bu problemi kim yaşıyor? (Hedef müşteri kitlesi) *
                            </label>
                            <textarea
                              id="targetAudience"
                              name="targetAudience"
                              rows={3}
                              value={formData.targetAudience}
                              onChange={handleChange}
                              placeholder="Örn. Kobiler, SaaS geliştiricileri, dijital ajanslar vb."
                              className={`w-full p-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-y ${
                                errors.targetAudience ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.targetAudience && <p className="text-[11px] text-destructive mt-1">{errors.targetAudience}</p>}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="problemImportance">
                              3. Bu problem neden önemli, acil veya can yakıcı? *
                            </label>
                            <textarea
                              id="problemImportance"
                              name="problemImportance"
                              rows={3}
                              value={formData.problemImportance}
                              onChange={handleChange}
                              placeholder="Problem çözülmediğinde ortaya çıkan kayıp, verimsizlik veya zorluklar neler?"
                              className={`w-full p-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-y ${
                                errors.problemImportance ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.problemImportance && <p className="text-[11px] text-destructive mt-1">{errors.problemImportance}</p>}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="currentSolutions">
                              4. Müşteriler bu problemi bugün nasıl çözüyor? *
                            </label>
                            <textarea
                              id="currentSolutions"
                              name="currentSolutions"
                              rows={3}
                              value={formData.currentSolutions}
                              onChange={handleChange}
                              placeholder="Mevcut geçici çözümler, rakip servisler veya manuel yöntemler nelerdir?"
                              className={`w-full p-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-y ${
                                errors.currentSolutions ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.currentSolutions && <p className="text-[11px] text-destructive mt-1">{errors.currentSolutions}</p>}
                          </div>
                        </div>
                      )}

                      {/* --- STEP 4: Çözüm ve Ürün --- */}
                      {currentStep === 4 && (
                        <div className="space-y-5">
                          <div>
                            <div className="flex justify-between items-baseline mb-2">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80" htmlFor="solution">
                                1. Çözümünüzü açıklayın. *
                              </label>
                              <span className={`text-[10px] ${getWordCount(formData.solution) > 300 ? "text-destructive font-bold" : "text-charcoal/40"}`}>
                                {getWordCount(formData.solution)} / 300 kelime
                              </span>
                            </div>
                            <textarea
                              id="solution"
                              name="solution"
                              rows={5}
                              value={formData.solution}
                              onChange={handleChange}
                              placeholder="Nasıl bir teknoloji, ürün veya servis sunuyorsunuz?"
                              className={`w-full p-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-y ${
                                errors.solution ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.solution && <p className="text-[11px] text-destructive mt-1">{errors.solution}</p>}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="differentiation">
                              2. Çözümünüzü mevcut alternatiflerden farklı kılan nedir? *
                            </label>
                            <textarea
                              id="differentiation"
                              name="differentiation"
                              rows={3}
                              value={formData.differentiation}
                              onChange={handleChange}
                              placeholder="Rakiplere kıyasla en belirgin rekabetçi üstünlüğünüz nedir?"
                              className={`w-full p-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-y ${
                                errors.differentiation ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.differentiation && <p className="text-[11px] text-destructive mt-1">{errors.differentiation}</p>}
                          </div>

                          {/* Conditional Fields based on Stage */}
                          {(!formData.stage || formData.stage !== "Fikir Aşaması") && (
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="mvpFeatures">
                                3. MVP (Minimum Uygulanabilir Ürün) Özellikleri *
                              </label>
                              <textarea
                                id="mvpFeatures"
                                name="mvpFeatures"
                                rows={3}
                                value={formData.mvpFeatures}
                                onChange={handleChange}
                                placeholder="Ürününüzün mevcut temel özelliklerini, kullanıcı sayısını ve varsa mevcut gelirleri girin."
                                className={`w-full p-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-y ${
                                  errors.mvpFeatures ? "border-destructive focus:ring-destructive" : "border-input"
                                }`}
                              />
                              {errors.mvpFeatures && <p className="text-[11px] text-destructive mt-1">{errors.mvpFeatures}</p>}
                            </div>
                          )}

                          {(formData.stage === "Fikir Aşaması") && (
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="mvpPlan">
                                4. MVP Geliştirme Planı *
                              </label>
                              <textarea
                                id="mvpPlan"
                                name="mvpPlan"
                                rows={3}
                                value={formData.mvpPlan}
                                onChange={handleChange}
                                placeholder="Ürününüzün ilk sürümünü (MVP) ne kadar sürede ve nasıl geliştirmeyi hedefliyorsunuz?"
                                className={`w-full p-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-y ${
                                  errors.mvpPlan ? "border-destructive focus:ring-destructive" : "border-input"
                                }`}
                              />
                              {errors.mvpPlan && <p className="text-[11px] text-destructive mt-1">{errors.mvpPlan}</p>}
                            </div>
                          )}

                          <div>
                            <span className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-3">
                              5. Girişiminizi Etiketleyin (En az bir adet) *
                            </span>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {SECTORS_TAGS.map(tag => {
                                const isSelected = formData.tags.includes(tag);
                                return (
                                  <button
                                    key={tag}
                                    type="button"
                                    onClick={() => handleTagToggle(tag)}
                                    className={`px-3 py-2 rounded-full text-xs font-medium border transition-all ${
                                      isSelected
                                        ? "bg-bronze border-bronze text-ivory shadow-soft"
                                        : "bg-background border-border text-charcoal/70 hover:bg-secondary/50"
                                    }`}
                                  >
                                    {tag}
                                  </button>
                                );
                              })}
                            </div>
                            <input
                              type="text"
                              name="otherTag"
                              value={formData.otherTag}
                              onChange={handleChange}
                              placeholder="Diğer etiket veya belirtmek istediğiniz sektörler"
                              className="w-full h-11 px-4 rounded-xl border border-input bg-background text-xs focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                            />
                            {errors.tags && <p className="text-[11px] text-destructive mt-1.5">{errors.tags}</p>}
                          </div>
                        </div>
                      )}

                      {/* --- STEP 5: Pazar ve İş Modeli --- */}
                      {currentStep === 5 && (
                        <div className="grid md:grid-cols-2 gap-5">
                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="targetMarket">
                              1. Hedef pazarınız (Ülke / Bölge) *
                            </label>
                            <input
                              type="text"
                              id="targetMarket"
                              name="targetMarket"
                              value={formData.targetMarket}
                              onChange={handleChange}
                              placeholder="Örn. Türkiye pazarı, MENA Bölgesi, küresel pazar vb."
                              className={`w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all ${
                                errors.targetMarket ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.targetMarket && <p className="text-[11px] text-destructive mt-1.5">{errors.targetMarket}</p>}
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="marketSize">
                              2. Tahmini pazar büyüklüğü (Biliyorsanız)
                            </label>
                            <input
                              type="text"
                              id="marketSize"
                              name="marketSize"
                              value={formData.marketSize}
                              onChange={handleChange}
                              placeholder="Örn. Yıllık 500M TL, 50M USD TAM vb."
                              className="w-full h-11 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="payingCustomer">
                              3. Ücret ödeyen müşteri kimdir? *
                            </label>
                            <textarea
                              id="payingCustomer"
                              name="payingCustomer"
                              rows={3}
                              value={formData.payingCustomer}
                              onChange={handleChange}
                              placeholder="Satın alma kararını veren ve faturayı ödeyen nihai kitleyi tarif edin."
                              className={`w-full p-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-y ${
                                errors.payingCustomer ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.payingCustomer && <p className="text-[11px] text-destructive mt-1">{errors.payingCustomer}</p>}
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="revenueModel">
                              4. Gelir modeliniz nedir? *
                            </label>
                            <textarea
                              id="revenueModel"
                              name="revenueModel"
                              rows={3}
                              value={formData.revenueModel}
                              onChange={handleChange}
                              placeholder="Abonelik, komisyon, SaaS, tek seferlik lisans vb. modellerini açıklayın."
                              className={`w-full p-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-y ${
                                errors.revenueModel ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.revenueModel && <p className="text-[11px] text-destructive mt-1">{errors.revenueModel}</p>}
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="scalabilityReason">
                              5. Bu girişimin ölçeklenebilir olacağını neden düşünüyorsunuz? *
                            </label>
                            <textarea
                              id="scalabilityReason"
                              name="scalabilityReason"
                              rows={3}
                              value={formData.scalabilityReason}
                              onChange={handleChange}
                              placeholder="Girişiminizin teknolojik alt yapısı veya iş modeli doğrultusunda hızlı büyüme yeteneğini anlatın."
                              className={`w-full p-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-y ${
                                errors.scalabilityReason ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.scalabilityReason && <p className="text-[11px] text-destructive mt-1">{errors.scalabilityReason}</p>}
                          </div>
                        </div>
                      )}

                      {/* --- STEP 6: Çekiş ve Doğrulama --- */}
                      {currentStep === 6 && (
                        <div className="space-y-5">
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="tractionMvp">
                              1. Mevcut müşterileriniz ve geliriniz var mı? *
                            </label>
                            <textarea
                              id="tractionMvp"
                              name="tractionMvp"
                              rows={3}
                              value={formData.tractionMvp}
                              onChange={handleChange}
                              placeholder="Mevcut ise aylık/yıllık kullanıcı, üye ve gelir rakamlarını girin. Yoksa yok olarak belirtin."
                              className={`w-full p-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-y ${
                                errors.tractionMvp ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.tractionMvp && <p className="text-[11px] text-destructive mt-1">{errors.tractionMvp}</p>}
                          </div>

                          <div>
                            <span className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-3">
                              2. Potansiyel müşterilerle görüştünüz mü? *
                            </span>
                            <div className="grid grid-cols-2 gap-4">
                              {["Evet", "Hayır"].map(opt => (
                                <CustomRadio
                                  key={opt}
                                  label={opt}
                                  checked={formData.hasSpokenToCustomers === opt}
                                  onChange={() => handleRadioChange("hasSpokenToCustomers", opt)}
                                />
                              ))}
                            </div>
                            {errors.hasSpokenToCustomers && <p className="text-[11px] text-destructive mt-1.5">{errors.hasSpokenToCustomers}</p>}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="interviewCount">
                              3. Gerçekleştirdiğiniz müşteri görüşmesi sayısı *
                            </label>
                            <input
                              type="number"
                              id="interviewCount"
                              name="interviewCount"
                              min="0"
                              value={formData.interviewCount}
                              onChange={handleChange}
                              placeholder="Görüştüğünüz kişi veya kurum sayısı"
                              className={`w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all ${
                                errors.interviewCount ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.interviewCount && <p className="text-[11px] text-destructive mt-1.5">{errors.interviewCount}</p>}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="tractionMetrics">
                              4. Erken aşama başarı göstergeleriniz nelerdir? *
                            </label>
                            <textarea
                              id="tractionMetrics"
                              name="tractionMetrics"
                              rows={4}
                              value={formData.tractionMetrics}
                              onChange={handleChange}
                              placeholder="Aktif kullanıcılar, iş ortaklıkları, LOI (Niyet Mektubu), pilot projeler vb. varsa detaylandırın."
                              className={`w-full p-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-y ${
                                errors.tractionMetrics ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.tractionMetrics && <p className="text-[11px] text-destructive mt-1">{errors.tractionMetrics}</p>}
                          </div>
                        </div>
                      )}

                      {/* --- STEP 7: Motivasyon ve Programa Uygunluk --- */}
                      {currentStep === 7 && (
                        <div className="space-y-5">
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="whyProgram">
                              1. Arslantepe Spark programına neden katılmak istiyorsunuz? *
                            </label>
                            <textarea
                              id="whyProgram"
                              name="whyProgram"
                              rows={4}
                              value={formData.whyProgram}
                              onChange={handleChange}
                              placeholder="Bu programın girişiminize katacağı katma değer ne olacaktır?"
                              className={`w-full p-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-y ${
                                errors.whyProgram ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.whyProgram && <p className="text-[11px] text-destructive mt-1">{errors.whyProgram}</p>}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="expectations">
                              2. Programdan ne kazanmayı bekliyorsunuz? *
                            </label>
                            <textarea
                              id="expectations"
                              name="expectations"
                              rows={4}
                              value={formData.expectations}
                              onChange={handleChange}
                              placeholder="Mentorluk, eğitim, yatırımcı ağları, iş birliği fırsatları vb. beklentileriniz..."
                              className={`w-full p-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-y ${
                                errors.expectations ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.expectations && <p className="text-[11px] text-destructive mt-1">{errors.expectations}</p>}
                          </div>

                          <div>
                            <span className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-3">
                              3. Tüm Bootcamp oturumlarına ve Demo Day etkinliğine katılmayı taahhüt ediyor musunuz? *
                            </span>
                            <div className="grid grid-cols-2 gap-4">
                              {["Evet", "Hayır"].map(opt => (
                                <CustomRadio
                                  key={opt}
                                  label={opt}
                                  checked={formData.attendanceCommitment === opt}
                                  onChange={() => handleRadioChange("attendanceCommitment", opt)}
                                />
                              ))}
                            </div>
                            {errors.attendanceCommitment && <p className="text-[11px] text-destructive mt-1.5">{errors.attendanceCommitment}</p>}
                          </div>
                        </div>
                      )}

                      {/* --- STEP 8: Belgeler ve Gönderim --- */}
                      {currentStep === 8 && (
                        <div className="space-y-6">
                          {/* Pitch Deck Upload Zone */}
                          <div>
                            <span className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
                              1. Pitch Deck (Yatırımcı Sunumu) *
                            </span>
                            <p className="text-xs text-charcoal/50 mb-3">Yalnızca PDF dosyası kabul edilmektedir.</p>
                            
                            {formData.pitchDeckName ? (
                              <div className="flex items-center justify-between p-4 rounded-xl border border-bronze/30 bg-bronze/5">
                                <div className="flex items-center gap-3">
                                  <FileText className="w-8 h-8 text-bronze shrink-0" />
                                  <div>
                                    <p className="text-xs md:text-sm font-medium text-charcoal truncate max-w-[200px] sm:max-w-xs">{formData.pitchDeckName}</p>
                                    <p className="text-[10px] text-charcoal/50">{formData.pitchDeckSize}</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile("pitchDeck")}
                                  className="p-2 text-charcoal/40 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                                  title="Dosyayı Kaldır"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-bronze/50 rounded-2xl p-8 bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer text-center">
                                <input
                                  type="file"
                                  accept=".pdf"
                                  onChange={(e) => handleFileUpload(e, "pitchDeck")}
                                  className="hidden"
                                />
                                <UploadCloud className="w-10 h-10 text-charcoal/30 mb-3" />
                                <span className="text-xs font-semibold text-charcoal hover:underline">Dosya Seçmek İçin Tıklayın</span>
                                <span className="text-[10px] text-charcoal/40 mt-1">PDF (Maks. 20MB)</span>
                              </label>
                            )}
                            {errors.pitchDeckName && <p className="text-[11px] text-destructive mt-1.5">{errors.pitchDeckName}</p>}
                          </div>

                          {/* Business Plan Upload Zone */}
                          <div>
                            <span className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
                              2. İş Planı (Opsiyonel)
                            </span>
                            <p className="text-xs text-charcoal/50 mb-3">Fikir aşamasındaki girişimler için isteğe bağlıdır. Yalnızca PDF.</p>
                            
                            {formData.businessPlanName ? (
                              <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/40">
                                <div className="flex items-center gap-3">
                                  <FileText className="w-8 h-8 text-charcoal/40 shrink-0" />
                                  <div>
                                    <p className="text-xs md:text-sm font-medium text-charcoal truncate max-w-[200px] sm:max-w-xs">{formData.businessPlanName}</p>
                                    <p className="text-[10px] text-charcoal/50">{formData.businessPlanSize}</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile("businessPlan")}
                                  className="p-2 text-charcoal/40 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                                  title="Dosyayı Kaldır"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-bronze/50 rounded-2xl p-8 bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer text-center">
                                <input
                                  type="file"
                                  accept=".pdf"
                                  onChange={(e) => handleFileUpload(e, "businessPlan")}
                                  className="hidden"
                                />
                                <UploadCloud className="w-10 h-10 text-charcoal/30 mb-3" />
                                <span className="text-xs font-semibold text-charcoal hover:underline">Dosya Seçmek İçin Tıklayın</span>
                                <span className="text-[10px] text-charcoal/40 mt-1">PDF (Maks. 20MB)</span>
                              </label>
                            )}
                          </div>

                          {/* Demo URL */}
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2" htmlFor="demoUrl">
                              3. Ürün Demo Bağlantısı (Varsa)
                            </label>
                            <input
                              type="text"
                              id="demoUrl"
                              name="demoUrl"
                              value={formData.demoUrl}
                              onChange={handleChange}
                              placeholder="https://demo.girişiminiz.com veya youtube linki"
                              className={`w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all ${
                                errors.demoUrl ? "border-destructive focus:ring-destructive" : "border-input"
                              }`}
                            />
                            {errors.demoUrl && <p className="text-[11px] text-destructive mt-1.5">{errors.demoUrl}</p>}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <hr className="border-border/85 mt-8 mb-6" />

                  {/* Wizard control buttons */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={currentStep === 1}
                      className={`inline-flex items-center gap-2 text-xs md:text-sm font-medium rounded-full px-5 py-2.5 transition-all ${
                        currentStep === 1
                          ? "opacity-35 cursor-not-allowed text-charcoal/50 bg-secondary"
                          : "text-charcoal bg-secondary hover:bg-secondary/80 border border-border"
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4" /> Geri
                    </button>

                    {currentStep < 8 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold bg-charcoal hover:bg-charcoal/90 text-ivory rounded-full px-6 py-2.5 transition-all shadow-soft"
                      >
                        Devam Et <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 text-xs md:text-sm font-bold bg-gradient-bronze text-charcoal hover:shadow-bronze hover:opacity-95 rounded-full px-7 py-3 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Başvuruyu Tamamla <Sparkles className="w-4.5 h-4.5 text-charcoal" />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="bg-secondary/40 border-t border-border/80 py-6 text-center text-xs text-charcoal/50 mt-12 relative z-10">
        <div className="container">
          <p>© 2026 Arslantepe Spark Startup Hızlandırma Programı. Tüm hakları saklıdır.</p>
        </div>
      </footer>

      {/* Sequential loader overlay during submit */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-card border border-border rounded-3xl p-8 max-w-sm w-full text-center shadow-elegant space-y-6">
              <div className="flex justify-center">
                <Loader2 className="w-12 h-12 text-bronze animate-spin" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-semibold text-charcoal text-lg">Başvuru Gönderiliyor</h3>
                <p className="text-xs text-charcoal/50">Lütfen tarayıcınızı kapatmayın.</p>
              </div>
              
              {/* Submission Stages Indicator */}
              <div className="text-left space-y-3 bg-secondary/50 rounded-2xl p-4 border border-border/60 text-xs">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${submitStage >= 1 ? "bg-bronze text-ivory" : "bg-border text-charcoal/30"}`}>
                    {submitStage > 1 ? <Check className="w-2.5 h-2.5" /> : "1"}
                  </div>
                  <span className={`${submitStage >= 1 ? "text-charcoal font-medium" : "text-charcoal/40"}`}>Girişim verileri hazırlanıyor...</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${submitStage >= 2 ? "bg-bronze text-ivory" : "bg-border text-charcoal/30"}`}>
                    {submitStage > 2 ? <Check className="w-2.5 h-2.5" /> : "2"}
                  </div>
                  <span className={`${submitStage >= 2 ? "text-charcoal font-medium" : "text-charcoal/40"}`}>Pitch Deck yükleniyor...</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${submitStage >= 3 ? "bg-bronze text-ivory" : "bg-border text-charcoal/30"}`}>
                    {submitStage > 3 ? <Check className="w-2.5 h-2.5" /> : "3"}
                  </div>
                  <span className={`${submitStage >= 3 ? "text-charcoal font-medium" : "text-charcoal/40"}`}>Kayıt oluşturuluyor...</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
