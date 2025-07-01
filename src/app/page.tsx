import { PageTransition } from '@/components/animations/page/page-transition'
import Hero from '@/app/components/hero'
import RecentPosts from '@/app/components/recent-posts'
import RecentProjects from '@/app/components/recent-projects'

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