export type ProjectLink = {
  label: string;
  href: string;
  primary?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  description: string;
  technologies: string[];
  highlights: { label: string; detail: string }[];
  links: ProjectLink[];
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
  };
  visual: "flux" | "retra" | "nightwatch" | "cuey";
};

export const projects: Project[] = [
  {
    slug: "flux",
    name: "Flux",
    eyebrow: "Native macOS system observability",
    summary:
      "A menu bar app that shows what your Mac is doing now and explains what changed over time.",
    description:
      "Flux combines live system metrics, process activity, app usage, local development servers, and a derived event timeline in one native macOS experience. It samples the machine directly through system APIs, stores history in SQLite, and turns raw counters into readable explanations such as CPU spikes and battery thresholds.",
    technologies: [
      "Swift",
      "SwiftUI",
      "AppKit",
      "Swift Charts",
      "SQLite",
      "Mach APIs",
      "IOKit",
    ],
    highlights: [
      {
        label: "Live system view",
        detail:
          "Tracks CPU, memory, battery, network, storage, uptime, and active processes from a lightweight menu bar app.",
      },
      {
        label: "History with context",
        detail:
          "Persists snapshots and app activity, then derives a timeline that explains meaningful changes instead of only showing charts.",
      },
      {
        label: "Developer lens",
        detail:
          "Surfaces local servers, ports, and inferred projects alongside the rest of the machine's activity.",
      },
    ],
    links: [
      {
        label: "GitHub repo",
        href: "https://github.com/shlokrj/flux",
        primary: true,
      },
    ],
    visual: "flux",
  },
  {
    slug: "retra",
    name: "Retra",
    eyebrow: "Explainable retinal screening",
    summary:
      "A diabetic retinopathy screening platform that pairs severity predictions with readable Grad-CAM reports.",
    description:
      "Retra reads retinal fundus images, predicts diabetic retinopathy severity, and makes the model's reasoning visible through confidence outputs and Grad-CAM heatmaps. The experience is designed around turning a computer vision result into a report that is easier to inspect and understand.",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "FastAPI",
      "PyTorch",
      "EfficientNet-B3",
      "OpenCV",
      "Grad-CAM",
    ],
    highlights: [
      {
        label: "Explainable predictions",
        detail:
          "Shows severity, confidence, and Grad-CAM overlays together instead of presenting an opaque classification.",
      },
      {
        label: "Image pipeline",
        detail:
          "Uses Ben Graham preprocessing and an EfficientNet-B3 classifier tuned for retinal fundus imagery.",
      },
      {
        label: "Readable reporting",
        detail:
          "Packages model output into a clear screening report for faster review and comparison.",
      },
    ],
    links: [
      {
        label: "Live demo",
        href: "https://retra-screening.vercel.app/",
        primary: true,
      },
      { label: "GitHub repo", href: "https://github.com/shlokrj/retra" },
    ],
    image: {
      src: "/projects/retra-banner.png",
      alt: "Retra displaying a retinal screening report with a Grad-CAM heatmap.",
      width: 2940,
      height: 1602,
      className: "project-detail-visual__image--contain",
    },
    visual: "retra",
  },
  {
    slug: "nightwatch",
    name: "Nightwatch",
    eyebrow: "Weather-aware astronomy guide",
    summary:
      "A local night sky guide that finds visible planets and the best viewing window for tonight.",
    description:
      "Nightwatch combines place search, timezone detection, astronomy ephemerides, twilight calculations, and live weather conditions. The result is a practical answer to when and what to look for in the night sky, tailored to a location rather than a generic forecast.",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Python",
      "FastAPI",
      "Skyfield",
      "Open-Meteo",
    ],
    highlights: [
      {
        label: "Local sky report",
        detail:
          "Calculates visible planets, moon phase, twilight times, and observing conditions for a searched place.",
      },
      {
        label: "Viewing score",
        detail:
          "Combines astronomy and weather data into a clear best-window recommendation for the night.",
      },
      {
        label: "Full-stack pipeline",
        detail:
          "Connects a responsive React interface to Python astronomy calculations and live forecast data.",
      },
    ],
    links: [
      {
        label: "Live demo",
        href: "https://nightwatch-psi.vercel.app/",
        primary: true,
      },
      { label: "GitHub repo", href: "https://github.com/shlokrj/nightwatch" },
    ],
    image: {
      src: "/projects/nightwatch-banner.png",
      alt: "Nightwatch displaying a Madison stargazing report and best viewing window.",
      width: 1440,
      height: 1100,
    },
    visual: "nightwatch",
  },
  {
    slug: "cuey",
    name: "Cuey",
    eyebrow: "Gesture-controlled music",
    summary:
      "A hands-free macOS music controller that turns webcam-tracked gestures into Spotify controls.",
    description:
      "Cuey uses real-time hand landmark detection and motion analysis to make play, pause, skip, and back controls feel natural while working at a computer. A custom OpenCV interface gives immediate visual feedback, while AppleScript bridges the gesture layer to Spotify on macOS.",
    technologies: [
      "Python",
      "MediaPipe",
      "OpenCV",
      "AppleScript",
      "Pillow",
    ],
    highlights: [
      {
        label: "Real-time tracking",
        detail:
          "Uses MediaPipe hand landmarks and motion analysis to recognize commands from a webcam feed.",
      },
      {
        label: "Native controls",
        detail:
          "Maps gestures to Spotify through macOS AppleScript without interrupting the current workflow.",
      },
      {
        label: "Visual feedback",
        detail:
          "Renders an anti-aliased OpenCV interface so every recognized gesture has an immediate response.",
      },
    ],
    links: [{ label: "GitHub repo", href: "https://github.com/shlokrj/cuey", primary: true }],
    image: {
      src: "/projects/cuey-banner.png",
      alt: "Cuey displaying real-time hand tracking and gesture controls over a webcam feed.",
      width: 2940,
      height: 1782,
      className: "project-detail-visual__image--contain",
    },
    visual: "cuey",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
