# Dashboard Data Mahasiswa & Akademik

Aplikasi Dashboard Admin berbasis web untuk mengelola data mahasiswa dan informasi akademik menggunakan React JS 19 dan Vite.

## Fitur Aplikasi

- Menampilkan data mahasiswa.
- Menambahkan data mahasiswa (Create).
- Melihat data mahasiswa (Read).
- Mengedit data mahasiswa (Update).
- Menghapus data mahasiswa (Delete).
- Pencarian berdasarkan NIM dan nama.
- Filter berdasarkan status mahasiswa.
- Menampilkan statistik jumlah mahasiswa dan rata-rata IPK.
- Form modal tambah dan edit mahasiswa.
- Tampilan responsif untuk desktop, tablet, dan mobile.

## Teknologi yang Digunakan

- HTML
- CSS
- Bootstrap 5
- JavaScript
- DOM Manipulation
- jQuery
- React JS 19
- Vite

## Struktur Proyek

```text
dashboard-akademik/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   │   └── students.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## Cara Menjalankan Proyek

1. Pastikan Node.js sudah terinstal.
2. Clone repository GitHub atau download source code.
3. Buka folder proyek melalui Visual Studio Code.
4. Jalankan perintah berikut di terminal:

```bash
npm install
```

5. Jalankan aplikasi:

```bash
npm run dev
```

6. Buka alamat lokal yang muncul di terminal, biasanya:

```text
http://localhost:5173/
```

## Penyimpanan Data

Aplikasi menggunakan React State dan Array lokal untuk menyimpan serta mengelola data mahasiswa secara sementara. Aplikasi tidak menggunakan database backend SQL.

## Pengembang

Nama: [Nama Mahasiswa]

Program Studi: Teknologi Informasi

Universitas: Universitas 'Aisyiyah Yogyakarta

Tahun: 2026