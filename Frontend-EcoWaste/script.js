// Global variables
let currentPage = 'home';

// Navigation functions
function showHome() {
    document.getElementById('home-page').style.display = 'block';
    document.querySelectorAll('.education-page').forEach(page => {
        page.classList.remove('active');
    });
    currentPage = 'home';
}

function showEducation(category) {
    document.getElementById('home-page').style.display = 'none';
    document.querySelectorAll('.education-page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(category + '-page').classList.add('active');
    currentPage = category;
}

// File upload functionality
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const loading = document.getElementById('loading');
const resultContainer = document.getElementById('resultContainer');
const resultImage = document.getElementById('resultImage');
const resultText = document.getElementById('resultText');
const confidenceElement = document.getElementById('confidence');

const API_URL_SINGLE = 'http://127.0.0.1:5000/deteksi_sampah';

if (uploadArea) {
    uploadArea.addEventListener('click', () => {
        if(fileInput) fileInput.click();
    });
}

if (fileInput) {
    fileInput.addEventListener('change', handleFileUpload);
}

if (uploadArea) {
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload({ target: { files: files } });
        }
    });
}

async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('Harap pilih file gambar.');
        fileInput.value = '';
        return;
    }

    if(loading) loading.style.display = 'block';
    if(resultContainer) resultContainer.style.display = 'none';
    if(uploadArea) uploadArea.style.display = 'none';

    const reader = new FileReader();
    reader.onload = function (e) {
        if(resultImage) resultImage.src = e.target.result;
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('gambar', file);

    try {
        const response = await fetch(API_URL_SINGLE, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: `Error HTTP: ${response.status}` }));
            throw new Error(errorData.error || `Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        displayResult(data);
    } catch (error) {
        console.error('Error:', error);
        displayError(error.message || 'Gagal menghubungi server atau memproses gambar.');
    } finally {
        if(loading) loading.style.display = 'none';
        if(uploadArea) uploadArea.style.display = 'block';
        fileInput.value = '';
    }
}

function prepareResultArea() {
    if (!resultContainer || !resultImage || !resultText || !confidenceElement) {
        console.error("Satu atau lebih elemen hasil utama tidak ditemukan di HTML.");
        return null;
    }

    const existingTextWrapper = resultContainer.querySelector('.result-text-info-wrapper');
    if (existingTextWrapper) {
        existingTextWrapper.remove();
    }

    const textInfoWrapper = document.createElement('div');
    textInfoWrapper.className = 'result-text-info-wrapper';

    textInfoWrapper.appendChild(resultText);
    textInfoWrapper.appendChild(confidenceElement);
    
    resultContainer.appendChild(textInfoWrapper);
    // Pengaturan display flex dan properti terkait dipindahkan ke CSS
    return textInfoWrapper;
}

function displayResult(apiResponse) {
    const textInfoWrapper = prepareResultArea();
    if (!textInfoWrapper) return;

    const iconMap = { 'Organik': '🥬', 'Kertas': '🗂️', 'Plastik': '🧴' };
    const icon = iconMap[apiResponse.kelas_prediksi] || '❓';

    resultText.innerHTML = `${icon} ${apiResponse.kelas_prediksi}`;
    confidenceElement.textContent = `Keyakinan: ${(apiResponse.keyakinan * 100).toFixed(1)}%`;

    if (apiResponse.info_edukasi) {
        const recommendationDiv = document.createElement('div');
        recommendationDiv.className = 'recommendation';
        recommendationDiv.innerHTML = `<strong>Info & Rekomendasi:</strong><br>${apiResponse.info_edukasi}`;
        textInfoWrapper.appendChild(recommendationDiv);
    }

    const learnMoreButton = document.createElement('button');
    learnMoreButton.textContent = 'Pelajari Lebih Lanjut';
    learnMoreButton.className = 'learn-more result-learn-more'; 
    learnMoreButton.style.marginTop = '1rem';

    let categorySlug = '';
    const kelasPrediksiLower = apiResponse.kelas_prediksi.toLowerCase();
    if (kelasPrediksiLower === 'organik') categorySlug = 'organic';
    else if (kelasPrediksiLower === 'kertas') categorySlug = 'inorganic'; 
    else if (kelasPrediksiLower === 'plastik') categorySlug = 'b3'; 

    if (categorySlug) {
        learnMoreButton.onclick = function() {
            showEducation(categorySlug);
            const categoryToPageIdMap = {
                'organic': 'organic-page', 'kertas': 'inorganic-page', 'plastik': 'b3-page',
                'inorganic': 'inorganic-page', 'b3': 'b3-page'
            };
            const actualPageId = categoryToPageIdMap[categorySlug.toLowerCase()] || categorySlug + '-page';
            const targetPage = document.getElementById(actualPageId);
            if (targetPage) {
                setTimeout(() => targetPage.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
            }
        };
        textInfoWrapper.appendChild(learnMoreButton); 
    }
    if(resultContainer) resultContainer.style.display = 'flex'; // Tetap set display flex di sini untuk memunculkan
}

function displayError(errorMessage) {
    const textInfoWrapper = prepareResultArea();
    if (!textInfoWrapper) return; 

    if(resultImage) resultImage.src = "https://placehold.co/300x300/FF0000/FFFFFF?text=Error";
    resultText.innerHTML = `⚠️ Error`;
    confidenceElement.textContent = ''; 

    const errorDiv = document.createElement('div');
    errorDiv.className = 'recommendation error-message';
    errorDiv.innerHTML = `<strong>Oops!</strong><br>${errorMessage}`;
    textInfoWrapper.appendChild(errorDiv);

    if(resultContainer) resultContainer.style.display = 'flex'; // Tetap set display flex di sini untuk memunculkan
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            if (targetId === "#categories" || targetId === "#classify") {
                 if (currentPage !== 'home') {
                    showHome(); 
                    setTimeout(() => targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); 
                } else {
                     targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else if (targetId === "#home-page") {
                showHome();
                 targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => showHome());

function scrollToClassifier() {
    const classifySection = document.getElementById('classify');
    if (classifySection) {
        if (currentPage !== 'home') {
            showHome();
            setTimeout(() => classifySection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        } else {
            classifySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}
