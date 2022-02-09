import React, { useCallback, useEffect, useState } from "react";
import styles from "./intro.module.css";
import { motion, useAnimation } from "framer-motion";

function Intro() {
  const transition = { ease: [0.19, 1, 0.22, 1] };
  const animateTitle = useAnimation();
  const introBg = useAnimation();
  const [introActive, setIntroActive] = useState(true);
  const variants = {
    hidden: { y: 100, skew: "10deg, 10deg", transition: transition },
    visible: { y: 0, skew: 0, transition: { duration: 2, ...transition } },
    revealSite: {
      y: "100%",
      transition: { duration: 2.5, ...transition },
      transitionEnd: { display: "none" },
    },
  };
  const introSequence = useCallback(async () => {
    await animateTitle.start("visible");
     await introBg.start("revealSite");
    await setIntroActive(false);
  }, [animateTitle, introBg]);
  useEffect(() => {
    if (introActive) {
      introSequence();
    }
  }, [introActive, introSequence]);
  return (
    <motion.div
      className={styles.intro__main}
      animate={introBg}
      variants={variants}
    >
      <div className={styles.comp__logo}>
        <img
          src={process.env.PUBLIC_URL + "/images/Femmes (logo) - 2.png"}
          alt="logo"
        />
      </div>
      <div className={styles.title__holder}>
        <motion.span
          className={styles.comp__name}
          animate={animateTitle}
          variants={variants}
          initial="hidden"
        >
          femmes.
        </motion.span>
      </div>
    </motion.div>
  );
}

export default Intro;
