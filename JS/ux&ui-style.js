tailwind.config = {
  theme: {
    extend: {
      animation: {
        "float-glow": "floatGlow 4s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        floatGlow: {
          "0%, 100%": {
            transform: "translateY(0px) scale(1)",
            filter: "drop-shadow(0 0 25px rgba(6, 182, 212, 0.8))",
          },
          "50%": {
            transform: "translateY(-15px) scale(1.05)",
            filter: "drop-shadow(0 0 50px rgba(59, 130, 246, 1))",
          },
        },
      },
    },
  },
};
