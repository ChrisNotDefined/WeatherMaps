import React, { FC, MouseEventHandler } from "react";
import styles from './text_button.module.css';

export interface TextButtonProps {
  onClick: MouseEventHandler
}

export const TextButton: FC<TextButtonProps> = ({onClick, children}) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <span>{children}</span>
    </div>
  );
};

export default TextButton;
