import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)']
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'hsl(var(--foreground))',
            hr: {
              borderColor: 'hsl(var(--border))',
              marginTop: '3em',
              marginBottom: '3em'
            },
            'h1, h2, h3, h4, h5, h6': {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
              'scroll-margin-top': '100px'
            },
            h1: {
              marginTop: '2em',
              marginBottom: '1em'
            },
            'h2, h3': {
              marginTop: '2em',
              marginBottom: '1em'
            },
            'h4, h5, h6': {
              marginTop: '1.5em',
              marginBottom: '0.75em'
            },
            p: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
              lineHeight: '1.75'
            },
            'ul, ol': {
              marginTop: '1.5em',
              marginBottom: '1.5em',
              paddingLeft: '1.5em'
            },
            li: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
              '> p, > ul, > ol': {
                marginTop: '0.75em',
                marginBottom: '0.75em'
              }
            },
            pre: {
              backgroundColor: 'hsl(var(--muted))',
              color: 'hsl(var(--foreground))',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginTop: '1.5em',
              marginBottom: '1.5em',
              overflowX: 'auto'
            },
            code: {
              backgroundColor: 'hsl(var(--muted))',
              color: 'hsl(var(--foreground))',
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em'
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            blockquote: {
              fontWeight: '400',
              fontStyle: 'italic',
              color: 'hsl(var(--muted-foreground))',
              borderLeftWidth: '0.25rem',
              borderLeftColor: 'hsl(var(--border))',
              marginTop: '1.6em',
              marginBottom: '1.6em',
              paddingLeft: '1em'
            },
            'blockquote p:first-of-type::before': {
              content: '""'
            },
            'blockquote p:last-of-type::after': {
              content: '""'
            }
          }
        },
        lg: {
          css: {
            'h1, h2, h3, h4, h5, h6': {
              fontWeight: '600'
            }
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}

export default config
