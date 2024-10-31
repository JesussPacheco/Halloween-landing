'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Terminal, Skull, Ghost, Lock, Shield, Code, Heart, Flame } from 'lucide-react';

const NEON_PARTICLES = 100;
const MATRIX_CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン';

export default function HalloweenLanding({ customText = "", customButton }) {
  const [displayText, setText] = useState('');
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [matrixChars, setMatrixChars] = useState([]);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [portalPulse, setPortalPulse] = useState(0);

  // Inicializar efectos
  useEffect(() => {
    // Partículas de neón
    setParticles(Array.from({ length: NEON_PARTICLES }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 1,
      color: i % 2 === 0 ? 'blue' : 'green',
      depth: Math.random() * 200 - 100
    })));

    // Caracteres Matrix
    setMatrixChars(Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1
    })));

    // Efecto de portal pulsante
    const pulseInterval = setInterval(() => {
      setPortalPulse(prev => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(pulseInterval);
  }, []);

  // Efecto de typing con glitch
  useEffect(() => {
    let index = 0;
    const text = "AVISO INTERBANK  ▣";
    const glitchChance = 0.3;
    
    const typeTimer = setInterval(() => {
      if (index < text.length) {
        setText(prev => {
          if (Math.random() < glitchChance) {
            setTimeout(() => setText(text.slice(0, index + 1)), 100);
            return Array.from({ length: index + 1 }, () => 
              MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
            ).join('');
          }
          return text.slice(0, index + 1);
        });
        index++;
      } else {
        clearInterval(typeTimer);
        setShowButton(true);
        createExplosion();
      }
    }, 100);

    return () => clearInterval(typeTimer);
  }, []);

  // Seguimiento del mouse para efectos 3D
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      
      setMousePosition({ x, y });
      setRotation({
        x: y * 0.1,
        y: -x * 0.1,
        z: (x + y) * 0.05
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Efecto de explosión cuando aparece el botón
  const createExplosion = useCallback(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: `explosion-${i}`,
      x: 50,
      y: 50,
      angle: (Math.PI * 2 * i) / 50,
      speed: Math.random() * 5 + 5,
      life: 1,
      color: i % 2 === 0 ? 'blue' : 'green'
    }));

    setParticles(prev => [...prev, ...newParticles]);

    // Animar explosión
    const animate = () => {
      setParticles(prev => 
        prev
          .map(p => {
            if (p.life === undefined) return p;
            return {
              ...p,
              x: p.x + Math.cos(p.angle) * p.speed,
              y: p.y + Math.sin(p.angle) * p.speed,
              life: p.life - 0.02
            };
          })
          .filter(p => !p.life || p.life > 0)
      );
    };

    const explosionInterval = setInterval(animate, 16);
    setTimeout(() => clearInterval(explosionInterval), 1000);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden perspective-1000">
      {/* Fondo con efecto de portal */}
      <div 
        className="absolute inset-0 bg-black"
        style={{
          transform: `
            rotate3d(${rotation.x}, ${rotation.y}, ${rotation.z}, ${Math.sqrt(
              Math.pow(mousePosition.x, 2) + Math.pow(mousePosition.y, 2)
            ) * 0.1}deg)
          `
        }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-black" />
        
        {/* Grid cibernético */}
        <div 
          className="absolute inset-0 bg-grid-pattern"
          style={{
            transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px, 0)`,
            backgroundSize: '50px 50px',
            backgroundImage: `
              linear-gradient(to right, rgba(0, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
            `
          }}
        />

        {/* Partículas de neón */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: particle.color === 'blue' ? '#60A5FA' : '#10B981',
              boxShadow: `0 0 10px ${particle.color === 'blue' ? '#60A5FA' : '#10B981'}`,
              opacity: particle.life !== undefined ? particle.life : 0.6,
              transform: `translateZ(${particle.depth}px)`,
              animationDuration: `${particle.speed}s`
            }}
          />
        ))}

        {/* Caracteres Matrix */}
        {matrixChars.map(char => (
          <div
            key={char.id}
            className="absolute font-matrix animate-fall"
            style={{
              left: `${char.x}%`,
              top: `${char.y}%`,
              color: char.id % 2 === 0 ? '#60A5FA' : '#10B981',
              opacity: char.opacity,
              animationDuration: `${char.speed}s`,
              textShadow: `0 0 5px ${char.id % 2 === 0 ? '#60A5FA' : '#10B981'}`
            }}
          >
            {char.char}
          </div>
        ))}
      </div>

      {/* Contenido principal con efecto 3D */}
      <div 
        className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4"
        style={{
          transform: `
            translate3d(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px, 50px)
            rotate3d(${rotation.x}, ${rotation.y}, ${rotation.z}, ${Math.sqrt(
              Math.pow(mousePosition.x, 2) + Math.pow(mousePosition.y, 2)
            ) * 0.05}deg)
          `
        }}
      >
        {/* Anillos de energía */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[1, 2, 3].map((ring) => (
            <div
              key={ring}
              className="absolute rounded-full border opacity-20 animate-pulse"
              style={{
                width: `${ring * 200}px`,
                height: `${ring * 200}px`,
                borderColor: ring % 2 === 0 ? '#60A5FA' : '#10B981',
                animationDelay: `${ring * 0.2}s`,
                transform: `rotate(${ring * 30}deg)`
              }}
            />
          ))}
        </div>

     {/* Contenido principal */}
     <div className="text-center space-y-12 transform-gpu">
          {/* Iconos principales con efectos */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="relative group">
              <Shield
                className="w-16 h-16 text-blue-500 animate-pulse transition-all duration-300 transform group-hover:scale-125"
                style={{
                  filter: 'drop-shadow(0 0 10px #60A5FA)',
                  transform: `rotate3d(${rotation.x}, ${rotation.y}, 1, ${
                    Math.sqrt(Math.pow(mousePosition.x, 2) + Math.pow(mousePosition.y, 2)) * 0.3
                  }deg)`
                }}
              />
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 animate-ping" />
            </div>
            <div className="relative group">
              <Terminal
                className="w-16 h-16 text-green-500 animate-bounce transition-all duration-300 transform group-hover:scale-125"
                style={{
                  filter: 'drop-shadow(0 0 10px #10B981)',
                  transform: `rotate3d(${rotation.x}, ${rotation.y}, 1, ${
                    Math.sqrt(Math.pow(mousePosition.x, 2) + Math.pow(mousePosition.y, 2)) * 0.3
                  }deg)`
                }}
              />
              <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-20 animate-ping" />
            </div>
          </div>

          {/* Texto principal con efectos */}
          <div className="space-y-8">
            <div className="relative">
              <h1 className="text-6xl font-bold font-mono tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 animate-pulse pb-2">
                {displayText}
                <span className="animate-pulse">_</span>
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-shimmer" />
            </div>

            <div className="relative">
              <p className="text-2xl font-mono text-green-400 shadow-neon">
                {customText}
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/20 to-transparent animate-shimmer" />
            </div>
          </div>

          {/* Sección del botón con efectos */}
          {showButton && (
            <div className="space-y-8 mt-12">
              <div className="flex justify-center gap-6">
                <Heart className="w-8 h-8 text-blue-500 animate-float" />
                <Ghost className="w-8 h-8 text-green-500 animate-float animation-delay-500" />
                <Flame className="w-8 h-8 text-blue-500 animate-float animation-delay-1000" />
              </div>

              <p className="text-blue-300 font-mono animate-pulse">
               DESCARGANDO ENCANTOS.EXE...⏬
              </p>

              {/* Contenedor del botón personalizado */}
              <div className="transform hover:scale-105 transition-transform duration-300">
                {customButton}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Estilos y animaciones */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes fall {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        @keyframes particle {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .shadow-neon {
          text-shadow: 0 0 10px rgba(16, 185, 129, 0.5),
                    0 0 20px rgba(16, 185, 129, 0.3),
                    0 0 30px rgba(16, 185, 129, 0.1);
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-fall {
          animation: fall 10s linear infinite;
        }

        .animate-particle {
          animation: particle 1s ease-out forwards;
        }

        .animation-delay-500 {
          animation-delay: 500ms;
        }

        .animation-delay-1000 {
          animation-delay: 1000ms;
        }

        @font-face {
          font-family: 'Matrix';
          src: local('Matrix');
        }

        .font-matrix {
          font-family: 'Matrix', monospace;
        }
      `}</style>
    </div>
  );
}