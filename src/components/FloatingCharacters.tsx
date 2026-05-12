import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CHINESE_CHARS = ['福', '吉', '寿', '财', '安', '康', '中', '国', '幸', '运', '龙', '凤'];
const COLORS = ['text-[#d60000]', 'text-[#ffd700]', 'text-zinc-500'];

interface FloatingChar {
  id: number;
  char: string;
  x: number;
  y: number;
  color: string;
}

export default function FloatingCharacters({ className = "" }: { className?: string }) {
  const [chars, setChars] = useState<FloatingChar[]>([]);

  useEffect(() => {
    let idCounter = 0;
    
    const createChar = () => ({
        id: idCounter++,
        char: CHINESE_CHARS[Math.floor(Math.random() * CHINESE_CHARS.length)],
        x: Math.random() * 90 + 5, // keep away from absolute edges
        y: Math.random() * 90 + 5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
    });

    // Initial pre-fill so it doesn't look empty when first loaded
    const initialChars = Array.from({ length: 8 }).map(createChar);
    setChars(initialChars);
    
    initialChars.forEach(c => {
         setTimeout(() => {
            setChars((prev) => prev.filter((item) => item.id !== c.id));
         }, Math.random() * 3000 + 2000);
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
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            initial={{ opacity: 0, scale: 0.2, filter: "blur(10px)", rotate: (Math.random() - 0.5) * 60 }}
            animate={{ opacity: Math.random() * 0.4 + 0.1, scale: 1, filter: "blur(0px)", rotate: 0 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(15px)", rotate: (Math.random() - 0.5) * 60 }}
            transition={{ duration: 2 + Math.random() }}
          >
            {c.char}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
