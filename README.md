# EcoWaste: Sistem Deteksi dan Klasifikasi Sampah dari Gambar untuk Edukasi Daur Ulang

**ID Tim: CC25-CR368**

## ♻️ Ringkasan Proyek
Permasalahan sampah masih menjadi tantangan serius, terutama karena kurangnya pemahaman masyarakat tentang cara memilah dan mendaur ulang sampah dengan benar. Banyak orang kebingungan menentukan jenis sampah dan bagaimana cara membuangnya dengan tepat. EcoWaste adalah solusi berbasis kecerdasan buatan yang dapat mengenali jenis sampah (Organik, Kertas, Plastik) berdasarkan gambar yang diunggah pengguna. Proyek ini bertujuan untuk memberikan edukasi lingkungan yang simpel, cepat, dan mudah diakses, khususnya bagi generasi muda. Melalui kombinasi teknologi Machine Learning (Computer Vision) dan platform digital, EcoWaste hadir sebagai teman pintar yang membantu siapa pun belajar memilah sampah dengan mudah dan mendorong gaya hidup yang lebih peduli lingkungan.

## ❗ Pernyataan Masalah
Rendahnya kesadaran dan pengetahuan masyarakat tentang cara memilah sampah dengan benar menyebabkan pencampuran sampah dan menyulitkan proses daur ulang. Diperlukan solusi edukatif berbasis teknologi yang interaktif untuk membantu masyarakat mengenali dan memilah sampah secara mandiri dan praktis.

## 🚀 Progres Saat Ini
Proyek EcoWaste telah mencapai beberapa tahap penting:
* **Pengembangan Model ML**:
    * Pengumpulan dan pembersihan dataset gambar untuk kelas Organik, Kertas, dan Plastik.
    * Augmentasi data untuk menyeimbangkan distribusi kelas.
    * Pembagian dataset menjadi set data pelatihan, validasi, dan pengujian.
    * Pelatihan model klasifikasi gambar menggunakan Convolutional Neural Network (CNN) dengan pendekatan Transfer Learning (VGG16) dan penambahan lapisan kustom (`Conv2D`, `MaxPooling2D`).
    * Model telah menunjukkan performa yang baik (akurasi ~91%) dalam mengklasifikasikan jenis sampah.
* **Pengembangan Back-End**:
    * Pembuatan REST API menggunakan Flask (Python) untuk menerima unggahan gambar dan mengembalikan hasil prediksi dari model ML.
    * API menyediakan dua endpoint: `/deteksi_sampah` (untuk satu gambar) dan `/deteksi_beberapa_sampah` (untuk beberapa gambar).
    * Integrasi model ML (`.keras`) yang sudah dilatih ke dalam aplikasi Flask.
    * Penambahan fitur logging dasar pada aplikasi back-end.
* **Pengembangan Front-End**:
    * Pembuatan antarmuka pengguna (UI) menggunakan HTML, CSS, dan JavaScript.
    * Fitur unggah gambar (klik dan drag-and-drop).
    * Tampilan hasil klasifikasi dari model (nama kelas, skor keyakinan, ikon, dan informasi edukasi).
    * Halaman edukasi terpisah untuk setiap jenis sampah.
    * Tombol "Pelajari Lebih Lanjut" pada hasil deteksi yang mengarahkan ke halaman edukasi relevan.
    * Integrasi front-end dengan API back-end untuk fungsionalitas klasifikasi.
    * Perbaikan layout agar lebih responsif.
* **Pengaturan Repositori**:
    * Proyek telah diunggah ke GitHub.
    * Pengelolaan file besar seperti dataset dan model menggunakan strategi penyimpanan eksternal Google Drive dan Git LFS.

