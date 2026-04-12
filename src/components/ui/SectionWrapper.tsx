import React from "react";

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  size?: "default" | "lg";
  narrow?: boolean;
  wide?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  className = "",
  size = "default",
  narrow = false,
  wide = false,
}: SectionWrapperProps) {
  const sectionClass = [
    "section",
    size === "lg" ? "section--lg" : "",
    "bg-noise",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const containerClass = [
    "container",
    narrow ? "container--narrow" : "",
    wide ? "container--wide" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={sectionClass}>
      <div className={containerClass}>{children}</div>
    </section>
  );
}
