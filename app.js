import express from 'express';
import multer from 'multer';
import cors from 'cors'; // Import CORS
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 8080;

// Mengaktifkan CORS untuk semua origin
app.use(cors());

// Middleware untuk menangani upload file
const upload = multer({
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('File harus berupa gambar (jpg, jpeg, png)'));
    }
    cb(null, true);
  },
});

// Simulasikan hasil prediksi
function simulateModelPrediction() {
  const probability = Math.random();
  const result = probability > 0.5 ? 'Cancer' : 'Non-cancer';
  const suggestion = result === 'Cancer' ? 'Segera periksa ke dokter!' : 'Penyakit kanker tidak terdeteksi.';
  return { probability, result, suggestion };
}

// Endpoint Prediksi
app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) throw new Error('Gambar tidak ditemukan');

    // Simulasikan hasil prediksi
    const { result, suggestion } = simulateModelPrediction();
    const id = uuidv4();
    const createdAt = new Date().toISOString();

    res.status(200).json({
      status: 'success',
      message: 'Model is predicted successfully',
      data: { id, result, suggestion, createdAt },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Terjadi kesalahan dalam melakukan prediksi',
    });
  }
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});