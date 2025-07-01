import { PageTransition } from '@/components/animations/page/page-transition'
import Hero from '@/app/components/hero'
import RecentPosts from '@/app/components/recent-posts'
import RecentProjects from '@/app/components/recent-projects'

/**
 * The main home page component for the portfolio website.
 * It orchestrates the display of the hero section, recent projects, and recent blog posts.
 * Uses `PageTransition` for animated page entry.
 */
export default function Home() {
  return (
    <PageTransition>
      <div className='space-y-24 pt-40 pb-24'>
        <section className='container max-w-4xl'>
          <Hero />
          <RecentProjects />
          <RecentPosts />
        </section>
      </div>
    </PageTransition>
  )
}
