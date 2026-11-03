/** Renders `**bold**` segments. Brand names get their own emphasis; "Claude Code" uses Claude's clay colour. */
export default function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <b key={i} className={part === "Claude Code" ? "cc" : "em"}>
            {part}
          </b>
        ) : (
          part
        ),
      )}
    </>
  );
}