## 📂 Struktur Direktori Proyek (Direkomendasikan)
```text
EcoWaste-Capstone-Project/
├── Backend-EcoWaste/
│   ├── app.py                      # File utama aplikasi Flask
│   ├── best_ecowaste_model.keras   # Model ML (atau path jika LFS/cloud)
│   ├── requirements.txt            # Dependensi Python backend
│   ├── env/                        # Lingkungan virtual (diabaikan .gitignore)
│   └── app.log                     # File log (diabaikan .gitignore)
├── Frontend-EcoWaste/
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── assets/                     # Aset gambar untuk UI (jika ada)
│       └── images/
├── Notebooks/
│   └── Pengambilan,_Pembersihan,_Augmentasi_Data,_Pelatihan_Model_VGG.ipynb # dan notebook lainnya
├── Ecowaste-Dataset/               # (Diabaikan .gitignore, link unduh di bawah - berisi Kertas, Plastik, Organik)
├── split_dataset/                  # (Diabaikan .gitignore, dihasilkan oleh Notebook dari Ecowaste-Dataset/)
├── README.md
└── .gitignore
```

## 🛠️ Cara Setup dan Menjalankan Proyek

### Prasyarat
* Python (versi 3.9, 3.10, atau 3.11 direkomendasikan, **64-bit**)
* pip (Python package installer)
* Git
* Git LFS
* Browser Web Modern
* Akses ke Google Colab atau lingkungan Jupyter Notebook untuk menjalankan notebook pemrosesan data.

### 1. Clone Repositori
```bash
git clone [https://github.com/taufiqhi220/EcoWaste-Sistem-Deteksi-dan-Klasifikasi-Sampah-dari-Gambar-untuk-Edukasi-Daur-Ulang.git](https://github.com/taufiqhi220/EcoWaste-Sistem-Deteksi-dan-Klasifikasi-Sampah-dari-Gambar-untuk-Edukasi-Daur-Ulang.git)
cd EcoWaste-Sistem-Deteksi-dan-Klasifikasi-Sampah-dari-Gambar-untuk-Edukasi-Daur-Ulang
```

