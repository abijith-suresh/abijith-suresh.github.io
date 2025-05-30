import { SectionAnimation } from '@/components/animations/section/section-animation'
import Image from 'next/image'
import Link from 'next/link'
import authorImage from '../../../../public/images/abijith.png'

export default function Hero() {
  return (
    <section className='pb-24'>
      <div className='flex flex-col-reverse items-start gap-x-10 gap-y-8 md:flex-row md:items-center'>
        <SectionAnimation>
          <div className='flex-1'>
            <h1 className='title no-underline'>Hey, I&#39;m Abijith.</h1>
            <p className='mt-3 text-lg font-light text-muted-foreground'>
              I&#39;m a software engineer based in Kochi, Kerala, India, passionate about
              building exceptional digital experiences and sharing knowledge with
              others.
            </p>
            <div className='mt-6'>
              <Link
                href='/about'
                className='inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground'
              >
                <span>More about me</span>
              </Link>
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