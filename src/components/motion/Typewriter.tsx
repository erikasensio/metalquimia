/**
 * Parte un texto en letras (spans) para que <Animations> lo escriba como una máquina de escribir
 * dentro de un [data-typewriter-group]. Los lectores de pantalla leen el texto entero; sin JavaScript se pinta igual.
 */
export function Typewriter({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden data-typewriter>
        {Array.from(text).map((char, i) => (
          <span key={i} data-char>
            {char}
          </span>
        ))}
      </span>
    </>
  );
}
