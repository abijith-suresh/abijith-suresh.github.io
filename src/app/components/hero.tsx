import { SectionAnimation } from '@/components/animations/section/section-animation'
import Image from 'next/image'
import authorImage from '../../../public/images/abijith.png'
import { ViewAllLink } from '@/components/view-all-link'

/**
 * Renders the hero section of the homepage.
 * Displays a brief introduction, a link to the about page, and a profile image.
 * Uses `SectionAnimation` for animated entry of content.
 */
export default function Hero() {
  return (
    <section className='pb-24'>
      <div className='flex flex-col-reverse items-start gap-x-10 gap-y-8 md:flex-row md:items-center'>
        <SectionAnimation>
          <div className='flex-1'>
            <h1 className='title no-underline'>Hey, I&#39;m Abijith.</h1>
            <p className='text-muted-foreground mt-3 text-lg font-light'>
              I&#39;m a software engineer based in Kochi, Kerala, India,
              passionate about building exceptional digital experiences and
              sharing knowledge with others.
            </p>
            <div className='mt-6'>
              <ViewAllLink href='/about' text='More about me' />
            </div>
          </div>
        </SectionAnimation>
        <SectionAnimation>
          <div className='relative'>
            <Image
              className='flex-1 rounded-lg grayscale'
              src={authorImage}
              alt='Abijith'
              width={350}
              height={350}
              priority
            />
          </div>
        </SectionAnimation>
      </div>
    </section>
  )
}
