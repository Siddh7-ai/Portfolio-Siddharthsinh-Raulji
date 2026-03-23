/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        mono:    ['"DM Mono"', 'monospace'],
        sans:    ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        bg:      '#e8e6e1',   // Matthew light grey
        surface: '#ffffff',
        ink:     '#111110',
        muted:   'rgba(17,17,16,0.45)',
        faint:   'rgba(17,17,16,0.12)',
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        smoothBounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        smoothEaseIn: 'cubic-bezier(0.4, 0, 1, 1)',
        smoothEaseOut: 'cubic-bezier(0, 0, 0.2, 1)',
      },
      transitionDuration: {
        150: '150ms',
        200: '200ms',
        250: '250ms',
        300: '300ms',
        350: '350ms',
        400: '400ms',
        500: '500ms',
      },
      animation: {
        'smooth-fade-in': 'smoothFadeIn 600ms cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth-slide-in': 'smoothSlideIn 500ms cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth-scale-in': 'smoothScaleIn 500ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        smoothFadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        smoothSlideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        smoothScaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
