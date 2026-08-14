import { Fragment } from "react";

/**
 * Bandeau défilant. Le contenu est dupliqué une fois et la translation
 * s'arrête à -50 % : la boucle est donc parfaitement continue.
 */
export default function Marquee({
  items,
  className = "",
  separator = "/",
}: {
  items: string[];
  className?: string;
  separator?: string;
}) {
  const track = [...items, ...items];

  return (
    <div className={`group relative flex overflow-hidden ${className}`} aria-hidden>
      <div className="animate-marquee flex shrink-0 items-center whitespace-nowrap group-hover:[animation-play-state:paused]">
        {track.map((item, i) => (
          <Fragment key={`${item}-${i}`}>
            <span className="label px-6 py-4">{item}</span>
            <span className="text-aqua-400 text-xs">{separator}</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
