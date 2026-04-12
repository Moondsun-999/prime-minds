"use client";

import React, { useState } from "react";
import styles from "./Accordion.module.css";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndices((prev) =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div
            key={index}
            className={`${styles.item} ${isOpen ? styles.open : ""}`}
          >
            <button
              className={styles.trigger}
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
            >
              <span className={styles.title}>{item.title}</span>
              <span className={styles.icon}>{isOpen ? "−" : "+"}</span>
            </button>
            <div className={styles.content}>
              <div className={styles.inner}>
                <p>{item.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
