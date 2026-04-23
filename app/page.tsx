"use client";

const navItems = [
  { href: "about", label: "About" },
  { href: "contact", label: "Contact" },
  { href: "listening", label: "Listening" },
];

export default function Home() {
  const scrollToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="relative overflow-hidden bg-[var(--background)] px-6 py-8 sm:px-10 sm:py-10">
      <div id="top" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,76,36,0.28),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(183,46,24,0.24),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(120,40,12,0.24),transparent_34%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(209,67,33,0.26),rgba(209,67,33,0)_66%)] blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8">
        <nav className="sticky top-3 z-10 mx-auto mb-4 flex w-full justify-center">
          <div className="flex flex-wrap items-center justify-center gap-3 rounded-full border border-[rgba(255,205,190,0.14)] bg-[linear-gradient(180deg,rgba(88,31,21,0.74),rgba(26,14,11,0.88))] px-4 py-3 text-sm uppercase tracking-[0.24em] text-[rgba(255,188,160,0.78)] shadow-[0_16px_40px_rgba(26,10,5,0.22)] backdrop-blur sm:px-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={(event) => scrollToSection(event, item.href)}
                className="cursor-pointer transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <section
          id="about"
          className="scroll-mt-24 w-full rounded-[2rem] border border-white/20 bg-[linear-gradient(145deg,rgba(92,34,21,0.9),rgba(56,22,16,0.93)_42%,rgba(26,14,11,0.97))] px-8 py-12 text-stone-100 shadow-[0_30px_80px_rgba(26,10,5,0.45)] backdrop-blur sm:px-12 sm:py-16"
        >
          <div className="grid gap-12 lg:grid-cols-[1.5fr_0.9fr] lg:items-end">
            <div>
              <p className="text-lg italic tracking-[0.01em] text-[rgba(255,210,194,0.82)] sm:text-xl">
                Hello! My name is
              </p>
              <h1 className="mt-3 max-w-3xl text-6xl leading-[0.92] tracking-[-0.04em] text-[var(--foreground)] sm:text-8xl">
                Shlok Jadhav.
              </h1>

              <p className="mt-8 max-w-2xl text-xl leading-9 text-stone-200/82 sm:text-2xl">
                I&apos;m a{" "}
                <span className="font-semibold">Computer Science</span>{" "}
                and{" "}
                <span className="font-semibold">Data Science</span>{" "}
                student 
                at{" "}
                <span className="text-[#ff5e64] font-semibold">UW-Madison</span>{" "}
                interested in building data-driven systems 
                and applied machine learning for real-world problems 
                (biology, XR, perception, and more).
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[rgba(255,205,190,0.12)] bg-[linear-gradient(180deg,rgba(181,50,26,0.12),rgba(0,0,0,0.14))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <p className="text-xs uppercase tracking-[0.3em] text-[rgba(255,188,160,0.74)]">
                Current Focus
              </p>
              <p className="mt-4 text-3xl leading-tight text-[rgba(255,231,222,0.96)]">
                Actively looking for 
                <br />
                <span className="text-[#ffec96]">
                  <em>Summer 2026 Opportunities</em>
                </span>
              </p>
              <p className="mt-5 text-base leading-7 text-stone-300/78">
                Building in: SWE · ML · Data
              <br />
                Areas: Bio · Climate · Emerging Tech
              </p>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-24 w-full rounded-[1.75rem] border border-[rgba(255,205,190,0.14)] bg-[linear-gradient(180deg,rgba(88,31,21,0.74),rgba(26,14,11,0.88))] px-8 py-8 text-stone-100 shadow-[0_20px_60px_rgba(26,10,5,0.3)] backdrop-blur sm:px-12"
        >
          <p className="text-xs uppercase tracking-[0.32em] text-[rgba(255,188,160,0.74)]">
            Contact
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-stone-300/68">
                Personal
              </p>
              <a
                href="mailto:shlok.jadhav.07@gmail.com"
                className="mt-2 inline-block border-b border-[rgba(255,188,160,0.55)] text-2xl leading-tight text-[rgba(255,188,160,0.95)] transition-colors transition-[border-color,color] duration-200 hover:border-white hover:text-white"
              >
                shlok.jadhav.07@gmail.com
              </a>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-stone-300/68">
                School
              </p>
              <a
                href="mailto:shlok.jadhav@wisc.edu"
                className="mt-2 inline-block border-b border-[rgba(255,188,160,0.55)] text-2xl leading-tight text-[rgba(255,188,160,0.95)] transition-colors transition-[border-color,color] duration-200 hover:border-white hover:text-white"
              >
                shlok.jadhav@wisc.edu
              </a>
            </div>
          </div>
        </section>

        <section
          id="listening"
          className="scroll-mt-24 w-full rounded-[1.75rem] border border-[rgba(255,205,190,0.14)] bg-[linear-gradient(180deg,rgba(88,31,21,0.78),rgba(26,14,11,0.9))] px-8 py-8 text-stone-100 shadow-[0_20px_60px_rgba(26,10,5,0.3)] backdrop-blur sm:px-12"
        >
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[rgba(255,188,160,0.74)]">
                Currently listening to
              </p>
              <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
                <span className="text-[#e36d2f]">
                  <em>ACCELERATOR</em>
                </span>{" "}
                <span className="text-white">by </span>
                <span className="text-[#8aff9d]">
                  greek
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-stone-300/80">
                <em>ACCELERATOR</em> has been one of my favorite albums since its release in June 2024.
                <br /> 
                The album is a mix of Alternative R&B, Contemporary R&B, and Bedroom Pop.

              </p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-stone-400/85">
                My personal favorite songs from the album are:
                <br />
                <em>HOUNDS</em>, <em>SOMEDAY</em>, and <em>RIVER</em>!
              </p>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-[rgba(255,205,190,0.14)] bg-[rgba(0,0,0,0.18)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <iframe
                title="Spotify album"
                src="https://open.spotify.com/embed/album/3h1UIz988QtS6gjJciFVSu?utm_source=generator"
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-[1rem]"
              />
            </div>
          </div>
        </section>
      </div>

      <a
        href="#top"
        aria-label="Back to top"
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(255,205,190,0.18)] bg-[linear-gradient(180deg,rgba(88,31,21,0.88),rgba(26,14,11,0.94))] text-2xl text-[rgba(255,188,160,0.9)] shadow-[0_14px_35px_rgba(26,10,5,0.3)] backdrop-blur transition-colors duration-200 hover:text-white"
      >
        ↑
      </a>
    </main>
  );
}
