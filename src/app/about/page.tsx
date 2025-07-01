import { PageTransition } from '@/components/animations/page/page-transition'
import Education from '@/app/about/components/education'
import Experience from '@/app/about/components/experience'
import Interests from '@/app/about/components/interests'
import Introduction from '@/app/about/components/introduction'
import Skills from '@/app/about/components/skills'

export const metadata = {
  title: 'About Me',
  description: 'Learn more about my background, skills, and experience.'
}

export default function AboutPage() {
  return (
    <PageTransition>
      <div className='container max-w-4xl py-24'>
        <Introduction />
        <Experience />
        <Skills />
        <Education />
        <Interests />
      </div>
    </PageTransition>
  )
}
