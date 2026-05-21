import { motion } from 'motion/react';
import FloatingCharacters from './FloatingCharacters';

export default function SceneStart({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full h-full z-10 px-4 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 1.5 }}
    >
      {/* Rideaux cinématiques */}
      <motion.div 
        className="fixed top-0 left-0 w-full h-[50vh] bg-black z-50 pointer-events-none"
        initial={{ y: 0 }}
        animate={{ y: '-100%' }}
        transition={{ duration: 1.2, ease: [0.64, 0, 0.78, 0], delay: 0.2 }}
      />
      <motion.div 
        className="fixed bottom-0 left-0 w-full h-[50vh] bg-black z-50 pointer-events-none"
        initial={{ y: 0 }}
        animate={{ y: '100%' }}
        transition={{ duration: 1.2, ease: [0.64, 0, 0.78, 0], delay: 0.2 }}
      />

      {/* Floating Characters in the background */}
      <FloatingCharacters className="z-0" />

      <div className="text-center relative max-w-4xl w-full px-4 mx-auto flex flex-col items-center overflow-hidden z-10">
         {/* Ligne qui se dessine avant le titre */}
         <motion.div className="w-0 h-[3px] bg-[#d60000] mx-auto mb-8"
           animate={{ width: '80%' }}
           transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
         />

         <h1 className="text-[clamp(2.5rem,10vw,9rem)] font-black uppercase leading-none tracking-tight drop-shadow-2xl flex flex-col items-center mb-6">
           <span className="text-white flex flex-wrap justify-center" 
             style={{ perspective: 1000, textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,1)' }}
           >
             {"Supersticiones".split("").map((char, i) => (
               <motion.span
                 key={i}
                 className="inline-block"
                 initial={{ opacity: 0, y: 40, rotateX: -90 }}
                 animate={{ opacity: 1, y: 0, rotateX: 0 }}
                 transition={{ delay: 0.8 + i * 0.05, type: "spring", stiffness: 200 }}
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
