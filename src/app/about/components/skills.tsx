import {
  StaggerIn,
  StaggerItem
} from '@/components/animations/framer/transitions'
import { SectionAnimation } from '@/components/animations/section/section-animation'

interface SkillCardProps {
  title: string
  skills: string[]
  description: string
}

function SkillCard({ title, skills, description }: SkillCardProps) {
  return (
    <StaggerItem>
      <div className='rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md'>
        <h3 className='mb-2 text-lg font-semibold'>{title}</h3>
        <p className='text-muted-foreground mb-4 text-sm'>{description}</p>
        <ul className='space-y-2'>
          {skills.map(skill => (
            <li key={skill} className='flex items-center gap-2'>
              <span className='bg-primary h-2 w-2 rounded-full'></span>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </StaggerItem>
  )
}

const skillsData = [
  {
    title: 'Programming Languages',
    description:
      'Proficient in core programming languages for building efficient, maintainable codebases.',
    skills: ['JavaScript & TypeScript', 'Python', 'Java', 'C & C++']
  },
  {
    title: 'Frameworks & Libraries',
    description:
      'Hands-on experience with modern frontend and backend frameworks.',
    skills: [
      'React.js & Next.js',
      'Django, Flask & FastAPI',
      'Spring & Spring Boot',
      'Node.js & Express'
    ]
  },
  {
    title: 'Databases & Data',
    description:
      'Designing and managing both relational and NoSQL databases as well as performing data analysis.',
    skills: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Data Analysis with Pandas (Python)'
    ]
  },
  {
    title: 'DevOps & Cloud Tools',
    description:
      'Familiar with containerization, CI/CD pipelines, and cloud deployment for production-grade apps.',
    skills: ['Docker', 'AWS (EC2, S3, RDS)', 'Jenkins', 'Git & GitHub']
  }
]

export default function Skills() {
  return (
    <section className='mb-16'>
      <SectionAnimation>
        <h2 className='title mb-8'>Skills & Technologies</h2>
      </SectionAnimation>
      <StaggerIn>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {skillsData.map(skillSet => (
            <SkillCard
              key={skillSet.title}
              title={skillSet.title}
              description={skillSet.description}
              skills={skillSet.skills}
            />
          ))}
        </div>
      </StaggerIn>
    </section>
  )
}
