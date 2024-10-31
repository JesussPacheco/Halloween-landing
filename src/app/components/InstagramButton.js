'use client';
import React from 'react';

const InstagramButton = ({ username }) => {
  return (
    <div className="relative group">
      {/* Aura del botón */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
      
      {/* Contenedor principal del botón */}
      <a
        href={`https://instagram.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center gap-4 px-7 py-4 bg-black rounded-lg leading-none hover:text-white transition-all duration-300 transform hover:scale-105"
      >
        {/* Icono de Instagram */}
        <div className="relative w-10 h-10 transform group-hover:rotate-12 transition-transform duration-300">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-cyan-400 to-green-500 rounded-lg blur-sm opacity-70 group-hover:opacity-100 animate-pulse"></div>
          <svg
            className="relative w-full h-full"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            />
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-400"
            />
            <path
              d="M17.5 6.5h.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            />
          </svg>
        </div>

        {/* Texto del botón */}
        <div className="flex flex-col">
          <span className="text-blue-400 group-hover:text-green-400 transition-colors duration-300 font-mono text-sm">
          SÍGUEME PARA LIBERAR EL ANTIVIRUS 💝
          </span>
          <span className="text-green-400 group-hover:text-blue-400 transition-colors duration-300 font-mono font-bold">
            @{username}
          </span>
        </div>

        {/* Efecto de partículas en hover */}
        <div className="absolute -inset-2 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:animate-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1000}ms`,
                transform: `translate(-50%, -50%) translateZ(${Math.random() * 50}px)`
              }}
            />
          ))}
        </div>
      </a>
    </div>
  );
};

export default InstagramButton;