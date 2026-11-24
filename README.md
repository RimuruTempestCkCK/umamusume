# Umamusume: Pretty Derby — Official Website Clone

Proyek rekonstruksi 1:1 situs resmi Umamusume: Pretty Derby (`https://umamusume.com/`) menggunakan React + Vite + TypeScript. Seluruh aset publik disajikan secara lokal sehingga web dapat berjalan offline (kecuali tautan eksternal video/store/social).

## Menjalankan Proyek

```bash
# Instal dependensi (jika baru pertama kali)
npm install

# Jalankan dev server lokal
npm run dev
```

Buka URL lokal yang muncul (default: `http://localhost:5173/`).

## Build Produksi

```bash
# Type check & build bundle produksi
npm run build

# Menjalankan preview build produksi
npm run preview
```

## Rute yang Tersedia

| Rute | Deskripsi |
| --- | --- |
| `/` | Beranda lengkap: Animasi loading resmi, Hero KV + banner Cygames, News, About (Story & Intro PV), Gameplay Carousel 3-slide, Characters mosaic grid, Media section, Store badges, dan SNS footer |
| `/news/` | Daftar berita resmi |
| `/characters/` | Galeri 95 karakter lengkap dengan filter tipe dan pencarian |
| `/characters/:slug/` | Halaman detail karakter lengkap dengan partikel tapal kuda, multi-outfit, profil suara (VA), catch copy, dan video PV |
| `/media/` | Halaman Media Musik & Anime resmi |
| `/about/` | About This Website |
| `/devices/` | Recommended Devices |
| `/policy/` | Privacy Policy |
| `/privacy-choices/` | Your Privacy Choices |
| `/terms/` | Terms of Use & Copyrights |
| `/fan-createdguide/` | Fan-Created Content Guidelines |
| `/visitingstables-guidelines/` | Guidelines for Visiting Stables in Japan |

## Catatan

- Proyek ini dibuat untuk tujuan edukasi dan perbandingan teknis visual rekonstruksi. Hak cipta logo, karakter, ilustrasi, audio, dan materi resmi Umamusume sepenuhnya milik **Cygames, Inc.**
