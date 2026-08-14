"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Le morphing SVG passe par SMIL, hors de portée des règles CSS
 * `prefers-reduced-motion`. Il faut donc lire la préférence en JavaScript pour
 * ne pas rendre l'élément `<animate>`.
 *
 * `useSyncExternalStore` plutôt qu'un `useEffect` + `setState` : la valeur est
 * lue au rendu, sans passe de rendu supplémentaire, et le changement de
 * préférence en cours de session est pris en compte.
 */
export default function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
