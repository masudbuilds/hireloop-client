import Image from "next/image"
import Link from "next/link"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-32 sm:py-40 lg:py-48">
      {/* Background Arch/Globe Visual */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Image
          src="/images/cta-bg.png"
          alt=""
          aria-hidden="true"
          width={1440}
          height={964}
          sizes="100vw"
          className="size-full max-w-7xl object-cover object-top select-none opacity-90"
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
          Your next role is
          <br className="hidden sm:inline" /> already looking for you
        </h2>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-[#5c53fe] px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_25px_rgba(92,83,254,0.45)] transition-all duration-200 hover:bg-[#5c53fe]/90 hover:shadow-[0_0_35px_rgba(92,83,254,0.65)]"
          >
            Create a free account
          </Link>
          <Link
            href="#pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/10"
          >
            View pricing
          </Link>
        </div>
      </div>
    </section>
  )
}
