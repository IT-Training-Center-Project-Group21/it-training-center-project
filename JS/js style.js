   tailwind.config = {
      theme: {
        extend: {
          animation: {
            'float-glow': 'floatGlow 4s ease-in-out infinite',
            'pulse-fast': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          },
          keyframes: {
            floatGlow: {
              '0%, 100%': { 
                transform: 'translateY(0px) scale(1)',
                filter: 'drop-shadow(0 0 25px rgba(6, 182, 212, 0.8))'
              },
              '50%': { 
                transform: 'translateY(-12px) scale(1.03)',
                filter: 'drop-shadow(0 0 50px rgba(59, 130, 246, 1))'
              },
            },
            pulseGlow: {
              '0%, 100%': { opacity: '0.4', transform: 'scaleX(0.9)' },
              '50%': { opacity: '1', transform: 'scaleX(1.1)' }
            }
          }
        }
      }
    }