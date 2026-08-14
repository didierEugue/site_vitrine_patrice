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
 *     l'ombre, cerclée d'argent, avec son rivet.
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
      <circle cx="50" cy="50" r="43" fill="none" stroke={`url(#${ring})`} strokeWidth="10.5" />

      {/* Filet argent intérieur, au bord interne de l'anneau */}
      <circle cx="50" cy="50" r="36.8" fill="none" stroke="#dfe3e8" strokeWidth="1.3" />

      {/* Repères cardinaux : chevrons posés sur la bande bleue, pointe vers le centre. */}
      <g fill="#0f2a52" opacity="0.85">
        <path d="M44.4 7h11.2L50 19z" />
        <path d="M44.4 93h11.2L50 81z" />
        <path d="M7 44.4v11.2L19 50z" />
      </g>

      {/* Disque central et son croissant de lumière */}
      <circle cx="50" cy="50" r="30.6" fill="none" stroke="#dfe3e8" strokeWidth="1.6" />
      <circle cx="50" cy="50" r="29" fill={`url(#${disc})`} />
      <path
        d="M50 28a22 22 0 0 0-15.6 37.6"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.34"
      />

      {/*
        Aiguille. Deux pièges relevés en comparant au JPG :
        1. Elle ne traverse pas le diamètre : elle pivote au centre et occupe
           la seule moitié est.
        2. Son sens : la POINTE fine vise le centre (ouest), les deux barbes
           s'ouvrent vers l'est et débordent l'anneau, séparées par une
           échancrure en queue d'aronde où se loge le rivet. L'inverse donne
           un simple losange rouge à petite taille.
      */}
      <g
        style={
          animated
            ? { transformOrigin: "50px 50px", animation: "needle 14s ease-in-out infinite" }
            : undefined
        }
      >
        {/* Cerne argent : tracé une fois sous les deux facettes */}
        <path
          d="M50 50 97 31.5 85 50 98 70.5Z"
          fill="none"
          stroke="#e9e4d8"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        {/* Barbe basse, dans l'ombre */}
        <path d="M50 50 85 50 98 70.5Z" fill="#8d0c24" />
        {/* Barbe haute, éclairée */}
        <path d="M50 50 97 31.5 85 50Z" fill="#d5344c" />
        {/* Rivet du pivot, logé dans l'échancrure */}
        <circle cx="93" cy="50.5" r="2.6" fill="#eef1f4" stroke="#8d949c" strokeWidth="0.7" />
      </g>
    </svg>
  );
}
