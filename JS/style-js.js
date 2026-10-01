   tailwind.config = {
      theme: {
        extend: {
          keyframes: {
            twinkle: {
              '0%, 100%': { opacity: '0.25', transform: 'scale(0.85)' },
              '50%': { opacity: '0.9', transform: 'scale(1.05)' },
            },
            bob: {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-10px)' },
            },
            float: {
              '0%, 100%': { transform: 'translate(-50%, -50%) translateY(0)' },
              '50%': { transform: 'translate(-50%, -50%) translateY(-8px)' },
            },
            blink: {
              '0%, 90%, 100%': { transform: 'scaleY(1)' },
              '94%': { transform: 'scaleY(0.12)' },
            },
            wave: {
              '0%, 100%': { transform: 'rotate(0deg)' },
              '25%': { transform: 'rotate(-16deg)' },
              '50%': { transform: 'rotate(4deg)' },
              '75%': { transform: 'rotate(-10deg)' },
            },
            pulseGlow: {
              '0%, 100%': { filter: 'drop-shadow(0 0 2px rgba(56, 232, 232, 0.4))' },
              '50%': { filter: 'drop-shadow(0 0 8px rgba(56, 232, 232, 0.85))' },
            }
          },
          animation: {
            twinkle: 'twinkle 2.6s ease-in-out infinite',
            bob: 'bob 4s ease-in-out infinite',
            float: 'float 3.4s ease-in-out infinite',
            blink: 'blink 4.2s ease-in-out infinite',
            wave: 'wave 1.8s ease-in-out infinite',
            pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
          }
        }
      }
    }