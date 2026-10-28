import { fieldNotes } from "@/data/v34";
import { BidiIcon, GhostIcon, PyramidIcon } from "./icons";

const noteIcons = {
  ghost: GhostIcon,
  pyramid: PyramidIcon,
  bidi: BidiIcon,
};

export function FieldNotes() {
  return (
    <section aria-labelledby="v4-notes-title" className="v4-section v4-notes" id="notes">
      <header className="v4-section-head">
        <div>
          <span className="v4-kicker">02 / field notes</span>
          <h2 id="v4-notes-title">
            Small facts,
            <br />
            <em>deliberate detail.</em>
          </h2>
        </div>
        <p>
          Three things that explain how I work: a mascot with a job, a monument I keep postponing,
          and a layout direction I refuse to treat as an afterthought.
        </p>
        <span className="v4-section-count">03 notes / off screen</span>
      </header>

      <div className="v4-notes-grid">
        {fieldNotes.map((note) => {
          const NoteIcon = noteIcons[note.icon];
          return (
            <article className="v4-note" key={note.index}>
              <div className="v4-note-top">
                <h3>
                  <span>{note.index} /</span> {note.title}
                </h3>
                <span className="v4-note-icon">
                  <NoteIcon size={24} />
                </span>
              </div>
              <p>{note.copy}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
