import { aboutCopy } from "@/data/profile";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about">
      <div className="wrap">
        <Reveal>
          <div className="sectionhead">
            <span className="tag">{"// à propos"}</span>
            <h2>Qui je suis</h2>
          </div>
        </Reveal>
        <div className="aboutgrid">
          <Reveal style={{ transitionDelay: "80ms" }}>
            <div>
              {aboutCopy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal style={{ transitionDelay: "160ms" }}>
            <ul className="factlist">
              {aboutCopy.facts.map((fact) => (
                <li key={fact.k}>
                  <span className="k">{fact.k}</span>
                  <span>{fact.v}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
