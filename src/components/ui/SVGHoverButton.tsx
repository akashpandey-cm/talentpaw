import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SVGHoverButtonProps {
  label: string;
  onClick?: () => void;
  dark?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const SVGHoverButton: React.FC<SVGHoverButtonProps> = ({ 
  label, 
  onClick, 
  dark = false,
  className = "",
  icon
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Single continuous path for a rounded rectangle (200x52 with 26px radius)
  // Total length is roughly: (2 * (200-52)) + (2 * PI * 26) = 296 + 163 = 459
  const pathLength = 460;

  return (
    <motion.button
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`group relative h-[50px] md:h-[52px] w-full sm:w-[200px] overflow-hidden rounded-full flex items-center justify-center transition-all duration-500 ${className}`}
    >
      {/* Background Layer */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundColor: dark ? '#000' : '#fff' }}
      />

      {/* Hover Background (Gradient) */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#B400FF] via-[#CB5564] to-[#FF8B00] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
        animate={{ scale: isHovered ? 1.1 : 0.9 }}
      />

      {/* SVG Border Layer */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" 
        viewBox="0 0 200 52"
        style={{ zIndex: 5 }}
      >
        <motion.path
          d="M 26,1 H 174 A 25,25 0 0 1 199,26 A 25,25 0 0 1 174,51 H 26 A 25,25 0 0 1 1,26 A 25,25 0 0 1 26,1 Z"
          fill="none"
          stroke={dark ? "#ffffff" : "#000000"}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ strokeDasharray: pathLength, strokeDashoffset: pathLength }}
          animate={{ 
            strokeDashoffset: isHovered ? 0 : pathLength,
            stroke: isHovered ? "#ffffff" : (dark ? "#ffffff" : "#000000")
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </svg>

      {/* Label & Icon */}
      <span className={`relative z-10 font-bold uppercase tracking-wide md:tracking-widest text-[12px] md:text-[13px] flex items-center justify-center gap-3 transition-colors duration-500 ${
        isHovered 
          ? 'text-white' 
          : (dark ? 'text-white' : 'text-black')
      }`}>
        {label}
        {icon && <span className="transition-transform group-hover:translate-x-1.5">{icon}</span>}
      </span>
    </motion.button>
  );
};
