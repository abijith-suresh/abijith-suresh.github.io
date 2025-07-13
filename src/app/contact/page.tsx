import ContactForm from '@/components/contact-form'
import { PageTransition } from '@/components/animations/page/page-transition'
import { StaggerItem } from '@/components/animations/framer/transitions'

/**
 * Renders the contact page, which includes a contact form.
 * Allows users to send messages through the provided form.
 */
export default function Contact() {
  return (
    <PageTransition>
      <StaggerItem>
        <section className='pt-40 pb-24'>
          <div className='container max-w-4xl'>
            <h2 className='title mb-8'>Let&apos;s talk about your project</h2>

            <ContactForm />
          </div>
        </section>
      </StaggerItem>
    </PageTransition>
  )
}
