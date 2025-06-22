import React from 'react';
import { motion } from 'framer-motion';

interface IntroSectionProps {
  scrollY: number;
}

const IntroSection: React.FC<IntroSectionProps> = ({ scrollY }) => {
  return (
    <section
      id="intro"
      className="min-h-screen flex items-center justify-center relative z-10"
      style={{
        transform: `translateY(${scrollY * 0.5}px)`, // Effet parallaxe
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="bg-black/60 backdrop-blur-sm rounded-lg p-8 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-red-500 mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Alexandre Dupont
          </motion.h1>
          
          <motion.div
            className="text-xl md:text-2xl text-white mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="mb-4">
              Je suis <span className="text-red-500 font-semibold">Alexandre Dupont</span>, 
              un développeur front-end de <span className="text-red-500 font-semibold">25 ans</span>,
            </p>
            <p className="mb-4">
              titulaire d'un <span className="text-red-500 font-semibold">Master en Informatique</span> en{' '}
              <span className="text-red-500 font-semibold">Développement Web</span>.
            </p>
            <p>
              Passionné par la création d'interfaces web intuitives et performantes,{' '}
              <span className="text-red-500 font-semibold">je transforme des idées en solutions digitales innovantes</span>.
            </p>
          </motion.div>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/25"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Voir mes projets
            </motion.button>
            
            <motion.button
              className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Me contacter
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;