import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowLeft, ExternalLink, Github } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state?.project;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) {
    navigate('/');
    return null;
  }

  // Images d'exemple pour le carrousel
  const projectImages = [
    project.image,
    `${project.image}&sig=${Math.random()}`,
    `${project.image}&t=${Math.random()}`,
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Fond avec particules rouges animées */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
          
          {/* Particules rouges flottantes */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-500 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-white hover:text-red-500 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour au portfolio</span>
            </motion.button>
            
            <div className="text-2xl font-bold text-red-500">
              {project.name}
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="relative z-10 pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Carrousel d'images */}
            <div className="space-y-6">
              <div className="relative">
                <motion.div
                  className="relative aspect-video rounded-lg overflow-hidden bg-gray-900"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={projectImages[currentImageIndex]}
                    alt={`${project.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay avec gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Boutons de navigation du carrousel */}
                  <motion.button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
                
                {/* Indicateurs du carrousel */}
                <div className="flex justify-center space-x-2 mt-4">
                  {projectImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'bg-red-500 scale-125'
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Détails du projet */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-red-500">
                    {project.name}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.category === 'scolaire' 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                      : 'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}>
                    {project.category === 'scolaire' ? 'Projet Scolaire' : 'Projet Personnel'}
                  </span>
                </div>
                
                {/* Technologies utilisées */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech: string) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-black/50 text-white text-sm rounded-full border border-red-500/30 hover:border-red-500 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              {/* Description détaillée */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
                <h2 className="text-xl font-semibold text-red-500 mb-4">
                  Description du projet
                </h2>
                <p className="text-white/80 leading-relaxed text-lg">
                  {project.description}
                </p>
                
                {/* Fonctionnalités clés (exemple) */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Fonctionnalités clés :
                  </h3>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>Design responsive et mobile-first</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>Interface utilisateur intuitive</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>Performance optimisée</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>Code maintenable et scalable</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Liens d'action */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  className="flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Voir le projet</span>
                </motion.button>
                
                <motion.button
                  className="flex items-center justify-center space-x-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-5 h-5" />
                  <span>Code source</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;