import React from "react";
import styles from "./AppleEmoji.module.css";

/**
 * Renders Apple-style emoji as images via CDN.
 * Maps emoji characters to their unicode codepoints for Apple emoji PNGs.
 */

const emojiMap: Record<string, string> = {
  "🔥": "1f525",
  "👑": "1f451",
  "🛡️": "1f6e1-fe0f",
  "⏰": "23f0",
  "📈": "1f4c8",
  "✅": "2705",
  "❌": "274c",
  "📞": "1f4de",
  "👥": "1f465",
  "🔄": "1f504",
  "🧠": "1f9e0",
  "💼": "1f4bc",
  "🤖": "1f916",
  "🚀": "1f680",
  "📘": "1f4d8",
  "📚": "1f4da",
  "🏗️": "1f3d7-fe0f",
  "⚖️": "2696-fe0f",
  "😤": "1f624",
  "💸": "1f4b8",
  "💔": "1f494",
  "😞": "1f61e",
  "🇲🇦": "1f1f2-1f1e6",
};

interface AppleEmojiProps {
  emoji: string;
  size?: number;
  className?: string;
}

export default function AppleEmoji({ emoji, size = 24, className = "" }: AppleEmojiProps) {
  const code = emojiMap[emoji];

  if (!code) {
    // Fallback to native emoji if not in our map
    return <span className={`${styles.native} ${className}`} style={{ fontSize: size }}>{emoji}</span>;
  }

  return (
    <img
      src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple@15.1.2/img/apple/64/${code}.png`}
      alt={emoji}
      width={size}
      height={size}
      className={`${styles.emoji} ${className}`}
      loading="lazy"
      draggable={false}
    />
  );
}
