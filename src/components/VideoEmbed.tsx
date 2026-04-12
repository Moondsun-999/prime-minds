import React from "react";
import styles from "./VideoEmbed.module.css";

interface VideoEmbedProps {
  videoId: string;
  title?: string;
}

export default function VideoEmbed({
  videoId,
  title = "Prime Minds Video",
}: VideoEmbedProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={styles.iframe}
          loading="lazy"
        />
      </div>
      <div className={styles.glow} />
    </div>
  );
}
