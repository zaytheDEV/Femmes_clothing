import React, { useEffect } from "react";
import styles from "./userAlerts.module.css";
import { motion, useAnimation } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "../../features/userAlertSlice";

function UserAlert() {
  const alertState = useSelector((state) => state.userAlert.active);
  const alertMessage = useSelector((state) => state.userAlert.alertMessage);
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
  }, [alertState]);
  return (
    <motion.div
      variants={variants}
      animate={toggleAlert}
      initial="hidden"
      className={styles.userAlert__main}
    >
      {alertMessage === "favADD" && (
        <div className={`${styles.message}  ${styles.success__message}`}>
          <div className={styles.message__SVG}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 20.395 14.726"
            >
              <path
                id="Icon_feather-check"
                data-name="Icon feather-check"
                d="M22.153,9l-11.1,11.1L6,15.057"
                transform="translate(-3.879 -6.879)"
                fill="none"
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
              />
            </svg>
          </div>
          <span>item added to favorites</span>
        </div>
      )}
      {alertMessage === "favRemove" && (
        <div className={styles.message}>
          <span>item removed from favorites</span>
        </div>
      )}
      {alertMessage === "cartADD" && (
        <div className={`${styles.message}  ${styles.success__message}`}>
          <div className={styles.message__SVG}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 20.395 14.726"
            >
              <path
                id="Icon_feather-check"
                data-name="Icon feather-check"
                d="M22.153,9l-11.1,11.1L6,15.057"
                transform="translate(-3.879 -6.879)"
                fill="none"
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
              />
            </svg>
          </div>
          <span>item added to cart</span>
        </div>
      )}
      {alertMessage === "cartRemove" && (
        <div className={styles.message}>
          <span>item removed from cart</span>
        </div>
      )}
    </motion.div>
  );
}

export default UserAlert;
