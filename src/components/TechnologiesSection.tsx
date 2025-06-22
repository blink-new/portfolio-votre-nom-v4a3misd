import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TechnologiesSectionProps {
  scrollY: number;
}

const TechnologiesSection: React.FC<TechnologiesSectionProps> = ({ scrollY }) => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [inView, setInView] = useState(false);

  const technologies = [
    { name: 'HTML', category: 'Frontend', icon: '🌐' },
    { name: 'CSS', category: 'Frontend', icon: '🎨' },
    { name: 'JavaScript', category: 'Frontend', icon: '⚡' },
    { name: 'React.js', category: 'Frontend', icon: '⚛️' },
    { name: 'SASS', category: 'Frontend', icon: '💄' },
    { name: 'Express.js', category: 'Backend', icon: '🚀' },
    { name: 'Node.js', category: 'Backend', icon: '🟢' },
    { name: 'MongoDB', category: 'Backend', icon: '🍃' },
    { name: 'Figma', category: 'Outils', icon: '🎨' },
    { name: 'AWS S3', category: 'Outils', icon: '☁️' },
    { name: 'CloudFront', category: 'Outils', icon: '🌍' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('technologies');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const groupedTechnologies = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof technologies>);

  return (
    <section
      id="technologies"
      className="min-h-screen py-20 relative z-10"
      style={{
        transform: `translateY(${scrollY * 0.1}px)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-red-500 mb-6">
            Technologies Maîtrisées
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Voici les technologies et outils que je maîtrise, regroupés par domaine d'expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {Object.entries(groupedTechnologies).map(([category, techs], categoryIndex) => (
            <motion.div
              key={category}
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-gray-800"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
            >
              <h3 className="text-2xl font-bold text-red-500 mb-6 text-center">
                {category}
              </h3>
              
              <div className="space-y-4">
                {techs.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className="flex items-center space-x-4 p-3 rounded-lg bg-black/30 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setHoveredTech(tech.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.2 + index * 0.1 }}
                  >
                    <span className="text-2xl">{tech.icon}</span>
                    <span
                      className={`font-medium transition-colors duration-300 ${
                        hoveredTech === tech.name ? 'text-red-500' : 'text-white'
                      }`}
                    >
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Éléments flottants simplifiés */}
        <div className="mt-20 relative h-96 overflow-hidden">
          {technologies.slice(0, 6).map((tech, index) => (
            <motion.div
              key={tech.name}
              className={`absolute w-16 h-16 rounded-full border-2 border-red-500/30 flex items-center justify-center text-2xl ${
                hoveredTech === tech.name ? 'bg-red-500/20 border-red-500' : 'bg-black/20'
              }`}
              style={{
                left: `${20 + (index % 3) * 30}%`,
                top: `${20 + Math.floor(index / 3) * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotateY: [0, 360],
              }}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.2 }}
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              {tech.icon}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;