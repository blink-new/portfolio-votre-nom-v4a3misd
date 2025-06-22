import React from 'react';

const VideoBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Fond noir de base avec effet de particules rouges */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
        
        {/* Animation de particules rouges */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
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
          
          {/* Formes géométriques rouges flottantes */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`shape-${i}`}
              className="absolute border border-red-500/30 rotate-45 animate-spin"
              style={{
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${10 + Math.random() * 20}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoBackground;