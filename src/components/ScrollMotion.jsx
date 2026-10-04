import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "../hooks/useReducedMotion";

const SELECTOR = ".section";

export function ScrollMotion() {
  const reduced = useReducedMotion();
  const { pathname } = useLocation();

  useEffect(() => {
    const root = document.getElementById("main");
    if (!root) return undefined;

    document.documentElement.classList.toggle("has-motion", !reduced);
    const nodes = [...root.querySelectorAll(SELECTOR)];

    if (reduced) {
      nodes.forEach((node) => node.classList.add("is-inview"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-inview");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => {
      node.classList.add("reveal");
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, [pathname, reduced]);

  return null;
}
