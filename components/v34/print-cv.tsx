import { cvData } from "@/data/cv";
import { focusModules } from "@/data/v34";

function uniqueParts(...parts: Array<string | undefined>): string[] {
  return Array.from(new Set(parts.filter((part): part is string => Boolean(part))));
}

export function PrintCV() {
  return (
    <section aria-label="Print curriculum vitae" className="v4-print-only">
      <header className="v4-print-head">
        <span className="v4-print-eyebrow">Curriculum Vitae / 2026</span>
        <h1>{cvData.contact.name}</h1>
        <p className="v4-print-role">Software developer with a product eye.</p>
        <div className="v4-print-contact">
          <span>{cvData.contact.phone}</span>
          <span>{cvData.contact.email}</span>
          <span>linkedin.com/in/ahmed-hesham-8h</span>
          <span>github.com/ahmed8ch</span>
          <span>{cvData.contact.location}</span>
          <span>Military status: {cvData.contact.militaryStatus}</span>
        </div>
      </header>

      <div className="v4-print-section">
        <h2>Summary</h2>
        <p>{cvData.summary}</p>
      </div>

      <div className="v4-print-section">
        <h2>Training &amp; Internships</h2>
        {cvData.training.map((item) => (
          <article className="v4-print-item" key={`${item.role}-${item.institution}`}>
            <div className="v4-print-item-head">
              <div>
                <h3>{item.role}</h3>
                <p>
                  {uniqueParts(item.institution, item.organization, item.mode, item.location).join(
                    " / ",
                  )}
                </p>
              </div>
              <span>{item.period}</span>
            </div>
            <ul>
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            {item.upcomingModules && (
              <p className="v4-print-note">
                Active Full-Stack Track &amp; Focus: {focusModules.join(", ")}
              </p>
            )}
          </article>
        ))}
      </div>

      <div className="v4-print-section">
        <h2>Selected Projects</h2>
        {cvData.projects.map((project) => (
          <article className="v4-print-item" key={project.slug}>
            <div className="v4-print-item-head">
              <div>
                <h3>
                  {project.title} / {project.subtitle}
                </h3>
                <p>{project.stack.join(", ")}</p>
              </div>
              <span>{project.period}</span>
            </div>
            <ul>
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="v4-print-section v4-print-two">
        <div>
          <h2>Education</h2>
          {cvData.education.map((item) => (
            <article className="v4-print-item" key={item.degree}>
              <h3>{item.degree}</h3>
              <p>
                {item.institution} / {item.location} / {item.graduationDate}
              </p>
            </article>
          ))}
        </div>
        <div>
          <h2>Certifications</h2>
          {cvData.certifications.map((item) => (
            <article className="v4-print-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>
                {item.issuer} / {item.issuedDate}
                {item.hours ? ` / ${item.hours} hrs` : ""}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="v4-print-section">
        <h2>Technical Skills</h2>
        <dl className="v4-print-skills">
          {cvData.skills.map((group) => (
            <div key={group.category}>
              <dt>{group.category}</dt>
              <dd>{group.skills.join(" / ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
