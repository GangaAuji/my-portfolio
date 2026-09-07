import { useCounter, useInView } from "../hooks/useInView";

export function MetricCard({ value, suffix = "", label, detail }) {
  const { ref, inView } = useInView();
  const displayed = useCounter(value, inView);

  return (
    <article ref={ref} className="metric-card">
      <p className="metric-value">
        <span>{displayed}</span>
        {suffix ? <span className="metric-suffix">{suffix}</span> : null}
      </p>
      <h3>{label}</h3>
      {detail ? <p>{detail}</p> : null}
    </article>
  );
}
