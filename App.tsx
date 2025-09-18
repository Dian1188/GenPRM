
import React, { useState, useEffect, useCallback } from 'react';
import type { RPMFormData } from './types';
import { MATERI_PELAJARAN_OPTIONS, DIMENSI_LULUSAN_OPTIONS } from './constants';
import { generateRPM } from './services/geminiService';
import { FormField } from './components/FormField';
import { GeneratedPlan } from './components/GeneratedPlan';
import { PencilIcon, SprayCanIcon } from './components/icons';

const initialState: RPMFormData = {
  namaSatuanPendidikan: '',
  namaGuru: '',
  nipGuru: '',
  namaKepalaSekolah: '',
  nipKepalaSekolah: '',
  jenjangPendidikan: 'SMA',
  kelas: 'X',
  mataPelajaran: 'Geografi',
  capaianPembelajaran: '',
  materiPelajaran: MATERI_PELAJARAN_OPTIONS[0],
  jumlahPertemuan: 1,
  durasiSetiapPertemuan: '2 x 45 menit',
  praktikPedagogis: [''],
  dimensiLulusan: [],
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<RPMFormData>(initialState);
  const [generatedPlan, setGeneratedPlan] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      praktikPedagogis: Array(Number(prev.jumlahPertemuan) || 1).fill('')
    }));
  }, [formData.jumlahPertemuan]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'jumlahPertemuan' ? Math.max(1, Number(value)) : value }));
  };

  const handlePedagogyChange = (index: number, value: string) => {
    const newPractices = [...formData.praktikPedagogis];
    newPractices[index] = value;
    setFormData(prev => ({ ...prev, praktikPedagogis: newPractices }));
  };

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const currentDimensions = prev.dimensiLulusan;
      if (checked) {
        return { ...prev, dimensiLulusan: [...currentDimensions, value] };
      } else {
        return { ...prev, dimensiLulusan: currentDimensions.filter(dim => dim !== value) };
      }
    });
  };

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setGeneratedPlan('');

    try {
      const plan = await generateRPM(formData);
      setGeneratedPlan(plan);
    } catch (err) {
      setError('Gagal menghasilkan RPM. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        document.getElementById('generated-plan')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 selection:bg-pink-500 selection:text-white">
      <div className="container mx-auto max-w-5xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl sm:text-7xl font-bold text-cyan-400 drop-shadow-[3px_3px_0px_#f472b6]">
            RPM Generator
          </h1>
          <p className="text-xl mt-2 text-pink-400">dibuat oleh (Dian Perdana Putra)</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-gray-800 border-4 border-dashed border-cyan-400 p-8 rounded-lg mb-10 shadow-[8px_8px_0px_0px_#f472b6]">
          <h2 className="text-4xl text-pink-500 mb-8 flex items-center gap-4"><PencilIcon className="w-10 h-10" /> Isi Data Dulu...</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <FormField id="namaSatuanPendidikan" label="Nama Satuan Pendidikan" type="text" value={formData.namaSatuanPendidikan} onChange={handleChange} placeholder="Contoh: SMA Negeri 1" />
            <FormField id="namaGuru" label="Nama Guru" type="text" value={formData.namaGuru} onChange={handleChange} placeholder="Nama Lengkap Anda"/>
            <FormField id="nipGuru" label="NIP Guru" type="text" value={formData.nipGuru} onChange={handleChange} placeholder="NIP (jika ada)" required={false} />
            <FormField id="namaKepalaSekolah" label="Nama Kepala Sekolah" type="text" value={formData.namaKepalaSekolah} onChange={handleChange} placeholder="Nama Kepala Sekolah"/>
            <FormField id="nipKepalaSekolah" label="NIP Kepala Sekolah" type="text" value={formData.nipKepalaSekolah} onChange={handleChange} placeholder="NIP (jika ada)" required={false} />
            <FormField id="jenjangPendidikan" label="Jenjang Pendidikan" type="select" options={['SMA']} value={formData.jenjangPendidikan} onChange={handleChange} />
            <FormField id="kelas" label="Kelas" type="select" options={['X', 'XI', 'XII']} value={formData.kelas} onChange={handleChange} />
            <FormField id="mataPelajaran" label="Mata Pelajaran" type="text" value={formData.mataPelajaran} onChange={handleChange} placeholder="Contoh: Geografi" />
          </div>

          <FormField id="capaianPembelajaran" label="Capaian Pembelajaran (CP)" type="textarea" value={formData.capaianPembelajaran} onChange={handleChange} placeholder="Salin dan tempel CP di sini" />
          <FormField id="materiPelajaran" label="Materi Pelajaran" type="select" options={MATERI_PELAJARAN_OPTIONS} value={formData.materiPelajaran} onChange={handleChange} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <FormField id="jumlahPertemuan" label="Jumlah Pertemuan" type="number" min={1} value={formData.jumlahPertemuan} onChange={handleChange} />
            <FormField id="durasiSetiapPertemuan" label="Durasi Setiap Pertemuan" type="text" value={formData.durasiSetiapPertemuan} onChange={handleChange} placeholder="Contoh: 2 x 45 menit" />
          </div>

          <div>
            <label className="block text-xl text-cyan-400 mb-2">Praktik Pedagogis per Pertemuan</label>
            {formData.praktikPedagogis.map((practice, index) => (
              <input
                key={index}
                type="text"
                value={practice}
                onChange={(e) => handlePedagogyChange(index, e.target.value)}
                placeholder={`Praktik Pertemuan ${index + 1} (e.g., Inkuiri, PjBL)`}
                className="w-full bg-gray-800 text-white p-3 mb-3 border-2 border-dashed border-cyan-400 rounded-md focus:outline-none focus:border-solid focus:border-pink-500 transition-all duration-300 transform hover:scale-[1.01] focus:scale-[1.01]"
              />
            ))}
          </div>

          <div className="mt-6">
            <label className="block text-xl text-cyan-400 mb-4">Dimensi Lulusan</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {DIMENSI_LULUSAN_OPTIONS.map(dim => (
                <label key={dim} className="flex items-center space-x-3 text-lg cursor-pointer">
                  <input type="checkbox" value={dim} onChange={handleDimensionChange} className="form-checkbox h-5 w-5 bg-gray-700 border-cyan-400 rounded text-pink-500 focus:ring-pink-500" />
                  <span>{dim}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button type="submit" disabled={isLoading} className="bg-pink-500 text-gray-900 text-2xl font-bold py-4 px-10 rounded-md border-4 border-dashed border-cyan-400 hover:bg-cyan-400 hover:text-gray-900 hover:border-pink-500 transition-all duration-300 transform hover:-rotate-3 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none shadow-[6px_6px_0px_0px_#0891b2]">
              {isLoading ? 'Lagi Mikir...' : (
                <span className="flex items-center gap-3">
                  <SprayCanIcon className="w-8 h-8"/> Generate RPM!
                </span>
              )}
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="flex flex-col items-center justify-center my-10">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-pink-500"></div>
            <p className="text-cyan-400 text-2xl mt-6">Sedang membuat rencana... mohon tunggu sebentar!</p>
          </div>
        )}
        
        {error && <div className="text-center text-red-500 text-2xl bg-red-900/50 p-4 rounded-md">{error}</div>}

        {generatedPlan && !isLoading && <GeneratedPlan plan={generatedPlan} />}

      </div>
    </div>
  );
};

export default App;
