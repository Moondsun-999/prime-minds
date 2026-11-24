import React from "react";
import { bookingUrl } from "@/lib/links";
import styles from "./BookCallButton.module.css";

interface BookCallButtonProps {
  label?: string;
}

export default function BookCallButton({
  label = "Book a free Business Fit Call →",
}: BookCallButtonProps) {
  if (!bookingUrl) {
    return (
      <p className={styles.pending}>
        Booking opens soon. The link will be here.
      </p>
    );
  }

  return (
    <a
      href={bookingUrl}
      className="btn btn--primary btn--xl"
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}
