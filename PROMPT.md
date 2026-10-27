# Creative Portfolio Landing Page — AI uchun prompt

Quyidagi promptni ChatGPT / Claude / Gemini kabi AI'ga nusxalab bering. Kerakli joylarni (`[...]`) o'zingizniki bilan almashtiring.

---

## PROMPT

Sen tajribali Creative Frontend Developer va UI/UX dizaynersan. Menga **juda creative, zamonaviy va animatsiyalarga boy** shaxsiy portfolio landing page yarat.

### Ma'lumotlar
- Ism: **[Jo'rayeva Hojinur]**
- Kasb: **[Frontend dasturchi]**
- Profil rasmi: `images/profile.jpg`
- Aloqa: email `[your@email.com]`, Telegram, GitHub, LinkedIn, Instagram

### Texnik talablar
1. Faqat **HTML, CSS va vanilla JavaScript** (framework ishlatma).
2. Fayl strukturasi **alohida papkalarda** bo'lsin:
   ```
   portfolio/
   ├── index.html
   ├── css/style.css
   ├── js/i18n.js      (UZ/EN tarjimalar)
   ├── js/main.js      (barcha logika)
   └── images/         (profil, loyiha rasmlari, favicon)
   ```
3. Rasmlar uchun placeholder qo'y (`profile.jpg`, `project-1..4.svg`) — keyin o'zim almashtiraman.
4. Kod toza, izohli, CSS o'zgaruvchilari (`:root` tokenlar) bilan yozilsin.
5. To'liq **responsive** (mobil, planshet, desktop) va **accessibility** (aria-label, alt, `prefers-reduced-motion`).

### Dark / Light rejim
- Navbar'da toggle tugma (quyosh/oy ikonkasi, silliq aylanish animatsiyasi).
- `[data-theme="dark|light"]` + CSS o'zgaruvchilari orqali ishlasin.
- Tanlov `localStorage`'da saqlansin; birinchi kirishda `prefers-color-scheme` hisobga olinsin.

### Til: UZ / EN
- Navbar'da `UZ | EN` switch.
- Barcha matnlar `data-i18n` atributi va `i18n.js` obyekti orqali almashsin (sahifa qayta yuklanmasin).
- Tanlangan til `localStorage`'da saqlansin. Typing effektdagi rollar ham tilga qarab o'zgarsin.

### Bo'limlar
1. **Loader** — logotip + progress bar, keyin yuqoriga siljib yo'qoladi.
2. **Hero** — katta gradient ism (hover'da glitch effekt), yozilib-o'chadigan rollar (typing), 2 ta CTA tugma, profil rasmi morphing (suyuq) shaklda, atrofida aylanuvchi halqalar va suzib yuruvchi texnologiya "chip"lari.
3. **Marquee** — cheksiz aylanuvchi texnologiyalar lentasi (biroz qiya).
4. **Men haqimda** — glassmorphism karta + 4 ta statistika (son 0 dan sanab chiqadi).
5. **Ko'nikmalar** — ko'rinishga kirganda to'ladigan gradient progress bar'lar.
6. **Loyihalar** — 4 ta karta, 3D tilt effekti, hover'da rasm zoom, Live/GitHub havolalar.
7. **Yo'lim (timeline)** — vertikal chiziqli yillar bo'yicha yo'l.
8. **Aloqa** — katta sarlavha, email, ijtimoiy tarmoq ikonkalari, forma (mailto orqali ishlaydi).
9. **Footer** — "tepaga" tugmasi.

### Creative effektlar (majburiy)
- Interaktiv **zarrachalar tarmog'i** (canvas) — sichqoncha yaqinlashganda zarrachalar qochadi.
- Suzib yuruvchi blur **gradient blob'lar** va yengil **grain** qatlami.
- **Custom cursor** (halqa + nuqta, havolada kattalashadi) — faqat desktop'da.
- **Magnetic** tugmalar va **3D tilt** kartalar.
- Scroll **progress bar** (yuqorida) va navbar'da aktiv bo'lim ajratilishi.
- Scroll bilan elementlarning **reveal** animatsiyasi (IntersectionObserver).
- Glassmorphism (backdrop-filter) uslubidagi kartalar va floating pill-navbar.

### Dizayn
- Ranglar: pushti `#ff5ecb`, binafsha `#7c5cff`, firuza `#19e3c6` gradienti.
- Shriftlar: **Syne** (sarlavha), **Space Grotesk** (matn), **JetBrains Mono** (aksent) — Google Fonts.
- Dark fon: `#0a0a12`, light fon: `#f6f4ff`.

### Natija
Barcha fayllarni (index.html, css/style.css, js/i18n.js, js/main.js, SVG placeholderlar) to'liq kod bilan, har birini alohida kod blokida ber. Oxirida rasm va matnlarni qanday almashtirish bo'yicha qisqa yo'riqnoma yoz.

---

## Rasmlarni almashtirish
| Fayl | Nima |
|---|---|
| `images/profile.jpg` | Profil rasmingiz (kvadrat yoki portret, 800×800 tavsiya) |
| `images/project-1..4.svg` | Loyiha skrinshotlari. `.jpg/.png` qo'ysangiz, `index.html`'da `src` kengaytmasini o'zgartiring |
| `images/favicon.svg` | Sayt ikonkasi |

## Matnlarni o'zgartirish
- Barcha matnlar `js/i18n.js` ichida (UZ va EN).
- Email: `index.html` va `js/main.js` ichidagi `your@email.com` ni almashtiring.
- Ijtimoiy tarmoq havolalari: `index.html` dagi `.socials` ichidagi `href="#"`.
- Foizlar/ko'nikmalar: `index.html` dagi `style="--v:92"` qiymatlari.
