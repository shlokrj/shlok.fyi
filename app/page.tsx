"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Theme = "dark" | "light";

const navItems = [
  { href: "home", label: "Home" },
  { href: "projects", label: "Projects" },
  { href: "experience", label: "Experience" },
  { href: "courses", label: "Courses" },
  { href: "awards", label: "Awards" },
  { href: "about-me", label: "About Me" },
  { href: "contact", label: "Contact" },
];

const socialProfiles = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shlokjadhav/",
    platform: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/shlokrj",
    platform: "github",
  },
] as const;

const relevantCoursework = [
  {
    term: "Fall 2025",
    status: "Completed",
    courses: [
      { code: "STAT 240", title: "Data Science Modeling I" },
      { code: "COMP SCI 300", title: "Programming II" },
    ],
  },
  {
    term: "Spring 2026",
    status: "Completed",
    courses: [
      { code: "COMP SCI 252", title: "Intro to Computer Engineering" },
      { code: "COMP SCI 400", title: "Programming III" },
      { code: "STAT 340", title: "Data Science Modeling II" },
    ],
  },
  {
    term: "Fall 2026",
    status: "Upcoming",
    courses: [
      { code: "COMP SCI 320", title: "Data Science Programming II" },
      { code: "MATH 240", title: "Intro to Discrete Mathematics" },
      {
        code: "BME 603",
        title: "Special Topics in Bioinstrumentation and Medical Devices",
      },
      { code: "COMP SCI 354", title: "Machine Organization and Programming" },
    ],
  },
];

const professionalExperience = [
  {
    role: "Software Engineer",
    organization: "TidalX AI",
    type: "Internship",
    dates: "May 2026 - Present",
    location: "Bay Area, California · On-site",
    detail:
      "Developing computer vision and machine learning pipelines for aquaculture perception, combining Python data workflows with OpenCV, scikit-learn, feature engineering, geometric matching, and model evaluation.",
    logo: "/logos/experience/tidal.png",
    logoAlt: "TidalX AI",
    brand: "tidal",
    href: "https://tidalx.ai/",
  },
  {
    role: "Undergraduate Researcher",
    organization: "University of Wisconsin-Madison",
    type: "Full-time",
    dates: "Feb 2026 - Present",
    location: "Madison, Wisconsin · On-site",
    detail:
      "Under the Computational Biology & Machine Learning Lab, led by Principal Investigator Dr. Dhananjay Bhaskar, developing machine learning pipelines for birdsong analysis through audio preprocessing, spectrogram generation, and learned feature representations. Exploring neural models and dimensionality reduction methods to study structure in animal vocalizations.",
    logo: "/logos/experience/uw-research.png",
    logoAlt: "University of Wisconsin-Madison",
    brand: "uw-research",
    href: "https://engineering.wisc.edu/directory/profile/dhananjay-bhaskar/",
  },
  {
    role: "Help Desk Support Specialist",
    organization: "UW-Madison Division of Information Technology (DoIT)",
    type: "Part-time",
    dates: "Jan 2026 - Present",
    location: "Madison, Wisconsin · Hybrid",
    detail:
      "Providing technical support for software, account access, security tools, and campus technology systems to UW-Madison students, faculty, staff, and off-campus users.",
    logo: "/logos/experience/doit.png",
    logoAlt: "UW-Madison Division of Information Technology",
    brand: "doit",
    href: "https://it.wisc.edu/services/help-desk/",
  },
  {
    role: "Education Director",
    organization: "Design Interactive",
    type: "Student Organization",
    dates: "Dec 2025 - Present",
    location: "Madison, Wisconsin · On-site",
    detail:
      "Leading weekly workshops for 50+ members on Figma, UI/UX design, web development, and frontend engineering fundamentals. Creating educational materials that make design more accessible to students.",
    logo: "/logos/experience/design-interactive.png",
    logoAlt: "Design Interactive EDU",
    brand: "design",
    href: "https://www.designinteractive-uw.com/",
  },
];

const highSchoolActivities = [
  {
    role: "Founder & Secretary",
    organization: "NASA STEM Club",
    dates: "Aug 2024 - Jun 2025",
    detail:
      "Mentored selected students of 60+ applicants in weekly meetings to compete in NASA STEM Challenges.",
    context:
      "Founded after NASA ADC and JAXA Kibo Robotics to help other students participate in these challenges.",
    logo: "/logos/experience/nasa-stem.png",
    logoAlt: "NASA STEM DVHS",
    awardLinks: [
      { label: "NASA ADC Top Team", target: "award-nasa-adc" },
      { label: "JAXA Kibo Robotics", target: "award-kibo" },
    ],
  },
  {
    role: "Treasurer",
    organization: "XR EDU Club",
    dates: "Aug 2021 - Jun 2025",
    detail:
      "Developed XR solutions for social good, helped manage club finances, and ran weekly meetings.",
    context: "In association with Samsung Solve for Tomorrow finalist projects.",
    logo: "/logos/experience/xr-edu.png",
    logoAlt: "XR EDU",
    awardLinks: [
      { label: "Samsung 2024", target: "award-samsung-2024" },
      { label: "Samsung 2023", target: "award-samsung-2023" },
    ],
  },
  {
    role: "Secretary & Outreach Officer",
    organization: "Coding for SDG Club",
    dates: "Jun 2024 - Jun 2025",
    detail:
      "Helped organize two hackathons (Hack the Planet 2024 and Hack the Planet 2025) centered on Sustainable Development Goals with 100+ competitors and $5,000+ in sponsored prizes across both events.",
    context: "",
    logo: "/logos/experience/coding-sdg.png",
    logoAlt: "Coding for SDG",
    awardLinks: [],
  },
];

