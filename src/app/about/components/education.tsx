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
      <div className="relative border-l pl-8">
        <div className="absolute -left-[7px] h-4 w-4 rounded-full border-2 border-background bg-primary"></div>
        <div>
          <h3 className="font-semibold">{degree}</h3>
          <p className="text-sm text-muted-foreground">{university} • {period}</p>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </StaggerItem>
  )
}

const educationData = [
  {
    degree: 'Bachelor of Technology in Computer Science Engineering',
    university: 'Adi Shankara Institute Of Engineering And Technology, Kalady',
    period: 'Aug 2020 - July 2024',
    description: 'Completed B.Tech in Computer Science with focus on core subjects including Data Structures & Algorithms, Database Management Systems, Object Oriented Programming, Operating Systems, Computer Networks and Web Technologies. Developed strong problem-solving skills and practical programming experience through coursework and projects.'
  }
]

export default function Education() {
  return (
    <section className="mb-16">
      <SectionAnimation>
        <h2 className="title mb-8">Education</h2>
      </SectionAnimation>
      <StaggerIn>
        <div className="space-y-12">
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