import { motion } from 'motion/react';

export default function SceneStart({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full h-full z-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center relative max-w-4xl mx-auto flex flex-col items-center">
         <motion.h1 
           className="text-5xl md:text-7xl lg:text-[100px] font-bold mb-6 tracking-tight drop-shadow-2xl leading-none"
           initial={{ y: 30, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.2, duration: 1 }}
         >
           <span className="text-white block font-black uppercase">Supersticiones</span>
           <span className="text-[#d60000] block font-black uppercase mt-2 md:mt-4 text-[1.2em]">en China</span>
         </motion.h1>
      </div>
    </motion.div>
  );
}
