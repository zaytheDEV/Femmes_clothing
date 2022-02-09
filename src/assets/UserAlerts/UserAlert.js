import React, { useEffect } from "react";
import styles from "./userAlerts.module.css";
import { motion, useAnimation } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "../../features/userAlertSlice";

function UserAlert() {
  const alertState = useSelector((state) => state.userAlert.active);
  const alertMessage = useSelector((state) => state.userAlert.alertMessage);
  const alertType = useSelector((state) => state.userAlert.alertType);
  const transition = { ease: [0.43, 0.13, 0.23, 0.96] };
  const toggleAlert = useAnimation();
  const dispatch = useDispatch();

  const variants = {
    hidden: {
      y: 70,
      transition: { delay: 1, duration: 0.4, ...transition },
    },
    visible: {
      y: 0,
      transition: { duration: 0.4, ...transition },
    },
  };

  useEffect(() => {
    const alertUser = async () => {
      await toggleAlert.start("visible");
      await toggleAlert.start("hidden");
    };
    if (alertState) {
      alertUser().then(() => {
        dispatch(hideAlert());
      });
    }
  }, [alertState, dispatch, toggleAlert]);
  return (
    <motion.div
      variants={variants}
      animate={toggleAlert}
      initial="hidden"
      className={styles.userAlert__main}
    >
      {alertType === "error" && (
        <div className={`${styles.message}  ${styles.error__message}`}>
          <div className={styles.message__SVG}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 20.953 20.953"
            >
              <path
                id="Icon_ionic-md-close"
                data-name="Icon ionic-md-close"
                d="M28.477,9.619l-2.1-2.1L18,15.9,9.619,7.523l-2.1,2.1L15.9,18,7.523,26.381l2.1,2.1L18,20.1l8.381,8.381,2.1-2.1L20.1,18Z"
                transform="translate(-7.523 -7.523)"
                fill="#fff"
              />
            </svg>
          </div>
          <span>{alertMessage}</span>
        </div>
      )}
      {alertType === "success" && (
        <div className={`${styles.message}  ${styles.success__message}`}>
          <div className={styles.message__SVG}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 28.243 20.121"
            >
              <path
                id="Icon_feather-check"
                data-name="Icon feather-check"
                d="M30,9,13.5,25.5,6,18"
                transform="translate(-3.879 -6.879)"
                fill="none"
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
              />
            </svg>
          </div>
          <span>{alertMessage}</span>
        </div>
      )}
      {alertType === "remove" && (
        <div className={`${styles.message}`}>
          <span>{alertMessage}</span>
        </div>
      )}
    </motion.div>
  );
}

export default UserAlert;
