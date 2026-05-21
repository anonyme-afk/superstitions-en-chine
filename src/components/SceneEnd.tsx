import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const Confetti = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generate 60 pieces of confetti
    const newParticles = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // vw
      y: -20 - Math.random() * 30, // vh (start above)
      color: Math.random() > 0.5 ? '#d60000' : '#ffd700',
      size: Math.random() * 8 + 6,
      rotate: Math.random() * 360,
      duration: Math.random() * 3 + 3,
      delay: Math.random() * 3, // fall within 0-3s window
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            backgroundColor: p.color,
            boxShadow: `0 2px 4px rgba(0,0,0,0.2)`
          }}
          animate={{
            y: ['0vh', '120vh'], // Fall straight down 120vh from top
            rotate: [p.rotate, p.rotate + 360 + Math.random() * 720],
            x: [`${p.x}vw`, `${p.x + (Math.random() * 20 - 10)}vw`],
            opacity: [1, 1, 1, 0] // Fade out at the end
          }}
          transition={{
            duration: p.duration,
            delay: 1.5 + p.delay, // Wait a bit before rain starts
            ease: [0.25, 1, 0.5, 1], // Wait, falling is usually 'easeIn' or 'linear'.
            // Actually, we want them to fall like gravity, maybe linear is fine since there's air resistance.
            // Oh, the user says "rain of confetti... for 3 seconds, then slow down/fade out".
            times: [0, 1], // Just let them fall through the screen
          }}
        />
      ))}
    </div>
  );
};

export default function SceneEnd() {
  const words = ["¡Gracias", "por", "escucharme", "!"];
  
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-12 z-10 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
    >
      <Confetti />

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 max-w-6xl relative z-10 perspective-1000">
        {words.map((word, index) => {
          // Generate pseudo-random angles and positions for the throwing effect
          const finalAngle = index % 2 === 0 ? -4 : 5;
          const xOffset = index % 2 === 0 ? -150 : 150;
          const yOffset = index % 3 === 0 ? -200 : 150;
          
          return (
            <motion.div
              key={index}
              className={`flex items-center justify-center px-6 py-4 md:px-10 md:py-6 rounded-2xl border-4 md:border-8 border-black shadow-[10px_10px_0px_rgba(0,0,0,1)] ${index === 3 ? 'bg-[#ffd700] text-black border-black' : 'bg-[#d60000] text-white'}`}
              initial={{ 
                opacity: 0, 
                scale: 6, 
                rotate: finalAngle * 10,
                x: xOffset,
                y: yOffset,
                z: 500,
                filter: "blur(20px)",
                boxShadow: "50px 50px 100px rgba(0,0,0,0.5)"
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: finalAngle,
                x: 0,
                y: 0,
                z: 0,
                filter: "blur(0px)",
                boxShadow: "15px 15px 0px rgba(0,0,0,0.8)"
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 15,
                mass: 2,
                delay: 0.5 + index * 0.4,
              }}
            >
              <h1 
                className="text-5xl md:text-7xl lg:text-9xl xl:text-[140px] font-black uppercase leading-none tracking-tight"
                style={{ textShadow: index === 3 ? 'none' : '0 4px 0px #800000' }}
              >
                {word}
              </h1>
            </motion.div>
          );
        })}
      </div>
      

      {/* Visual impact bursts for each word */}
      {words.map((_, index) => (
         <motion.div
            key={`burst-${index}`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#d60000] rounded-full mix-blend-screen pointer-events-none z-0"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 2, 3], 
              opacity: [0, 0.5, 0] 
            }}
            transition={{
              duration: 0.6,
              delay: 0.5 + index * 0.4,
              ease: "easeOut"
            }}
         />
      ))}

      {/* Marquee Footer */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-8 bg-[#d60000] overflow-hidden flex items-center z-40 border-t border-white/20 shadow-[0_-5px_15px_rgba(214,0,0,0.5)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
         <motion.div 
           className="whitespace-nowrap flex"
           animate={{ x: [0, -1000] }}
           transition={{ ease: "linear", duration: 15, repeat: Infinity }}
         >
           {/* Repeat the text a few times to make the infinite scroll smooth */}
           {[...Array(20)].map((_, i) => (
             <span key={i} className="text-[#ffd700] text-xs font-black uppercase tracking-[0.3em] px-8">
               hecho por Chance NANEGNON
             </span>
           ))}
         </motion.div>
      </motion.div>
    </motion.div>
  );
}
