import { CircleBackground } from "./CircleBackground";
import { Container } from "./Container";

export function CallToAction() {
  return (
    <section
      id="get-free-shares-today"
      className="relative overflow-hidden bg-gray-900 py-20 sm:py-28"
    >
      <div className="absolute top-1/2 left-20 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#fff" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-landing-3xl font-medium tracking-tight text-white sm:text-landing-4xl">
            Get your backstage pass today
          </h2>
          <p className="mt-4 text-landing-lg text-gray-300">
            It takes 10 seconds to sign up. We&apos;ll get back to you when
            we&apos;re ready to launch.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              className="inline-flex justify-center rounded-lg bg-white py-2 px-3 text-landing-sm font-semibold text-cyan-900 outline-2 outline-offset-2 transition-colors hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70"
              href="https://tally.so/r/w4a70o"
              target="_blank"
              color="white"
            >
              Get early access
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
