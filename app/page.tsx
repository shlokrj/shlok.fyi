"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

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
      className="section-divider mx-auto flex w-full max-w-4xl items-center gap-4 px-4"
    >
      <div className="section-divider__line h-px flex-1" />
      <span className="text-xs uppercase tracking-[0.38em]">{label}</span>
      <div className="section-divider__line--right h-px flex-1" />
    </div>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M20.99 12.52A8.5 8.5 0 1 1 11.48 3.01 6.5 6.5 0 0 0 20.99 12.52Z" />
    </svg>
  );
}

export default function Home() {
  const [showCurtain, setShowCurtain] = useState(true);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const savedTheme = window.localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: light)")
      .matches
      ? "light"
      : "dark";

    return savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : systemTheme;
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowCurtain(false);
    }, 1650);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

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
    <main className="site-shell relative overflow-hidden px-6 py-8 sm:px-10 sm:py-10">
      {showCurtain ? (
        <div aria-hidden="true" className="hero-curtain">
          <h1 className="hero-curtain__title text-[5.2rem] leading-[0.9] tracking-[-0.055em] text-[var(--foreground)] sm:text-[6.8rem] xl:text-[8.4rem]">
            <span className="hero-curtain__text">Shlok Jadhav.</span>
          </h1>
        </div>
      ) : null}
      <div id="top" />
      <div className="site-ambient pointer-events-none absolute inset-0" />
      <div className="site-glow pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        suppressHydrationWarning
        className="control-button fixed right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur transition duration-200 ease-out hover:-translate-y-0.5 sm:right-6 sm:top-6"
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>

      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8">
        <nav className="sticky top-3 z-10 mx-auto mb-4 flex w-full justify-center">
          <div className="nav-panel flex flex-wrap items-center justify-center gap-3 rounded-full border px-4 py-3 text-sm uppercase tracking-[0.24em] backdrop-blur sm:px-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={(event) => scrollToSection(event, item.href)}
                className="nav-link rounded-full px-2 py-1 transition duration-200 ease-out hover:-translate-y-0.5"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <SectionDivider label="Home" />

        <section
          id="home"
          className="hero-panel scroll-mt-24 w-full rounded-[2rem] border px-8 py-12 backdrop-blur sm:px-12 sm:py-16"
        >
          <div className="grid gap-8 xl:grid-cols-[1.35fr_1fr] xl:items-start">
            <div className="flex h-full flex-col justify-between gap-10">
              <div>
                <p className="theme-muted text-lg italic tracking-[0.01em] sm:text-xl">
                  Hello! My name is
                </p>
                <h1 className="fireplace-name mt-3 max-w-3xl text-[5.2rem] leading-[0.82] tracking-[-0.055em] text-[var(--foreground)] sm:text-[6.8rem] xl:text-[8.4rem]">
                  <span className="fireplace-name__text block">Shlok</span>
                  <span className="fireplace-name__text block">Jadhav.</span>
                  <span className="fireplace-name__spark fireplace-name__spark--one" />
                  <span className="fireplace-name__spark fireplace-name__spark--two" />
                  <span className="fireplace-name__spark fireplace-name__spark--three" />
                </h1>
              </div>

              <p className="theme-muted max-w-[42rem] text-[1.25rem] leading-[1.7] sm:text-[1.45rem] xl:text-[1.7rem]">
                I&apos;m a{" "}
                <span className="font-semibold">B.S. Computer Science</span>{" "}
                and{" "}
                <span className="font-semibold">B.S. Data Science</span>{" "}
                student at{" "}
                <span className="font-semibold">UW-Madison</span>{" "}
                interested in building data-driven systems and applied machine
                learning for real-world problems (biology, XR, perception, and
                more). I expect to graduate in May 2028!
              </p>
            </div>

            <div className="grid gap-5 xl:grid-rows-[1fr_auto]">
              <div className="sub-panel w-full rounded-[1.75rem] border p-4">
                <div className="placeholder-panel flex h-full min-h-[18rem] items-center justify-center rounded-[1.35rem] border border-dashed px-8 text-center">
                  <div>
                    <p className="eyebrow-soft text-xs uppercase tracking-[0.28em]">
                      Portrait
                    </p>
                    <p className="theme-muted mt-4 text-xl leading-8">
                      picture of myself
                    </p>
                    <p className="theme-soft mt-3 text-sm leading-7">
                      replace here.
                    </p>
                  </div>
                </div>
              </div>

              <div className="sub-panel rounded-[1.5rem] border p-5">
                <p className="eyebrow text-xs uppercase tracking-[0.3em]">
                  Current Focus
                </p>
                <p className="theme-heading mt-3 text-[2rem] leading-[1.1] sm:text-[2.3rem]">
                  Actively looking for
                  <br />
                  <span className="theme-accent">
                    <em>Summer 2026 Opportunities</em>
                  </span>
                </p>
                <p className="theme-muted mt-4 text-sm leading-6 sm:text-base">
                  Building in: SWE · ML · Data
                  <br />
                  Areas: Bio · Climate · Emerging Tech
                </p>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider label="Projects" />

        <section
          id="projects"
          className="theme-panel scroll-mt-24 w-full rounded-[1.75rem] border px-8 py-8 backdrop-blur sm:px-12"
        >
          <p className="eyebrow text-xs uppercase tracking-[0.32em]">
            Projects
          </p>
          <h2 className="theme-heading mt-4 text-4xl leading-tight sm:text-5xl">
            work in progress
          </h2>
          <p className="theme-muted mt-5 max-w-3xl text-lg leading-8">
            MAKE DEMOS HERE AND LINK TO GITHUB REPOS AND STUFF
          </p>
        </section>

        <SectionDivider label="Experience" />

        <section
          id="experience"
          className="theme-panel scroll-mt-24 w-full rounded-[1.75rem] border px-8 py-8 backdrop-blur sm:px-12"
        >
          <p className="eyebrow text-xs uppercase tracking-[0.32em]">
            Experience
          </p>
          <h2 className="theme-heading mt-4 text-4xl leading-tight sm:text-5xl">
            experiences that are here
          </h2>
          <p className="theme-muted mt-5 max-w-3xl text-lg leading-8">
            internships, research, campus work, etc
          </p>
        </section>

        <SectionDivider label="Awards" />

        <section
          id="awards"
          className="theme-panel scroll-mt-24 w-full rounded-[1.75rem] border px-8 py-8 backdrop-blur sm:px-12"
        >
          <p className="eyebrow text-xs uppercase tracking-[0.32em]">
            Awards
          </p>
          <h2 className="theme-heading mt-4 text-4xl leading-tight sm:text-5xl">
            recognitions and milestones
          </h2>
          <p className="theme-muted mt-5 max-w-3xl text-lg leading-8">
            competitions stuff
          </p>
        </section>

        <SectionDivider label="About Me" />

        <section
          id="about-me"
          className="theme-panel scroll-mt-24 w-full rounded-[1.75rem] border px-8 py-8 backdrop-blur sm:px-12"
        >
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="sub-panel rounded-[1.5rem] border p-6">
              <p className="eyebrow text-xs uppercase tracking-[0.32em]">
                About Me
              </p>
              <h2 className="theme-heading mt-4 text-4xl leading-tight sm:text-5xl">
                Hi! my name is Shlok Jadhav,
              </h2>
              <p className="theme-muted mt-5 max-w-2xl text-lg leading-8">
                and I am a Computer Science and Data Science student at the University of Wisconsin-Madison.
                I was born and raised in San Ramon, California, which is in the Bay Area. 
                I moved to Wisconsin for college in 2025, and despite the cold, I&apos;ve really enjoyed my time here so far!
              </p>
              <p className="theme-muted mt-4 max-w-2xl text-base leading-8">
                I realized pretty early on that college isn&apos;t just about classes and grades for me, but it&apos;s also a lifestyle and what you make of it.
                Outside of class, I&apos;m involved in research and a few student orgs on campus, and I also love to build projects for fun.
                I love keeping myself busy, and I&apos;m a firm believer that there are always things to learn, people to meet, places to explore, etc.
              </p>
              <p className="theme-muted mt-4 max-w-2xl text-base leading-8">
                For my hobbies, I enjoy listening to music, playing games & sports, and exploring new places.
                Some of my favorite artists recently include greek, Luna Li, Osamason, slayr, and more.
                I have been growing up with video games, playing on my sister&apos;s DS and our family Wii.
                Some of my favorite games all time include ANY Pokemon game (I know the Pokedex by heart), Minecraft, Fortnite, Valorant, 
                I have been a huge Golden State Warriors fan for as long as I can remember, and I also 
                have gotten into lifting weights and playing tennis in the past couple of years. 
                I also love to travel and explore new cities, and I&apos;m always down for trying new food.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="mini-card rounded-[1.25rem] border p-4">
                  <p className="eyebrow-soft text-xs uppercase tracking-[0.28em]">
                    Interests
                  </p>
                  <p className="theme-muted mt-3 text-base leading-7">
                    adding interests here
                  </p>
                </div>
                <div className="mini-card rounded-[1.25rem] border p-4">
                  <p className="eyebrow-soft text-xs uppercase tracking-[0.28em]">
                    Personal Note
                  </p>
                  <p className="theme-muted mt-3 text-base leading-7">
                    fun stuff about me here
                  </p>
                </div>
              </div>
            </div>

            <div className="sub-panel rounded-[1.5rem] border p-5">
              <div className="placeholder-panel flex aspect-[4/5] items-center justify-center rounded-[1.2rem] border border-dashed px-8 text-center">
                <div>
                  <p className="eyebrow-soft text-xs uppercase tracking-[0.28em]">
                    Photo
                  </p>
                  <p className="theme-muted mt-4 text-xl leading-8">
                    linked in photo
                  </p>
                  <p className="theme-soft mt-3 text-sm leading-7">
                    swap the box here
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow text-xs uppercase tracking-[0.32em]">
                Currently listening to
              </p>
              <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
                <span className="album-accent font-bold">
                  <em>ACCELERATOR</em>
                </span>{" "}
                <span className="theme-heading">by </span>
                <span className="theme-heading font-bold">
                  greek
                </span>
              </h2>
              <p className="theme-muted mt-5 max-w-xl text-lg leading-8">
                <em>ACCELERATOR</em> has been one of my favorite albums since
                its release in June 2024.
                <br />
                The album is a mix of Alternative R&amp;B, Contemporary R&amp;B,
                and Bedroom Pop.
              </p>
              <p className="theme-soft mt-4 max-w-xl text-sm leading-7">
                My personal favorite songs from the album are:
                <br />
                <em>HOUNDS</em>, <em>SOMEDAY</em>, and <em>RIVER</em>!
              </p>
            </div>

            <div className="sub-panel overflow-hidden rounded-[1.5rem] border p-3">
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
          className="theme-panel scroll-mt-24 w-full rounded-[1.75rem] border px-8 py-8 backdrop-blur sm:px-12"
        >
          <p className="eyebrow text-xs uppercase tracking-[0.32em]">
            Contact
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="theme-soft text-sm uppercase tracking-[0.24em]">
                Personal
              </p>
              <a
                href="mailto:shlok.jadhav.07@gmail.com"
                className="theme-link mt-2 inline-block border-b text-2xl leading-tight transition-colors transition-[border-color,color] duration-200"
              >
                shlok.jadhav.07@gmail.com
              </a>
            </div>
            <div>
              <p className="theme-soft text-sm uppercase tracking-[0.24em]">
                School
              </p>
              <a
                href="mailto:shlok.jadhav@wisc.edu"
                className="theme-link mt-2 inline-block border-b text-2xl leading-tight transition-colors transition-[border-color,color] duration-200"
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
        className="control-button fixed bottom-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full border text-2xl backdrop-blur transition duration-200 ease-out hover:-translate-y-0.5"
      >
        ↑
      </a>
    </main>
  );
}
