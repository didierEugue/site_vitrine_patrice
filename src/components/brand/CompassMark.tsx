/**
 * Marque « boussole » redessinée en vectoriel à partir de logo.jpg.
 *
 * Le fichier fourni par le cabinet est un JPG 1024×1024 sur fond crème :
 * inutilisable en en-tête, sur fond sombre ou en favicon. Cette version SVG
 * suit la géométrie de l'original :
 *   — anneau bleu épais avec quatre repères cardinaux pointant vers l'intérieur ;
 *   — deux filets argent, l'un à l'extérieur de l'anneau, l'autre à l'intérieur ;
 *   — disque cyan avec son croissant de lumière ;
 *   — aiguille rouge en dard : facette haute éclairée, facette basse dans
 *     l'ombre, pointée à l'est, cerclée d'argent, avec son rivet.
 *
 * À remplacer par le vectoriel officiel dès que le client le fournit.
 */
export default function CompassMark({
  className = "h-10 w-10",
  animated = false,
  idPrefix = "cm",
}: {
  className?: string;
  /** Fait osciller l'aiguille, comme une boussole qui cherche le nord. */
  animated?: boolean;
  /** Évite les collisions d'ID quand plusieurs marques coexistent. */
  idPrefix?: string;
}) {
  const ring = `${idPrefix}-ring`;
  const disc = `${idPrefix}-disc`;

  return (
    <svg viewBox="0 0 100 100" role="img" aria-label="CAP CONSEILS" className={className}>
      <defs>
        <linearGradient id={ring} x1="16" y1="10" x2="84" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4a86dc" />
          <stop offset="45%" stopColor="#1f4e9c" />
          <stop offset="100%" stopColor="#12305e" />
        </linearGradient>
        <radialGradient id={disc} cx="40%" cy="34%" r="76%">
          <stop offset="0%" stopColor="#8fe6fc" />
          <stop offset="50%" stopColor="#33c6f2" />
          <stop offset="100%" stopColor="#0f9ccb" />
        </radialGradient>
      </defs>

      {/* Filet argent extérieur */}
      <circle cx="50" cy="50" r="48.5" fill="none" stroke="#c8ccd1" strokeWidth="1.3" />

      {/* Anneau bleu */}
      <circle cx="50" cy="50" r="44" fill="none" stroke={`url(#${ring})`} strokeWidth="8" />

      {/* Filet argent intérieur, dans le vide entre l'anneau et le disque */}
      <circle cx="50" cy="50" r="34" fill="none" stroke="#dfe3e8" strokeWidth="1.3" />

      {/*
        Repères cardinaux : posés sur l'anneau, pointe vers le centre, et
        débordant légèrement dans le vide intérieur comme sur l'original.
      */}
      <g fill="#12305e">
        <path d="M44 3.4h12L50 15.5z" />
        <path d="M44 96.6h12L50 84.5z" />
        <path d="M3.4 44v12L15.5 50z" />
        <path d="M96.6 44v12L84.5 50z" />
      </g>

      {/* Disque central et son croissant de lumière */}
      <circle cx="50" cy="50" r="25" fill={`url(#${disc})`} />
      <circle cx="50" cy="50" r="25" fill="none" stroke="#ffffff" strokeWidth="0.9" opacity="0.5" />
      <path
        d="M50 31a19 19 0 0 0-13.4 32.4"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.32"
      />

      {/*
        Aiguille. Point clé de fidélité : elle ne traverse pas le diamètre —
        elle part du centre et file vers l'est, la pointe débordant l'anneau.
        Ailes hautes et basses proches de la pointe, flancs concaves.
      */}
      <g
        style={
          animated
            ? { transformOrigin: "50px 50px", animation: "needle 14s ease-in-out infinite" }
            : undefined
        }
      >
        {/* Moitié basse, dans l'ombre */}
        <path
          d="M93 50C86 52.6 79 56.2 72.5 65L44 50Z"
          fill="#8d0c24"
          stroke="#e9e4d8"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        {/* Moitié haute, éclairée */}
        <path
          d="M93 50C86 47.4 79 43.8 72.5 35L44 50Z"
          fill="#d5344c"
          stroke="#e9e4d8"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        {/* Rivet du pivot */}
        <circle cx="84" cy="50" r="2.7" fill="#dfe3e8" stroke="#9aa3ad" strokeWidth="0.6" />
      </g>
    </svg>
  );
}
