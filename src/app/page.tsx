import Hero from '@/components/hero'
import { PageTransition } from '@/components/page-transition'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'

export default function Home() {
  return (
    <PageTransition>
      <div className="space-y-24 pb-24 pt-40">
        <section className="container max-w-4xl">
          <Hero />
          <RecentProjects />
          <RecentPosts />
        </section>
      </div>
    </PageTransition>
  )
}