import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon, EmailIcon } from "./icons";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <Reveal>
          <div className="contactbox">
            <h2>Construisons quelque chose ensemble</h2>
            <p>
              Ouvert à un stage de fin d&apos;études (PFE) en développement logiciel. Écris-moi, réponse
              rapide garantie.
            </p>
            <div className="contactrow">
              <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                Envoyer un email
              </a>
              <a className="btn btn-secondary" href={`tel:${profile.phoneHref}`}>
                {profile.phoneDisplay}
              </a>
              <a className="btn btn-secondary" href={profile.cvUrl} download>
                Télécharger le CV
              </a>
            </div>
            <div className="socialrow">
              <a className="iconbtn" href={profile.github} target="_blank" rel="noopener" aria-label="GitHub">
                <GithubIcon />
              </a>
              <a className="iconbtn" href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
              <a className="iconbtn" href={`mailto:${profile.email}`} aria-label="Email">
                <EmailIcon />
              </a>
            </div>

            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
