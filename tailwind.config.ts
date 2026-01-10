import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-geist)', 'sans-serif'],
        display: ['var(--font-bricolage-grotesque)', 'sans-serif'],
        geist: ['var(--font-geist)', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: '#0077FF',
          dark: '#005BC2',
          light: '#4D9FFF',
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          blue: 'rgba(59, 130, 246, 0.1)',
          orange: 'rgba(255, 157, 53, 0.1)',
          red: 'rgba(255, 75, 75, 0.1)',
          purple: 'rgba(139, 122, 238, 0.1)',
          green: 'rgba(16, 185, 129, 0.1)',
          pink: 'rgba(236, 72, 153, 0.1)',
        },
        aqua: '#00D4FF',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: "0", transform: 'translateY(20px)' },
          '100%': { opacity: "1", transform: 'translateY(0)' }
        },
        fadeInUp: {
          '0%': { opacity: "0", transform: 'translateY(10px)' },
          '100%': { opacity: "1", transform: 'translateY(0)' }
        },
        pop: {
          '0%': { transform: 'scale(0) translateY(20px)', opacity: "0" },
          '100%': { transform: 'scale(1) translateY(0)', opacity: "1" }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'marquee': 'marquee 40s linear infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'pop': 'pop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
