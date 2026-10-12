import { useEffect, useMemo, useRef, useState } from "react";
import { MediaImage } from "./MediaImage";
import { TechIcon } from "./Icon";
import { useReducedMotion } from "../hooks/useReducedMotion";

const GROUP_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#f59e0b",
  "#10b981",
  "#ec4899",
  "#f97316",
  "#6366f1",
];

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

/** Rotation that brings a point on the unit sphere to the front. */
function frontRotation(point) {
  const y = Math.atan2(-point.x, point.z);
  const z1 = Math.sqrt(point.x * point.x + point.z * point.z);
  return { x: Math.atan2(point.y, z1), y };
}

const PERSPECTIVE = 4.2;
const GREAT_CIRCLES = [
  (t) => ({ x: Math.cos(t), y: 0, z: Math.sin(t) }),
  (t) => ({ x: Math.cos(t), y: Math.sin(t), z: 0 }),
  (t) => ({ x: 0, y: Math.cos(t), z: Math.sin(t) }),
  (t) => ({ x: Math.cos(t) * 0.866, y: 0.5, z: Math.sin(t) * 0.866 }),
  (t) => ({ x: Math.cos(t) * 0.866, y: -0.5, z: Math.sin(t) * 0.866 }),
];

export function SkillGlobe({ groups = [] }) {
  const reduced = useReducedMotion();
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const nodeRefs = useRef([]);
  const rot = useRef({ x: 0.3, y: 0.4, vy: 0 });
  const drag = useRef(null);
  const hovering = useRef(false);
  const target = useRef(null);
  const filter = useRef({ needle: "", groupId: null });
  const [query, setQuery] = useState("");
  const [pickedGroup, setGroupId] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const groupMeta = useMemo(
    () =>
      groups.map((group, index) => ({
        id: group.id,
        title: group.title,
        count: (group.items || []).filter((item) => item.name?.trim()).length,
        color: GROUP_COLORS[index % GROUP_COLORS.length],
      })),
    [groups],
  );
  // a group removed in the admin panel must not leave the sphere filtered to nothing
  const groupId = groupMeta.some((group) => group.id === pickedGroup && group.count > 0) ? pickedGroup : null;

  const skills = useMemo(() => {
    const items = groups.flatMap((group, groupIndex) =>
      (group.items || []).filter((item) => item.name?.trim()).map((item, itemIndex) => ({
        id: `${group.id}:${itemIndex}:${item.name}`,
        name: item.name,
        icon: item.icon,
        group: group.title,
        groupId: group.id,
        color: GROUP_COLORS[groupIndex % GROUP_COLORS.length],
      })),
    );
    const points = sphereLayout(items.length);
    return items.map((item, index) => ({ ...item, point: points[index] }));
  }, [groups]);

  const pairs = useMemo(() => {
    const list = [];
    for (let i = 0; i < skills.length; i += 1) {
      for (let j = i + 1; j < skills.length; j += 1) {
        const a = skills[i].point;
        const b = skills[j].point;
        if (Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) < 0.8) list.push([i, j]);
      }
    }
    return list;
  }, [skills]);

  const needle = query.trim().toLowerCase();
  const matches = useMemo(
    () =>
      skills.filter((item) => {
        if (groupId && item.groupId !== groupId) return false;
        if (!needle) return true;
        return `${item.name} ${item.group}`.toLowerCase().includes(needle);
      }),
    [skills, needle, groupId],
  );
  const activeSkill = skills.find((item) => item.id === activeId) || null;
  const cardSkill = needle ? matches[0] || null : activeSkill;
  const sameName = cardSkill ? skills.filter((item) => item.name === cardSkill.name) : [];
  const otherMatches = needle
    ? matches.filter((item) => item.name !== cardSkill?.name).slice(0, 6)
    : [];

  useEffect(() => {
    filter.current = { needle, groupId };
  }, [needle, groupId]);

  useEffect(() => {
    if (needle && matches[0]) {
      target.current = frontRotation(matches[0].point);
    } else if (!needle && groupId) {
      const ys = skills.filter((item) => item.groupId === groupId).map((item) => item.point.y);
      if (ys.length) {
        const mean = ys.reduce((sum, y) => sum + y, 0) / ys.length;
        target.current = { x: Math.asin(Math.max(-0.95, Math.min(0.95, mean))) };
      }
    }
  }, [needle, groupId, matches, skills]);

  useEffect(() => {
    if (!needle) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setQuery("");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [needle]);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return undefined;
    const context = canvas.getContext("2d");
    let frame = 0;

    const draw = () => {
      const state = rot.current;
      if (target.current && !drag.current) {
        const t = target.current;
        let done = true;
        const ease = reduced ? 1 : 0.09;
        if (t.y !== undefined) {
          let d = t.y - state.y;
          d = Math.atan2(Math.sin(d), Math.cos(d));
          state.y += d * ease;
          if (Math.abs(d) > 0.004) done = false;
        }
        if (t.x !== undefined) {
          const d = t.x - state.x;
          state.x += d * ease;
          if (Math.abs(d) > 0.004) done = false;
        }
        state.vy = 0;
        if (done || reduced) target.current = null;
      } else if (!drag.current) {
        state.y += state.vy;
        state.vy *= 0.94;
        if (
          !reduced &&
          !hovering.current &&
          !filter.current.needle &&
          Math.abs(state.vy) < 0.002
        ) {
          state.y += 0.0032;
        }
      }

      const width = stage.clientWidth;
      const height = stage.clientHeight;
      const ratio = window.devicePixelRatio || 1;
      if (canvas.width !== Math.floor(width * ratio) || canvas.height !== Math.floor(height * ratio)) {
        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);

      const accent = getComputedStyle(stage).getPropertyValue("--accent").trim() || "#2563eb";
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.36;
      const project = (point) => {
        const p = rotate(point, state.x, state.y);
        const depth = PERSPECTIVE / (PERSPECTIVE - p.z);
        return { z: p.z, left: cx + p.x * radius * depth, top: cy + p.y * radius * depth };
      };

      // wireframe globe
      context.lineWidth = 1;
      context.strokeStyle = accent;
      GREAT_CIRCLES.forEach((circle) => {
        let prev = project(circle(0));
        for (let step = 1; step <= 72; step += 1) {
          const next = project(circle((step / 72) * Math.PI * 2));
          context.globalAlpha = 0.05 + 0.15 * ((prev.z + next.z) / 2 + 1) / 2;
          context.beginPath();
          context.moveTo(prev.left, prev.top);
          context.lineTo(next.left, next.top);
          context.stroke();
          prev = next;
        }
      });

      const { needle: q, groupId: gid } = filter.current;
      const projected = skills.map((skill) => {
        const p = project(skill.point);
        const hit =
          (!gid || skill.groupId === gid) &&
          (!q || `${skill.name} ${skill.group}`.toLowerCase().includes(q));
        return { ...p, hit };
      });

      // connections: same practice area gets its own colour
      context.lineWidth = 1.2;
      pairs.forEach(([i, j]) => {
        const a = projected[i];
        const b = projected[j];
        if (a.z < -0.25 || b.z < -0.25) return;
        const same = skills[i].groupId === skills[j].groupId;
        const lit = a.hit && b.hit;
        context.strokeStyle = same ? skills[i].color : accent;
        context.globalAlpha = (lit ? (same ? 0.5 : 0.22) : 0.05) + Math.max(0, Math.min(a.z, b.z)) * 0.18;
        context.beginPath();
        context.moveTo(a.left, a.top);
        context.lineTo(b.left, b.top);
        context.stroke();
      });
      context.globalAlpha = 1;

      const narrow = width < 720;
      skills.forEach((skill, index) => {
        const el = nodeRefs.current[index];
        if (!el) return;
        const p = projected[index];
        const facing = (p.z + 1) / 2;
        const scale = (narrow ? 0.62 : 0.7) + facing * (narrow ? 0.34 : 0.42);
        const front = p.z > -0.1;
        el.style.transform = `translate3d(${p.left.toFixed(1)}px, ${p.top.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        el.style.opacity = p.hit ? (front ? 0.55 + facing * 0.45 : 0.28).toFixed(2) : "0.1";
        el.style.zIndex = String(Math.round(p.z * 100) + 100);
        el.style.pointerEvents = front && p.hit ? "auto" : "none";
      });

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [skills, pairs, reduced]);

  function onPointerDown(event) {
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      rx: rot.current.x,
      ry: rot.current.y,
      lastY: rot.current.y,
      moved: false,
      id: event.pointerId,
    };
    target.current = null;
    rot.current.vy = 0;
  }

  function onPointerMove(event) {
    const d = drag.current;
    if (!d) return;
    const dx = event.clientX - d.x;
    const dy = event.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) > 5) {
      d.moved = true;
      event.currentTarget.setPointerCapture(d.id);
    }
    if (!d.moved) return;
    rot.current.y = d.ry + dx * 0.008;
    rot.current.x = Math.max(-1.1, Math.min(1.1, d.rx + dy * 0.006));
    rot.current.vy = Math.max(-0.08, Math.min(0.08, rot.current.y - d.lastY));
    d.lastY = rot.current.y;
  }

  function onPointerUp() {
    drag.current = null;
  }

  const total = skills.length;
  const countLabel = needle
    ? `${matches.length} ${matches.length === 1 ? "match" : "matches"}`
    : groupId
      ? `${matches.length} of ${total}`
      : `${total} tools`;

  return (
    <div className="skill-globe">
      <div className="globe-toolbar">
        <label className="globe-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <span className="sr-only">Search tools</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a tool, e.g. Terraform"
            type="text"
            autoComplete="off"
            spellCheck="false"
          />
          <span className="globe-count">{countLabel}</span>
          {query ? (
            <button type="button" className="globe-clear" onClick={() => setQuery("")} aria-label="Clear search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          ) : null}
        </label>
        <div className="globe-chips" role="group" aria-label="Filter by practice area">
          <button
            type="button"
            className={`globe-chip${groupId ? "" : " is-on"}`}
            onClick={() => setGroupId(null)}
          >
            <i />
            All <b>{total}</b>
          </button>
          {groupMeta.filter((group) => group.count > 0).map((group) => (
            <button
              key={group.id}
              type="button"
              className={`globe-chip${groupId === group.id ? " is-on" : ""}`}
              style={{ "--g": group.color }}
              onClick={() => setGroupId(groupId === group.id ? null : group.id)}
            >
              <i />
              {group.title} <b>{group.count}</b>
            </button>
          ))}
        </div>
      </div>

      <div
        ref={stageRef}
        className="globe-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <canvas ref={canvasRef} />
        {skills.map((skill, index) => (
          <button
            key={skill.id}
            ref={(el) => {
              nodeRefs.current[index] = el;
            }}
            type="button"
            className={`globe-node${skill.id === cardSkill?.id ? " is-on" : ""}`}
            style={{ "--g": skill.color }}
            aria-label={`${skill.name}, ${skill.group}`}
            onPointerEnter={() => {
              hovering.current = true;
              setActiveId(skill.id);
            }}
            onPointerLeave={() => {
              hovering.current = false;
              setActiveId(null);
            }}
            onFocus={() => setActiveId(skill.id)}
            onBlur={() => setActiveId(null)}
            onClick={() => setQuery(skill.name)}
          >
            <span className="globe-tile">
              <MediaImage
                slot={`skill:${skill.icon}`}
                alt=""
                className="globe-logo"
                fallback={<TechIcon name={skill.icon} />}
              />
            </span>
            <span className="globe-tip">
              {skill.name}
              <small>{skill.group}</small>
            </span>
          </button>
        ))}
        <p className="globe-hint">Drag to rotate · hover a tool · click for details</p>
        {needle && cardSkill ? (
          <div className="globe-modal" role="presentation" onPointerDown={(event) => event.stopPropagation()}>
            <div
              className="globe-modal-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="skill-pop-title"
              style={{ "--g": cardSkill.color }}
            >
              <button type="button" className="globe-modal-close" onClick={() => setQuery("")}>
                Close
              </button>
              <span className="globe-modal-tile">
                <MediaImage
                  slot={`skill:${cardSkill.icon}`}
                  alt=""
                  className="globe-modal-logo"
                  fallback={<TechIcon name={cardSkill.icon} />}
                />
              </span>
              <h3 id="skill-pop-title">{cardSkill.name}</h3>
              <p>
                {cardSkill.name} is part of the{" "}
                {sameName.map((item) => item.group).join(" and ")} practice{" "}
                {sameName.length > 1 ? "areas" : "area"}.
              </p>
              {otherMatches.length ? (
                <div className="globe-modal-more">
                  <span>Also matching</span>
                  {otherMatches.map((item) => (
                    <button key={item.id} type="button" onClick={() => setQuery(item.name)}>
                      {item.name}
                    </button>
                  ))}
                </div>
              ) : null}
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
