/**
 * Logo de reserva mientras no se sube el oficial en Ajustes globales:
 * símbolo rojo con franjas + "metalquimia" en el color del texto.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 176 26" className={className} role="img" aria-label="Metalquimia">
      <g fill="#ff2f00">
        <path d="M11 1 L21 21 H1 Z" />
      </g>
      <g fill="#fff">
        <rect x="4" y="9" width="14" height="1.6" />
        <rect x="3" y="13" width="16" height="1.6" />
        <rect x="2" y="17" width="18" height="1.6" />
      </g>
      <text x="28" y="19" fill="currentColor" fontFamily="var(--font-display)" fontWeight="600" fontSize="19" letterSpacing="-0.4">
        metalquimia
      </text>
    </svg>
  );
}
