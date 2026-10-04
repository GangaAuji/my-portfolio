import { useEffect, useMemo, useRef, useState } from "react";
import { MediaImage } from "./MediaImage";
import { TechIcon } from "./Icon";
import { useReducedMotion } from "../hooks/useReducedMotion";

function sphereLayout(count) {
  const points = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let index = 0; index < count; index += 1) {
    const y = count === 1 ? 0 : 1 - (index / (count - 1)) * 2;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * index;
    points.push({
      x: Math.cos(theta) * ring,
      y,
      z: Math.sin(theta) * ring,
    });
  }
  return points;
}

function rotate(point, rotX, rotY) {
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const x1 = point.x * cosY + point.z * sinY;
  const z1 = -point.x * sinY + point.z * cosY;
  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  return {
    x: x1,
    y: point.y * cosX - z1 * sinX,
    z: point.y * sinX + z1 * cosX,
  };
}

export function SkillGlobe({ groups = [] }) {
  const reduced = useReducedMotion();
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const rot = useRef({ x: 0.35, y: 0.4 });
  const drag = useRef(null);
  const hovering = useRef(false);
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [placed, setPlaced] = useState([]);

  const skills = useMemo(() => {
    const items = groups.flatMap((group) =>
      (group.items || []).map((item) => ({
        id: `${group.id}:${item.name}`,
        name: item.name,
        icon: item.icon,
        group: group.title,
      })),
    );
    const points = sphereLayout(items.length);
    return items.map((item, index) => ({ ...item, point: points[index] }));
  }, [groups]);

  const needle = query.trim().toLowerCase();
  const activeSkill = skills.find((item) => item.id === activeId) || null;
  const cardSkill = needle
    ? skills.find((item) => `${item.name} ${item.group}`.toLowerCase().includes(needle))
    : activeSkill;

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return undefined;
    const context = canvas.getContext("2d");
    let frame = 0;

    const draw = () => {
      if (!reduced && !hovering.current && !drag.current) rot.current.y += 0.004;
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      const ratio = window.devicePixelRatio || 1;
      if (canvas.width !== Math.floor(width * ratio) || canvas.height !== Math.floor(height * ratio)) {
        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.54;
      const radius = Math.min(width, height) * 0.32;
      const projected = skills.map((skill) => {
        const point = rotate(skill.point, rot.current.x, rot.current.y);
        const depth = 3.4 / (3.4 - point.z);
        return {
          ...skill,
          z: point.z,
          left: cx + point.x * radius * depth,
          top: cy + point.y * radius * depth,
          depth,
          visible: !needle || `${skill.name} ${skill.group}`.toLowerCase().includes(needle),
        };
      });

      context.lineWidth = 1;
      for (let i = 0; i < projected.length; i += 1) {
        for (let j = i + 1; j < projected.length; j += 1) {
          const a = projected[i];
          const b = projected[j];
          const gap = Math.hypot(a.point.x - b.point.x, a.point.y - b.point.y, a.point.z - b.point.z);
          if (gap > 0.72 || a.z < -0.2 || b.z < -0.2) continue;
          if (needle && !a.visible && !b.visible) continue;
          context.strokeStyle = getComputedStyle(stage).getPropertyValue("--accent").trim() || "#2563eb";
          context.globalAlpha = 0.28 + Math.max(0, Math.min(a.z, b.z)) * 0.25;
          context.beginPath();
          context.moveTo(a.left, a.top);
          context.lineTo(b.left, b.top);
          context.stroke();
          context.globalAlpha = 1;
        }
      }

      setPlaced(projected);
      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [skills, needle, reduced]);

  function onPointerDown(event) {
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      rx: rot.current.x,
      ry: rot.current.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event) {
    if (!drag.current) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    rot.current.y = drag.current.ry + dx * 0.008;
    rot.current.x = Math.max(-1, Math.min(1, drag.current.rx + dy * 0.006));
  }

  function onPointerUp() {
    drag.current = null;
  }

  return (
    <div className="skill-globe">
      <label className="globe-search">
        <span className="sr-only">Search tools</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search tools"
          type="search"
        />
      </label>
      <div
        ref={stageRef}
        className="globe-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <canvas ref={canvasRef} />
        {placed.map((skill) => (
          <button
            key={skill.id}
            type="button"
            className={`globe-node${skill.id === cardSkill?.id ? " is-on" : ""}`}
            style={{
              left: skill.left,
              top: skill.top,
              opacity: skill.visible ? Math.min(1, skill.z < -0.15 ? 0.28 : 0.55 + skill.z * 0.45) : 0.12,
              zIndex: Math.round(skill.z * 100) + 100,
              pointerEvents: skill.z < -0.05 || !skill.visible ? "none" : "auto",
            }}
            aria-label={`${skill.name}, ${skill.group}`}
            onPointerEnter={() => {
              hovering.current = true;
              setActiveId(skill.id);
            }}
            onPointerLeave={() => {
              hovering.current = false;
            }}
            onFocus={() => setActiveId(skill.id)}
          >
            <MediaImage
              slot={`skill:${skill.icon}`}
              alt=""
              className="globe-logo"
              fallback={<TechIcon name={skill.icon} />}
            />
          </button>
        ))}
        {needle && cardSkill ? (
          <div className="globe-modal" role="presentation" onPointerDown={(event) => event.stopPropagation()}>
            <div
              className="globe-modal-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="skill-pop-title"
            >
              <button type="button" className="globe-modal-close" onClick={() => setQuery("")}>
                Close
              </button>
              <MediaImage
                slot={`skill:${cardSkill.icon}`}
                alt=""
                className="globe-modal-logo"
                fallback={<TechIcon name={cardSkill.icon} />}
              />
              <h3 id="skill-pop-title">{cardSkill.name}</h3>
              <p>
                {cardSkill.name} is part of the {cardSkill.group} practice area.
              </p>
            </div>
          </div>
        ) : null}
      </div>
      <ul className="sr-only">
        {skills.map((skill) => (
          <li key={skill.id}>
            {skill.name}, {skill.group}
          </li>
        ))}
      </ul>
    </div>
  );
}
