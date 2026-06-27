"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FloatingNav } from "@/app/components/FloatingNav";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SocialIcon } from "@/app/components/SocialIcon";
import { projects, type Project } from "@/app/project-data";
import { socialProfiles } from "@/app/site-data";

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

const courseCatalog = relevantCoursework.flatMap((semester) =>
  semester.courses.map((course) => ({
    ...course,
    term: semester.term,
    status: semester.status,
  })),
);

const skillGroups = [
  {
    title: "Languages",
    skills: ["Python", "Java", "TypeScript", "JavaScript", "SQL", "C/C++", "C#", "R"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML/CSS", "Figma"],
  },
  {
    title: "Backend & Data",
    skills: ["FastAPI", "Node.js", "REST APIs", "SQLite", "Pandas", "NumPy"],
  },
  {
    title: "ML & Computer Vision",
    skills: ["PyTorch", "scikit-learn", "OpenCV", "MediaPipe", "SIFT/ORB", "RANSAC", "Random Forests", "Grad-CAM", "PCA/UMAP", "LSTMs"],
  },
  {
    title: "Native & Systems",
    skills: ["Swift", "SwiftUI", "AppKit", "Mach APIs", "IOKit", "Linux/Bash"],
  },
  {
    title: "Tools & Workflow",
    skills: ["Git/GitHub", "Vercel", "Feature engineering", "Model evaluation", "Human-in-the-loop", "Data visualization"],
  },
] as const;

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

const favoriteTracks = [
  { id: "52OzG7Zg3jaHnm2hW4digD", title: "Dance With", artist: "Cosmo's Demos" },
  { id: "31JYu7pbmUPDgAQIY8JOBy", title: "In The Afternoon", artist: "The Cardigans" },
  { id: "0kl6Ozan3fuUdCl6TlB15v", title: "Talk To You (ft. 54 Ultra)", artist: "ANOTR, 54 Ultra" },
  { id: "2zCMUto58AaDoROYt2JCxs", title: "HOUNDS", artist: "greek" },
  { id: "5KbEOYfLdTaUxM8KKTvDJ9", title: "Og Ginobili", artist: "Che" },
  { id: "3WVJfN1JmGewlDXGkQf0I4", title: "Havana", artist: "Pz'" },
] as const;

type SpotifyEmbedController = {
  addListener: (event: "ready", callback: () => void) => void;
  destroy: () => void;
  loadUri: (uri: string) => void;
};

type SpotifyIframeApi = {
  createController: (
    element: HTMLElement,
    options: { height: string; uri: string; width: string },
    callback: (controller: SpotifyEmbedController) => void,
  ) => void;
};

type SpotifyWindow = typeof globalThis & {
  __spotifyIframeApi?: SpotifyIframeApi;
  onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
};

function useScrollLens() {
  useEffect(() => {
    let frame: number | null = globalThis.requestAnimationFrame(updateActiveSection);
    let previousScrollY = globalThis.scrollY || globalThis.pageYOffset;
    const reduceMotion = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function updateActiveSection() {
      frame = null;
      const elements = Array.from(document.querySelectorAll<HTMLElement>(".scroll-lens-section"));
      if (elements.length === 0) return;
      if (reduceMotion) { clearScrollLens(elements); return; }

      const scrollY = globalThis.scrollY || globalThis.pageYOffset;
      const scrollingUp = scrollY < previousScrollY;
      previousScrollY = scrollY;
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
        const rect = el.getBoundingClientRect();
        const visibleHeight = Math.max(0, Math.min(rect.bottom, globalThis.innerHeight) - Math.max(rect.top, 0));
        const visibleRatio = visibleHeight / Math.min(Math.max(rect.height, 1), globalThis.innerHeight);
        const centerDelta = (rect.top + rect.height * 0.5 - globalThis.innerHeight * 0.5) / globalThis.innerHeight;
        const drift = Math.max(-24, Math.min(24, centerDelta * -28));
        const inRevealBand = rect.top < globalThis.innerHeight * 0.92 && rect.bottom > globalThis.innerHeight * 0.08;

        if (inRevealBand) updateReverseStagger(el);
        el.style.setProperty("--section-drift", `${drift.toFixed(2)}px`);
        el.style.setProperty("--section-visibility", visibleRatio.toFixed(3));
        el.classList.toggle("scroll-visible", inRevealBand);
        el.classList.toggle("scroll-enter-up", inRevealBand && scrollingUp);
        el.classList.toggle("scroll-enter-down", inRevealBand && !scrollingUp);
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
  elements.forEach((el) => {
    el.classList.remove("scroll-lens-active", "scroll-lens-resting", "scroll-visible", "scroll-enter-up", "scroll-enter-down");
    el.style.removeProperty("--section-drift");
    el.style.removeProperty("--section-visibility");
    el.querySelectorAll<HTMLElement>("[data-reverse-stagger]").forEach((item) => {
      item.style.removeProperty("--scroll-up-delay");
      item.removeAttribute("data-reverse-stagger");
    });
  });
}

const reverseStaggerGroups = [
  [".experience-timeline", ".experience-entry"],
  [".project-grid", ".project-card"],
  [".awards-grid", ".award-card-entry"],
  [".course-card-grid", ".course-card"],
  [".skills-grid", ".skill-category"],
  [".music-track-list", ".music-track-tab"],
  [".contact-email-list", ".contact-email-link"],
  [".contact-action-panel", ".contact-action-group"],
] as const;

function updateReverseStagger(section: HTMLElement) {
  reverseStaggerGroups.forEach(([groupSelector, itemSelector]) => {
    const group = section.querySelector<HTMLElement>(groupSelector);
    if (!group) return;

    const items = Array.from(group.children).filter(
      (child): child is HTMLElement =>
        child instanceof HTMLElement && child.matches(itemSelector),
    );
    if (items.length === 0) return;

    const rowTops = Array.from(
      new Set(items.map((item) => Math.round(item.offsetTop / 4) * 4)),
    ).sort((a, b) => a - b);

    items.forEach((item) => {
      const rowTop = Math.round(item.offsetTop / 4) * 4;
      const rowIndex = rowTops.indexOf(rowTop);
      const reverseRowIndex = rowTops.length - rowIndex - 1;
      const delay = Math.min(reverseRowIndex * 80, 400);
      item.style.setProperty("--scroll-up-delay", `${delay}ms`);
      item.dataset.reverseStagger = "true";
    });
  });
}

function SectionBreak() {
  return (
    <div aria-hidden="true" className="section-break mx-auto w-full max-w-4xl px-4">
      <div className="section-break__line" />
    </div>
  );
}

function SectionHeading({
  title,
  description,
}: Readonly<{
  title: string;
  description: string;
}>) {
  return (
    <div className="section-heading">
      <h2 className="theme-heading section-heading__title text-4xl leading-tight sm:text-5xl">
        {title}
      </h2>
      <p className="section-heading__note mt-2 max-w-2xl text-sm leading-6 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function ProjectCard({ project }: Readonly<{ project: Project }>) {
  return (
    <Link
      aria-label={`Read more about ${project.name}`}
      className={`project-card project-card--${project.visual}`}
      href={`/projects/${project.slug}`}
    >
      <article>
        <div className="project-card__visual">
          {project.image ? (
            <Image
              alt=""
              className="project-card__image"
              fill
              sizes="(min-width: 1024px) 29rem, (min-width: 640px) 44vw, calc(100vw - 5rem)"
              src={project.image.src}
            />
          ) : (
            <div className="project-card__flux" aria-hidden="true">
              <div className="project-card__flux-top">
                <strong>Flux</strong>
                <span><i /> Live</span>
              </div>
              <div className="project-card__flux-stats">
                <span><small>CPU</small>18%</span>
                <span><small>MEM</small>71%</span>
                <span><small>NET</small>2.4</span>
              </div>
              <svg preserveAspectRatio="none" viewBox="0 0 320 76">
                <path d="M0 61 C35 64 44 30 78 38 S132 68 166 44 S215 19 246 39 S285 54 320 17" />
              </svg>
            </div>
          )}
          <div className="project-card__reveal">
            <span>What it does</span>
            <p>{project.highlights[0].detail}</p>
          </div>
        </div>

        <div className="project-card__content">
          <p className="eyebrow text-[0.68rem] uppercase tracking-[0.2em]">{project.eyebrow}</p>
          <div className="project-card__title-row">
            <h3 className="theme-heading text-3xl leading-none">{project.name}</h3>
            <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </div>
          <p className="theme-muted project-card__summary">{project.summary}</p>
          <ul className="project-card__chips" aria-label={`${project.name} technologies`}>
            {project.cardTechnologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
      </article>
    </Link>
  );
}

export default function Home() {
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);
  const [hasResumePreviewOpened, setHasResumePreviewOpened] = useState(false);
  const [isAboutMoreOpen, setIsAboutMoreOpen] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState<(typeof favoriteTracks)[number]["id"]>(favoriteTracks[0].id);
  const [isAutoShuffleOn, setIsAutoShuffleOn] = useState(true);
  const [isSpotifyReady, setIsSpotifyReady] = useState(false);
  const nameFlareRef = useRef<HTMLSpanElement>(null);
  const spotifyEmbedRef = useRef<HTMLDivElement>(null);
  const spotifyControllerRef = useRef<SpotifyEmbedController | null>(null);
  const activeTrack = favoriteTracks.find((track) => track.id === activeTrackId) ?? favoriteTracks[0];

  const handleNameFlare = () => {
    const el = nameFlareRef.current;
    if (!el) return;
    el.classList.remove("fireplace-name__flare-active");
    void el.offsetWidth;
    el.classList.add("fireplace-name__flare-active");
  };

  useScrollLens();

  useEffect(() => {
    const reduceMotion = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !isAutoShuffleOn) return;

    const cycle = globalThis.setInterval(() => {
      setActiveTrackId((currentId) => {
        const currentIndex = favoriteTracks.findIndex((track) => track.id === currentId);
        return favoriteTracks[(currentIndex + 1) % favoriteTracks.length].id;
      });
    }, 20000);

    return () => globalThis.clearInterval(cycle);
  }, [activeTrackId, isAutoShuffleOn]);

  useEffect(() => {
    let isCancelled = false;
    const spotifyWindow = globalThis as SpotifyWindow;

    const createSpotifyPlayer = (api: SpotifyIframeApi) => {
      if (
        isCancelled ||
        !spotifyEmbedRef.current ||
        spotifyControllerRef.current
      ) {
        return;
      }

      api.createController(
        spotifyEmbedRef.current,
        {
          width: "100%",
          height: "352",
          uri: `spotify:track:${favoriteTracks[0].id}`,
        },
        (controller) => {
          if (isCancelled) {
            controller.destroy();
            return;
          }

          spotifyControllerRef.current = controller;
          controller.addListener("ready", () => setIsSpotifyReady(true));
        },
      );
    };

    if (spotifyWindow.__spotifyIframeApi) {
      createSpotifyPlayer(spotifyWindow.__spotifyIframeApi);
    } else {
      spotifyWindow.onSpotifyIframeApiReady = (api) => {
        spotifyWindow.__spotifyIframeApi = api;
        createSpotifyPlayer(api);
      };

      if (!document.querySelector('script[data-spotify-iframe-api="true"]')) {
        const script = document.createElement("script");
        script.src = "https://open.spotify.com/embed/iframe-api/v1";
        script.async = true;
        script.dataset.spotifyIframeApi = "true";
        document.body.appendChild(script);
      }
    }

    return () => {
      isCancelled = true;
      spotifyControllerRef.current?.destroy();
      spotifyControllerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isSpotifyReady) return;
    spotifyControllerRef.current?.loadUri(`spotify:track:${activeTrackId}`);
  }, [activeTrackId, isSpotifyReady]);

  const selectTrack = (trackId: (typeof favoriteTracks)[number]["id"]) => {
    setActiveTrackId(trackId);
  };

  const changeTrack = (direction: -1 | 1) => {
    const currentIndex = favoriteTracks.findIndex(
      (track) => track.id === activeTrackId,
    );
    const nextIndex =
      (currentIndex + direction + favoriteTracks.length) %
      favoriteTracks.length;
    selectTrack(favoriteTracks[nextIndex].id);
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
    <main className="site-shell relative overflow-hidden px-6 pb-16 pt-20 sm:px-10 sm:pb-20 sm:pt-24">
      <div className="site-ambient pointer-events-none absolute inset-0" />
      <div className="site-glow pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
      <FloatingNav />

      <div className="page-flow relative mx-auto flex min-h-screen w-full max-w-6xl flex-col">
        <section
          id="home"
          className="hero-section scroll-lens-section w-full"
        >
          <div className="hero-grid grid gap-12">
            <div className="hero-copy flex h-full flex-col gap-9">
              <div>
                <p className="display-accent hero-intro">
                  Hello! My name is
                </p>
                <h1 className="fireplace-name hero-title mt-3 text-[var(--foreground)]">
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

              <p className="hero-blurb theme-muted">
                I&apos;m a{" "}
                <span className="font-semibold">Computer Science</span>{" "}
                and{" "}
                <span className="font-semibold">Data Science</span>{" "}
                student at{" "}
                <span className="font-semibold whitespace-nowrap">UW-Madison</span>, graduating in May 2028. I&apos;m interested in building data-driven systems related to{" "}
                <span className="font-semibold">machine learning</span>,{" "}
                <span className="font-semibold">computer vision</span>, and{" "}
                <span className="font-semibold">applied research</span>. I enjoy turning real-world data into useful, visual, and meaningful tools.
              </p>
            </div>

            <div className="hero-side grid gap-5">
              <div className="home-photo-panel w-full">
                <div className="home-photo relative h-full min-h-[18rem] overflow-hidden">
                  <Image
                    src="/profile-top.jpeg"
                    alt="Shlok Jadhav portrait for the home section"
                    fill
                    priority
                    sizes="(min-width: 1280px) 30rem, (min-width: 640px) 28rem, calc(100vw - 5rem)"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="focus-panel">
                <p className="eyebrow text-xs uppercase tracking-[0.3em]">
                  Current Focus
                </p>
                <p className="theme-heading focus-heading">
                  Looking for
                  <br />
                  <span className="theme-accent focus-heading__target">
                    <em>Summer 2027 Internships</em>
                  </span>
                </p>
                <p className="theme-muted focus-copy">
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

        <SectionBreak />

        <section
          id="experience"
          className="site-section scroll-lens-section w-full"
        >
          <SectionHeading
            title="Experience"
            description="Work, research, campus roles, and other professional experiences."
          />

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

        </section>

        <SectionBreak />

        <section
          id="projects"
          className="site-section scroll-lens-section w-full"
        >
          <SectionHeading
            title="Projects"
            description="Some things that I’ve been building."
          />

          <div className="project-grid mt-9">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <SectionBreak />

        <section
          id="awards"
          className="site-section scroll-lens-section w-full"
        >
          <SectionHeading
            title="Awards"
            description="Recognition from competitions and events."
          />

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

        <SectionBreak />

        <section
          id="courses"
          className="site-section scroll-lens-section w-full"
        >
          <SectionHeading
            title="Courses"
            description="Relevant coursework supporting my Computer Science and Data Science focus."
          />

          <div className="course-card-grid mt-9">
            {courseCatalog.map((course) => (
              <article
                key={`${course.term}-${course.code}`}
                className="course-card"
              >
                <div className="course-card__top">
                  <p className="course-code text-xs uppercase tracking-[0.24em]">
                    {course.code}
                  </p>
                  <span
                    aria-label={`${course.term}, ${course.status}`}
                    className={`course-semester${course.status === "Upcoming" ? " course-semester--upcoming" : ""}`}
                    title={course.status}
                  >
                    {course.term}
                  </span>
                </div>
                <p className="course-title mt-5 text-lg leading-snug">
                  {course.title}
                </p>
              </article>
            ))}
          </div>

        </section>

        <SectionBreak />

        <section
          id="skills"
          className="site-section scroll-lens-section w-full"
        >
          <SectionHeading
            title="Skills"
            description="Languages, libraries, systems, and workflows I use."
          />

          <div className="skills-grid mt-9">
            {skillGroups.map((group) => (
              <article className="skill-category" key={group.title}>
                <h3 className="skill-category__title">{group.title}</h3>
                <ul className="skill-chip-list" aria-label={`${group.title} skills`}>
                  {group.skills.map((skill) => (
                    <li className="skill-chip" key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <SectionBreak />

        <section
          id="about-me"
          className="site-section scroll-lens-section w-full"
        >
          <SectionHeading
            title="About Me"
            description="A little bit more about me."
          />

          <div className="about-story-panel mt-9">
            <div className="about-copy-panel">
              <p className="theme-muted text-lg leading-8">
                I realized pretty early on that college isn&apos;t just about classes and grades for me, but it&apos;s also a lifestyle and what you make of it.
                Outside of class, I&apos;m involved in research and a few student orgs on campus, and I also love to build projects for fun.
                I love keeping myself busy, and I&apos;m a firm believer that there are always things to learn, people to meet, places to explore, etc.
              </p>

              <div
                id="about-more"
                className={`about-more${isAboutMoreOpen ? " about-more--open" : ""}`}
                aria-hidden={!isAboutMoreOpen}
              >
                <div className="about-more__inner">
                  <div className="about-more__content">
                    <p className="theme-muted text-base leading-8">
                      In my free time, I like to stay busy with a mix of hobbies.
                      Music is a big part of my day, and what I&apos;m listening to changes pretty often.
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

              <div className="about-more-actions">
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
            </div>
          </div>

          <div className="about-listening-panel mt-8">
            <div className="about-listening-header">
              <div className="about-listening-copy">
                <p className="eyebrow text-xs uppercase tracking-[0.32em]">
                  Currently listening to
                </p>
                <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
                  <span className="album-accent font-bold">
                    <em>Some favorite songs</em>
                  </span>
                </h2>
              </div>

              <div className="music-controls" aria-label="Song rotation controls">
                <button
                  type="button"
                  className="music-control-button"
                  aria-label="Previous song"
                  onClick={() => changeTrack(-1)}
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M6 5v14M19 6 9 12l10 6V6Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`music-control-button music-control-button--primary${isAutoShuffleOn ? " music-control-button--looping" : ""}`}
                  aria-label={isAutoShuffleOn ? "Pause song rotation" : "Play song rotation"}
                  aria-pressed={isAutoShuffleOn}
                  onClick={() => setIsAutoShuffleOn((isOn) => !isOn)}
                >
                  {isAutoShuffleOn ? (
                    <svg aria-hidden="true" viewBox="0 0 24 24">
                      <path d="M7 5h3v14H7zM14 5h3v14h-3z" />
                    </svg>
                  ) : (
                    <svg aria-hidden="true" viewBox="0 0 24 24">
                      <path d="m8 5 11 7-11 7V5Z" />
                    </svg>
                  )}
                </button>
                <button
                  type="button"
                  className="music-control-button"
                  aria-label="Next song"
                  onClick={() => changeTrack(1)}
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M18 5v14M5 6l10 6-10 6V6Z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="music-player-layout">
              <div className="music-track-list" aria-label="Favorite songs">
                {favoriteTracks.map((track, index) => (
                  <button
                    key={track.id}
                    type="button"
                    aria-pressed={activeTrack.id === track.id}
                    className={`music-track-tab${activeTrack.id === track.id ? " music-track-tab--active" : ""}${activeTrack.id === track.id && isAutoShuffleOn ? " music-track-tab--cycling" : ""}`}
                    onClick={() => selectTrack(track.id)}
                  >
                    <span className="music-track-tab__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="music-track-tab__copy">
                      <span className="music-track-tab__title">{track.title}</span>
                      <span className="music-track-tab__artist">{track.artist}</span>
                    </span>
                  </button>
                ))}
              </div>

              <div className="music-player-panel">
                <div
                  ref={spotifyEmbedRef}
                  className="music-player-embed"
                  aria-label={`Spotify player for ${activeTrack.title} by ${activeTrack.artist}`}
                />
              </div>
            </div>
          </div>

        </section>

        <SectionBreak />

        <section
          id="contact"
          className="site-section scroll-lens-section w-full"
        >
          <SectionHeading
            title="Contact"
            description="Email, profiles, and resume."
          />

          <div className="contact-layout mt-9">
            <div className="contact-email-list">
              <a
                href="mailto:shlok.jadhav.07@gmail.com"
                className="contact-email-link"
              >
                <span className="contact-kicker">Personal</span>
                <span className="contact-email-address">shlok.jadhav.07@gmail.com</span>
              </a>

              <a
                href="mailto:srjadhav2@wisc.edu"
                className="contact-email-link"
              >
                <span className="contact-kicker">School</span>
                <span className="contact-email-address">srjadhav2@wisc.edu</span>
              </a>
            </div>

            <div className="contact-action-panel">
              <div className="contact-action-group">
                <p className="contact-kicker">Profiles</p>
                <div className="contact-action-row">
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

              <div className="contact-action-group">
                <p className="contact-kicker">Resume</p>
                <div className="contact-action-row">
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
                    Open PDF
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
            </div>

            <div className="contact-resume-preview">
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
                      aria-label="Open the full resume PDF"
                    >
                      <Image
                        src="/documents/Shlok_Jadhav_Resume-preview.png"
                        alt="Resume preview"
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

        <SiteFooter />
      </div>
    </main>
  );
}
