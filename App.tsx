
import React, { useState } from 'react';
import { MapPin, Calendar, Music, CheckCircle, Loader2, Gift } from 'lucide-react';
import Snowfall from './components/Snowfall';
import Countdown from './components/Countdown';
import ElfChat from './components/ElfChat';
import { submitToSheet } from './services/sheetService';
import { RsvpData } from './types';

const App: React.FC = () => {
  const [rsvpSent, setRsvpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Usando URLs diretas para garantir o carregamento das imagens
  const logoImg = "https://montserrat.com.br/wp-content/uploads/2015/03/Logo-Life_completa_verde-290x300.png";
  const santaImg = "https://static.vecteezy.com/system/resources/thumbnails/052/364/757/small/christmas-santa-claus-png.png";
  
  // Form State
  const [formData, setFormData] = useState<RsvpData>({
    name: '',
    unit: '',
    childrenCount: '',
    ages: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await submitToSheet(formData);
      setRsvpSent(true);
    } catch (error) {
      alert("Houve um erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setRsvpSent(false);
    setFormData({
      name: '',
      unit: '',
      childrenCount: '',
      ages: ''
    });
  };

  return (
    <div className="min-h-screen relative font-sans text-gray-800 overflow-x-hidden pb-12">
      <Snowfall />

      {/* Hero Section */}
      <header className="relative z-10 flex flex-col items-center pt-12 pb-8 px-4 text-center">
        {/* Logo Section */}
        <div className="mb-6 animate-float h-24 flex items-center justify-center">
          <img 
            src={logoImg} 
            alt="Life 360 Residences" 
            className="h-full w-auto object-contain drop-shadow-md block"
          />
        </div>
        
        <div className="flex flex-col gap-1 mb-6">
           <h1 className="font-display text-6xl text-christmas-red animate-bounce-slow drop-shadow-sm">HO</h1>
           <h1 className="font-display text-6xl text-christmas-red animate-bounce-slow delay-100 drop-shadow-sm">HO</h1>
           <h1 className="font-display text-6xl text-christmas-red animate-bounce-slow delay-200 drop-shadow-sm">HO</h1>
        </div>

        <div className="relative w-80 h-80 mb-6 animate-float flex items-center justify-center">
           {/* Santa Image Background Glow */}
           <div className="absolute inset-0 bg-christmas-lightRed rounded-full opacity-40 blur-2xl scale-75"></div>
           
           {/* Main Santa Image */}
           <img 
             src={santaImg} 
             alt="Papai Noel" 
             className="relative w-full h-full object-contain drop-shadow-2xl z-10"
           />
        </div>

        <h2 className="text-3xl font-extrabold text-gray-800 leading-tight max-w-xs mx-auto mb-2">
          Entrega de <span className="text-christmas-red">Presentes</span> no Life 360.
        </h2>
        
        <p className="text-gray-600 max-w-xs mx-auto">
          Traga as crianças para receberem seus presentes diretamente do Papai Noel!
        </p>
      </header>

      {/* Info Cards - Sticky Look */}
      <section className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-lg border-l-4 border-christmas-red flex flex-col items-center justify-center transform transition hover:scale-105">
            <span className="text-4xl font-bold text-christmas-red font-display">14</span>
            <span className="text-sm font-bold text-gray-500 uppercase">De Dezembro</span>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-lg border-l-4 border-christmas-red flex flex-col items-center justify-center transform transition hover:scale-105">
            <span className="text-4xl font-bold text-christmas-red font-display">16</span>
            <span className="text-sm font-bold text-gray-500 uppercase">Horas</span>
          </div>
        </div>

        <Countdown />

        <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl mb-12 flex items-center gap-4">
           <div className="bg-christmas-lightRed p-3 rounded-full">
              <MapPin className="text-christmas-red w-6 h-6" />
           </div>
           <div>
             <h3 className="font-bold text-lg">Salão de Festas</h3>
             <p className="text-sm text-gray-600">Condomínio Life 360</p>
           </div>
        </div>
      </section>

      {/* Gemini Chat Section */}
      <section className="relative z-10 px-4 mb-16 max-w-xl mx-auto">
        <div className="text-center mb-6">
          <span className="bg-christmas-gold text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block shadow-sm">IA Mágica</span>
          <h2 className="text-2xl font-bold text-gray-800">Converse com o Elfo 🧝</h2>
          <p className="text-sm text-gray-600 mt-2">
            Precisa de dicas de presentes ou quer ouvir uma piada natalina? Pergunte ao nosso ajudante!
          </p>
        </div>
        <ElfChat />
      </section>

      {/* RSVP Section */}
      <section className="relative z-10 px-4 mb-12 max-w-xl mx-auto">
        <div className="bg-christmas-red rounded-[2.5rem] p-8 text-center text-white shadow-2xl relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>

          {!rsvpSent ? (
            <>
              <h2 className="text-2xl font-display font-bold mb-4">Confirme sua Presença</h2>
              <p className="text-christmas-lightRed text-sm mb-6">
                Preencha os dados abaixo para organizarmos a entrega!
              </p>
              
              <form onSubmit={handleRsvp} className="space-y-4 relative z-10">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Seu Nome (Responsável)" 
                  className="w-full px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-christmas-gold placeholder-gray-400"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    required
                    placeholder="Apto / Bloco" 
                    className="w-full px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-christmas-gold placeholder-gray-400"
                  />
                   <input 
                    type="number" 
                    name="childrenCount"
                    value={formData.childrenCount}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="Nº Crianças" 
                    className="w-full px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-christmas-gold placeholder-gray-400"
                  />
                </div>
                 <input 
                    type="text" 
                    name="ages"
                    value={formData.ages}
                    onChange={handleInputChange}
                    placeholder="Idades das crianças (Ex: 2, 5, 8 anos)" 
                    className="w-full px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-christmas-gold placeholder-gray-400"
                  />

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-christmas-gold text-christmas-darkRed font-bold py-4 rounded-xl shadow-lg hover:bg-yellow-400 transition transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5" />
                      Confirmar Presença
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="py-12 flex flex-col items-center animate-bounce-slow relative z-10">
              <div className="bg-white rounded-full p-4 mb-4">
                <CheckCircle className="w-12 h-12 text-christmas-green" />
              </div>
              <h3 className="text-2xl font-bold font-display">Presença Confirmada!</h3>
              <p className="text-christmas-lightRed mt-2">O Papai Noel está ansioso!</p>
              <button onClick={resetForm} className="mt-6 text-sm underline opacity-80 hover:opacity-100">
                Cadastrar outro vizinho
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm pb-8 relative z-10 flex flex-col items-center gap-4">
        {/* Footer Logo */}
        <img 
          src={logoImg} 
          alt="Life 360" 
          className="h-12 w-auto opacity-70 grayscale hover:grayscale-0 transition"
        />

        <p className="flex items-center justify-center gap-2">
          Feito com <Music className="w-3 h-3 animate-pulse" /> para Life 360
        </p>
      </footer>
    </div>
  );
};

export default App;
