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
  cardTechnologies: string[];
  highlights: { label: string; detail: string }[];
  links: ProjectLink[];
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  visual: "sweeper" | "retra" | "cuey" | "flux";
};

export const projects: Project[] = [
  {
    slug: "sweeper",
    name: "Sweeper",
    eyebrow: "Minesweeper AI research",
    summary:
      "A playable Minesweeper lab for comparing symbolic reasoning, exact probability, and learned strategies.",
    description:
      "Sweeper studies how an agent should make decisions in Minesweeper. It starts with symbolic proofs, uses exact mine probabilities when deduction runs out, and evaluates neural and hybrid strategies against the same board environments. The browser interface makes the work inspectable through a playable board, assisted modes, and benchmark results.",
    technologies: [
      "Python",
      "PyTorch",
      "React",
      "TypeScript",
      "Cloudflare Workers",
    ],
    cardTechnologies: ["Python", "PyTorch", "Cloudflare Workers"],
    highlights: [
      {
        label: "Reasoning first",
        detail:
          "Turns visible board clues into constraints and identifies provably safe moves before guessing.",
      },
      {
        label: "Exact probabilities",
        detail:
          "Counts valid frontier assignments to rank candidate moves when the board has no certain answer.",
      },
      {
        label: "Comparable strategies",
        detail:
          "Evaluates symbolic, neural, and hybrid agents within the same reproducible board environment.",
      },
    ],
    links: [
      {
        label: "Live demo",
        href: "https://sweeper.shlok-jadhav-07.workers.dev/",
        primary: true,
      },
      { label: "GitHub repo", href: "https://github.com/shlokrj/sweeper" },
    ],
    image: {
      src: "/projects/sweeper-home.png",
      alt: "Sweeper homepage with a Minesweeper board and strategy statistics.",
      width: 2048,
      height: 1116,
      className: "project-detail-visual__image--contain",
    },
    secondaryImage: {
      src: "/projects/sweeper-demo.png",
      alt: "Sweeper's assisted play mode showing a recommended next move.",
      width: 2048,
      height: 1116,
    },
    visual: "sweeper",
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
    cardTechnologies: ["PyTorch", "OpenCV", "Grad-CAM"],
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
    cardTechnologies: ["MediaPipe", "OpenCV", "AppleScript"],
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
    cardTechnologies: ["Swift", "Mach APIs", "SQLite"],
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
    image: {
      src: "/projects/flux-dashboard.png",
      alt: "Flux dashboard showing live system metrics and a five-minute CPU activity chart.",
      width: 2940,
      height: 1002,
      className: "project-detail-visual__image--contain",
    },
    secondaryImage: {
      src: "/projects/flux-menubar.png",
      alt: "Flux menu bar panel showing CPU, memory, battery, network, and active app metrics.",
      width: 540,
      height: 610,
    },
    visual: "flux",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
