import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <Container>
        <div className="relative flex flex-col items-center pt-8 pb-12 md:flex-row md:justify-around md:pt-6">
          <div className="ml-4 flex w-full items-baseline justify-center gap-2 md:justify-start">
            <p className="text-landing-base font-semibold">Stage</p>
            <p className="mt-1 text-landing-sm">API-based portfolio.</p>
          </div>
          <p className="mt-4 flex w-full justify-center text-landing-sm text-gray-500 md:mt-0 md:text-center">
            &copy; Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="mt-4 flex w-full justify-center text-landing-sm text-gray-500 hover:cursor-pointer hover:text-gray-800 md:mt-0 md:justify-end">
            <Link href="/imprint">Imprint</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
