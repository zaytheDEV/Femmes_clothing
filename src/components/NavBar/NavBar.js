import React, { useState } from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase";
import { logout } from "../../features/userSlice";
import ReactDom from "react-dom";
import { Fragment } from "react";
import MobileNavMenu from "./MobileNavMenu";

const NavBar = () => {
  const navigate = useNavigate();
  const { userLoggedIn, userName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchBarWidth, setSearchBarWidth] = useState("100px");
  const cart = useSelector((state) => state.cart.cart);
  const portalElement = document.getElementById("overlays");

  const searchAni = (action) => {
    if (action === "focus") {
      setSearchBarWidth("165px");
    } else setSearchBarWidth("100px");
  };
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Mobile Nav Bar Animation
  const [navMenuOpen, setnavMenuOpen] = useState(false);
  const mobileNavHandler = (action) => {
    if (action === "close") {
      setnavMenuOpen(false);
    } else if (action === "open") {
      setnavMenuOpen(true);
    }
  };
  return (
    <div className={`pageSection ${styles.nav__main}`}>
      <Fragment>
        {ReactDom.createPortal(
          <MobileNavMenu
            navState={navMenuOpen}
            navMenuHandler={mobileNavHandler}
          />,
          portalElement
        )}
      </Fragment>
      <div className={styles.nav__left__content}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className={styles.logo__holder}>
            <div className={styles.nav__logo}>
              <img
                src={process.env.PUBLIC_URL + "/images/Femmes (logo) - 2.png"}
                alt="logo"
              />
            </div>
          </div>
        </Link>
        <div className={styles.nav__search}>
          <div className={styles.search__icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 20.884 20.889"
            >
              <path
                id="Icon_ionic-ios-search"
                data-name="Icon ionic-ios-search"
                d="M25.139,23.87l-5.808-5.863a8.277,8.277,0,1,0-1.256,1.273l5.77,5.825a.894.894,0,0,0,1.262.033A.9.9,0,0,0,25.139,23.87ZM12.826,19.351a6.536,6.536,0,1,1,4.623-1.914A6.5,6.5,0,0,1,12.826,19.351Z"
                transform="translate(-4.5 -4.493)"
                fill="#939393"
              />
            </svg>
          </div>
          <form>
            <span className={styles.input__holder}>
              <input
                onFocus={() => searchAni("focus")}
                onBlur={() => searchAni("blur")}
                type="text"
                placeholder="Search"
                style={{ width: `${searchBarWidth}` }}
              />
            </span>
          </form>
        </div>
      </div>
      <div className={styles.nav__centerLinks__conatiner}>
        <ul>
          <Link to="/shop" style={{ color: "#000", textDecoration: "none" }}>
            <li>new releases</li>
          </Link>
          <Link
            to="/shop-Men"
            style={{ color: "#000", textDecoration: "none" }}
          >
            <li>men</li>
          </Link>
          <Link
            to="/shop-Women"
            style={{ color: "#000", textDecoration: "none" }}
          >
            <li>women</li>
          </Link>
          <Link to="/shop" style={{ color: "#000", textDecoration: "none" }}>
            <li>sale</li>
          </Link>
        </ul>
      </div>
      <div className={styles.navLinks__main}>
        <div className={styles.sub__cats}>
          <Link to="/cart">
            <div className={`${styles.nav__cart} ${styles.cat__link}`}>
              {cart?.length > 0 && (
                <div className={styles.cart__amount}>
                  <span>{cart.length}</span>
                </div>
              )}
              <div className={styles.link__SVG}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 28 31"
                >
                  <g
                    id="Icon_feather-shopping-bag"
                    data-name="Icon feather-shopping-bag"
                    transform="translate(0.5 0.5)"
                  >
                    <path
                      id="Path_15"
                      data-name="Path 15"
                      d="M9,3,4.5,9V30a3,3,0,0,0,3,3h21a3,3,0,0,0,3-3V9L27,3Z"
                      transform="translate(-4.5 -3)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                    <path
                      id="Path_16"
                      data-name="Path 16"
                      d="M4.5,9h27"
                      transform="translate(-4.5 -3)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    />
                    <path
                      id="Path_17"
                      data-name="Path 17"
                      d="M24,15a6,6,0,0,1-12,0"
                      transform="translate(-4.5 -3)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </Link>
          <Link to="/favorites">
            <div className={styles.cat__link}>
              <div className={styles.link__SVG}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 27.085 23.879"
                >
                  <path
                    id="Icon_feather-heart"
                    data-name="Icon feather-heart"
                    d="M25.474,6.432a6.6,6.6,0,0,0-9.337,0L14.865,7.7,13.593,6.432a6.6,6.6,0,1,0-9.336,9.337L5.529,17.04l9.337,9.337L24.2,17.04l1.272-1.272a6.6,6.6,0,0,0,0-9.337Z"
                    transform="translate(-1.323 -3.497)"
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>
        <div className={styles.nav__userInfo}>
          <div className={styles.nav__profile__container}>
            <div className={styles.nav__profileSVG}>
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
            {!userLoggedIn && (
              <span className={styles["signIn-title"]} onClick={() => navigate('/login')}>
                sign in
              </span>
            )}
            {userLoggedIn && (
              <div className={styles.userProfile}>
                <span>
                  Hello, <b style={{ fontFamily: "fontBold" }}>{userName}</b>
                </span>
                <span className={styles["signOut-title"]} onClick={signOut}>
                  sign out
                </span>
              </div>
            )}
          </div>
        </div>
        <div
          onClick={() => mobileNavHandler("open")}
          className={styles.navMenu__button}
        >
          <div>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
