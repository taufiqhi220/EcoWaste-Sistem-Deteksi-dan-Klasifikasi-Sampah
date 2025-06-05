# EcoWaste: Sistem Deteksi dan Klasifikasi Sampah dari Gambar untuk Edukasi Daur Ulang

## Ringkasan Proyek

Permasalahan sampah masih menjadi tantangan serius, terutama karena kurangnya pemahaman masyarakat tentang cara memilah dan mendaur ulang sampah dengan benar. EcoWaste adalah solusi berbasis kecerdasan buatan yang bisa mengenali jenis sampah (organik, plastik, kertas) berdasarkan gambar yang diunggah pengguna. Proyek ini bertujuan untuk memberikan edukasi lingkungan yang simpel, cepat, dan mudah diakses, khususnya bagi generasi muda, melalui kombinasi teknologi Machine Learning (Computer Vision) dan platform digital. Harapannya, EcoWaste dapat membantu siapa pun belajar memilah sampah dengan mudah dan mendorong gaya hidup yang lebih peduli lingkungan.

## Pernyataan Masalah

Rendahnya kesadaran dan pengetahuan masyarakat tentang cara memilah sampah dengan benar (seperti organik, plastik, kertas) menyebabkan pencampuran sampah dan menyulitkan proses daur ulang. Diperlukan solusi edukatif berbasis teknologi yang interaktif untuk membantu masyarakat mengenali dan memilah sampah secara mandiri dan praktis.
## Progres Saat Ini

Sejauh ini, proyek telah mencapai tahap berikut:

1.  **Pengumpulan Dataset Awal**: Dataset gambar untuk tiga kelas utama sampah (Organik, Kertas, Plastik) telah dikumpulkan.
2.  **Analisis dan Pembersihan Dataset**: Dataset awal telah dianalisis untuk distribusi kelas.
3.  **Augmentasi Data**: Teknik augmentasi data telah diterapkan untuk menyeimbangkan jumlah gambar antar kelas, mengatasi ketidakseimbangan dataset awal.
4.  **Pembagian Dataset**: Dataset yang telah diaugmentasi dan diseimbangkan kemudian dibagi menjadi tiga set terpisah:
    * Set Pelatihan (Training set)
    * Set Validasi (Validation set)
    * Set Pengujian (Test set)
    Struktur folder untuk set-set ini telah dibuat (`/split_dataset/train`, `/split_dataset/validation`, `/split_dataset/test`), dengan subfolder untuk masing-masing kelas di dalamnya.

Dataset kini siap untuk digunakan dalam tahap pengembangan dan pelatihan model.

## Dataset

* **Kelas**: Organik, Plastik, Kertas 
* **Sumber**: Gabungan dari pengumpulan manual dan dataset publik (sesuai rencana). 
* **Status**: Telah diaugmentasi untuk keseimbangan kelas dan dibagi menjadi set train/validation/test.

## Langkah Selanjutnya (Sesuai Rencana Proyek)

1.  **Persiapan Data untuk Model**: Memuat data dari set yang telah dibagi menggunakan `ImageDataGenerator` atau `tf.data.Dataset`.
2.  **Pembangunan Model CNN**:
    * Memilih arsitektur dasar (misalnya, VGG16, ResNet, MobileNetV2 tanpa bobot pre-trained) atau membangun CNN kustom. 
    * Menggunakan TensorFlow dan Keras. 
3.  **Pelatihan Model**: Melatih model menggunakan set pelatihan dan validasi.
4.  **Evaluasi Model**: Mengevaluasi performa model. 
5.  **Pengembangan Back-End dan Front-End**: Membuat API dan antarmuka pengguna. 
6.  **Integrasi Sistem dan Pengujian**: Menggabungkan model ML dengan aplikasi web dan melakukan pengujian menyeluruh. 

## Teknologi yang Direncanakan

* **Machine Learning**: Python, TensorFlow, Keras, OpenCV, Scikit-learn 
* **Back-End**: Python, Flask (atau framework lain) 
* **Front-End**: React.js atau HTML/CSS/JavaScript dasar 
* **Database**: SQLite atau PostgreSQL 
* **Version Control**: Git & GitHub


## Dataset

Dataset EcoWaste (sekitar 1GB setelah augmentasi dan splitting) dapat diunduh dari link berikut:
[Unduh Dataset EcoWaste dari Google Drive](https://drive.google.com/drive/folders/100p2NdORuHRUK27Zn27w-93mT2ftQypH?usp=sharing)

Setelah diunduh, ekstrak file ZIP tersebut. Anda akan menemukan folder yang berisi gambar-gambar sampah yang telah diklasifikasikan ke dalam folder kelas masing-masing (Organik, Kertas, Plastik).

## Cara Menjalankan (Placeholder)

Saat ini, repositori berisi skrip-skrip untuk pemrosesan data awal (augmentasi, pembagian dataset). Detail lebih lanjut mengenai cara menjalankan model dan aplikasi akan ditambahkan seiring progres proyek.

---
