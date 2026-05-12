import { motion } from 'motion/react';
import Particles from './Particles';
import FloatingCharacters from './FloatingCharacters';

export default function SceneFlag() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center z-10 w-full h-full p-4 md:p-12 relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <FloatingCharacters className="z-0" />
      <Particles color="#ffd700" count={40} className="z-20 pointer-events-none" />
      
      {/* Flag Container */}
      <motion.div 
        className="relative z-10 w-full max-w-2xl lg:max-w-4xl aspect-[3/2] rounded-xl border-4 border-white/10 overflow-hidden shadow-[0_0_60px_rgba(214,0,0,0.4)] group mx-auto"
        initial={{ rotateX: 10, y: 30 }}
        animate={{ rotateX: 0, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, type: "spring", stiffness: 40 }}
        style={{
          animation: 'wave 6s ease-in-out infinite alternate',
          transformOrigin: 'left center'
        }}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" 
          alt="Drapeau de la Chine"
          className="w-full h-full object-cover"
        />

        {/* Visual Wave Effect representation over the image */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute -right-20 top-0 h-full w-[30%] bg-white/20 skew-x-[-20deg] blur-2xl md:blur-3xl pointer-events-none"></div>
        <div className="absolute left-[30%] bottom-0 h-full w-[20%] bg-black/30 skew-x-[10deg] blur-2xl pointer-events-none"></div>
      </motion.div>
    </motion.div>
  );
}
