import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set for Dec 14th of the current year (or next if passed)
    const now = new Date();
    let eventDate = new Date(now.getFullYear(), 11, 14, 18, 0, 0); // Dec 14, 18:00
    
    if (now > eventDate) {
      eventDate.setFullYear(now.getFullYear() + 1);
    }

    const interval = setInterval(() => {
      const current = new Date();
      const difference = eventDate.getTime() - current.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="flex items-center gap-2 mb-4 text-christmas-red font-bold">
         <Clock className="w-5 h-5" />
         <span>Contagem Regressiva</span>
      </div>
      <div className="flex gap-4 text-center">
        {[
          { label: 'Dias', value: timeLeft.days },
          { label: 'Horas', value: timeLeft.hours },
          { label: 'Min', value: timeLeft.minutes },
          { label: 'Seg', value: timeLeft.seconds }
        ].map((item, i) => (
          <div key={i} className="flex flex-col">
            <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center border-b-4 border-christmas-red">
              <span className="text-2xl font-bold text-gray-800 font-display">{String(item.value).padStart(2, '0')}</span>
            </div>
            <span className="text-xs text-christmas-red font-bold mt-1 uppercase">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;
