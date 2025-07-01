import {
  StaggerIn,
  StaggerItem
} from '@/components/animations/framer/transitions'
import { SectionAnimation } from '@/components/animations/section/section-animation'

interface InterestCardProps {
  category: string
  description: string
}

/**
 * Renders a card displaying a single interest or hobby.
 * Includes a category title and a description.
 * Uses `StaggerItem` for animated entry.
 */
function InterestCard({ category, description }: InterestCardProps) {
  return (
    <StaggerItem>
      <div className='rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md'>
        <h3 className='mb-2 text-lg font-semibold'>{category}</h3>
        <p className='text-muted-foreground'>{description}</p>
      </div>
    </StaggerItem>
  )
}

const interestsData = [
  {
    category: 'Technology & Coding',
    description:
      'I really enjoy building things with code, especially on the backend. I like figuring out how systems work, making things run faster, and learning new tools and frameworks whenever I get the chance.'
  },
  {
    category: 'Movies & TV Shows',
    description:
      'Watching movies and shows is one of my favorite ways to relax. I enjoy a good story, no matter the genre, and I’m always open to recommendations or talking about what I’ve seen recently.'
  },
  {
    category: 'Reading & Literature',
    description:
      'I love reading stories in all forms—books, comics, manga. I’m drawn to stories with interesting characters and plots that make me think or feel something new.'
  },
  {
    category: 'Gaming',
    description:
      'Gaming has been a big part of my life. I like both strategy games like Civilization and action games like Call of Duty. It’s a fun way to challenge myself and unwind.'
  }
]

/**
 * Renders the Interests & Hobbies section of the about page.
 * Displays various interest categories using `InterestCard` components with staggered animations.
 */
export default function Interests() {
  return (
    <section>
      <SectionAnimation>
        <h2 className='title mb-8'>Interests & Hobbies</h2>
      </SectionAnimation>
      <StaggerIn>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {interestsData.map((interest, index) => (
            <InterestCard
              key={index}
              category={interest.category}
              description={interest.description}
            />
          ))}
        </div>
      </StaggerIn>
    </section>
  )
}
