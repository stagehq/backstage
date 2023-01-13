import { Container } from './Container'
import Link from 'next/link'


export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <Container>
        <div className="flex flex-col items-center pt-8 pb-12 md:flex-row md:justify-around md:pt-6 relative">
          <div className="flex items-baseline justify-center gap-2 ml-4 w-full md:justify-start">
            <p className="text-landing-base font-semibold">Stage</p>
            <p className="mt-1 text-landing-sm">API-based portfolio.</p>
          </div>
          <p className="flex justify-center mt-4 text-landing-sm text-gray-500 md:mt-0 w-full md:text-center">
            &copy; Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center md:justify-end text-landing-sm text-gray-500 md:mt-0 hover:text-gray-800 hover:cursor-pointer w-full">
            <Link href="/imprint">
              Imprint
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
