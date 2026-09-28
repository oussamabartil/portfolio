import { education } from "@/data/education";
import { Reveal } from "./Reveal";

export function Education() {
  return (
    <section id="education">
      <div className="wrap">
        <Reveal>
          <div className="sectionhead">
            <span className="tag">{"// formation"}</span>
            <h2>Parcours académique</h2>
          </div>
        </Reveal>
        <div className="edu-timeline">
          {education.map((item, i) => (
            <Reveal key={item.school} style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="edu-item">
                <span className="edu-dot" aria-hidden="true" />
                <div className="edu-body">
                  <span className="when">{item.when}</span>
                  <h3>{item.school}</h3>
                  <div className="school">{item.institution}</div>
                  <p>{item.degree}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
