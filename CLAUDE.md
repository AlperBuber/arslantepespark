# arslantepespark

React + TypeScript + Vite statik sitesi. Netlify'da yayında —
**her push otomatik deploy tetikler.** Default dal `main`'dir
(`master` yok).

## Komutlar

- Geliştirme: `npm run dev` (vite)
- Build: `npm run build` (`tsc -b && vite build` — tip hatası build'i kırar)
- Önizleme: `npm run preview`

## Mentor verisi

Tek kaynak: `src/pages/MentorsPage.tsx` içindeki `mentors` dizisi
(CMS/JSON yok). Şu an 28 kayıt. Liste ilk isme göre alfabetik
(Türkçe sıralama); yeni kayıt alfabetik yerine eklenir.

Kayıt yapısı (`Mentor` arayüzü):

- `name` (zorunlu)
- `role` (zorunlu) — yazım kalıbı **"Kurum, Unvan"**
  (ör. "Dativa, Kurucu", "XMind Studio, Kurucu")
- `linkedin` (zorunlu) — boş string bırakma: buton görünür ama
  tıklanınca işlevsiz kalır
- `photo` (opsiyonel) — yoksa kart placeholder ikon gösterir,
  layout kırılmaz

App.tsx (route), Navbar (menü linki) ve translations.ts (menü etiketi)
mentor listesini tekrar etmez; kayıt eklerken yalnızca MentorsPage.tsx
değişir.

## Mentor görselleri

- Klasör: `src/assets/mentors/` — import edilip Vite ile bundle edilir;
  yeni görsel için MentorsPage.tsx'e import satırı da eklenir.
- Adlandırma: `ad-soyad` kebab-case, Türkçe karakter/aksan yok
  (ör. `ozcan-cavus.jpg`).
- Oran: **kare (1:1)**, tipik boyut 200x200–800x800. Kart CSS'i
  `aspect-square` + `object-cover object-top` kullanır; kare olmayan
  görsel otomatik kırpılır ve kompozisyon bozulabilir — görseli
  eklemeden önce elde kare kırp (yüz merkezli).

## Dokunulmaması gerekenler

- Görev kapsamındaki kayıtlar dışındaki mentor kayıtları.
- Sayfa tasarımı, CSS ve listenin sıralama mantığı (ayrıca
  istenmedikçe).
- Kaynak görsellerin orijinalleri (ör. Downloads'takiler) — kopyala,
  değiştirme.

## Push yasağı

Ajanlar bu repoda **push yapmaz** — push, Netlify'da otomatik deploy
demektir. İş branch'te commit edilir ve bekler; push yalnızca kullanıcı
açıkça "pushla" dediğinde yapılır. PR ve merge de push sonrasına kalır.
