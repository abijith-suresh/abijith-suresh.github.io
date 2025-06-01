interface EmailTemplateProps {
  name: string
  email: string
  message: string
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message
}) => (
  <div style={{
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    maxWidth: '580px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#ffffff'
  }}>
    <div style={{
      borderLeft: '4px solid #0070f3',
      paddingLeft: '16px',
      marginBottom: '24px'
    }}>
      <h1 style={{
        margin: '0',
        fontSize: '24px',
        fontWeight: '500',
        color: '#1a1a1a'
      }}>
        New Message Received
      </h1>
      <p style={{
        margin: '4px 0 0 0',
        fontSize: '14px',
        color: '#666666'
      }}>
        A new contact form submission has arrived
      </p>
    </div>

    <div style={{
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '24px'
    }}>
      <div style={{ marginBottom: '16px' }}>
        <p style={{
          margin: '0 0 4px 0',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#666666'
        }}>From</p>
        <p style={{
          margin: '0',
          fontSize: '16px',
          color: '#1a1a1a'
        }}>{name}</p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <p style={{
          margin: '0 0 4px 0',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#666666'
        }}>Email</p>
        <p style={{
          margin: '0',
          fontSize: '16px',
          color: '#1a1a1a'
        }}>{email}</p>
      </div>

      <div>
        <p style={{
          margin: '0 0 4px 0',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#666666'
        }}>Message</p>
        <p style={{
          margin: '0',
          fontSize: '16px',
          lineHeight: '1.6',
          color: '#1a1a1a',
          whiteSpace: 'pre-wrap'
        }}>{message}</p>
      </div>
    </div>

    <div style={{
      borderTop: '1px solid #eaeaea',
      paddingTop: '16px',
      marginTop: '32px'
    }}>
      <p style={{
        margin: '0',
        fontSize: '12px',
        color: '#666666',
        textAlign: 'center'
      }}>
        This email was sent from your portfolio website&apos;s contact form
      </p>
    </div>
  </div>
)

export default EmailTemplate