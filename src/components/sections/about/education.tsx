import { StaggerIn, StaggerItem } from '@/components/animations/framer/transitions'
import { SectionAnimation } from '@/components/animations/section/section-animation'

interface EducationItemProps {
  degree: string
  university: string
  period: string
  description: string
}

function EducationItem({ degree, university, period, description }: EducationItemProps) {
  return (
    <StaggerItem>
      <div>
        <h3 className="font-semibold">{degree}</h3>
        <p className="text-sm text-muted-foreground">{university} • {period}</p>
        <p className="mt-2">{description}</p>
      </div>
    </StaggerItem>
  )
}

const educationData = [
  {
    degree: 'Degree Name',
    university: 'University Name',
    period: 'Year - Year',
    description: 'Brief description or achievements'
  }
]

export default function Education() {
  return (
    <section className="mb-16">
      <SectionAnimation>
        <h2 className="title-sm mb-8">Education</h2>
      </SectionAnimation>
      <StaggerIn>
        <div className="space-y-8">
          {educationData.map((education, index) => (
            <EducationItem
              key={index}
              degree={education.degree}
              university={education.university}
              period={education.period}
              description={education.description}
            />
          ))}
        </div>
      </StaggerIn>
    </section>
  )
}