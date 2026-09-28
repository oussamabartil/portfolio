import { experience } from "@/data/experience";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <Reveal>
          <div className="sectionhead">
            <span className="tag">{"// expérience"}</span>
            <h2>Expérience professionnelle</h2>
            <p>Trois stages de développement full-stack, du prototype à la mise en production.</p>
          </div>
        </Reveal>
        <div className="timeline">
          {experience.map((job, i) => (
            <Reveal key={`${job.place}-${job.period}`} style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="xcard">
                <div className="mono" aria-hidden="true">
                  {job.initials}
                </div>
                <div>
                  <h3>{job.title}</h3>
                  <div className="place">
                    {job.place} · {job.period}
                  </div>
                  <ul>
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="tagrow">
                    {job.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
