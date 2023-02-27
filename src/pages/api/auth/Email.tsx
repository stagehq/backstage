import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Img } from '@react-email/img';
import { Link } from '@react-email/link';
import { Preview } from '@react-email/preview';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { getBaseUrl } from '../../../helper/getBaseUrl';
import Logo from './Logo';

interface EmailProps {
  magicLink: string;
}

export default function Email({ magicLink }: EmailProps) {
  return (
      <Html>
      <Head />
      <Preview>Log in with this magic link.</Preview>
      <Body style={main}>
        <Container style={container}>
          <div style={{ height: '48px', width: '48px' }}>
            <Logo />
          </div>
          <Heading style={heading}>🪄 Your magic link</Heading>
          <Section style={body}>
            <Text style={paragraph}>
              <Link style={link} href={magicLink}>
                👉 Click here to sign in 👈
              </Link>
            </Text>
            <Text style={paragraph}>
              If you didn't request this, please ignore this email.
            </Text>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />- Stage Team
          </Text>
          <Hr style={hr} />
          <Img
            src={`${getBaseUrl()}/static/stage-logo.png`}
            width={32}
            height={32}
            style={{
              WebkitFilter: 'grayscale(100%)',
              filter: 'grayscale(100%)',
              margin: '20px 0',
            }}
          />
          <div style={{
            height: '32px', width: '32px', WebkitFilter: 'grayscale(100%)',
            filter: 'grayscale(100%)',
            margin: '20px 0', }}>
            <Logo />
          </div>
          <Text style={footer}>Stage</Text>
          <Text style={footer}>
            Build with ❤️ in Germany
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 25px 48px',
  backgroundColor: '#ffffff',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '48px',
};

const body = {
  margin: '24px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const link = {
  color: '#000000',
};

const hr = {
  borderColor: '#dddddd',
  marginTop: '48px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  marginLeft: '4px',
};