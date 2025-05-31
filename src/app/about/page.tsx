import { PageTransition } from '@/components/animations/page/page-transition'
import Education from '@/components/sections/about/education'
import Experience from '@/components/sections/about/experience'
import Interests from '@/components/sections/about/interests'
import Introduction from '@/components/sections/about/introduction'
import Skills from '@/components/sections/about/skills'

export const metadata = {
  title: 'About Me',
  description: 'Learn more about my background, skills, and experience.'
}

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="container max-w-4xl py-24">
        <Introduction />
        <Experience />
        <Skills />
        <Education />
        <Interests />
      </div>
    </PageTransition>
  )
}