"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { profile, aboutCopy } from "@/data/profile";
import { stack } from "@/data/stack";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { projects } from "@/data/projects";

const PROMPT = "oussama@portfolio ~ %";
const WELCOME_TEXT = "Tapez 'help' pour voir les commandes disponibles.";

const COMMAND_LIST: { cmd: string; desc: string }[] = [
  { cmd: "help", desc: "Affiche cette liste de commandes" },
  { cmd: "whoami", desc: "Mon nom, mon rôle et ma localisation" },
  { cmd: "about", desc: "Résumé de mon profil" },
  { cmd: "skills", desc: "Mes compétences par catégorie" },
  { cmd: "experience", desc: "Mes stages" },
  { cmd: "education", desc: "Mon parcours académique" },
  { cmd: "projects", desc: "Mes projets techniques" },
  { cmd: "contact", desc: "Mes coordonnées" },
  { cmd: "open github", desc: "Ouvre mon GitHub dans un nouvel onglet" },
  { cmd: "open linkedin", desc: "Ouvre mon LinkedIn dans un nouvel onglet" },
  { cmd: "open cv", desc: "Ouvre mon CV (PDF) dans un nouvel onglet" },
  { cmd: "clear", desc: "Vide le terminal" },
];

const OPEN_TARGETS: Record<string, { url: string; label: string }> = {
  github: { url: profile.github, label: "GitHub" },
  linkedin: { url: profile.linkedin, label: "LinkedIn" },
  cv: { url: profile.cvUrl, label: "CV" },
};

function groupSkills() {
  const groups = new Map<string, string[]>();
  for (const item of stack) {
    const list = groups.get(item.category) ?? [];
    list.push(item.name);
    groups.set(item.category, list);
  }
  return Array.from(groups.entries());
}

const SKILL_GROUPS = groupSkills();

type Entry = { id: number; command: string | null; output: ReactNode };

function getOutput(raw: string): ReactNode | "CLEAR" {
  const trimmed = raw.trim();
  const lower = trimmed.toLowerCase();
  const [cmd, ...args] = lower.split(/\s+/);

  switch (cmd) {
    case "help":
      return (
        <div className="term-block">
          {COMMAND_LIST.map((c) => (
            <div className="term-line" key={c.cmd}>
              <span className="term-heading">{c.cmd.padEnd(14, " ")}</span>
              {c.desc}
            </div>
          ))}
        </div>
      );

    case "whoami":
      return (
        <div className="term-block">
          <div className="term-line term-heading">{profile.name}</div>
          <div className="term-line">{profile.role}</div>
          <div className="term-line">{profile.location}</div>
        </div>
      );

    case "about":
      return (
        <div className="term-block">
          <div className="term-line">{aboutCopy.paragraphs[0]}</div>
          <div className="term-line" style={{ marginTop: 8 }}>
            {profile.status}
          </div>
        </div>
      );

    case "skills":
      return (
        <div className="term-block">
          {SKILL_GROUPS.map(([category, names]) => (
            <div className="term-line" key={category}>
              <span className="term-heading">{category} :</span> {names.join(", ")}
            </div>
          ))}
        </div>
      );

    case "experience":
      return (
        <div className="term-block">
          {experience.map((job) => (
            <div key={`${job.place}-${job.period}`} style={{ marginBottom: 10 }}>
              <div className="term-line term-heading">{job.title}</div>
              <div className="term-line">
                {job.place} · {job.period}
              </div>
            </div>
          ))}
        </div>
      );

    case "education":
      return (
        <div className="term-block">
          {education.map((item) => (
            <div key={item.school} style={{ marginBottom: 10 }}>
              <div className="term-line term-heading">
                {item.school} — {item.institution}
              </div>
              <div className="term-line">{item.degree}</div>
              <div className="term-line">{item.when}</div>
            </div>
          ))}
        </div>
      );

    case "projects":
      return (
        <div className="term-block">
          {projects.map((p, i) => (
            <div className="term-line" key={p.title}>
              {i + 1}. <span className="term-heading">{p.title}</span> — {p.category}
              {p.link && (
                <>
                  {" "}
                  <a className="term-link" href={p.link.href} target="_blank" rel="noopener">
                    {p.link.label}
                  </a>
                </>
              )}
            </div>
          ))}
          <div className="term-line" style={{ marginTop: 8 }}>
            <a className="term-link" href="#projects">
              Voir tous les projets →
            </a>
          </div>
        </div>
      );

    case "contact":
      return (
        <div className="term-block">
          <div className="term-line">
            Email :{" "}
            <a className="term-link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
          <div className="term-line">
            Téléphone :{" "}
            <a className="term-link" href={`tel:${profile.phoneHref}`}>
              {profile.phoneDisplay}
            </a>
          </div>
          <div className="term-line">
            GitHub :{" "}
            <a className="term-link" href={profile.github} target="_blank" rel="noopener">
              {profile.github.replace("https://", "")}
            </a>
          </div>
          <div className="term-line">
            LinkedIn :{" "}
            <a className="term-link" href={profile.linkedin} target="_blank" rel="noopener">
              {profile.linkedin.replace("https://", "")}
            </a>
          </div>
        </div>
      );

    case "open": {
      const target = args[0];
      const entry = target ? OPEN_TARGETS[target] : undefined;
      if (!entry) {
        return (
          <div className="term-line term-error">
            Usage : open github | open linkedin | open cv
          </div>
        );
      }
      if (typeof window !== "undefined") {
        window.open(entry.url, "_blank", "noopener,noreferrer");
      }
      return <div className="term-line">Ouverture de {entry.label} dans un nouvel onglet…</div>;
    }

    case "clear":
      return "CLEAR";

    case "":
      return null;

    default:
      return (
        <div className="term-line term-error">
          Commande introuvable : &quot;{trimmed}&quot;. Tapez &apos;help&apos; pour voir les
          commandes disponibles.
        </div>
      );
  }
}

