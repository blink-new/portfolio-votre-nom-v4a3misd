import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  name: string;
  image: string;
  technologies: string[];
  description: string;
  category: 'scolaire' | 'personnel';
  link?: string;
  github?: string;
}

const ProjectsSection: React.FC = () => {
  const [inView, setInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'scolaire' | 'personnel'>('all');
  const navigate = useNavigate();

  const projects: Project[] = [
    // Projets Scolaires
    {
      id: 'booki',
      name: 'Booki',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
      technologies: ['HTML', 'CSS'],
      description: 'Intégration d\'une maquette Figma en une page responsive pour un site d\'hébergement.',
      category: 'scolaire',
    },
    {
      id: 'sass-project',
      name: 'Dynamisation avec SASS',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop',
      technologies: ['SASS', 'SCSS'],
      description: 'Dynamisation d\'une page web avec une approche mobile-first et des animations.',
      category: 'scolaire',
    },
    {
      id: 'seo-optimization',
      name: 'Optimisation SEO',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      technologies: ['HTML', 'CSS'],
      description: 'Amélioration du SEO d\'un site via des ajustements de code et d\'éléments visuels.',
      category: 'scolaire',
    },
    {
      id: 'api-interaction',
      name: 'Interaction avec API pour un site de vente',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies: ['JavaScript'],
      description: 'Gestion d\'une API avec JavaScript pour un site de vente (requêtes GET/POST, panier via localStorage).',
      category: 'scolaire',
    },
    {
      id: 'sauce-api',
      name: 'API pour un site de sauces',
      image: 'https://images.unsplash.com/photo-1551218372-a8789b81b253?w=600&h=400&fit=crop',
      technologies: ['Node.js', 'Express.js', 'MongoDB'],
      description: 'Création d\'une API sécurisée avec opérations CRUD pour un site de partage de sauces.',
      category: 'scolaire',
    },
    {
      id: 'react-rental',
      name: 'Front-end React pour un site de location',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
      technologies: ['React.js'],
      description: 'Développement d\'un front-end React pour un site de location avec cartes dynamiques.',
      category: 'scolaire',
    },
    // Projets Personnels
    {
      id: 'netflix-organizer',
      name: 'Organisateur de sites web (style Netflix)',
      image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop',
      technologies: ['React.js', 'Vite.js', 'TypeScript', 'AWS S3', 'CloudFront'],
      description: 'Site inspiré de Netflix pour classer des sites par catégories, hébergé sur le cloud.',
      category: 'personnel',
    },
    {
      id: 'pc-guide',
      name: 'Guide d\'achat de PC',
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&h=400&fit=crop',
      technologies: ['React', 'Vite', 'TypeScript', 'IA'],
      description: 'Site de configurations PC avec benchmarks et recommandations par budget.',
      category: 'personnel',
    },
    {
      id: 'repair-company',
      name: 'Site pour une entreprise de dépannage',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Figma', 'GitHub'],
      description: 'Site complet avec SEO, maquette Figma et hébergement GitHub.',
      category: 'personnel',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('projects');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const handleProjectClick = (project: Project) => {
    navigate(`/project/${project.id}`, { state: { project } });
  };

  return (
    <section id="projects" className="min-h-screen py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-red-500 mb-6">
            Mes Projets
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Découvrez une sélection de mes projets scolaires et personnels sous forme de cartes.
            Cliquez pour accéder à une page détaillée avec description complète.
          </p>
          
          {/* Filtres */}
          <div className="flex justify-center space-x-4 mb-12">
            {[
              { key: 'all', label: 'Tous' },
              { key: 'scolaire', label: 'Projets Scolaires' },
              { key: 'personnel', label: 'Projets Personnels' },
            ].map((filter) => (
              <motion.button
                key={filter.key}
                onClick={() => setActiveCategory(filter.key as 'all' | 'scolaire' | 'personnel')}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === filter.key
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                    : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 hover:border-red-500/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                y: -10,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 0, 0, 0.2)"
              }}
              onClick={() => handleProjectClick(project)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-red-500/20 transition-colors duration-300" />
                
                {/* Badge catégorie */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.category === 'scolaire' 
                      ? 'bg-blue-500/80 text-white' 
                      : 'bg-green-500/80 text-white'
                  }`}>
                    {project.category === 'scolaire' ? 'Scolaire' : 'Personnel'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-red-500 mb-3 group-hover:text-red-400 transition-colors">
                  {project.name}
                </h3>
                
                <p className="text-white/80 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-black/50 text-white text-xs rounded-full border border-gray-700 group-hover:border-red-500/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;