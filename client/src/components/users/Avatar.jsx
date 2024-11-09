import React from "react";
import styles from "./Avatar.module.css";

export function Avatar({ name, otherStyles }) {
  return (
    <div className={`${styles.avatar} ${otherStyles}`} data-tooltip={name}>
      <img
        src={`https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`}
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
        alt={name}
      />
    </div>
  );
}