export const navItems = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "courses", label: "Courses" },
  { id: "awards", label: "Awards" },
  { id: "about-me", label: "About Me" },
  { id: "contact", label: "Contact" },
] as const;

export const socialProfiles = [
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
