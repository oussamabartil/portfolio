import { heroCopy } from "@/data/profile";
import { Terminal } from "./Terminal";

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap herogrid">
        <div>
          <div className="eyebrow">
            <span className="dot" /> {heroCopy.eyebrow}
          </div>
          <h1>
            {heroCopy.heading.before}
            <span>{heroCopy.heading.highlight}</span>
            {heroCopy.heading.after}
          </h1>
          <p className="lede">{heroCopy.lede}</p>
          <div className="herobtns">
            <a className="btn btn-primary" href="#projects">
              Voir mes projets →
            </a>
            <a className="btn btn-secondary" href="#contact">
              Me contacter
            </a>
          </div>
        </div>

        <div className="codecard">
          <div className="codecard-head">
            <div className="codecard-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="codecard-file">zsh — oussama@portfolio</span>
          </div>
          <a
            href="#about"
            className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2.5 focus:font-mono focus:text-sm focus:font-semibold focus:text-accent-ink focus:no-underline"
          >
            Passer le terminal interactif
          </a>
          <Terminal />
        </div>
      </div>
    </section>
  );
}
