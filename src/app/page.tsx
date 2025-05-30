import Hero from '@/components/hero'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'

export default function Home() {
  return (
    <div className="space-y-24 pb-24 pt-40">
      <section className="container max-w-4xl">
        <Hero />
        <RecentProjects />
        <RecentPosts />
      </section>
    </div>
  )
}