import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CHINESE_CHARS = ['福', '吉', '寿', '财', '安', '康', '中', '国', '幸', '运', '龙', '凤'];
const COLORS = ['text-[#d60000]', 'text-[#ffd700]', 'text-zinc-500'];

interface FloatingChar {
  id: number;
  char: string;
  x: number; // target x
  y: number; // target y
  startX: number;
  startY: number;
  color: string;
}

export default function FloatingCharacters({ className = "" }: { className?: string }) {
  const [chars, setChars] = useState<FloatingChar[]>([]);

  useEffect(() => {
    let idCounter = 0;
    
    const createChar = (isInitial = false) => {
      // Pour l'effet de convergence, au début ils partent tous des bords ou coins
      // Ensuite les nouveaux apparaissent aléatoirement
      const targetX = Math.random() * 90 + 5;
      const targetY = Math.random() * 90 + 5;
      
      let startX = targetX;
      let startY = targetY;
      
      if (isInitial) {
        // Départ concentré au centre (convergence puis dispersion)
        // ou départ des extérieurs vers le centre! 
        // L'utilisateur demande: "converger vers le titre puis s'éloigner au lieu de juste flotter."
        // Le centre est à 50, 50
        startX = 50;
        startY = 50;
      }
      
      return {
        id: idCounter++,
        char: CHINESE_CHARS[Math.floor(Math.random() * CHINESE_CHARS.length)],
        x: targetX,
        y: targetY,
        startX: isInitial ? 50 : targetX,
        startY: isInitial ? 50 : targetY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      }
    };

    // Initial pre-fill so it doesn't look empty when first loaded
    // Nous créons un lot qui va converger depuis le centre (animé dans le JSX)
    const initialChars = Array.from({ length: 15 }).map(() => createChar(true));
    setChars(initialChars);
    
    initialChars.forEach(c => {
         setTimeout(() => {
            setChars((prev) => prev.filter((item) => item.id !== c.id));
         }, Math.random() * 4000 + 4000);
    });

    const interval = setInterval(() => {
      // Create a new random char
      const newChar = createChar();

      setChars((prev) => [...prev, newChar]);

      // Remove it randomly between 3 to 6 seconds
      setTimeout(() => {
        setChars((prev) => prev.filter((c) => c.id !== newChar.id));
      }, Math.random() * 3000 + 3000);
      
    }, 400); // spawn roughly every 400ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <AnimatePresence>
        {chars.map((c) => (
          <motion.div
            key={c.id}
            className={`absolute font-serif text-5xl md:text-7xl lg:text-[100px] font-black ${c.color}`}
            initial={{ 
              opacity: 0, 
              scale: 0.1, 
              filter: "blur(20px)",
              left: `${c.startX}%`,
              top: `${c.startY}%`,
              rotate: (Math.random() - 0.5) * 120 
            }}
            animate={{ 
              opacity: Math.random() * 0.3 + 0.05, 
              scale: 1, 
              filter: "blur(2px)", 
              rotate: 0,
              left: `${c.x}%`, 
              top: `${c.y}%`
            }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(15px)", rotate: (Math.random() - 0.5) * 60 }}
            transition={{ duration: 3 + Math.random() * 2, ease: "easeOut" }}
          >
            {c.char}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
