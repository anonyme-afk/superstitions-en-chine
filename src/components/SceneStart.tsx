import { motion } from 'motion/react';

export default function SceneStart({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full h-full z-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 1.5 }}
    >
      <div className="text-center relative max-w-4xl mx-auto flex flex-col items-center overflow-hidden">
         {/* Ligne qui se dessine avant le titre */}
         <motion.div className="w-0 h-[3px] bg-[#d60000] mx-auto mb-8"
           animate={{ width: '80%' }}
           transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
         />

         <h1 className="text-6xl xl:text-8xl 2xl:text-[120px] font-bold mb-6 tracking-tight leading-none flex flex-col items-center">
           <span className="text-white flex flex-wrap justify-center font-black uppercase" 
             style={{ perspective: 1000, textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,1)' }}
           >
             {"Supersticiones".split("").map((char, i) => (
               <motion.span
                 key={i}
                 className="inline-block"
                 initial={{ opacity: 0, y: 40, rotateX: -90 }}
                 animate={{ opacity: 1, y: 0, rotateX: 0 }}
                 transition={{ delay: 0.5 + i * 0.05, type: "spring", stiffness: 200 }}
               >
                 {char}
               </motion.span>
             ))}
           </span>
           
           <motion.span 
             className="text-[#d60000] block font-black uppercase mt-4 text-[1.2em]"
             animate={{ 
               x: [0, -2, 2, -1, 0],
               textShadow: [
                 '0 0 0px #d60000',
                 '3px 0 0px #ffd700, -3px 0 0px #d60000',
                 '0 0 0px #d60000'
               ]
             }}
             transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
           >
             en China
           </motion.span>
         </h1>
      </div>
    </motion.div>
  );
}
