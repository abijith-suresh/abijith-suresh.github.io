import Intro from '@/components/intro'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-24 pb-24 pt-40">
      <section className="container max-w-3xl">
        <Intro />
      </section>

      <section className="container max-w-4xl">
        <div className="mb-24">
          <div className="prose dark:prose-invert">
            <h2 className="title">About Me</h2>
            <p className="lead">
              I&apos;m a software engineer passionate about building exceptional digital experiences.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground"
            >
              <span>More about me</span>
            </Link>
          </div>
        </div>

        <RecentProjects />
        <RecentPosts />
      </section>
    </div>
  )
}