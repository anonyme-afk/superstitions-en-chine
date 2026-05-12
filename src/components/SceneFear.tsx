import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const Person = ({ className }: { className?: string }) => (
  // simplified person running
  <div className={`w-5 h-10 md:w-8 md:h-16 bg-white/50 rounded-full blur-[1px] rotate-[20deg] ${className}`}></div>
);

export default function SceneFear() {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    // Trigger shake after 2 seconds when the '4' hits
    const timer = setTimeout(() => {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-[#0a0000] rounded-2xl w-full h-full border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.8)] ${shake ? 'animate-shake' : ''}`}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 1 }}
    >
      {/* Background ominous red glow */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent,_var(--tw-gradient-stops))] from-transparent to-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
      />
      <motion.div 
        className="absolute inset-0 bg-[#d60000]/10 mix-blend-overlay pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.1 }}
      />

      {/* The number 4 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full mb-[5vh] mt-[5vh]">
        <motion.h2
          className="text-[150px] md:text-[250px] lg:text-[350px] font-black text-[#d60000] leading-none drop-shadow-[0_0_80px_rgba(214,0,0,0.8)] animate-pulse"
          initial={{ scale: 3, opacity: 0, y: -200 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.5, 
            duration: 0.5, 
            type: "spring", 
            stiffness: 100, 
            damping: 10 
          }}
        >
          4
        </motion.h2>
        <motion.div 
           className="w-full flex flex-col items-center justify-center mt-[-10px] md:mt-[-20px] z-20 relative"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 2.5 }}
        >
          <h3 className="text-2xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white drop-shadow-2xl text-center px-4">
            LA TETRAFOBIA
          </h3>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] mt-4 whitespace-nowrap bg-black px-4 py-2 text-white/50 border border-[#d60000]/30 rounded-full">
            Miedo Colectivo
          </p>
        </motion.div>
      </div>

      {/* Cityscape Sillouhettes (Simple rectangles) */}
      <div className="absolute bottom-0 w-full h-[25vh] md:h-[30vh] flex items-end gap-1 md:gap-4 px-2 md:px-8 opacity-40 z-0">
        <div className="bg-zinc-900 w-full h-[30%] rounded-t-lg"></div>
        <div className="bg-zinc-900 w-full h-[20%] rounded-t-lg"></div>
        <div className="bg-zinc-900 w-full h-[60%] rounded-t-lg relative">
           <div className="absolute top-2 left-2 w-2 h-2 bg-[#d60000]/50 rounded-full animate-ping"></div>
        </div>
        <div className="bg-zinc-900 w-full h-[40%] rounded-t-lg"></div>
        <div className="bg-zinc-900 w-full h-[70%] rounded-t-lg"></div>
        <div className="bg-zinc-900 w-full h-[25%] hidden md:block rounded-t-lg"></div>
        <div className="bg-zinc-900 w-full h-[50%] hidden md:block rounded-t-lg"></div>
      </div>

      {/* Fleeing People */}
      <div className="absolute bottom-[5vh] w-full flex justify-around px-4 md:px-20 pointer-events-none z-10">
        {[...Array(8)].map((_, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={`person-${i}`}
              className="relative"
              initial={{ x: isLeft ? 100 : -100, opacity: 0 }}
              animate={{ 
                x: isLeft ? -1200 : 1200, 
                opacity: [0, 1, 1, 0],
              }}
              transition={{ 
                delay: 2 + Math.random(), 
                duration: 1.5 + Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
                ease: "linear"
              }}
            >
              <Person className={isLeft ? "-scale-x-100" : ""} />
            </motion.div>
          );
        })}
      </div>

      {/* Explanatory text */}
      <motion.div
        className="absolute top-6 md:top-10 text-center z-30 w-full px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <p className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto font-serif italic text-center px-8 py-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
          "En chino, el número 4 (四 - sì) se pronuncia casi como la palabra muerte (死 - sǐ)."
        </p>
      </motion.div>
    </motion.div>
  );
}
