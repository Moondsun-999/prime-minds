import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "default" | "lg" | "xl";
  href?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "default",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    "btn",
    `btn--${variant}`,
    size !== "default" ? `btn--${size}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
