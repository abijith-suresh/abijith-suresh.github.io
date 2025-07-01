import Link from 'next/link'
import ThemeToggle from '../theme-toggle'

/**
 * Renders the main header of the application.
 * Includes navigation links to different sections of the portfolio and a theme toggle button.
 */
export default function Header() {
  return (
    <header className='bg-background/75 fixed inset-x-0 top-0 z-50 py-6 backdrop-blur-xs'>
      <nav className='container flex max-w-4xl items-center justify-between'>
        <div>
          <Link href='/' className='font-serif text-2xl font-bold'>
            AS
          </Link>
        </div>

        <ul className='text-muted-foreground flex items-center gap-6 text-sm font-light sm:gap-10'>
          <li className='hover:text-foreground transition-colors'>
            <Link href='/projects'>Projects</Link>
          </li>
          <li className='hover:text-foreground transition-colors'>
            <Link href='/blog'>Blog</Link>
          </li>
          <li className='hover:text-foreground transition-colors'>
            <Link href='/contact'>Contact</Link>
          </li>
          <li className='hover:text-foreground transition-colors'>
            <Link href='/about'>About</Link>
          </li>
        </ul>

        <div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
