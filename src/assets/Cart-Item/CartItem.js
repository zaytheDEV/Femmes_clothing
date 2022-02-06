import React, { useState, useEffect, useRef } from "react";
import styles from "./cartItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { addToFav, removeFav } from "../../features/userFavoritesSlice";

function CartItem(props) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const navigate = useNavigate();
  const removeItemHandler = () => {
    props.removeItem(props.id);
  };

  //Quantity increase handler
  const incrementQuant = (e) => {
    props.incrementItem(e.target.value, props.id);
  };
  //add item to favorites
  const newItem = {
    id: props.id,
    title: props.title,
    color: props.color,
    price: props.price,
    iconImage: props.iconImage,
    images: props.prodImages,
    type: props.type,
    numberOfColors: props.numberOfColors,
    colorPhotos: props.colorPhotos,
    lrgImg: props.lrgImg,
    qty: props.qty,
    url: props.productLink,
  };
  //add to favorites handler
  const [itemFavorited, setItemFavorited] = useState(false);
  const heartSVG = useRef();
  const favoriteHandler = () => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }
    setItemFavorited(!itemFavorited);
    if (auth.currentUser) {
      if (itemFavorited) {
        props.favoriteHandler("remove", props.id);
        heartSVG.current.setAttribute("fill", "none");
        heartSVG.current.setAttribute("stroke-width", "1");
      } else if (!itemFavorited) {
        props.favoriteHandler("add", props.id, newItem);
      }
    }
  };
  useEffect(() => {
    favorites.forEach((item) => {
      if (item.id === props.id) {
        setItemFavorited(true);
        heartSVG.current.setAttribute("fill", "#FF6F6F");
        heartSVG.current.setAttribute("stroke-width", "0");
      }
    });
  }, [favorites, props.id]);
  //color photo handler
  const userSelectedColor = props.color;
  const colorOptions = props.colorPhotos;
  const [imageColor, setImageColor] = useState(colorOptions[0].photo);
  useEffect(() => {
    for (const color of colorOptions) {
      if (color.color === userSelectedColor) {
        setImageColor(color.photo);
      }
    }
  }, [colorOptions, userSelectedColor]);

  return (
    <div className={styles.cartItem__main}>
      <div className={styles.item__info__container}>
        <div
          onClick={() => props.viewProduct(props.productLink, props.id)}
          className={styles.item__picture}
        >
          <img
            src={require(`../Images/${imageColor}.jpeg`).default}
            alt="color-opt"
          />
        </div>
        <div className={styles.item__info__content}>
          <div className={styles.product__info}>
            <span className={styles.product__title}>{props.title}</span>
            <span className={styles.product__subInfo}>{props.type}</span>
            <span className={styles.product__subInfo}>{props.color}</span>
          </div>
          <div className={styles.item__adjustments}>
            <div>
              <span>Size: </span>
              <select name="size">
                <option value="small">S</option>
                <option value="medium">M</option>
                <option value="large">L</option>
                <option value="Xlarge">XL</option>
              </select>
            </div>
            <div>
              <span>Qty: </span>
              <select
                name="quantity"
                defaultValue={"DEFAULT"}
                onChange={incrementQuant}
              >
                <option value="DEFAULT" disabled>
                  {props.qty}
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.item__price__container}>
        <span className={styles.item__price}>${props.price}</span>
        <div className={styles.item__actions}>
          <div onClick={favoriteHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 17.558 15.551"
            >
              <path
                ref={heartSVG}
                id="Icon_awesome-heart"
                data-name="Icon awesome-heart"
                d="M14.5,3.208a4.288,4.288,0,0,0-5.852.426l-.618.637L7.41,3.635a4.288,4.288,0,0,0-5.852-.426,4.5,4.5,0,0,0-.31,6.52l6.068,6.266a.983.983,0,0,0,1.421,0L14.8,9.728a4.5,4.5,0,0,0-.307-6.52Z"
                transform="translate(0.752 -1.496)"
                fill="none"
                stroke="#000"
                stroke-width="1.5"
              />
            </svg>
          </div>
          <div onClick={removeItemHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 15.753 18.004"
            >
              <path
                id="Icon_awesome-trash-alt"
                data-name="Icon awesome-trash-alt"
                d="M1.125,16.316A1.688,1.688,0,0,0,2.813,18H12.94a1.688,1.688,0,0,0,1.688-1.688V4.5H1.125Zm9.565-9a.563.563,0,0,1,1.125,0v7.877a.563.563,0,1,1-1.125,0Zm-3.376,0a.563.563,0,0,1,1.125,0v7.877a.563.563,0,1,1-1.125,0Zm-3.376,0a.563.563,0,0,1,1.125,0v7.877a.563.563,0,1,1-1.125,0ZM15.191,1.125h-4.22L10.641.468A.844.844,0,0,0,9.885,0H5.865a.834.834,0,0,0-.753.468l-.331.658H.563A.563.563,0,0,0,0,1.688V2.813a.563.563,0,0,0,.563.563H15.191a.563.563,0,0,0,.563-.563V1.688A.563.563,0,0,0,15.191,1.125Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