### 2. Dapatkan Dataset Mentah dan Model
* **Dataset Mentah**:
    Dataset berisi folder `Kertas`, `Plastik`, dan `Organik` dapat diunduh dari link berikut:
    * **[[Dataset Gambar](https://drive.google.com/drive/u/0/folders/100p2NdORuHRUK27Zn27w-93mT2ftQypH)]**
    * Setelah diunduh, ekstrak file ZIP tersebut. Anda akan mendapatkan folder-folder kelas sampah (misalnya `Kertas`, `Plastik`, `Organik`).
    * Buat direktori bernama `Ecowaste-Dataset` di root proyek Anda jika belum ada.
    * Pindahkan folder-folder kelas sampah (`Kertas`, `Plastik`, `Organik`) tersebut ke dalam direktori `EcoWaste-Capstone-Project/Ecowaste-Dataset/`.

* **Model Machine Learning (`best_ecowaste_model.keras`):**
    * **Opsi A (Jika Disimpan di Cloud)**:
        Unduh file `best_ecowaste_model.keras` dari:
        * **[Model EcoWaste](https://drive.google.com/file/d/1dAI9aye3wfe57e743HOoIGVMwESkFAXQ/view?usp=sharing)]**
        * Letakkan file model ini di dalam folder `Backend-EcoWaste/`.
    * **Opsi B (Jika Menggunakan Git LFS)**:
        Pastikan Anda sudah menginstal Git LFS di komputer Anda. Jalankan perintah berikut di direktori proyek Anda setelah melakukan `clone`:
        ```bash
        git lfs pull
        ```
        Ini akan mengunduh konten file model yang sebenarnya.

### 3. Pemrosesan dan Pembagian Dataset (Menggunakan Notebook)
* Buka folder `Notebooks/`.
* Jalankan notebook yang bertanggung jawab untuk pembersihan data, augmentasi, dan **pembagian dataset** (misalnya, `Pengambilan,_Pembersihan,_Augmentasi_Data,_Pelatihan_Model_VGG.ipynb`) menggunakan Google Colab atau Jupyter Notebook lokal.
* Pastikan path input di notebook menunjuk ke direktori `Ecowaste-Dataset/` yang berisi data mentah Anda.
* Notebook ini seharusnya menghasilkan direktori `split_dataset/` (atau nama serupa yang Anda tentukan di notebook) yang berisi subfolder `train`, `validation`, dan `test`, masing-masing dengan subfolder kelas. Direktori `split_dataset/` ini yang akan digunakan oleh skrip pelatihan model (jika Anda melatih ulang) dan juga penting untuk memahami bagaimana model dilatih. Model yang sudah jadi (`best_ecowaste_model.keras`) dilatih menggunakan data dari `split_dataset/`.

### 4. Setup Back-End (Flask API)
```bash
cd Backend-EcoWaste

# Buat lingkungan virtual (gunakan versi Python yang sesuai, misal 3.11)
# Contoh untuk Windows (sesuaikan path ke python.exe Anda jika perlu):
# & "C:\Path\Ke\Python311\python.exe" -m venv env
# Atau jika 'py' launcher berfungsi (Windows):
# py -3.11 -m venv env atau
# python -m venv env
# Untuk macOS/Linux:
# python3 -m venv env

# Aktifkan lingkungan virtual
.\env\Scripts\activate  # Windows
# source env/bin/activate  # macOS/Linux

# Instal dependensi
pip install -r requirements.txt

# Jalankan aplikasi Flask
python app.py
```
Server back-end akan berjalan di `http://127.0.0.1:5000`. Biarkan terminal ini tetap terbuka. Pastikan file model (`best_ecowaste_model.keras`) berada di direktori `Backend-EcoWaste/` agar `app.py` bisa memuatnya.

### 5. Jalankan Front-End
Cara terbaik adalah menggunakan server web lokal untuk menyajikan folder `Frontend-EcoWaste/`.
* **Menggunakan Live Server (VS Code Extension):**
    1.  Buka folder proyek Anda di VS Code.
    2.  Klik kanan pada file `Frontend-EcoWaste/index.html` di Explorer VS Code.
    3.  Pilih "Open with Live Server". Ini biasanya akan membuka di alamat seperti `http://127.0.0.1:5500`.
* **Menggunakan Server HTTP Sederhana Python:**
    1.  Buka terminal **baru**.
    2.  Aktifkan lingkungan virtual Anda (opsional untuk server HTML, tetapi baik untuk konsistensi).
    3.  Navigasi ke folder `Frontend-EcoWaste/`:
        ```bash
        cd ../Frontend-EcoWaste
        ```
        (Jika Anda masih di folder `Backend-EcoWaste`).
    4.  Jalankan: `python -m http.server 8080` (atau port lain jika 8080 terpakai).
    5.  Buka browser dan akses `http://localhost:8080`.

Pastikan `API_URL_SINGLE` di `Frontend-EcoWaste/script.js` sudah benar menunjuk ke alamat back-end Anda (default: `http://127.0.0.1:5000/deteksi_sampah`). Jika front-end dan back-end berjalan di port berbeda, pastikan CORS sudah diaktifkan di `app.py` Flask Anda (dengan `from flask_cors import CORS` dan `CORS(app)`).

## 🎯 Langkah Selanjutnya (Sesuai Rencana Proyek)
* Pengujian sistem secara menyeluruh dengan berbagai jenis gambar dan oleh pengguna target.
* Persiapan dan pelaksanaan _deployment_ aplikasi ke _cloud platform_ agar dapat diakses publik.
* Optimasi performa model dan API jika diperlukan.

## 💻 Teknologi yang Digunakan
* **Machine Learning**: Python, TensorFlow, Keras, OpenCV, Scikit-learn, Pandas, Numpy, Matplotlib, Seaborn
* **Back-End**: Python, Flask, Flask-CORS
* **Front-End**: HTML, CSS, JavaScript
* **Version Control**: Git & GitHub (dengan Git LFS untuk file model)
* **Penyimpanan Aset Besar**: Google Drive 

## 👥 Tim Pengembang
* **ML Engineer**: Taufiq Hidayat, Aulia Putri Fanani
* **Front-End**: Aulia Putri Fanani
* **Back-End**: Taufiq Hidayat

---
_README ini akan diperbarui seiring dengan perkembangan proyek._
