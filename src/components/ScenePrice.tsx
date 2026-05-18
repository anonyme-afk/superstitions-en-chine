import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Sparkles, X } from 'lucide-react';

export default function ScenePrice() {
  const [phase, setPhase] = useState(0); 

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1500);
    const t2 = setTimeout(() => setPhase(2), 2500);
    const t2b = setTimeout(() => setPhase(2.5), 3500); // explosion
    const t3 = setTimeout(() => setPhase(3), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t2b); clearTimeout(t3); };
  }, []);

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center bg-zinc-900 rounded-3xl border border-white/5 overflow-hidden p-4 md:p-8 shadow-2xl w-full h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
       <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-[#ffd700]/10 rounded-full blur-[100px] pointer-events-none mt-20 md:mt-0"></div>

      <div className="relative flex flex-col md:flex-row items-center justify-center w-full max-w-5xl z-10 gap-8 md:gap-16 lg:gap-24 min-h-[90%] my-auto py-10 md:py-0">
        
       {/* Price display side */}
       <div className="text-center flex-1 order-2 md:order-1 flex flex-col items-center justify-center w-full">
           <motion.h2 
            className="text-4xl md:text-6xl xl:text-8xl font-black uppercase tracking-tight mb-8 md:mb-12"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,1)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            El Truco Comercial
          </motion.h2>

          <div className="relative flex flex-col items-center justify-center min-h-[160px] md:min-h-[200px] w-full bg-black/80 rounded-3xl border border-white/30 p-6 shadow-inner max-w-md mx-auto">
             {phase < 3 ? (
                <motion.span 
                  key="price-40"
                  className="text-[100px] md:text-[140px] xl:text-[200px] font-black font-mono text-white leading-none"
                  style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
                  initial={{ filter: "blur(10px)", opacity: 0, scale: 0.9 }}
                  animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
                  exit={{ scale: 1.2, opacity: 0, filter: "blur(20px)" }}
                >
                  40 ¥
                </motion.span>
             ) : (
                <>
                  <motion.span className="text-4xl md:text-6xl xl:text-8xl font-mono font-black line-through opacity-80 absolute top-4 md:top-6"
                     initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
                  >
                    40 ¥
                  </motion.span>
                  <motion.div 
                    key="price-39"
                    className="text-[60px] md:text-[100px] xl:text-[140px] font-black font-mono text-[#ffd700] tracking-tighter flex items-center justify-center mt-6 md:mt-8 relative leading-none whitespace-nowrap"
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
                    initial={{ scale: 0.5, filter: "blur(20px)", opacity: 0 }}
                    animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.6 }}
                  >
                    <Sparkles className="absolute -top-6 -left-8 w-8 h-8 md:w-12 md:h-12 text-[#ffd700] animate-pulse" />
                    39<span className="text-white text-[50px] md:text-[80px] xl:text-[100px] mx-2 md:mx-4">+</span>1 ¥
                    <Sparkles className="absolute -bottom-4 -right-10 w-8 h-8 md:w-10 md:h-10 text-[#ffd700] animate-pulse delay-150" />
                  </motion.div>
                </>
             )}
             
             {phase === 2.5 && (
               <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                 {/* Explosion de particules depuis le centre */}
                 {[...Array(16)].map((_, i) => (
                   <motion.div
                     key={i}
                     className="absolute w-3 h-3 rounded-full"
                     style={{ 
                       backgroundColor: i % 2 === 0 ? '#ffd700' : '#d60000',
                       boxShadow: `0 0 10px ${i % 2 === 0 ? '#ffd700' : '#d60000'}`
                     }}
                     initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                     animate={{ 
                       x: Math.cos((i / 16) * Math.PI * 2) * 200,
                       y: Math.sin((i / 16) * Math.PI * 2) * 200,
                       scale: 0,
                       opacity: 0
                     }}
                     transition={{ duration: 0.6, ease: "easeOut" }}
                   />
                 ))}
                 {/* Flash blanc */}
                 <motion.div 
                   className="absolute inset-0 bg-white rounded-3xl"
                   initial={{ opacity: 0.8 }}
                   animate={{ opacity: 0 }}
                   transition={{ duration: 0.3 }}
                 />
               </motion.div>
             )}
          </div>
        </div>

        {/* Character Icon Side */}
        <div className="flex-1 order-1 md:order-2 flex flex-col items-center justify-center w-full mt-4 md:mt-0">
          <AnimatePresence mode="popLayout">
            {phase >= 1 && (
              <motion.div 
                className="flex flex-col items-center relative w-full justify-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring" }}
              >
                <motion.div 
                    className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 shrink-0 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 border-4 border-white/10 flex items-center justify-center mb-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative"
                    animate={{ 
                      x: phase === 2 ? [-10, 10, -10, 10, 0] : 0,
                      rotate: phase === 2 ? [-5, 5, -5, 5, 0] : 0,
                      scale: phase === 2 ? 1.1 : 1
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-[60px] md:text-[90px] drop-shadow-xl flex items-center justify-center text-center leading-none mt-4 md:mt-0 relative group">
                      {phase < 2 ? "🤔" : phase === 2 ? "🙅‍♂️" : "😁👌"}
                    </span>
                    
                    {phase === 2 && (
                      <motion.div
                        className="absolute -top-6 -left-6 md:-top-10 md:-left-10 bg-[#d60000] text-white font-black text-xl md:text-3xl px-6 py-3 rounded-full shadow-2xl z-20 rotate-[-10deg]"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        ¡NO!
                        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-[#d60000] rotate-45"></div>
                      </motion.div>
                    )}
                </motion.div>
                
                <motion.div
                  className="bg-black/80 backdrop-blur-md p-6 md:p-10 rounded-2xl border border-white/30 w-full max-w-lg shadow-2xl mx-auto"
                  style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,1)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 20 }}
                >
                  <p className="text-center text-xl md:text-3xl xl:text-4xl font-bold font-serif italic text-white">
                    "Mejor esquivar el <span className="text-[#d60000] not-italic font-black text-3xl md:text-5xl xl:text-7xl">4</span> que asustar al comprador."
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
