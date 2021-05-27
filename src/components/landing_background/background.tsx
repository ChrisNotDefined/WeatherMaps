import React from 'react';
import styles from './background.module.css';

const Background: React.FC = ({ children }) => {
  return <div className={styles.background}>{children}</div>;
};

export default Background;