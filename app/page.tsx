"use client";

const navItems = [
  { href: "home", label: "Home" },
  { href: "projects", label: "Projects" },
  { href: "experience", label: "Experience" },
  { href: "awards", label: "Awards" },
  { href: "about-me", label: "About Me" },
  { href: "contact", label: "Contact" },
];

function SectionDivider({ label }: { label: string }) {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex w-full max-w-4xl items-center gap-4 px-4 text-[rgba(255,188,160,0.58)]"
    >
      <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(255,188,160,0),rgba(255,188,160,0.34))]" />
      <span className="text-xs uppercase tracking-[0.38em]">{label}</span>
      <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(255,188,160,0.34),rgba(255,188,160,0))]" />
    </div>
  );
}

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
                className="rounded-full px-2 py-1 transition duration-200 ease-out hover:-translate-y-0.5 hover:text-white hover:shadow-[0_0_18px_rgba(255,173,94,0.22)]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <SectionDivider label="Home" />

        <section
          id="home"
          className="scroll-mt-24 w-full rounded-[2rem] border border-white/20 bg-[linear-gradient(145deg,rgba(92,34,21,0.9),rgba(56,22,16,0.93)_42%,rgba(26,14,11,0.97))] px-8 py-12 text-stone-100 shadow-[0_30px_80px_rgba(26,10,5,0.45)] backdrop-blur sm:px-12 sm:py-16"
        >
          <div className="grid gap-8 xl:grid-cols-[1.35fr_0.95fr_0.8fr] xl:items-start">
            <div>
              <p className="text-lg italic tracking-[0.01em] text-[rgba(255,210,194,0.82)] sm:text-xl">
                Hello! My name is
              </p>
              <h1 className="fireplace-name mt-3 max-w-3xl text-6xl leading-[0.92] tracking-[-0.04em] text-[var(--foreground)] sm:text-8xl">
                <span className="fireplace-name__text">Shlok Jadhav.</span>
                <span className="fireplace-name__spark fireplace-name__spark--one" />
                <span className="fireplace-name__spark fireplace-name__spark--two" />
                <span className="fireplace-name__spark fireplace-name__spark--three" />
              </h1>

              <p className="mt-8 max-w-2xl text-xl leading-9 text-stone-200/82 sm:text-2xl">
                I&apos;m a{" "}
                <span className="font-semibold">Computer Science</span>{" "}
                and{" "}
                <span className="font-semibold">Data Science</span>{" "}
                student 
                at{" "}
                <span className="font-semibold">UW-Madison</span>{" "}
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

            <div className="w-full rounded-[1.75rem] border border-[rgba(255,205,190,0.14)] bg-[linear-gradient(180deg,rgba(181,50,26,0.08),rgba(0,0,0,0.18))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <div className="flex aspect-[4/5] items-center justify-center rounded-[1.35rem] border border-dashed border-[rgba(255,205,190,0.26)] bg-[rgba(0,0,0,0.18)] px-8 text-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[rgba(255,188,160,0.68)]">
                    Portrait
                  </p>
                  <p className="mt-4 text-xl leading-8 text-stone-300/82">
                    picture of myself
                  </p>
                  <p className="mt-3 text-sm leading-7 text-stone-400/82">
                    replace here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider label="Projects" />

        <section
          id="projects"
          className="scroll-mt-24 w-full rounded-[1.75rem] border border-[rgba(255,205,190,0.14)] bg-[linear-gradient(180deg,rgba(88,31,21,0.74),rgba(26,14,11,0.88))] px-8 py-8 text-stone-100 shadow-[0_20px_60px_rgba(26,10,5,0.3)] backdrop-blur sm:px-12"
        >
          <p className="text-xs uppercase tracking-[0.32em] text-[rgba(255,188,160,0.74)]">
            Projects
          </p>
          <h2 className="mt-4 text-4xl leading-tight text-[rgba(255,231,222,0.96)] sm:text-5xl">
            work in progress
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-300/80">
            MAKE DEMOS HERE AND LINK TO GITHUB REPOS AND STUFF
          </p>
        </section>

        <SectionDivider label="Experience" />

        <section
          id="experience"
          className="scroll-mt-24 w-full rounded-[1.75rem] border border-[rgba(255,205,190,0.14)] bg-[linear-gradient(180deg,rgba(88,31,21,0.78),rgba(26,14,11,0.9))] px-8 py-8 text-stone-100 shadow-[0_20px_60px_rgba(26,10,5,0.3)] backdrop-blur sm:px-12"
        >
          <p className="text-xs uppercase tracking-[0.32em] text-[rgba(255,188,160,0.74)]">
            Experience
          </p>
          <h2 className="mt-4 text-4xl leading-tight text-[rgba(255,231,222,0.96)] sm:text-5xl">
            experiences that are here
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-300/80">
            internships, research, campus work, etc
          </p>
        </section>

        <SectionDivider label="Awards" />

        <section
          id="awards"
          className="scroll-mt-24 w-full rounded-[1.75rem] border border-[rgba(255,205,190,0.14)] bg-[linear-gradient(180deg,rgba(88,31,21,0.76),rgba(26,14,11,0.89))] px-8 py-8 text-stone-100 shadow-[0_20px_60px_rgba(26,10,5,0.3)] backdrop-blur sm:px-12"
        >
          <p className="text-xs uppercase tracking-[0.32em] text-[rgba(255,188,160,0.74)]">
            Awards
          </p>
          <h2 className="mt-4 text-4xl leading-tight text-[rgba(255,231,222,0.96)] sm:text-5xl">
            recognitions and milestones
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-300/80">
            competitions stuff
          </p>
        </section>

        <SectionDivider label="About Me" />

        <section
          id="about-me"
          className="scroll-mt-24 w-full rounded-[1.75rem] border border-[rgba(255,205,190,0.14)] bg-[linear-gradient(180deg,rgba(88,31,21,0.78),rgba(26,14,11,0.9))] px-8 py-8 text-stone-100 shadow-[0_20px_60px_rgba(26,10,5,0.3)] backdrop-blur sm:px-12"
        >
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="rounded-[1.5rem] border border-[rgba(255,205,190,0.12)] bg-[linear-gradient(180deg,rgba(181,50,26,0.1),rgba(0,0,0,0.12))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <p className="text-xs uppercase tracking-[0.32em] text-[rgba(255,188,160,0.74)]">
                About Me
              </p>
              <h2 className="mt-4 text-4xl leading-tight text-[rgba(255,231,222,0.96)] sm:text-5xl">
                Hi! my name is Shlok Jadhav,
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-300/82">
                and I am a Computer Science and Data Science student at the University of Wisconsin-Madison.
                I was born and raised in San Ramon, California, which is in the Bay Area. 
                I moved to Wisconsin for college in 2025, and despite the cold, I&apos;ve really enjoyed my time here so far!
              </p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-stone-300/82">
                I realized pretty early on that college isn&apos;t just about classes and grades for me, but it&apos;s also a lifestyle and what you make of it.
                Outside of class, I&apos;m involved in research and a few student orgs on campus, and I also love to build projects for fun.
                I love keeping myself busy, so I&apos;m always trying to learn new things, meet new people, and explore new places.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-stone-300/82">
                For my hobbies, I enjoy listening to music, playing games & sports, and exploring new places.
                Some of my favorite artists recently include greek, Luna Li, Osamason, slayr, and more.
                I have been growing up with video games, playing on my sister&apos;s DS and our family Wii.
                Some of my favorite games all time include ANY Pokemon game (I know the Pokedex by heart), Minecraft, Fortnite, Valorant, 
                I have been a huge Golden State Warriors fan for as long as I can remember, and I also 
                have gotten into lifting weights and playing tennis in the past couple of years. 
                I also love to travel and explore new cities, and I&apos;m always down for trying new food.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.25rem] border border-[rgba(255,205,190,0.12)] bg-black/10 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-[rgba(255,188,160,0.68)]">
                    Interests
                  </p>
                  <p className="mt-3 text-base leading-7 text-stone-300/80">
                    adding interests here
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-[rgba(255,205,190,0.12)] bg-black/10 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-[rgba(255,188,160,0.68)]">
                    Personal Note
                  </p>
                  <p className="mt-3 text-base leading-7 text-stone-300/80">
                    fun stuff about me here
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[rgba(255,205,190,0.12)] bg-[linear-gradient(180deg,rgba(181,50,26,0.08),rgba(0,0,0,0.16))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <div className="flex aspect-[4/5] items-center justify-center rounded-[1.2rem] border border-dashed border-[rgba(255,205,190,0.24)] bg-[rgba(0,0,0,0.16)] px-8 text-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[rgba(255,188,160,0.68)]">
                    Photo
                  </p>
                  <p className="mt-4 text-xl leading-8 text-stone-300/82">
                    linked in photo
                  </p>
                  <p className="mt-3 text-sm leading-7 text-stone-400/82">
                    swap the box here
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[rgba(255,188,160,0.74)]">
                Currently listening to
              </p>
              <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
                <span className="font-bold text-[#e36d2f]">
                  <em>ACCELERATOR</em>
                </span>{" "}
                <span className="text-white">by </span>
                <span className="font-bold text-white">
                  greek
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-stone-300/80">
                <em>ACCELERATOR</em> has been one of my favorite albums since
                its release in June 2024.
                <br />
                The album is a mix of Alternative R&amp;B, Contemporary R&amp;B,
                and Bedroom Pop.
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

        <SectionDivider label="Contact" />

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
      </div>

      <a
        href="#top"
        aria-label="Back to top"
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(255,205,190,0.18)] bg-[linear-gradient(180deg,rgba(88,31,21,0.88),rgba(26,14,11,0.94))] text-2xl text-[rgba(255,188,160,0.9)] shadow-[0_14px_35px_rgba(26,10,5,0.3)] backdrop-blur transition duration-200 ease-out hover:-translate-y-0.5 hover:text-white hover:shadow-[0_0_18px_rgba(255,173,94,0.22)]"
      >
        ↑
      </a>
    </main>
  );
}
