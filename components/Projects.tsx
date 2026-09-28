import { projects } from "@/data/projects";
import { Reveal } from "./Reveal";

export function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <Reveal>
          <div className="sectionhead">
            <span className="tag">{"// projets"}</span>
            <h2>Projets techniques</h2>
            <p>Systèmes distribués, sécurité, blockchain et vision par ordinateur.</p>
          </div>
        </Reveal>
        <div className="pgrid">
          {projects.map((project, i) => (
            <Reveal key={project.title} style={{ transitionDelay: `${(i % 2) * 90}ms` }}>
              <div className="pcard">
                <span className="cat">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tagrow" style={{ marginBottom: "14px" }}>
                  {project.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <div className="plinks">
                    <a href={project.link.href} target="_blank" rel="noopener">
                      {project.link.label}
                    </a>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
