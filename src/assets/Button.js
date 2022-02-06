import React from "react";
import styles from "./button.module.css";

const Button = (props) => {
  return (
    <div className={styles.button} style={{ width: props.width }}>
      <div className={styles.title__holder}>
        <span className={styles.button__title1}>{props.title}</span>
        <span className={styles.button__title2}>{props.title2}</span>
      </div>
      {props.children}
    </div>
  );
};

export default Button;