const supportingAwards = [
  {
    id: "award-samsung-2024",
    title: "Samsung Solve for Tomorrow 2024",
    distinction: "California State Finalist",
    issuer: "Samsung Electronics",
    date: "Dec 2024",
    detail: "Competing under XR EDU, our proposed idea was an application that could diagnose diabetic retinopathy in underprivileged communities using AI. We were awarded a $2,500 prize package of Samsung products for our school.",
    logo: "/awards/samsung-mark.png",
    logoAlt: "Samsung",
    brand: "samsung",
  },
  {
    id: "award-kibo",
    title: "Kibo Robotics Programming Challenge",
    distinction: "1st High School & 2nd Overall in the USA",
    issuer: "JAXA in cooperation with NASA STEM",
    date: "Jul 2024",
    detail: "Competing with the same NASA ADC group, we wrote code to control free-flying robots (like Astrobee) aboard the International Space Station (ISS). We placed 1st among high school teams and 2nd among high school and undergraduate teams in the USA.",
    logo: "/awards/jaxa-logo.svg",
    logoAlt: "JAXA",
    brand: "jaxa",
  },
  {
    id: "award-samsung-2023",
    title: "Samsung Solve for Tomorrow 2023",
    distinction: "California State Finalist",
    issuer: "Samsung Electronics",
    date: "Dec 2023",
    detail: "Competing under XR EDU, our proposed idea was a wristband device that could be used for communication and emergency situations for homeless youth in the Bay Area. We were awarded a $2,500 prize package of Samsung products for our school.",
    logo: "/awards/samsung-mark.png",
    logoAlt: "Samsung",
    brand: "samsung",
  },
];

function useScrollLens() {
  useEffect(() => {
    let frame: number | null = globalThis.requestAnimationFrame(updateActiveSection);
    const reduceMotion = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function updateActiveSection() {
      frame = null;
      const elements = Array.from(document.querySelectorAll<HTMLElement>(".scroll-lens-section"));
      if (elements.length === 0) return;
      if (reduceMotion) { clearScrollLens(elements); return; }

      const scrollY = globalThis.scrollY || globalThis.pageYOffset;
      const atTop = scrollY <= 4;
      const atBottom = globalThis.innerHeight + scrollY >= document.documentElement.scrollHeight - 28;
      let activeIndex = 0;

      if (atBottom) {
        activeIndex = elements.length - 1;
      } else if (!atTop) {
        const focusY = globalThis.innerHeight * 0.48;
        let bestScore = Number.POSITIVE_INFINITY;
        elements.forEach((el, i) => {
          const rect = el.getBoundingClientRect();
          const visH = Math.max(0, Math.min(rect.bottom, globalThis.innerHeight) - Math.max(rect.top, 0));
          const visR = visH / Math.min(Math.max(rect.height, 1), globalThis.innerHeight);
          const near = Math.min(Math.max(focusY, rect.top), rect.bottom);
          const score = Math.abs(near - focusY) + (visH > 0 ? 0 : globalThis.innerHeight * 0.65) - visR * 90;
          if (score < bestScore) { bestScore = score; activeIndex = i; }
        });
      }

      elements.forEach((el, i) => {
        el.classList.toggle("scroll-lens-active", i === activeIndex);
        el.classList.toggle("scroll-lens-resting", i !== activeIndex);
      });
    }

    function scheduleUpdate() {
      if (frame !== null) return;
      frame = globalThis.requestAnimationFrame(updateActiveSection);
    }

    globalThis.addEventListener("scroll", scheduleUpdate, { passive: true });
    globalThis.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame !== null) globalThis.cancelAnimationFrame(frame);
      globalThis.removeEventListener("scroll", scheduleUpdate);
      globalThis.removeEventListener("resize", scheduleUpdate);
      clearScrollLens(Array.from(document.querySelectorAll<HTMLElement>(".scroll-lens-section")));
    };
  }, []);
}

function clearScrollLens(elements: HTMLElement[]) {
  elements.forEach((el) => el.classList.remove("scroll-lens-active", "scroll-lens-resting"));
}

