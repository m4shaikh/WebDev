/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ---------- LIGHT THEME ----------
        // Backgrounds (canvas → surface → elevated)
        'canvas': '#F8F9FA',   // page background
        'surface': '#FFFFFF',   // cards, containers
        'elevated': '#F0F2F5',   // modals, dropdowns

        // Text / typography
        'text-primary': '#111827',   // main body text
        'text-secondary': '#4B5563',   // labels, descriptions
        'text-tertiary': '#9CA3AF',   // placeholders, disabled
        'text-accent': '#2563EB',   // links, interactive
        'text-error': '#DC2626',
        'text-success': '#059669',
        'text-warning': '#D97706',

        // Borders & dividers
        'border': '#E5E7EB',

        // ---------- DARK THEME ----------
        'canvas-dark': '#0F172A',
        'surface-dark': '#1E293B',
        'elevated-dark': '#334155',

        'text-primary-dark': '#F1F5F9',
        'text-secondary-dark': '#94A3B8',
        'text-tertiary-dark': '#64748B',
        
        'text-accent-dark': '#3B82F6',
        'text-error-dark': '#EF4444',
        'text-success-dark': '#10B981',
        'text-warning-dark': '#F59E0B',

        'border-dark': '#334155',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}