export function Terminal() {
  const idRef = useRef(1);
  const [entries, setEntries] = useState<Entry[]>(() => [
    {
      id: 0,
      command: null,
      output: (
        <div className="term-line">
          <span
            className="term-welcome"
            style={{ "--term-welcome-chars": WELCOME_TEXT.length } as CSSProperties}
          >
            {WELCOME_TEXT}
          </span>
        </div>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [commandLog, setCommandLog] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
  }, [entries]);

  function executeCommand(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const result = getOutput(raw);
    setCommandLog((log) => [...log, raw]);
    setHistoryIndex(null);

    if (result === "CLEAR") {
      setEntries([]);
    } else if (result !== null) {
      idRef.current += 1;
      setEntries((prev) => [...prev, { id: idRef.current, command: raw, output: result }]);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    executeCommand(input);
    setInput("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandLog.length === 0) return;
      setHistoryIndex((idx) => {
        const next = idx === null ? commandLog.length - 1 : Math.max(0, idx - 1);
        setInput(commandLog[next]);
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistoryIndex((idx) => {
        if (idx === null) return null;
        const next = idx + 1;
        if (next >= commandLog.length) {
          setInput("");
          return null;
        }
        setInput(commandLog[next]);
        return next;
      });
    }
  }

  function handleQuickCommand(cmd: string) {
    executeCommand(cmd);
    setInput("");
    inputRef.current?.focus();
  }

  return (
    <div
      className="terminal"
      role="group"
      aria-label="Terminal interactif du portfolio"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        className="term-output"
        ref={outputRef}
        role="log"
        aria-live="polite"
        aria-label="Historique du terminal"
      >
        {entries.map((entry) => (
          <div className="term-block" key={entry.id}>
            {entry.command !== null && (
              <div className="term-prompt-line">
                <span className="term-prompt-user">{PROMPT}</span>
                <span className="term-cmd-text">{entry.command}</span>
              </div>
            )}
            {entry.output}
          </div>
        ))}
      </div>

      <form className="term-form" onSubmit={handleSubmit}>
        <label htmlFor="terminal-input" className="sr-only">
          Ligne de commande du terminal — tapez &apos;help&apos; pour la liste des commandes
        </label>
        <span className="term-prompt-label" aria-hidden="true">
          {PROMPT}
        </span>
        <span className="term-input-wrap">
          {input === "" && <span className="term-cursor" aria-hidden="true" />}
          <input
            ref={inputRef}
            id="terminal-input"
            className="term-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
          />
        </span>
      </form>

      <div className="term-quickcmds">
        <button type="button" className="term-quick-btn" onClick={() => handleQuickCommand("whoami")}>
          whoami
        </button>
        <button type="button" className="term-quick-btn" onClick={() => handleQuickCommand("projects")}>
          projects
        </button>
        <button type="button" className="term-quick-btn" onClick={() => handleQuickCommand("contact")}>
          contact
        </button>
        <button type="button" className="term-quick-btn" onClick={() => handleQuickCommand("help")}>
          help
        </button>
      </div>
    </div>
  );
}