function SectionDivider({ label }: Readonly<{ label: string }>) {
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

function MusicNoteIcon() {
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
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function SocialIcon({ platform }: Readonly<{ platform: "linkedin" | "github" }>) {
  if (platform === "linkedin") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.98 10.98 0 0 1 5.75 0C17.04 4.9 18 5.21 18 5.21c.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.18c0 .31.21.67.79.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function getPreferredTheme(): Theme {
  const savedTheme = globalThis.localStorage.getItem("theme");

  return savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  globalThis.localStorage.setItem("theme", theme);
}

export default function Home() {
  const [isHighSchoolOpen, setIsHighSchoolOpen] = useState(false);
  const [isNightwatchPreviewOpen, setIsNightwatchPreviewOpen] = useState(false);
  const [hasNightwatchPreviewOpened, setHasNightwatchPreviewOpened] = useState(false);
  const [isCueyPreviewOpen, setIsCueyPreviewOpen] = useState(false);
  const [hasCueyPreviewOpened, setHasCueyPreviewOpened] = useState(false);
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);
  const [hasResumePreviewOpened, setHasResumePreviewOpened] = useState(false);
  const [isAboutMoreOpen, setIsAboutMoreOpen] = useState(false);
  const nameFlareRef = useRef<HTMLSpanElement>(null);

  const handleNameFlare = () => {
    const el = nameFlareRef.current;
    if (!el) return;
    el.classList.remove("fireplace-name__flare-active");
    void el.offsetWidth;
    el.classList.add("fireplace-name__flare-active");
  };

  useEffect(() => {
    applyTheme(getPreferredTheme());
  }, []);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme: Theme = currentTheme === "light" ? "dark" : "light";

    applyTheme(nextTheme);
  };

  useScrollLens();

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

    const section = document.getElementById(sectionId);
    if (!section) return;

    const isLongSection = section.getBoundingClientRect().height > globalThis.innerHeight * 0.84;

    section.scrollIntoView({
      behavior: "smooth",
      block: isLongSection ? "start" : "center",
    });
  };

  const scrollToAward = (
    event: React.MouseEvent<HTMLAnchorElement>,
    awardId: string,
  ) => {
    event.preventDefault();

    const award = document.getElementById(awardId);
    if (!award) return;

    globalThis.history.replaceState(null, "", `#${awardId}`);
    award.classList.remove("award-reference-flash");
    void award.offsetWidth;
    award.classList.add("award-reference-flash");
    award.scrollIntoView({ behavior: "smooth", block: "center" });

    globalThis.setTimeout(() => {
      award.classList.remove("award-reference-flash");
    }, 1900);
  };

  const scrollToExperience = (
    event: React.MouseEvent<HTMLAnchorElement>,
    experienceId: string,
  ) => {
    event.preventDefault();

    const experience = document.getElementById(experienceId);
    if (!experience) return;

    globalThis.history.replaceState(null, "", `#${experienceId}`);
    experience.classList.remove("experience-reference-flash");
    void experience.offsetWidth;
    experience.classList.add("experience-reference-flash");
    experience.scrollIntoView({ behavior: "smooth", block: "center" });

    globalThis.setTimeout(() => {
      experience.classList.remove("experience-reference-flash");
    }, 1900);
  };

  return (
    <main className="site-shell relative overflow-hidden px-6 py-8 sm:px-10 sm:py-10">
      <div id="top" />
      <div className="site-ambient pointer-events-none absolute inset-0" />
      <div className="site-glow pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle color theme"
        title="Toggle color theme"
        className="control-button fixed right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur transition duration-200 ease-out hover:-translate-y-0.5 sm:right-6 sm:top-6"
      >
        <span className="theme-toggle__icon theme-toggle__sun">
          <SunIcon />
        </span>
        <span className="theme-toggle__icon theme-toggle__moon">
          <MoonIcon />
        </span>
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
            <span className="nav-socials flex items-center gap-1">
              {socialProfiles.map((profile) => (
                <a
                  key={profile.platform}
                  href={profile.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open Shlok Jadhav's ${profile.label}`}
                  title={profile.label}
                  className="nav-social-link"
                >
                  <SocialIcon platform={profile.platform} />
                </a>
              ))}
            </span>
          </div>
        </nav>

        <SectionDivider label="Home" />

        <section
          id="home"
          className="hero-panel scroll-lens-section scroll-mt-24 w-full rounded-[2rem] border px-8 py-12 backdrop-blur sm:px-12 sm:py-16"
        >
          <div className="grid gap-8 xl:grid-cols-[1.35fr_1fr] xl:items-start">
            <div className="flex h-full flex-col justify-between gap-10">
              <div>
                <p className="theme-muted text-lg italic tracking-[0.01em] sm:text-xl">
                  Hello! My name is
                </p>
                <h1 className="fireplace-name mt-3 max-w-3xl text-[5.2rem] leading-[0.82] tracking-[-0.055em] text-[var(--foreground)] sm:text-[6.8rem] xl:text-[8.4rem]">
                  <button
                    type="button"
                    onClick={handleNameFlare}
                    aria-label="Ignite Shlok Jadhav's name"
                    className="fireplace-name__button"
                  >
                    <span ref={nameFlareRef} className="fireplace-name__texts">
                      <span className="fireplace-name__text block">Shlok</span>
                      <span className="fireplace-name__text block">Jadhav.</span>
                    </span>
                    <span className="fireplace-name__spark fireplace-name__spark--one" />
                    <span className="fireplace-name__spark fireplace-name__spark--two" />
                    <span className="fireplace-name__spark fireplace-name__spark--three" />
                  </button>
                </h1>
              </div>

              <p className="theme-muted max-w-[42rem] text-[1.25rem] leading-[1.7] sm:text-[1.45rem] xl:text-[1.7rem]">
                I&apos;m a{" "}
                <span className="font-semibold">Computer Science</span>{" "}
                and{" "}
                <span className="font-semibold">Data Science</span>{" "}
                student at{" "}
                <span className="font-semibold">UW-Madison</span>{" "}
                interested in building data-driven systems related to{" "}
                <span className="font-semibold">machine learning</span>,{" "}
                <span className="font-semibold">computer vision</span>, and{" "}
                <span className="font-semibold">applied research</span>. I enjoy turning real-world data into tools that are useful, visual, and meaningful. My expected graduation is in May 2028!
              </p>
            </div>

            <div className="grid gap-5 xl:grid-rows-[1fr_auto]">
              <div className="sub-panel home-photo-panel w-full rounded-[1.75rem] border p-4">
                <div className="placeholder-panel home-photo relative h-full min-h-[18rem] overflow-hidden rounded-[1.35rem] border">
                  <Image
                    src="/profile-photo.jpeg"
                    alt="Shlok Jadhav overlooking the Bay Bridge at sunset"
                    fill
                    priority
                    sizes="(min-width: 1280px) 28rem, (min-width: 640px) 34rem, calc(100vw - 5rem)"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="sub-panel focus-panel rounded-[1.5rem] border p-5">
                <p className="eyebrow text-xs uppercase tracking-[0.3em]">
                  Current Focus
                </p>
                <p className="theme-heading mt-3 text-[2rem] leading-[1.1] sm:text-[2.3rem]">
                  Looking for
                  <br />
                  <span className="theme-accent">
                    <em>Summer 2027 Internships</em>
                  </span>
                </p>
                <p className="theme-muted mt-4 text-sm leading-6 sm:text-base">
                  Currently working at{" "}
                  <a
                    href="#experience-tidal"
                    onClick={(event) => scrollToExperience(event, "experience-tidal")}
                    className="focus-link"
                  >
                    TidalX AI
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </a>
                  <br />
                  Building in: SWE · ML · Data
                </p>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider label="Projects" />

        <section
          id="projects"
          className="theme-panel scroll-lens-section scroll-mt-24 w-full rounded-[1.75rem] border px-8 py-8 backdrop-blur sm:px-12"
        >
          <p className="eyebrow text-xs uppercase tracking-[0.32em]">
            Projects
          </p>
          <h2 className="theme-heading mt-4 text-4xl leading-tight sm:text-5xl">
            All Projects
          </h2>
          <p className="theme-muted mt-4 max-w-3xl text-lg leading-8">
            Personal projects and useful tools across data, design,
            computer vision, and more.
          </p>

          <div className="project-feature-entry mt-9">
            <article className="project-feature project-nightwatch">
              <div className="project-content-grid grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.08fr_0.92fr]">
                <span className="project-orb project-orb--moon" aria-hidden="true">
                  <MoonIcon />
                </span>
                <div>
                  <p className="eyebrow text-xs uppercase">Full-Stack Astronomy App</p>
                  <h3 className="theme-heading mt-3 text-4xl leading-tight">
                    Nightwatch
                  </h3>
                  <p className="theme-muted mt-4 text-base leading-8 sm:text-lg">
                    A local night sky guide that combines astronomy calculations
                    and weather conditions to show visible planets, moon phase,
                    twilight times, and the best viewing window for tonight.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href="https://nightwatch-psi.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="project-action project-action--primary"
                    >
                      Live Demo
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M7 17 17 7" />
                        <path d="M8 7h9v9" />
                      </svg>
                    </a>
                    <a
                      href="https://github.com/shlokrj/nightwatch"
                      target="_blank"
                      rel="noreferrer"
                      className="project-action"
                    >
                      GitHub Repo
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M7 17 17 7" />
                        <path d="M8 7h9v9" />
                      </svg>
                    </a>
                    <button
                      type="button"
                      className={`project-action project-preview-toggle${isNightwatchPreviewOpen ? " project-preview-toggle--open" : ""}`}
                      aria-expanded={isNightwatchPreviewOpen}
                      aria-controls="nightwatch-preview"
                      onClick={() => {
                        setHasNightwatchPreviewOpened(true);
                        setIsNightwatchPreviewOpen((open) => !open);
                      }}
                    >
                      Preview
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="project-preview-toggle__icon h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="project-stack">
                  <p className="eyebrow text-xs uppercase">Key Technologies</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Nightwatch technologies">
                    {[
                      "React",
                      "Vite",
                      "Tailwind CSS",
                      "Python",
                      "FastAPI",
                      "Skyfield",
                      "Open-Meteo",
                      "Vercel",
                    ].map((tool) => (
                      <li key={tool} className="project-chip">
                        {tool}
                      </li>
                    ))}
                  </ul>
                  <p className="theme-soft mt-5 text-sm leading-7">
                    Built with place search, timezone detection, astronomy
                    ephemerides, and weather-aware sky scoring.
                  </p>
                </div>
              </div>

              <div
                id="nightwatch-preview"
                className={`project-preview${isNightwatchPreviewOpen ? " project-preview--open" : ""}`}
                aria-hidden={!isNightwatchPreviewOpen}
              >
                <div className="project-preview__inner">
                  {hasNightwatchPreviewOpened ? (
                    <a
                      href="https://nightwatch-psi.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={isNightwatchPreviewOpen ? undefined : -1}
                      className="project-banner relative block overflow-hidden"
                      aria-label="Open the live Nightwatch application"
                    >
                      <Image
                        src="/projects/nightwatch-banner.png"
                        alt="Nightwatch displaying a Madison stargazing report and best viewing window."
                        width={1440}
                        height={1100}
                        sizes="(min-width: 1024px) 60rem, calc(100vw - 4rem)"
                        className="project-banner__image w-full"
                      />
                      <span className="project-banner__label">
                        View live app
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M7 17 17 7" />
                          <path d="M8 7h9v9" />
                        </svg>
                      </span>
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          </div>

          <div className="project-feature-entry mt-5">
            <article className="project-feature project-cuey">
              <div className="project-content-grid grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.08fr_0.92fr]">
                <span className="project-orb project-orb--music" aria-hidden="true">
                  <MusicNoteIcon />
                </span>
                <div>
                  <p className="eyebrow text-xs uppercase">Computer Vision Music Controller App</p>
                  <h3 className="theme-heading mt-3 text-4xl leading-tight">
                    Cuey
                  </h3>
                  <p className="theme-muted mt-4 text-base leading-8 sm:text-lg">
                    A hands-free music control app that uses webcam-based hand
                    tracking to turn gestures into Spotify controls. It makes
                    play, pause, skipping, and going back feel natural while
                    working on your computer.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href="https://github.com/shlokrj/cuey"
                      target="_blank"
                      rel="noreferrer"
                      className="project-action"
                    >
                      GitHub Repo
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M7 17 17 7" />
                        <path d="M8 7h9v9" />
                      </svg>
                    </a>
                    <button
                      type="button"
                      className={`project-action project-preview-toggle${isCueyPreviewOpen ? " project-preview-toggle--open" : ""}`}
                      aria-expanded={isCueyPreviewOpen}
                      aria-controls="cuey-preview"
                      onClick={() => {
                        setHasCueyPreviewOpened(true);
                        setIsCueyPreviewOpen((open) => !open);
                      }}
                    >
                      Preview
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="project-preview-toggle__icon h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="project-stack">
                  <p className="eyebrow text-xs uppercase">Key Technologies</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Cuey technologies">
                    {[
                      "Python",
                      "MediaPipe",
                      "OpenCV",
                      "AppleScript / osascript",
                      "Pillow",
                    ].map((tool) => (
                      <li key={tool} className="project-chip">
                        {tool}
                      </li>
                    ))}
                  </ul>
                  <p className="theme-soft mt-5 text-sm leading-7">
                    Built around real-time hand landmark detection, motion
                    analysis, anti-aliased OpenCV UI rendering, and macOS
                    Spotify control through AppleScript.
                  </p>
                </div>
              </div>

              <div
                id="cuey-preview"
                className={`project-preview${isCueyPreviewOpen ? " project-preview--open" : ""}`}
                aria-hidden={!isCueyPreviewOpen}
              >
                <div className="project-preview__inner">
                  {hasCueyPreviewOpened ? (
                    <div className="project-banner project-banner--cuey relative block overflow-hidden">
                      <Image
                        src="/projects/cuey-banner.png"
                        alt="Cuey displaying real-time hand tracking with gesture controls overlaid on a webcam feed."
                        width={2940}
                        height={1782}
                        sizes="(min-width: 1024px) 60rem, calc(100vw - 4rem)"
                        className="project-banner__image project-banner__image--cuey w-full"
                      />
                      <span className="project-banner__label project-banner__label--soon">
                        Demo coming soon
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M9 18V5l12-2v13" />
                          <circle cx="6" cy="18" r="3" />
                          <circle cx="18" cy="16" r="3" />
                        </svg>
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          </div>
        </section>

        <SectionDivider label="Experience" />

        <section
          id="experience"
          className="theme-panel scroll-lens-section scroll-mt-24 w-full rounded-[1.75rem] border px-8 py-8 backdrop-blur sm:px-12"
        >
          <p className="eyebrow text-xs uppercase tracking-[0.32em]">
            Experience
          </p>
          <h2 className="theme-heading mt-4 text-4xl leading-tight sm:text-5xl">
            Work &amp; Leadership
          </h2>
          <p className="theme-muted mt-4 max-w-3xl text-lg leading-8">
            Roles across internships, work, and leadership opportunities.
          </p>

          <div className="experience-timeline mt-9 grid gap-4">
            {professionalExperience.map((experience) => (
              <div key={experience.role} className="experience-entry">
                <article
                  id={experience.brand === "tidal" ? "experience-tidal" : undefined}
                  className="experience-card grid scroll-mt-28 gap-5 p-5 sm:grid-cols-[4.5rem_1fr] sm:p-6"
                >
                  <a
                    href={experience.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit ${experience.organization}`}
                    title={`Visit ${experience.organization}`}
                    className={`experience-logo-link experience-logo experience-logo--${experience.brand} relative`}
                  >
                    <Image
                      src={experience.logo}
                      alt={experience.logoAlt}
                      fill
                      sizes="72px"
                      className="object-contain"
                    />
                    <span className="experience-logo__launch" aria-hidden="true">
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15 3h6v6" />
                        <path d="M10 14 21 3" />
                      </svg>
                    </span>
                  </a>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-x-5 gap-y-2">
                      <div>
                        <h3 className="theme-heading text-2xl leading-tight sm:text-[1.7rem]">
                          {experience.role}
                        </h3>
                        <p className="experience-org mt-1 text-lg leading-snug">
                          {experience.organization}
                          <span className="experience-separator"> · </span>
                          <span className="theme-muted">{experience.type}</span>
                        </p>
                      </div>
                      <span className="experience-date">{experience.dates}</span>
                    </div>
                    <p className="theme-soft mt-2 text-base leading-7">
                      {experience.location}
                    </p>
                    {experience.detail ? (
                      <p className="theme-muted experience-detail mt-4 text-base leading-7 sm:text-lg">
                        {experience.detail}
                      </p>
                    ) : null}
                  </div>
                </article>
              </div>
            ))}
          </div>

          <div className={`school-group mt-4${isHighSchoolOpen ? " school-group--open" : ""}`}>
            <button
              type="button"
              className="school-group__trigger flex w-full items-center justify-between gap-5 p-5 text-left sm:p-6"
              aria-expanded={isHighSchoolOpen}
              aria-controls="high-school-activities"
              onClick={() => setIsHighSchoolOpen((open) => !open)}
            >
              <span className="flex min-w-0 items-center gap-4">
                <span className="school-logo relative block shrink-0">
                  <Image
                    src="/logos/experience/dvhs.png"
                    alt="Dougherty Valley High School"
                    fill
                    sizes="72px"
                    className="object-contain"
                  />
                </span>
                <span className="min-w-0">
                  <span className="theme-heading block text-xl leading-snug sm:text-2xl">
                    Dougherty Valley High School
                  </span>
                  <span className="theme-muted mt-1 block text-xs uppercase tracking-[0.12em] sm:text-sm sm:tracking-[0.18em]">
                    High school extracurricular leadership
                  </span>
                  <span className="theme-soft mt-1 block text-sm leading-snug">
                    San Ramon, California · On-site
                  </span>
                </span>
              </span>
              <span className="school-group__toggle" aria-hidden="true">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>

            <div id="high-school-activities" className="school-group__content">
              <div className="school-group__inner grid gap-4 px-5 pb-5 sm:px-6 sm:pb-6">
                {highSchoolActivities.map((activity) => (
                  <article
                    key={activity.organization}
                    className="activity-card grid gap-4 p-4 sm:grid-cols-[3.75rem_1fr] sm:p-5"
                  >
                    <div className="activity-logo relative">
                      <Image
                        src={activity.logo}
                        alt={activity.logoAlt}
                        fill
                        sizes="60px"
                        className="object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="theme-heading text-xl leading-tight">
                          {activity.organization}
                        </h3>
                        <span className="experience-date">{activity.dates}</span>
                      </div>
                      <p className="activity-role mt-1 text-sm uppercase tracking-[0.2em]">
                        {activity.role}
                      </p>
                      <p className="theme-muted mt-3 text-base leading-7">
                        {activity.detail}
                      </p>
                      {activity.context ? (
                        <p className="activity-context mt-3 text-sm leading-6">
                          {activity.context}
                        </p>
                      ) : null}
                      {activity.awardLinks.length > 0 ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {activity.awardLinks.map((link) => (
                            <a
                              key={link.target}
                              href={`#${link.target}`}
                              onClick={(event) => scrollToAward(event, link.target)}
                              className="activity-award-link inline-flex items-center gap-2"
                            >
                              {link.label}
                              <svg
                                aria-hidden="true"
                                className="h-3.5 w-3.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 5v14" />
                                <path d="m19 12-7 7-7-7" />
                              </svg>
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SectionDivider label="Courses" />

        <section
          id="courses"
          className="theme-panel scroll-lens-section scroll-mt-24 w-full rounded-[1.75rem] border px-8 py-8 backdrop-blur sm:px-12"
        >
          <p className="eyebrow text-xs uppercase tracking-[0.32em]">
            Courses
          </p>
          <h2 className="theme-heading mt-4 text-4xl leading-tight sm:text-5xl">
            Relevant Coursework
          </h2>
          <p className="theme-muted mt-4 max-w-3xl text-lg leading-8">
            Selected courses supporting my 
              {" "}<span className="font-semibold">Computer Science</span>{" "}
              and
              {" "}<span className="font-semibold">Data Science</span>{" "}
              focus.
          </p>

          <div className="coursework-grid mt-9 grid gap-7 lg:grid-cols-3">
            {relevantCoursework.map((semester) => (
              <div key={semester.term} className="course-term">
                <div className="course-term__header flex items-center justify-between gap-3">
                  <h3 className="theme-heading text-2xl leading-tight">
                    {semester.term}
                  </h3>
                  <span
                    className={`course-status${semester.status === "Upcoming" ? " course-status--upcoming" : ""}`}
                  >
                    {semester.status}
                  </span>
                </div>
                <div className="course-term__line mt-4 h-px" />
                <ul className="mt-4 grid gap-3">
                  {semester.courses.map((course) => (
                    <li key={course.code} className="course-item">
                      <p className="course-code text-xs uppercase tracking-[0.24em]">
                        {course.code}
                      </p>
                      <p className="course-title mt-2 text-lg leading-snug">
                        {course.title}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider label="Awards" />

        <section
          id="awards"
          className="theme-panel scroll-lens-section scroll-mt-24 w-full rounded-[1.75rem] border px-8 py-8 backdrop-blur sm:px-12"
        >
          <p className="eyebrow text-xs uppercase tracking-[0.32em]">
            Awards
          </p>
          <h2 className="theme-heading mt-4 text-4xl leading-tight sm:text-5xl">
            Honors &amp; Recognition
          </h2>
          <p className="theme-muted mt-4 max-w-3xl text-lg leading-8">
            Recognition for building and competing in STEM-related competitions.
          </p>

          <div className="award-feature-entry mt-9">
            <article
              id="award-nasa-adc"
              className="award-feature grid scroll-mt-28 overflow-hidden lg:grid-cols-[1.03fr_0.97fr]"
            >
              <div className="award-feature__content flex flex-col justify-between gap-7 p-6 sm:p-8">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <Image
                      src="/awards/nasa-logo.png"
                      alt="NASA"
                      width={121}
                      height={102}
                      className="award-nasa-logo h-14 w-auto object-contain"
                    />
                    <span className="award-date">Apr 2024</span>
                  </div>
                  <p className="award-org mt-5 text-xs uppercase tracking-[0.3em]">
                    NASA STEM
                  </p>
                  <h3 className="theme-heading mt-3 text-3xl leading-tight sm:text-[2.2rem]">
                    NASA App Development Challenge Top Team
                  </h3>
                  <p className="theme-muted mt-4 text-lg leading-8">
                    Alongside some friends, we worked on an app that visualizes the Moon&apos;s South Pole region and displays information for navigating the lunar surface. We were selected as a top team and invited to present at the Johnson Space Center in Houston, Texas!
                  </p>
                </div>
                <a
                  href="https://www.nasa.gov/general/nasa-challenge-gives-artemis-generation-coders-a-chance-to-shine/"
                  target="_blank"
                  rel="noreferrer"
                  className="award-link inline-flex w-fit items-center gap-3 text-sm uppercase tracking-[0.18em]"
                >
                  Read the NASA Feature
                  <svg
                    aria-hidden="true"
                    className="award-link__icon h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 3h6v6" />
                    <path d="M10 14 21 3" />
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                </a>
              </div>
              <figure className="award-photo relative min-h-[18rem] lg:min-h-full">
                <Image
                  src="/awards/nasa-adc-team.jpg"
                  alt="NASA App Development Challenge top teams at Johnson Space Center in 2024"
                  fill
                  sizes="(min-width: 1024px) 30rem, calc(100vw - 4rem)"
                  className="object-cover"
                />
              </figure>
            </article>
          </div>

          <div className="awards-grid mt-6 grid gap-4 lg:grid-cols-3">
            {supportingAwards.map((award) => (
              <div key={award.title} className="award-card-entry">
                <article
                  id={award.id}
                  className="award-card flex h-full scroll-mt-28 flex-col p-5 sm:p-6"
                >
                  <div className="flex min-h-12 items-start justify-between gap-4">
                    <div className={`award-brand award-brand--${award.brand}`}>
                      <Image
                        src={award.logo}
                        alt={award.logoAlt}
                        width={140}
                        height={48}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span className="award-date">{award.date}</span>
                  </div>
                  <h3 className="theme-heading mt-6 text-2xl leading-tight">
                    {award.title}
                  </h3>
                  {"distinction" in award ? (
                    <p className="award-distinction mt-3 text-lg leading-snug">
                      {award.distinction}
                    </p>
                  ) : null}
                  <p className="award-org mt-4 text-xs uppercase tracking-[0.22em]">
                    {award.issuer}
                  </p>
                  <p className="theme-muted mt-4 text-base leading-7">
                    {award.detail}
                  </p>
                </article>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider label="About Me" />

        <section
          id="about-me"
          className="theme-panel scroll-lens-section scroll-mt-24 w-full rounded-[1.75rem] border px-8 py-8 backdrop-blur sm:px-12"
        >
          <div className="about-top-grid grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="sub-panel about-copy-panel rounded-[1.5rem] border p-6">
              <p className="eyebrow text-xs uppercase tracking-[0.32em]">
                About Me
              </p>
              <h2 className="theme-heading mt-4 text-4xl leading-tight sm:text-5xl">
                Hi! My name is Shlok Jadhav,
              </h2>
              <p className="theme-muted mt-5 max-w-2xl text-lg leading-8">
                and I am a Computer Science and Data Science student at the University of Wisconsin-Madison.
                I was born and raised in San Ramon, California, which is in the Bay Area. 
                I moved to Wisconsin for college in 2025, and despite the cold, I&apos;ve really enjoyed my time here so far!
              </p>
            </div>

            <div className="sub-panel about-photo-panel rounded-[1.5rem] border p-5">
              <div className="placeholder-panel about-photo relative overflow-hidden rounded-[1.2rem] border">
                <Image
                  src="/profile-photo.jpeg"
                  alt="Shlok Jadhav overlooking the Bay Bridge at sunset"
                  fill
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 34rem, calc(100vw - 5rem)"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="about-more-actions mt-6">
            <button
              type="button"
              className={`about-more-toggle${isAboutMoreOpen ? " about-more-toggle--open" : ""}`}
              aria-expanded={isAboutMoreOpen}
              aria-controls="about-more"
              onClick={() => setIsAboutMoreOpen((open) => !open)}
            >
              {isAboutMoreOpen ? "Show less" : "Read more"}
              <svg
                aria-hidden="true"
                className="about-more-toggle__icon h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>

          <div
            id="about-more"
            className={`about-more${isAboutMoreOpen ? " about-more--open" : ""}`}
            aria-hidden={!isAboutMoreOpen}
          >
            <div className="about-more__inner">
              <div className="about-more__content">
                <p className="theme-muted text-base leading-8">
                  I realized pretty early on that college isn&apos;t just about classes and grades for me, but it&apos;s also a lifestyle and what you make of it.
                  Outside of class, I&apos;m involved in research and a few student orgs on campus, and I also love to build projects for fun.
                  I love keeping myself busy, and I&apos;m a firm believer that there are always things to learn, people to meet, places to explore, etc.
                </p>
                <p className="theme-muted mt-4 text-base leading-8">
                  In my free time, I like to stay busy with a mix of hobbies. 
                  Music is a big part of my day, and I&apos;ve been listening to artists like greek, Luna Li, Osamason, and slayr lately.
                  I also enjoy playing video games, something that&apos;s been part of my life since I was young, from playing on my sister&apos;s DS to our family Wii.
                  I&apos;m a huge Pokémon fan and can recognize almost every single one (maybe not so much anymore).
                  Sports have been another constant in my life; I&apos;ve played and followed them for as long as I can remember.
                  Basketball is probably my favorite sport, and I&apos;ve been a dedicated Golden State Warriors fan since I was a kid.
                  For a little over a decade, I practiced Taekwondo, which shaped not just my work ethic but also a big part of who I am.
                  Since starting college, I&apos;ve gotten into weightlifting and enjoy pushing toward new PRs.
                  Outside of that, traveling has always been a major part of my life. 
                  I&apos;ve been lucky to visit many different places growing up, and I&apos;m especially excited to explore countries like Egypt, Singapore, and Switzerland in the future.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="about-listening-copy">
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

            <div className="sub-panel about-media-panel overflow-hidden rounded-[1.5rem] border p-3">
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
          className="theme-panel scroll-lens-section scroll-mt-24 w-full rounded-[1.75rem] border px-8 py-8 backdrop-blur sm:px-12"
        >
          <p className="eyebrow text-xs uppercase tracking-[0.32em]">
            Contact
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="contact-card">
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
            <div className="contact-card">
              <p className="theme-soft text-sm uppercase tracking-[0.24em]">
                School
              </p>
              <a
                href="mailto:srjadhav2@wisc.edu"
                className="theme-link mt-2 inline-block border-b text-2xl leading-tight transition-colors transition-[border-color,color] duration-200"
              >
                srjadhav2@wisc.edu
              </a>
            </div>
            <div className="contact-card contact-profiles-card sm:col-span-2">
              <p className="theme-soft text-sm uppercase tracking-[0.24em]">
                Profiles
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialProfiles.map((profile) => (
                  <a
                    key={profile.platform}
                    href={profile.href}
                    target="_blank"
                    rel="noreferrer"
                    className="social-profile-link"
                  >
                    <SocialIcon platform={profile.platform} />
                    <span>{profile.label}</span>
                    <svg
                      aria-hidden="true"
                      className="social-profile-link__arrow h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div className="contact-card resume-card sm:col-span-2">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="theme-soft text-sm uppercase tracking-[0.24em]">
                    Resume
                  </p>
                  <h3 className="theme-heading mt-3 text-2xl leading-tight">
                    Shlok Jadhav Resume
                  </h3>
                  <p className="theme-soft mt-2 text-sm">
                    Last updated: May 24, 2026
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/documents/Shlok_Jadhav_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="resume-action resume-action--primary"
                  >
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
                      <path d="M6 2h8l4 4v16H6Z" />
                      <path d="M14 2v6h6" />
                      <path d="M9 13h6" />
                      <path d="M9 17h6" />
                    </svg>
                    Open Resume
                    <svg
                      aria-hidden="true"
                      className="resume-action__arrow h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </a>
                  <button
                    type="button"
                    className={`resume-action resume-toggle${isResumePreviewOpen ? " resume-toggle--open" : ""}`}
                    aria-expanded={isResumePreviewOpen}
                    aria-controls="resume-preview"
                    onClick={() => {
                      setHasResumePreviewOpened(true);
                      setIsResumePreviewOpen((open) => !open);
                    }}
                  >
                    Preview
                    <svg
                      aria-hidden="true"
                      className="resume-toggle__icon h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
              </div>
              <div
                id="resume-preview"
                className={`resume-preview${isResumePreviewOpen ? " resume-preview--open" : ""}`}
                aria-hidden={!isResumePreviewOpen}
              >
                <div className="resume-preview__inner">
                  {hasResumePreviewOpened ? (
                    <a
                      href="/documents/Shlok_Jadhav_Resume.pdf"
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={isResumePreviewOpen ? undefined : -1}
                      className="resume-preview__link"
                      aria-label="Open the full Shlok Jadhav resume PDF"
                    >
                      <Image
                        src="/documents/Shlok_Jadhav_Resume-preview.png"
                        alt="Preview of Shlok Jadhav's resume"
                        width={612}
                        height={792}
                        sizes="(min-width: 768px) 48rem, calc(100vw - 7rem)"
                        className="resume-preview__page"
                      />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="site-footer__socials" aria-label="Social links">
            {socialProfiles.map((profile) => (
              <a
                key={profile.platform}
                href={profile.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open Shlok Jadhav's ${profile.label}`}
                title={profile.label}
                className="site-footer__social"
              >
                <SocialIcon platform={profile.platform} />
              </a>
            ))}
          </div>

          <nav className="site-footer__nav" aria-label="Footer navigation">
            {navItems.map((item) => (
              <a key={item.href} href={`#${item.href}`} className="site-footer__link">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="site-footer__meta">
            <p className="site-footer__name">Shlok Jadhav</p>
            <p className="site-footer__detail">
              Computer Science + Data Science at UW-Madison
            </p>
          </div>

          <div className="site-footer__actions">
            <a href="mailto:srjadhav2@wisc.edu" className="site-footer__pill">
              Email
            </a>
            <a
              href="/documents/Shlok_Jadhav_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="site-footer__pill"
            >
              Resume
            </a>
            <a href="#top" onClick={scrollToTop} className="site-footer__top">
              Top
            </a>
          </div>
        </footer>
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
