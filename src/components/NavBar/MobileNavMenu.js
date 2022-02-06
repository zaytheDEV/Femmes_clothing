import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./mobileNavMenu.module.css";
import { auth, db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";
import { ref, update } from "firebase/database";

function MobileNavMenu(props) {
  const navState = props.navState;
  const navMenu = useRef();
  const { userName } = useSelector((state) => state.user);
  const { userId } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart.cart);
  const favorites = useSelector((state) => state.favorites.favorites);
  const userRef = ref(db, "users/" + userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //log in/out user
  const userActionHandler = () => {
    if (auth.currentUser) {
      update(userRef, {
        cart,
        favorites,
      })
        .then(() => {
          auth
            .signOut()
            .then(() => {
              dispatch(logout());
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => console.log(error));
    } else if (auth.currentUser === null) {
      navigate('/login')
      closeNav();
    }
  };

  //close nav menu handler
  const [openNav, setOpenNav] = useState(false);
  const closeNav = () => {
    props.navMenuHandler("close");
  };

  useEffect(() => {
    if (navState === false) {
      setOpenNav(false);
      const timer = setTimeout(() => {
        navMenu.current.style.display = "none";
        clearTimeout(timer);
      }, 900);
      return;
    } else if (navState === true) {
      navMenu.current.style.display = "flex";
      const timer = setTimeout(() => {
        setOpenNav(true);
        clearTimeout(timer);
      }, 50);
    }
  }, [navState]);

  return (
    <div ref={navMenu} className={styles.navMenu__main}>
      <div
        className={`${styles.menu__holder} ${
          openNav ? styles.openMenu : styles.hideMenu
        }`}
      >
        <div onClick={closeNav} className={styles.close__menu}>
          <span>x</span>
        </div>
        <div className={styles.user__account}>
          <div className={styles.left__content}>
            <div className={styles.prof__SVG}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 19 19"
              >
                <path
                  id="noun_avatar_2102861_2_"
                  data-name="noun_avatar_2102861 (2)"
                  d="M23.144,19.823l-4.2-1.723a.594.594,0,0,1-.375-.548V16.57a.557.557,0,0,1,.119-.349,8.265,8.265,0,0,0,1.721-5.03C20.41,8.086,18.437,6,15.5,6s-4.91,2.086-4.91,5.192a8.266,8.266,0,0,0,1.721,5.03.557.557,0,0,1,.119.348v.981a.594.594,0,0,1-.375.548l-4.2,1.723A2.97,2.97,0,0,0,6,22.575v1.634A.792.792,0,0,0,6.792,25H24.208A.792.792,0,0,0,25,24.208V22.575A2.97,2.97,0,0,0,23.144,19.823Zm.273,3.594H7.583v-.842a1.392,1.392,0,0,1,.874-1.287l4.2-1.723a2.172,2.172,0,0,0,1.357-2.013V16.57a2.145,2.145,0,0,0-.468-1.34,6.729,6.729,0,0,1-1.372-4.038c0-2.66,1.718-3.608,3.327-3.608s3.327.948,3.327,3.608a6.729,6.729,0,0,1-1.372,4.038,2.146,2.146,0,0,0-.468,1.34v.981a2.172,2.172,0,0,0,1.357,2.013l4.2,1.723a1.392,1.392,0,0,1,.874,1.287Z"
                  transform="translate(-6 -6)"
                />
              </svg>
            </div>
            <div>
              {!auth.currentUser && (
                <span>
                  <b>Hello,</b> there
                </span>
              )}
              {auth.currentUser && (
                <span>
                  <b>Hello,</b>
                  {userName}
                </span>
              )}
            </div>
          </div>
          <div onClick={userActionHandler} className={styles.user__actions}>
            {!auth.currentUser && <span>sign in</span>}
            {auth.currentUser && <span>logout</span>}
          </div>
        </div>
        <div className={styles.menu__content}>
          <Link
            onClick={closeNav}
            to="/shop"
            style={{ color: "#000", textDecoration: "none" }}
          >
            <span>new release</span>
          </Link>
          <Link
            onClick={closeNav}
            to="/shop-Women"
            style={{ color: "#000", textDecoration: "none" }}
          >
            <span>women</span>
          </Link>
          <Link
            onClick={closeNav}
            to="/shop-Men"
            style={{ color: "#000", textDecoration: "none" }}
          >
            <span>men</span>
          </Link>
          <Link
            onClick={closeNav}
            to="/shop"
            style={{ color: "#000", textDecoration: "none" }}
          >
            <span>sales</span>
          </Link>
        </div>
        <span className={styles.companyName}>femmes clothing</span>
      </div>
      <div
        onClick={closeNav}
        className={`${styles.backdrop} ${
          openNav ? styles.showBackdrop : styles.hideBackdrop
        }`}
      ></div>
    </div>
  );
}

export default MobileNavMenu;
