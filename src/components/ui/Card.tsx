import React from "react";

interface CardProps {
  children: React.ReactNode;
  highlighted?: boolean;
  className?: string;
}

export default function Card({
  children,
  highlighted = false,
  className = "",
}: CardProps) {
  const classes = [
    "card",
    highlighted ? "card--highlighted" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
