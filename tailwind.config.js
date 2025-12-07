/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 🎨 Primary Colors
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',  // Main Primary
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // 🌊 Secondary Colors (Cyan/Teal)
        secondary: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',  // Main Secondary
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },
        // 🌟 Accent Colors (Amber/Gold)
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',  // Main Accent
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // 🖤 Neutral Colors
        dark: '#1E293B',
        light: '#F8FAFC',
        muted: '#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'elevated': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#2563EB",
          "secondary": "#0891B2",
          "accent": "#F59E0B",
          "neutral": "#1E293B",
          "base-100": "#FFFFFF",
          "info": "#3ABFF8",
          "success": "#10B981",
          "warning": "#FBBF24",
          "error": "#EF4444",
        },
        dark: {
          "primary": "#3B82F6",
          "secondary": "#06B6D4",
          "accent": "#FBBF24",
          "neutral": "#1E293B",
          "base-100": "#0F172A",
          "info": "#3ABFF8",
          "success": "#10B981",
          "warning": "#FBBF24",
          "error": "#EF4444",
        },
      },
    ],
  },
}