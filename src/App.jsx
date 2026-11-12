import { useEffect, useState } from "react";
import {
  profile,
  rackUnits,
  experience,
  projects,
  skills,
  education,
  certifications,
  achievements,
} from "./data.js";

/* ---------- theme ---------- */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "";
    } catch {
      return "";
    }
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme) root.setAttribute("data-theme", theme);
    else root.removeAttribute("data-theme");
    try {
      if (theme) localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);
  const isDark =
    theme === "dark" ||
    (!theme && window.matchMedia?.("(prefers-color-scheme: dark)").matches);
  return [isDark, () => setTheme(isDark ? "light" : "dark")];
}

/* ---------- header ---------- */
function Header() {
  const [isDark, toggle] = useTheme();
  return (
    <header className="topbar">
      <a href="#top" className="brand">
        {profile.name}
      </a>
      <nav aria-label="Sections">
        <a href="#work">Work</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </nav>
      <button className="theme-btn" onClick={toggle} aria-label="Switch color theme">
        {isDark ? "Light" : "Dark"}
      </button>
    </header>
  );
}

/* ---------- rack (hero centerpiece) ---------- */
function Rack() {
  const [selected, setSelected] = useState(rackUnits[0].id);
  const current = rackUnits.find((u) => u.id === selected);

  // build U numbers from the top down
  const totalU = rackUnits.reduce((n, u) => n + u.size, 0);
  let u = totalU;

  return (
    <div className="rack-wrap">
      <div className="rack" role="list" aria-label="Infrastructure I work on">
        <div className="rack-cap">Rack A1</div>
        {rackUnits.map((unit) => {
          const top = u;
          u -= unit.size;
          const active = unit.id === selected;
          return (
            <div className="rack-row" role="listitem" key={unit.id}>
              <span className="u-num" aria-hidden="true">
                {unit.size === 2 ? `${top}–${top - 1}` : top}
              </span>
              <button
                className={`unit size-${unit.size}${active ? " active" : ""}`}
                onClick={() => setSelected(unit.id)}
                aria-pressed={active}
              >
                <span className="screw" aria-hidden="true" />
                <span className="unit-label">{unit.label}</span>
                <span className="leds" aria-hidden="true">
                  <span className={`led ${unit.status}`} />
                  <span className="led ok dim" />
                </span>
                <span className="screw" aria-hidden="true" />
              </button>
            </div>
          );
        })}
        <div className="rack-cap bottom" aria-hidden="true" />
      </div>
      <div className="unit-detail" aria-live="polite">
        <h3>{current.label}</h3>
        <p>{current.detail}</p>
        <p className="hint">Select another unit in the rack to see what I do there.</p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-text">
        <p className="status-line">
          <span className="led ok" aria-hidden="true" /> {profile.available}
        </p>
        <h1>{profile.name}</h1>
        <p className="role">{profile.role}</p>
        <p className="intro">{profile.intro}</p>
        <div className="cta">
          <a className="btn primary" href={`mailto:${profile.email}`}>
            Email me
          </a>
          <a className="btn" href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
      <Rack />
    </section>
  );
}

/* ---------- experience ---------- */
function Experience() {
  return (
    <section id="work" className="section">
      <h2>Experience</h2>
      {experience.map((job) => (
        <article className="job" key={job.company}>
          <div className="job-head">
            <h3>{job.title}</h3>
            <p className="muted">
              {job.company}, {job.place} <span className="period">{job.period}</span>
            </p>
          </div>
          <ul>
            {job.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}

/* ---------- projects ---------- */
function Projects() {
  return (
    <section id="projects" className="section">
      <h2>Projects</h2>
      <div className="projects">
        {projects.map((p, i) => (
          <article className={`project${i === 0 ? " lead" : ""}`} key={p.name}>
            <h3>{p.name}</h3>
            <p>{p.summary}</p>
            <ul>
              {p.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <p className="stack">{p.stack.join(", ")}</p>
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer" className="text-link">
                View on GitHub
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- live GitHub repos ---------- */
function GitHubRepos() {
  const [state, setState] = useState({ status: "loading", repos: [] });

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${profile.github}/repos?sort=updated&per_page=12`)
      .then((r) => {
        if (!r.ok) throw new Error(r.status === 403 ? "rate" : "fail");
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        const repos = data.filter((r) => !r.fork).slice(0, 6);
        setState({ status: "done", repos });
      })
      .catch((e) => !cancelled && setState({ status: e.message, repos: [] }));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="section" aria-labelledby="repos-title">
      <h2 id="repos-title">Recently updated on GitHub</h2>
      {state.status === "loading" && <p className="muted">Loading repositories from GitHub…</p>}
      {(state.status === "fail" || state.status === "rate") && (
        <p className="muted">
          GitHub didn’t respond{state.status === "rate" ? " (too many requests from this network)" : ""}.{" "}
          <a className="text-link" href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer">
            Open my GitHub profile
          </a>{" "}
          to see all repositories.
        </p>
      )}
      {state.status === "done" && state.repos.length === 0 && (
        <p className="muted">No public repositories yet.</p>
      )}
      {state.repos.length > 0 && (
        <ul className="repos">
          {state.repos.map((r) => (
            <li key={r.id}>
              <a href={r.html_url} target="_blank" rel="noreferrer">
                <span className="repo-name">{r.name.replace(/[-_]/g, " ")}</span>
                {r.description && <span className="repo-desc">{r.description}</span>}
                <span className="repo-meta">
                  {r.language || "Config"}, updated{" "}
                  {new Date(r.pushed_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* ---------- skills ---------- */
function Skills() {
  return (
    <section id="skills" className="section">
      <h2>Skills</h2>
      <div className="skills">
        {skills.map((s) => (
          <div key={s.group}>
            <h3>{s.group}</h3>
            <ul>
              {s.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- education etc. ---------- */
function Background() {
  return (
    <section className="section background">
      <div>
        <h2>Education</h2>
        {education.map((e) => (
          <div className="edu" key={e.degree}>
            <h3>{e.degree}</h3>
            <p className="muted">
              {e.school}, {e.period}
            </p>
            <p>{e.note}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Certifications</h2>
        <ul className="plain">
          {certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <h2 className="spaced">Achievements</h2>
        <ul className="plain">
          {achievements.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <section id="contact" className="section contact">
      <h2>Let’s talk infrastructure</h2>
      <p>
        Hiring for cloud, DevOps or data center operations in {profile.location.split(",")[0]} or remote? Write to me.
      </p>
      <div className="cta">
        <a className="btn primary" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <button className="btn" onClick={copy}>
          {copied ? "Email copied" : "Copy email"}
        </button>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <GitHubRepos />
        <Skills />
        <Background />
        <Contact />
      </main>
      <footer>
        © {new Date().getFullYear()} {profile.name}. Built with React.
      </footer>
    </>
  );
}
