"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { SocialIcon } from "@/app/components/SocialIcon";
import { navItems, socialProfiles } from "@/app/site-data";

type Theme = "dark" | "light";

function SunIcon() {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M20.99 12.52A8.5 8.5 0 1 1 11.48 3.01 6.5 6.5 0 0 0 20.99 12.52Z" />
    </svg>
  );
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  globalThis.localStorage.setItem("theme", theme);
}

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState<(typeof navItems)[number]["id"]>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shellRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const updateActiveSection = () => {
      const focusLine = globalThis.innerHeight * 0.34;
      let nextSection: (typeof navItems)[number]["id"] = "home";

      navItems.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= focusLine) {
          nextSection = id;
        }
      });

      setActiveSection(nextSection);
    };

    const handleResize = () => {
      updateActiveSection();
      if (globalThis.innerWidth >= 900) setIsMenuOpen(false);
    };

    updateActiveSection();
    globalThis.addEventListener("scroll", updateActiveSection, { passive: true });
    globalThis.addEventListener("resize", handleResize);

    return () => {
      globalThis.removeEventListener("scroll", updateActiveSection);
      globalThis.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !shellRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      toggleRef.current?.focus();
    };

    document.addEventListener("pointerdown", closeOnPointerDown);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnPointerDown);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, sectionId: (typeof navItems)[number]["id"]) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (!section) return;

    setIsMenuOpen(false);
    setActiveSection(sectionId);
    globalThis.history.replaceState(null, "", `#${sectionId}`);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.dataset.theme;
    applyTheme(currentTheme === "light" ? "dark" : "light");
  };

  return (
    <header className="floating-nav-shell" ref={shellRef}>
      <div className="floating-nav-shell__inner">
        <div className="floating-nav__identity">
          <a
            aria-label="Go to home"
            className="floating-nav__brand"
            href="#home"
            onClick={(event) => scrollToSection(event, "home")}
          >
            Shlok Jadhav
          </a>
        </div>

        <nav aria-label="Primary navigation" className="floating-nav__desktop">
          {navItems.map((item) => (
            <a
              key={item.id}
              aria-current={activeSection === item.id ? "location" : undefined}
              className="nav-link"
              href={`#${item.id}`}
              onClick={(event) => scrollToSection(event, item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="floating-nav__actions">
          <div className="floating-nav__socials" role="group" aria-label="Social profiles">
            {socialProfiles.map((profile) => (
              <a
                key={profile.platform}
                aria-label={`Open Shlok Jadhav's ${profile.label}`}
                className="nav-social-link"
                href={profile.href}
                rel="noreferrer"
                target="_blank"
                title={profile.label}
              >
                <SocialIcon platform={profile.platform} />
              </a>
            ))}
          </div>

          <button
            aria-label="Toggle color theme"
            className="floating-nav__theme"
            onClick={toggleTheme}
            title="Toggle color theme"
            type="button"
          >
            <span className="theme-toggle__icon theme-toggle__sun"><SunIcon /></span>
            <span className="theme-toggle__icon theme-toggle__moon"><MoonIcon /></span>
          </button>

          <button
            ref={toggleRef}
            aria-controls="floating-navigation-menu"
            aria-expanded={isMenuOpen}
            aria-label={`${isMenuOpen ? "Close" : "Open"} navigation menu`}
            className="floating-nav__toggle"
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            <span>{isMenuOpen ? "Close" : "Menu"}</span>
            <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6 6 18" />
                </>
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav aria-label="Mobile navigation" className="floating-nav__menu" id="floating-navigation-menu">
          <div className="floating-nav__menu-grid">
            {navItems.map((item) => (
              <a
                key={item.id}
                aria-current={activeSection === item.id ? "location" : undefined}
                className="nav-link"
                href={`#${item.id}`}
                onClick={(event) => scrollToSection(event, item.id)}
              >
                <span>{item.label}</span>
                <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>
            ))}
          </div>
          <div className="floating-nav__menu-socials" role="group" aria-label="Social profiles and display controls">
            {socialProfiles.map((profile) => (
              <a
                key={profile.platform}
                href={profile.href}
                rel="noreferrer"
                target="_blank"
              >
                <SocialIcon platform={profile.platform} />
                <span>{profile.label}</span>
              </a>
            ))}
            <button
              className="floating-nav__menu-theme"
              onClick={toggleTheme}
              type="button"
            >
              <span className="floating-nav__menu-theme-icon">
                <span className="theme-toggle__icon theme-toggle__sun"><SunIcon /></span>
                <span className="theme-toggle__icon theme-toggle__moon"><MoonIcon /></span>
              </span>
              <span>Theme</span>
            </button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
