import { motion } from 'motion/react';

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
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 max-w-6xl">
        {words.map((word, index) => {
          // Generate pseudo-random angles and positions for the throwing effect
          const angle = index % 2 === 0 ? -20 : 20;
          const xOffset = index % 2 === 0 ? -100 : 100;
          const yOffset = index % 3 === 0 ? -100 : 100;
          
          return (
            <motion.span
              key={index}
              className={`text-4xl md:text-6xl lg:text-[80px] font-black uppercase drop-shadow-[0_0_30px_rgba(214,0,0,0.5)] ${index === 3 ? 'text-[#ffd700]' : 'text-white'}`}
              initial={{ 
                opacity: 0, 
                scale: 8, 
                rotate: angle,
                x: xOffset,
                y: yOffset,
                filter: "blur(20px)"
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: 0,
                x: 0,
                y: 0,
                filter: "blur(0px)"
              }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 20,
                mass: 1.5,
                delay: 0.5 + index * 0.4,
              }}
            >
              {word}
            </motion.span>
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
        transition={{ delay: 2.5, duration: 1 }}
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
