import { StaggerIn, StaggerItem } from '@/components/animations/framer/transitions'
import { SectionAnimation } from '@/components/animations/section/section-animation'

interface SkillCardProps {
  title: string
  skills: string[]
}

function SkillCard({ title, skills }: SkillCardProps) {
  return (
    <StaggerItem>
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 font-semibold">{title}</h3>
        <ul className="space-y-2">
          {skills.map((skill) => (
            <li key={skill} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
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
    title: 'Frontend Development',
    skills: ['React & Next.js']
  },
  {
    title: 'Backend Development',
    skills: ['Node.js']
  },
  {
    title: 'Other Skills',
    skills: ['Git & Version Control']
  }
]

export default function Skills() {
  return (
    <section className="mb-16">
      <SectionAnimation>
        <h2 className="title-sm mb-8">Skills & Technologies</h2>
      </SectionAnimation>
      <StaggerIn>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillsData.map((skillSet) => (
            <SkillCard
              key={skillSet.title}
              title={skillSet.title}
              skills={skillSet.skills}
            />
          ))}
        </div>
      </StaggerIn>
    </section>
  )
}