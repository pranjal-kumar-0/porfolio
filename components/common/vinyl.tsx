import React from 'react'

interface VinylPlayerProps {
  centerColor?: string
  isPlaying?: boolean
  size?: number
}

export const VinylPlayer: React.FC<VinylPlayerProps> = ({
  centerColor = '#e74c3c',
  isPlaying = true,
  size = 300
}) => {
  return (
    <div 
      className="flex items-center justify-center"
      style={{ width: size, height: size, perspective: '1000px' }}
    >
      <div 
        className={`relative rounded-full shadow-2xl ${isPlaying ? 'animate-spin' : ''}`}
        style={{
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, #1a1a1a 0%, #000 100%)',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(0, 0, 0, 0.8)',
          animationDuration: '3s',
          animationTimingFunction: 'linear',
          transformStyle: 'preserve-3d'
        }}
      >
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `repeating-radial-gradient(
              circle at 50% 50%,
              transparent 0px,
              transparent 2px,
              rgba(255, 255, 255, 0.03) 2px,
              rgba(255, 255, 255, 0.03) 3px
            )`
          }}
        />
        
        {/*  label */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
          style={{
            width: '35%',
            height: '35%',
            backgroundColor: centerColor,
            boxShadow: `
              0 0 15px rgba(0, 0, 0, 0.4),
              inset 0 2px 5px rgba(255, 255, 255, 0.2),
              inset 0 -2px 5px rgba(0, 0, 0, 0.3)
            `
          }}
        >
          <div 
            className="rounded-full border border-white/10"
            style={{
              width: '80%',
              height: '80%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)'
            }}
          />
        </div>
        
        {/* Center */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
          style={{
            width: '8%',
            height: '8%',
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.9), 0 0 5px rgba(0, 0, 0, 0.5)'
          }}
        />
        
        {/* Reflection */}
        <div 
          className="absolute rounded-full pointer-events-none blur-lg -rotate-45"
          style={{
            top: '10%',
            left: '20%',
            width: '40%',
            height: '40%',
            background: `radial-gradient(
              ellipse at 30% 30%,
              rgba(255, 255, 255, 0.15) 0%,
              rgba(255, 255, 255, 0.05) 40%,
              transparent 70%
            )`
          }}
        />
      </div>
    </div>
  )
}