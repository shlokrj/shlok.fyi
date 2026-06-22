import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/app/project-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: `${project.name} — Shlok Jadhav`,
    description: project.summary,
  };
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function FluxVisual() {
  return (
    <div className="flux-visual" aria-label="Stylized preview of the Flux system dashboard">
      <div className="flux-visual__bar">
        <span>Flux</span>
        <span className="flux-visual__live"><i /> Live</span>
      </div>
      <div className="flux-visual__metrics">
        {[
          ["CPU", "18%"],
          ["Memory", "11.4 GB"],
          ["Battery", "82%"],
          ["Network", "2.4 MB/s"],
        ].map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="flux-visual__chart">
        <div className="flux-visual__chart-head">
          <span>Activity</span>
          <span>5 min</span>
        </div>
        <svg aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 600 150">
          <defs>
            <linearGradient id="fluxArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="currentColor" stopOpacity=".32" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="flux-visual__area" d="M0 120 C55 118 70 75 120 84 S190 126 240 94 S305 44 355 72 S420 112 470 83 S540 26 600 45 L600 150 L0 150Z" />
          <path className="flux-visual__line" d="M0 120 C55 118 70 75 120 84 S190 126 240 94 S305 44 355 72 S420 112 470 83 S540 26 600 45" />
        </svg>
      </div>
    </div>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <main className="project-detail-shell min-h-screen px-6 py-8 sm:px-10 sm:py-10">
      <div className="site-ambient pointer-events-none fixed inset-0" />
      <article className="project-detail relative mx-auto w-full max-w-5xl">
        <Link className="project-detail__back" href="/#projects">
          <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M19 12H5" />
            <path d="m11 18-6-6 6-6" />
          </svg>
          All projects
        </Link>

        <header className={`project-detail__header project-detail__header--${project.visual}`}>
          <p className="eyebrow text-xs uppercase tracking-[0.28em]">{project.eyebrow}</p>
          <h1 className="theme-heading mt-5 text-5xl leading-none sm:text-7xl">{project.name}</h1>
          <p className="theme-muted mt-6 max-w-3xl text-lg leading-8 sm:text-xl sm:leading-9">
            {project.summary}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.href}
                className={`project-action${link.primary ? " project-action--primary" : ""}`}
                href={link.href}
                rel="noreferrer"
                target="_blank"
              >
                {link.label}
                <ArrowIcon />
              </a>
            ))}
          </div>
        </header>

        <section className="project-detail-visual">
          {project.image ? (
            <Image
              alt={project.image.alt}
              className={`project-detail-visual__image ${project.image.className ?? ""}`}
              height={project.image.height}
              priority
              sizes="(min-width: 1024px) 64rem, calc(100vw - 3rem)"
              src={project.image.src}
              width={project.image.width}
            />
          ) : (
            <FluxVisual />
          )}
        </section>

        <div className="project-detail__body grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="project-detail__panel">
            <p className="eyebrow text-xs uppercase tracking-[0.24em]">The project</p>
            <p className="theme-muted mt-5 text-lg leading-8">{project.description}</p>
          </section>

          <aside className="project-detail__panel">
            <p className="eyebrow text-xs uppercase tracking-[0.24em]">Built with</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
              {project.technologies.map((technology) => (
                <li className="project-chip" key={technology}>{technology}</li>
              ))}
            </ul>
          </aside>
        </div>

        <section className="project-detail__highlights">
          <p className="eyebrow text-xs uppercase tracking-[0.24em]">What it does</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {project.highlights.map((highlight, index) => (
              <div className="project-detail__highlight" key={highlight.label}>
                <span>0{index + 1}</span>
                <h2 className="theme-heading mt-7 text-2xl">{highlight.label}</h2>
                <p className="theme-muted mt-3 leading-7">{highlight.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
