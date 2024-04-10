import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        'tile': 'var(--tile-size)',
        'quarter': 'calc(0.25 * var(--tile-size))'
      },
      width: {
        'half-tile': 'calc(0.5 * var(--tile-size))',
        'board': 'calc(8 * var(--tile-size))',
      },
      height: {
        'half-tile': 'calc(0.5 * var(--tile-size))',
        'board': 'calc(8 * var(--tile-size))',
      },
      backgroundSize: {
        '100%': '100%',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        secondary: {
          foreground: 'hsl(var(--secondary-foreground))'
        },
        tertiary: {
          foreground: 'hsl(var(--tertiary-foreground))'
        },
        "light-tile": "var(--light-tile)",
        "dark-tile": "var(--dark-tile)",
        "highlight": "var(--highlight)",
        "check": "var(--check)"
      },
      boxShadow: {
        'custom': '0 0 0 8px var(--dark-tile)',
        'promotion': '0 0 0 5px var(--dark-tile)',
      },
      gridTemplateColumns: {
        '25-cols-auto': '25px auto',
        '25-cols-800': 'repeat(8, var(--tile-size))'
      },
      gridTemplateRows: {
        '25-rows-800': 'repeat(8, var(--tile-size))',
      },
    },
  },
  plugins: [],
};
export default config;
