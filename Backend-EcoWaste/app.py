from flask import Flask, request, jsonify
import tensorflow as tf
from PIL import Image
import numpy as np
import io
import os
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# --- Pengaturan Logging (lakukan sekali saat aplikasi dimulai) ---
if not app.debug: 
    logging.basicConfig(
        filename='app.log',
        level=logging.INFO,
        format='%(asctime)s %(levelname)s %(name)s %(module)s %(funcName)s: %(message)s'
    )

# --- Pengaturan Model dan Kelas ---
MODEL_FILENAME = 'best_ecowaste_model.keras'
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, MODEL_FILENAME)
model = None
NAMA_KELAS = ['Kertas', 'Organik', 'Plastik']
IMG_SIZE = 250

def muat_model_ml():
    global model
    try:
        model = tf.keras.models.load_model(MODEL_PATH)
        app.logger.info(f"Model ML berhasil dimuat dari: {MODEL_PATH}") # Log INFO
    except Exception as e:
        app.logger.error(f"Error memuat model dari {MODEL_PATH}: {e}", exc_info=True) # Log ERROR dengan traceback
        model = None

def preprocess_image(image_bytes, target_size=(IMG_SIZE, IMG_SIZE)):
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img = img.resize(target_size)
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0
    return img_array

def dapatkan_info_edukasi(nama_kelas):
    if nama_kelas == "Kertas":
        return "Kertas dapat didaur ulang menjadi kertas baru, kardus, atau tisu. Pisahkan dari sampah basah."
    elif nama_kelas == "Organik":
        return "Sampah organik dapat didaur ulang menjadi kompos alami yang bermanfaat bagi lingkungan."
    elif nama_kelas == "Plastik":
        return "Plastik dapat didaur ulang menjadi ecobrick, ember, atau tas ramah lingkungan."
    else:
        return "Info daur ulang spesifik belum tersedia untuk jenis sampah ini."

@app.route('/deteksi_sampah', methods=['POST'])
def deteksi_sampah_tunggal_route():
    app.logger.info(f"Request diterima di /deteksi_sampah dari {request.remote_addr}")
    if model is None:
        app.logger.error("Model tidak siap atau gagal dimuat saat request /deteksi_sampah.")
        return jsonify({'error': 'Model tidak siap atau gagal dimuat'}), 500
    if 'gambar' not in request.files:
        app.logger.warning("Request ke /deteksi_sampah tidak menyertakan file dengan key 'gambar'.")
        return jsonify({'error': 'Tidak ada file gambar yang dikirim dengan key "gambar"'}), 400

    file_gambar = request.files['gambar']
    if file_gambar.filename == '':
        app.logger.warning("Request ke /deteksi_sampah menyertakan key 'gambar' tapi tidak ada file yang dipilih.")
        return jsonify({'error': 'Tidak ada file yang dipilih'}), 400

    app.logger.info(f"Menerima file: {file_gambar.filename} untuk deteksi tunggal.")
    try:
        img_bytes = file_gambar.read()
        processed_image = preprocess_image(img_bytes)
        prediksi = model.predict(processed_image)
        index_kelas_prediksi = np.argmax(prediksi[0])
        nama_kelas_prediksi = NAMA_KELAS[index_kelas_prediksi]
        skor_keyakinan = float(prediksi[0][index_kelas_prediksi])
        info_edukasi = dapatkan_info_edukasi(nama_kelas_prediksi)

        app.logger.info(f"Prediksi untuk {file_gambar.filename}: Kelas={nama_kelas_prediksi}, Keyakinan={skor_keyakinan:.4f}")
        return jsonify({
            'kelas_prediksi': nama_kelas_prediksi,
            'keyakinan': round(skor_keyakinan, 4),
            'info_edukasi': info_edukasi
        })
    except Exception as e:
        app.logger.error(f"Error saat memproses gambar {file_gambar.filename} di /deteksi_sampah: {e}", exc_info=True)
        return jsonify({'error': f'Terjadi kesalahan saat memproses gambar: {str(e)}'}), 500

@app.route('/deteksi_beberapa_sampah', methods=['POST'])
def deteksi_beberapa_sampah_route():
    app.logger.info(f"Request diterima di /deteksi_beberapa_sampah dari {request.remote_addr}")
    if model is None:
        app.logger.error("Model tidak siap atau gagal dimuat saat request /deteksi_beberapa_sampah.")
        return jsonify({'error': 'Model tidak siap atau gagal dimuat'}), 500
    
    files_gambar_list = request.files.getlist('gambar')
    if not files_gambar_list or not any(f.filename for f in files_gambar_list):
        app.logger.warning("Request ke /deteksi_beberapa_sampah tidak menyertakan file atau semua file kosong.")
        return jsonify({'error': 'Tidak ada file gambar yang dikirim dengan key "gambar" atau semua file kosong'}), 400

    hasil_prediksi_semua = []
    app.logger.info(f"Menerima {len(files_gambar_list)} file untuk deteksi beberapa sampah.")

    for i, file_gambar in enumerate(files_gambar_list):
        app.logger.info(f"Memproses file ke-{i+1}: {file_gambar.filename}")
        if file_gambar.filename == '':
            app.logger.warning(f"File ke-{i+1} adalah entri kosong, dilewati.")
            hasil_prediksi_semua.append({'nama_file_asli': 'Tidak Diketahui (file kosong)','error': 'File yang dikirim kosong.'})
            continue

        try:
            img_bytes = file_gambar.read()
            processed_image = preprocess_image(img_bytes)
            prediksi = model.predict(processed_image)
            index_kelas_prediksi = np.argmax(prediksi[0])
            nama_kelas_prediksi = NAMA_KELAS[index_kelas_prediksi]
            skor_keyakinan = float(prediksi[0][index_kelas_prediksi])
            info_edukasi = dapatkan_info_edukasi(nama_kelas_prediksi)

            app.logger.info(f"  Prediksi untuk {file_gambar.filename}: Kelas={nama_kelas_prediksi}, Keyakinan={skor_keyakinan:.4f}")
            hasil_prediksi_semua.append({
                'nama_file_asli': file_gambar.filename,
                'kelas_prediksi': nama_kelas_prediksi,
                'keyakinan': round(skor_keyakinan, 4),
                'info_edukasi': info_edukasi
            })
        except Exception as e:
            app.logger.error(f"  Error saat memproses gambar {file_gambar.filename} di /deteksi_beberapa_sampah: {e}", exc_info=True)
            hasil_prediksi_semua.append({'nama_file_asli': file_gambar.filename, 'error': f'Gagal memproses file: {str(e)}'})
            
    return jsonify({'hasil_deteksi_beberapa': hasil_prediksi_semua})

if __name__ == '__main__':
    # Panggil fungsi untuk memuat model saat aplikasi dimulai
    muat_model_ml() 
    # Konfigurasi logging bisa juga diletakkan di sini, sebelum app.run()
    if not app.debug:
        pass

    app.logger.info("Flask app akan dimulai...") # Log bahwa app akan dimulai
    app.run(debug=True, host='0.0.0.0', port=5000)
