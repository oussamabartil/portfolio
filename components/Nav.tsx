import Link from "next/link";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon, EmailIcon, DownloadIcon } from "./icons";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#about", label: "À propos" },
  { href: "#experience", label: "Expérience" },
  { href: "#education", label: "Formation" },
  { href: "#projects", label: "Projets" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="nav">
      <div className="navrow">
        <Link className="brand" href="#top">
          O<b>B</b>artil
        </Link>
        <nav className="links" aria-label="Navigation principale">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="navtools">
          <a className="iconbtn" href={profile.github} target="_blank" rel="noopener" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a className="iconbtn" href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
          <a className="iconbtn" href={`mailto:${profile.email}`} aria-label="Email">
            <EmailIcon />
          </a>
          <a className="iconbtn" href={profile.cvUrl} download aria-label="Télécharger le CV (PDF)">
            <DownloadIcon />
          </a>
          <ThemeToggle />
          <a className="cta" href="#contact">
            Discutons →
          </a>
        </div>
      </div>
    </header>
  );
}
