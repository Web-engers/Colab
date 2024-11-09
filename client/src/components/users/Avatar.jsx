import React from "react";
import styles from "./Avatar.module.css";  // Ensure correct import of the CSS module

export function Avatar({ name, avatarIndex, otherStyles }) {
  return (
    <div className={`${styles.avatar} ${otherStyles}`} title={name}>
      <img
        src={`https://liveblocks.io/avatars/avatar-${avatarIndex}.png`}
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
        alt={name}
      />
    </div>
  );
}

export default Avatar;