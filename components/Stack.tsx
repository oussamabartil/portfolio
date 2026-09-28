import { stack, type StackItem } from "@/data/stack";
import { Reveal } from "./Reveal";

function Track({ items, reverse }: { items: StackItem[]; reverse?: boolean }) {
  const looped = [...items, ...items];
  return (
    <div className="marquee">
      <div className={`marquee-track${reverse ? " rev" : ""}`}>
        {looped.map((item, i) => (
          <span className="badge" key={`${item.name}-${i}`}>
            {item.name} <span className="cat">{item.category}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Stack() {
  const half = Math.ceil(stack.length / 2);
  const first = stack.slice(0, half);
  const second = stack.slice(half);

  return (
    <section id="stack">
      <div className="wrap">
        <Reveal>
          <div className="sectionhead">
            <span className="tag">{"// stack technique"}</span>
            <h2>Outils &amp; technologies</h2>
            <p>Les technologies que j&apos;utilise pour concevoir des logiciels fiables et sécurisés.</p>
          </div>
        </Reveal>
      </div>
      <div className="stackrows">
        <Track items={first} />
        <Track items={second} reverse />
      </div>
    </section>
  );
}
