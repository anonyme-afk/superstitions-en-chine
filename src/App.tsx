// src/App.tsx
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import SceneStart from './components/SceneStart';
import SceneFlag from './components/SceneFlag';
import SceneFear from './components/SceneFear';
import ScenePrice from './components/ScenePrice';
import SceneEnd from './components/SceneEnd';

export default function App() {
  const [currentScene, setCurrentScene] = useState(0);

  const nextScene = () => {
    if (currentScene < 4) setCurrentScene(currentScene + 1);
  };

  const prevScene = () => {
    if (currentScene > 0) setCurrentScene(currentScene - 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextScene();
      } else if (e.key === 'ArrowLeft') {
        prevScene();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene]);

  return (
    <div className="w-full h-screen bg-black text-white font-sans overflow-hidden flex flex-col selection:bg-[#d60000] selection:text-white">
      {/* Main Presentation Canvas */}
      <main className="flex-1 relative flex items-center justify-center p-4 pb-16 md:p-8 md:pb-20 overflow-hidden h-full">
        {/* Background radial gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a0000]/40 to-transparent pointer-events-none" />

        <div className="w-full h-full max-w-7xl relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentScene === 0 && <SceneStart key="start" onStart={nextScene} />}
            {currentScene === 1 && <SceneFlag key="flag" />}
            {currentScene === 2 && <SceneFear key="fear" />}
            {currentScene === 3 && <ScenePrice key="price" />}
            {currentScene === 4 && <SceneEnd key="end" />}
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Footer Controls */}
      <footer className="absolute bottom-4 md:bottom-6 left-0 right-0 flex items-center justify-center z-50 px-4 pointer-events-none">
        <div className="flex gap-4 md:gap-8 items-center justify-between bg-black/40 backdrop-blur-lg px-6 py-2 md:py-3 rounded-full border border-white/10 shadow-2xl pointer-events-auto">
          <button 
            onClick={prevScene}
            disabled={currentScene === 0}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            <span className="text-lg md:text-xl font-bold">←</span>
          </button>
          
           <div className="flex gap-3 md:gap-4 items-center">
             {[0, 1, 2, 3, 4].map((sceneIndex) => (
              <div 
                key={sceneIndex} 
                className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-500 cursor-pointer ${currentScene === sceneIndex ? 'bg-[#ffd700] shadow-[0_0_10px_rgba(255,215,0,0.8)] scale-150' : 'bg-white/20 hover:bg-white/40'}`} 
                onClick={() => setCurrentScene(sceneIndex)}
              />
            ))}
          </div>

          <button 
            onClick={nextScene}
            disabled={currentScene === 4}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            <span className="text-lg md:text-xl font-bold">→</span>
          </button>
        </div>

        <button
          onClick={() => document.documentElement.requestFullscreen()}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all text-white/40 hover:text-white absolute left-4 bottom-0 md:bottom-4 text-xs border border-white/10 pointer-events-auto"
          title="Plein écran (F11)"
        >
          ⛶
        </button>
      </footer>
    </div>
  );
}
