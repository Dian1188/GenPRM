
import { GoogleGenAI } from "@google/genai";
import type { RPMFormData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const createPrompt = (formData: RPMFormData): string => `
You are the "Generator RPM (Rencana Pembelajaran Mendalam)" created by Dian Perdana Putra. Your task is to generate a comprehensive and structured lesson plan based on the user's input. The output must be professional, detailed, and ready for use by a teacher in Indonesia.

**User Input:**
- Nama Satuan Pendidikan: ${formData.namaSatuanPendidikan}
- Nama Guru: ${formData.namaGuru}
- NIP Guru: ${formData.nipGuru}
- Nama Kepala Sekolah: ${formData.namaKepalaSekolah}
- NIP Kepala Sekolah: ${formData.nipKepalaSekolah}
- Jenjang Pendidikan: ${formData.jenjangPendidikan}
- Kelas: ${formData.kelas}
- Mata Pelajaran: ${formData.mataPelajaran}
- Capaian Pembelajaran (CP): ${formData.capaianPembelajaran}
- Materi Pelajaran: ${formData.materiPelajaran}
- Jumlah Pertemuan: ${formData.jumlahPertemuan}
- Durasi Setiap Pertemuan: ${formData.durasiSetiapPertemuan}
- Praktik Pedagogis per Pertemuan: ${formData.praktikPedagogis.map((p, i) => `Pertemuan ${i + 1}: ${p}`).join(', ')}
- Dimensi Lulusan (Profil Pelajar Pancasila): ${formData.dimensiLulusan.join(', ')}

**Output Structure:**

Generate the RPM in Markdown format with the following sections. Be detailed and specific in each section. Use clear headings.

---

# RENCANA PEMBELAJARAN MENDALAM (RPM)

**A. INFORMASI UMUM**
   - **Nama Satuan Pendidikan:** ${formData.namaSatuanPendidikan}
   - **Nama Penyusun:** ${formData.namaGuru}
   - **Mata Pelajaran:** ${formData.mataPelajaran}
   - **Kelas / Jenjang:** ${formData.kelas} / ${formData.jenjangPendidikan}
   - **Jumlah Pertemuan:** ${formData.jumlahPertemuan}
   - **Alokasi Waktu:** ${formData.durasiSetiapPertemuan}

**B. KOMPONEN INTI**
   1.  **Capaian Pembelajaran (CP):**
       - ${formData.capaianPembelajaran}

   2.  **Tujuan Pembelajaran (TP):**
       - Based on the CP and Materi Pelajaran, break down the CP into specific, measurable, achievable, relevant, and time-bound (SMART) learning objectives. List them using bullet points.

   3.  **Alur Tujuan Pembelajaran (ATP):**
       - Arrange the Tujuan Pembelajaran into a logical sequence for the specified number of meetings. Describe what will be covered in each meeting.

   4.  **Pemahaman Bermakna:**
       - Write 1-2 sentences explaining the real-world relevance of this lesson for students.

   5.  **Pertanyaan Pemantik:**
       - Create 2-3 engaging, open-ended questions to spark student curiosity.

   6.  **Profil Pelajar Pancasila:**
       - List the "Dimensi Lulusan" selected by the user and briefly explain how each dimension will be developed.

**C. KEGIATAN PEMBELAJARAN**
   - Provide a detailed step-by-step plan for each meeting, using the specified pedagogical practice. Structure each meeting plan as follows:
     - **Pertemuan [Number] (${formData.praktikPedagogis[0] || 'Praktik Pedagogis'})**
       - **Kegiatan Pendahuluan (misal: 15 Menit):**
       - **Kegiatan Inti (misal: 60 Menit):**
       - **Kegiatan Penutup (misal: 15 Menit):**

**D. ASESMEN / PENILAIAN**
   1.  **Asesmen Diagnostik (Sebelum Pembelajaran):**
   2.  **Asesmen Formatif (Selama Proses Pembelajaran):**
   3.  **Asesmen Sumatif (Akhir Pembelajaran):**

**E. LAMPIRAN**
   1.  **Glosarium:**
       - Define 3-5 key terms related to the "Materi Pelajaran".
   2.  **Daftar Pustaka:**
       - List 2-3 relevant books or online resources.

---

**Mengetahui,**
**Kepala Sekolah**

(_______________________)
**${formData.namaKepalaSekolah}**
**NIP. ${formData.nipKepalaSekolah}**

**[Isi Kota dan Tanggal],**
**Guru Mata Pelajaran**

(_______________________)
**${formData.namaGuru}**
**NIP. ${formData.nipGuru}**
`;


export const generateRPM = async (formData: RPMFormData): Promise<string> => {
  try {
    const prompt = createPrompt(formData);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    if (response && response.text) {
      return response.text;
    } else {
      throw new Error("Received an empty response from the API.");
    }

  } catch (error) {
    console.error("Error generating RPM:", error);
    if (error instanceof Error) {
        return `An error occurred: ${error.message}`;
    }
    return "An unknown error occurred while generating the RPM.";
  }
};
