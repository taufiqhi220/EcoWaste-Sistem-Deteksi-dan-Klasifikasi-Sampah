# EcoWaste: Sistem Deteksi dan Klasifikasi Sampah dari Gambar untuk Edukasi Daur Ulang

## ♻️ Ringkasan Proyek

EcoWaste adalah solusi berbasis kecerdasan buatan yang dapat mengenali jenis sampah (seperti Organik, Kertas, dan Plastik) berdasarkan gambar yang diunggah pengguna. Proyek ini bertujuan untuk memberikan edukasi lingkungan yang simpel dan cepat, membantu siapa pun belajar memilah sampah dengan mudah, dan mendorong gaya hidup yang lebih peduli lingkungan.

## ✨ Fitur Utama

* **Klasifikasi Sampah**: Unggah gambar dan dapatkan klasifikasi jenis sampah secara otomatis.
* **Edukasi Daur Ulang**: Pelajari cara penanganan dan proses daur ulang yang tepat untuk setiap jenis sampah.
* **Antarmuka Intuitif**: Desain yang bersih dan sederhana memastikan kemudahan penggunaan.

## 💻 Teknologi yang Digunakan

* **Machine Learning**: Python, TensorFlow, Keras, OpenCV, Scikit-learn
* **Back-End**: Python, Flask, Flask-CORS
* **Front-End**: HTML, CSS, JavaScript
* **Version Control**: Git & GitHub

## 📋 Prasyarat Sistem

Pastikan perangkat Anda memenuhi persyaratan berikut sebelum instalasi:

* **Python**: Versi 3.8 hingga 3.11 (atau lebih tinggi support dengan Tensorflow)
* **RAM**: Minimal 4 GB (8 GB direkomendasikan)
* **Penyimpanan**: Minimal 2 GB ruang kosong
* **Browser Web**: Google Chrome, Mozilla Firefox, atau sejenisnya.

## 🚀 Panduan Instalasi dan Penggunaan

Ikuti langkah-langkah ini untuk menjalankan aplikasi di komputer Anda.

### 1. Dapatkan Kode Proyek

Buka Terminal atau Command Prompt, lalu jalankan perintah berikut:

```bash
# Clone repository proyek
git clone [https://github.com/taufiqhi220/ecowaste-sistem-deteksi-dan-klasifikasi-sampah-dari-gambar-untuk-edukasi-daur-ulang.git](https://github.com/taufiqhi220/ecowaste-sistem-deteksi-dan-klasifikasi-sampah-dari-gambar-untuk-edukasi-daur-ulang.git)

# Masuk ke direktori proyek
cd ecowaste-sistem-deteksi-dan-klasifikasi-sampah-dari-gambar-untuk-edukasi-daur-ulang
```

### 2. Jalankan Backend (Server)

Server ini berfungsi untuk memproses analisis gambar.

```bash
# Masuk ke direktori Backend
cd Backend-EcoWaste

# Buat dan aktifkan virtual environment
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install semua dependensi yang dibutuhkan
pip install -r requirements.txt

# Jalankan server Flask
python app.py
```

Biarkan terminal ini tetap berjalan. Server akan aktif di `http://127.0.0.1:5000`.

### 3. Buka Frontend (Aplikasi Web)

1.  Buka folder `Frontend-EcoWaste` dari direktori proyek.
2.  Klik dua kali pada file `index.html` untuk membukanya di browser.
3.  Aplikasi siap digunakan untuk mengunggah dan mengklasifikasi gambar sampah.

## 👥 Tim Pengembang
**ID Tim Capstone Project: CC25-CR368**
* **ML Engineer**: Taufiq Hidayat, Aulia Putri Fanani
* **Front-End**: Aulia Putri Fanani (MC006D5X1464) [**Linkedin**](https://www.linkedin.com/in/auliaputrifanai) | [**GitHub**](https://github.com/Aulialiap)
* **Back-End**: Taufiq Hidayat (MC135D5Y1886) [**Linkedin**](https://www.linkedin.com/in/taufiqhi220/) | [**GitHub**](https://github.com/taufiqhi220)

## 🙏 Referensi dan Kredit

### Dataset
Proyek ini menggunakan data dari beberapa sumber publik yang luar biasa. Terima kasih kepada para kontributor:
* [Waste Classification by phenomsg](https://www.kaggle.com/datasets/phenomsg/waste-classification?select=Organic)
* [Waste Classification Data by techsash](https://www.kaggle.com/datasets/techsash/waste-classification-data/)
* [Plastic Object Detection Dataset by dataclusterlabs](https://www.kaggle.com/datasets/dataclusterlabs/plastic-object-detection-dataset)
* [RealWaste by joebeachcapital](https://www.kaggle.com/datasets/joebeachcapital/realwaste)

### Model Pre-trained
Model kami dibangun menggunakan arsitektur VGG16 dengan bobot yang telah dilatih pada dataset ImageNet.
* [VGG16 - Keras Documentation](https://keras.io/api/applications/vgg/#vgg16-function)
