import React from "react";
import styles from "./favorite.module.css";
import { useDispatch, useSelector } from "react-redux";
import { incrementItem } from "../../features/userCartSlice";

function Favorite(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const deleteFavorite = () => {
    props.removeFavorite(props.id);
  };
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
  //add to cart handler
  const addToCartHandler = (product) => {
    for (const item of cart) {
      if (item.id === product.id) {
        dispatch(incrementItem(product.id));
        return;
      }
    }
    props.addToCart(newItem);
  };
  return (
    <div className={styles.favorite__main}>
      <div
        onClick={() => props.viewProduct(props.productLink, props.id)}
        className={styles.favorite__image__container}
      >
        <div
          className={
            props.lrgImg ? styles.favorite__imageLg : styles.favorite__image
          }
        >
          <img
            src={require(`../Images/${props.iconImage}`).default}
            alt="favorite"
          />
        </div>
      </div>
      <div className={styles.favorite__item__info}>
        <div className={styles.left__item__info}>
          <span>{props.title}</span>
          <span>{props.type}</span>
          <div onClick={addToCartHandler} className={styles["cart-button"]}>
            add to bag
          </div>
        </div>
        <div className={styles.right__item__info}>
          <span className={styles["item-price"]}>${props.price}</span>
          <div onClick={deleteFavorite} className={styles["delete-item"]}>
            <div className={styles["delete-item__SVG"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 14.344 16.393"
              >
                <path
                  id="Icon_awesome-trash-alt"
                  data-name="Icon awesome-trash-alt"
                  d="M1.025,14.856a1.537,1.537,0,0,0,1.537,1.537h9.221a1.537,1.537,0,0,0,1.537-1.537V4.1H1.025Zm8.709-8.2a.512.512,0,0,1,1.025,0v7.172a.512.512,0,0,1-1.025,0Zm-3.074,0a.512.512,0,0,1,1.025,0v7.172a.512.512,0,0,1-1.025,0Zm-3.074,0a.512.512,0,0,1,1.025,0v7.172a.512.512,0,0,1-1.025,0ZM13.832,1.025H9.989l-.3-.6A.768.768,0,0,0,9,0H5.341a.759.759,0,0,0-.685.426l-.3.6H.512A.512.512,0,0,0,0,1.537V2.561a.512.512,0,0,0,.512.512H13.832a.512.512,0,0,0,.512-.512V1.537A.512.512,0,0,0,13.832,1.025Z"
                  fill="#fff"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorite;
