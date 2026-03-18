/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Cosmic color palette
      colors: {
        cosmic: {
          void: '#0a0a0a',           // Deep space background
          surface: '#141414',        // Card surfaces
          'surface-raised': '#1f1f1f', // Raised elements
          text: '#fafafa',           // Primary text
          'text-muted': '#a1a1a1',   // Secondary text
          accent: '#ff6b35',        // Cosmic orange (energy)
          'accent-hover': '#ff8555',  // Hover state
          'accent-subtle': 'rgba(255, 107, 53, 0.1)', // Subtle glow
          quantum: '#00d4ff',        // Quantum blue
          galactic: '#8b5cf6',       // Galactic purple
          border: 'rgba(255, 255, 255, 0.08)', // Subtle borders
        }
      },
      
      // Cosmic typography scale
      fontSize: {
        'cosmic-display': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'cosmic-heading': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'cosmic-subheading': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.3' }],
        'cosmic-body': ['1rem', { lineHeight: '1.6' }],
      },
      
      // Cosmic spacing scale
      spacing: {
        'cosmic': '4rem',
        'cosmic-lg': '6rem',
        'cosmic-xl': '8rem',
      },
      
      // Cosmic animations
      animation: {
        'cosmic-float': 'cosmicFloat 6s ease-in-out infinite',
        'cosmic-glow': 'cosmicGlow 2s ease-in-out infinite alternate',
        'cosmic-emerge': 'cosmicEmerge 0.8s ease-out forwards',
      },
      
      keyframes: {
        cosmicFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        cosmicGlow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(255, 107, 53, 0.6), 0 0 40px rgba(255, 107, 53, 0.3)' },
        },
        cosmicEmerge: {
          '0%': { opacity: '0', transform: 'translateY(30px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}