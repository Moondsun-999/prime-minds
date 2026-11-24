import type { Rich } from "@/content/playbook";

interface RichTextProps {
  parts: Rich;
}

/** Renders a Rich array: plain text, bold runs and highlighter runs (.hl, animated by the page). */
export function RichText({ parts }: RichTextProps) {
  return (
    <>
      {parts.map((part, i) => {
        if (typeof part === "string") return <span key={i}>{part}</span>;
        if ("b" in part) {
          // Figures like $1.6M must stay left-to-right inside Arabic text.
          const ltr = /^[$\d]/.test(part.b);
          return (
            <b key={i} className={ltr ? "n" : undefined}>
              {part.b}
            </b>
          );
        }
        return (
          <mark key={i} className="hl" style={{ color: "inherit", backgroundColor: "transparent" }}>
            {part.hl}
          </mark>
        );
      })}
    </>
  );
}
