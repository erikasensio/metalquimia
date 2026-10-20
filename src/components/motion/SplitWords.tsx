/** Parte un texto en palabras (spans) para que <Animations> las revele una a una. Se pinta igual sin JavaScript. */
export function SplitWords({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\s+)/);
  return (
    <span className={className}>
      {parts.map((part, i) =>
        /^\s+$/.test(part) ? (
          part
        ) : part ? (
          <span key={i} className="inline-block" data-word>
            {part}
          </span>
        ) : null,
      )}
    </span>
  );
}
