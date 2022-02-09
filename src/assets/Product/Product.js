import React, { useRef, useEffect } from "react";
import styles from "./product.module.css";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Product(props) {
  const heartSVG = useRef();
  const user = auth.currentUser;
  const favCheckbox = useRef();
  const favorites = useSelector((state) => state.favorites.favorites);
  const navigate = useNavigate();
  //Add to Cart Features
  const newItem = {
    id: props.id,
    title: props.title,
    color: props.color,
    price: props.price,
    iconImage: props.iconImage,
    images: props.images,
    type: props.type,
    colors: props.colors,
    colorPhotos: props.colorPhotos,
    lrgImg: props.lrgImg,
    qty: props.qty,
    url: props.url,
  };
  const cartHandler = () => {
    props.addToCart(newItem);
  };

  //favorites features
  function newFavorite() {
    props.addToFavorite(newItem);
  }
  const removeFavorite = (favId) => {
    props.removeFromFavorites(favId);
  };

  //user alert handler
  const favoriteHandler = (e) => {
    if (auth.currentUser) {
      if (e.target.checked) {
        heartSVG.current.setAttribute("fill", "#FF6F6F");
        heartSVG.current.setAttribute("stroke-width", "0");
        newFavorite();
      } else if (!e.target.checked) {
        removeFavorite(props.id);
        heartSVG.current.setAttribute("fill", "none");
        heartSVG.current.setAttribute("stroke-width", "1");
      }
      return;
    }
    navigate("/login");
  };

  //update heart SVG
  useEffect(() => {
    for (const item of favorites) {
      if (item.id === props.id) {
        favCheckbox.current.checked = true;
        heartSVG.current.setAttribute("fill", "#FF6F6F");
        heartSVG.current.setAttribute("stroke-width", "0");
      }
    }
  }, [favorites, props.id]);
  useEffect(() => {
    if (!user) {
      favCheckbox.current.checked = false;
      heartSVG.current.setAttribute("fill", "none");
      heartSVG.current.setAttribute("stroke-width", "1");
    }
  }, [user]);

  return (
    <div className={styles.product__main}>
      <div className={styles.product__background}>
        <div
          onClick={() => props.viewProduct(props.url, props.id)}
          className={styles.product__cover}
        ></div>
        <div className={`${styles.favorite__BTN} ${styles.product__BTNS}`}>
          <div className={styles.productBTN__SVG}>
            <label htmlFor={props.id} className={styles.heart_label}></label>
            <input
              ref={favCheckbox}
              onChange={favoriteHandler}
              type="checkbox"
              name="favorite"
              id={props.id}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 16.418 14.718"
            >
              <path
                ref={heartSVG}
                id="Icon_awesome-heart"
                data-name="Icon awesome-heart"
                d="M13.919,3.17A4.118,4.118,0,0,0,8.3,3.58l-.593.611L7.115,3.58A4.117,4.117,0,0,0,1.5,3.17a4.324,4.324,0,0,0-.3,6.26l5.826,6.016a.944.944,0,0,0,1.364,0L14.214,9.43a4.321,4.321,0,0,0-.3-6.26Z"
                transform="translate(0.502 -1.52)"
                fill="none"
                stroke="#000"
                stroke-width="1"
              />
            </svg>
          </div>
        </div>
        <div
          onClick={cartHandler}
          className={`${styles.cart__BTN} ${styles.product__BTNS}`}
        >
          <div className={styles.productBTN__SVG}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 19.224 21.248"
            >
              <g
                id="Icon_feather-shopping-bag"
                data-name="Icon feather-shopping-bag"
                transform="translate(-4 -2.5)"
              >
                <path
                  id="Path_199"
                  data-name="Path 199"
                  d="M7.537,3,4.5,7.05V21.224a2.025,2.025,0,0,0,2.025,2.025H20.7a2.025,2.025,0,0,0,2.025-2.025V7.05L19.686,3Z"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                />
                <path
                  id="Path_200"
                  data-name="Path 200"
                  d="M4.5,9H22.724"
                  transform="translate(0 -1.95)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                />
                <path
                  id="Path_201"
                  data-name="Path 201"
                  d="M20.1,15A4.05,4.05,0,0,1,12,15"
                  transform="translate(-2.438 -3.901)"
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
        <div
          className={
            props.lrgImg ? styles.product__imageLrg : styles.product__image
          }
        >
          <img
            src={require(`../Images/${props.iconImage}`).default}
            alt="product"
          />
        </div>
      </div>
      <div className={styles.product__info}>
        <div className={styles.product__left}>
          <span className={styles.product__title}>{props.title}</span>
          <span className={styles.product__type}>{props.type}</span>
          <span className={styles.product__type}>{props.colors} color(s)</span>
        </div>
        <div className={styles.product__right}>
          {props.newArrival && (
            <span className={styles.new__product}>new arrival</span>
          )}
          <span className={styles.product__price}>${props.price}</span>
        </div>
      </div>
    </div>
  );
}

export default Product;
