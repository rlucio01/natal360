import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';
import { sendMessageToElf } from '../services/geminiService';
import { ChatMessage } from '../types';

const ElfChat: React.FC = () => {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setHistory(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await sendMessageToElf([...history, userMsg], input);
    
    setHistory(prev => [...prev, { role: 'model', text: responseText }]);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-christmas-red transform transition hover:scale-[1.02] duration-300">
      <div className="bg-christmas-red p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <Bot className="w-6 h-6 animate-bounce" />
          <h3 className="font-display text-xl font-bold">Ajudante do Papai Noel</h3>
        </div>
        <Sparkles className="text-christmas-gold w-5 h-5 animate-pulse" />
      </div>

      <div ref={scrollRef} className="h-64 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
        {history.length === 0 && (
          <div className="text-center text-gray-500 mt-4 italic">
            <p>Olá! Sou o elfo do Life 360.</p>
            <p className="text-sm mt-1">Me pergunte sobre ideias de presentes ou peça uma piada!</p>
          </div>
        )}
        {history.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
              msg.role === 'user' 
                ? 'bg-christmas-red text-white rounded-br-none' 
                : 'bg-christmas-green text-white rounded-bl-none shadow-md'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-500 rounded-2xl rounded-bl-none px-4 py-2 text-xs animate-pulse">
              O elfo está pensando... 🎁
            </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-gray-100 flex gap-2 border-t border-gray-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ex: Dica de presente para 5 anos?"
          className="flex-1 rounded-full px-4 py-2 border-none focus:ring-2 focus:ring-christmas-red focus:outline-none text-sm"
        />
        <button 
          onClick={handleSend}
          disabled={loading}
          className="bg-christmas-red text-white p-2 rounded-full hover:bg-christmas-darkRed transition disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ElfChat;