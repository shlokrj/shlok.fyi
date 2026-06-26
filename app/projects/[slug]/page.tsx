import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FloatingNav } from "@/app/components/FloatingNav";
import { SiteFooter } from "@/app/components/SiteFooter";
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
    title: `Shlok Jadhav - ${project.name}`,
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

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <main className="project-detail-shell min-h-screen px-6 pb-8 pt-20 sm:px-10 sm:pb-10 sm:pt-24">
      <div className="site-ambient pointer-events-none fixed inset-0" />
      <FloatingNav contextSection="projects" />
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

        {project.image ? (
          <section className={`project-detail-visual${project.secondaryImage ? " project-detail-visual--gallery" : ""}`}>
            <Image
              alt={project.image.alt}
              className={`project-detail-visual__image ${project.image.className ?? ""}`}
              height={project.image.height}
              priority
              sizes="(min-width: 1024px) 64rem, calc(100vw - 3rem)"
              src={project.image.src}
              width={project.image.width}
            />
            {project.secondaryImage ? (
              <Image
                alt={project.secondaryImage.alt}
                className="project-detail-visual__image project-detail-visual__image--secondary"
                height={project.secondaryImage.height}
                sizes="(min-width: 1024px) 16rem, 40vw"
                src={project.secondaryImage.src}
                width={project.secondaryImage.width}
              />
            ) : null}
          </section>
        ) : null}

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
      <div className="project-detail-footer relative mx-auto w-full max-w-5xl">
        <SiteFooter />
      </div>
    </main>
  );
}
