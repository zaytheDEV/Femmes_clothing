import React, { useState, useRef, useEffect } from "react";
import styles from "./productView.module.css";
import { products } from "../../assets/Iventory/Products";
import QuickCart from "../QuickCart/QuickCart";
import { useParams } from "react-router-dom";
import {
  addToCart,
  incrementItem,
  updateItemColor,
} from "../../features/userCartSlice";
import { addToFav, removeFav } from "../../features/userFavoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { alertUser } from "../../features/userAlertSlice";
import { activateCart } from "../../features/quickCartSlice";

function ProductView(props) {
  const { id } = useParams();
  const cart = useSelector((state) => state.cart.cart);
  const favorites = useSelector((state) => state.favorites.favorites);
  const productInView = products.find((item) => item.id === id);
  const productPhotos = productInView.images;
  const colorPhotos = productInView.colorPhotos;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //toggle Quick Cart Handler
  const toggleQuickCart = () => {
    dispatch(activateCart());
  };
  //Item size checkbox animation
  const [checkboxOption, setCheckboxOption] = useState({
    smallCheckbox: false,
    mediumCheckbox: false,
    largeCheckbox: false,
    xLargeCheckbox: false,
  });
  const checkboxHandler = (action) => {
    if (action === "small") {
      setCheckboxOption({
        smallCheckbox: true,
        mediumCheckbox: false,
        largeCheckbox: false,
        xLargeCheckbox: false,
      });
    } else if (action === "med") {
      setCheckboxOption({
        smallCheckbox: false,
        mediumCheckbox: true,
        largeCheckbox: false,
        xLargeCheckbox: false,
      });
    } else if (action === "large") {
      setCheckboxOption({
        smallCheckbox: false,
        mediumCheckbox: false,
        largeCheckbox: true,
        xLargeCheckbox: false,
      });
    } else if (action === "xl") {
      setCheckboxOption({
        smallCheckbox: false,
        mediumCheckbox: false,
        largeCheckbox: false,
        xLargeCheckbox: true,
      });
    }
  };

  //user color option
  const [selectedColor, setSelectedColor] = useState(productInView.color);
  const colorHandler = (color) => {
    setSelectedColor(color);
  };
  useEffect(() => {
    dispatch(updateItemColor({ color: selectedColor, id: productInView.id }));
  }, [selectedColor, dispatch, productInView.id]);

  //new item
  const newItem = {
    id: productInView.id,
    title: productInView.title,
    color: selectedColor,
    price: productInView.price,
    iconImage: productInView.iconImage,
    images: productInView.images,
    type: productInView.type,
    colors: productInView.colors,
    colorPhotos: productInView.colorPhotos,
    lrgImg: productInView.lrgImg,
    qty: productInView.qty,
    url: productInView.url,
  };

  //add to cart handler
  const addToCartHandler = () => {
    for (const item of cart) {
      if (item.id === productInView.id) {
        dispatch(incrementItem(productInView.id));
        return;
      }
    }
    dispatch(addToCart(newItem));
    dispatch(alertUser({ message: "added to bag", type: "success" }));
  };

  //add to favorites handler
  const [itemFavorited, setItemFavorited] = useState(false);
  const heartSVG = useRef();

  const addToFavoriteHandler = () => {
    if (!auth.currentUser) {
      navigate("/login");
    } else if (auth.currentUser && !itemFavorited) {
      setItemFavorited(true);
      dispatch(addToFav(newItem));
      dispatch(alertUser({ message: "added to favorites", type: "success" }));
    } else if (auth.currentUser && itemFavorited) {
      setItemFavorited(false);
      dispatch(removeFav(productInView.id));
      dispatch(
        alertUser({ message: "removed from favorites", type: "remove" })
      );
    }
  };

  useEffect(() => {
    for (const item of favorites) {
      if (item.id === productInView.id) {
        setItemFavorited(true);
      }
    }
  }, [favorites, productInView.id]);

  useEffect(() => {
    if (itemFavorited) {
      heartSVG.current.setAttribute("fill", "#FF6F6F");
      heartSVG.current.setAttribute("stroke-width", "0");
    } else if (!itemFavorited) {
      heartSVG.current.setAttribute("fill", "none");
      heartSVG.current.setAttribute("stroke-width", "1");
    }
  }, [itemFavorited]);

  return (
    <div className={`${styles.productView__main} pageSection`}>
      <QuickCart />
      <div className={styles.upper__content}>
        <div className={styles.product__images__container}>
          {productPhotos.map((photo, index) => (
            <div key={index} className={styles.image__holder}>
              <img
                src={require(`../../assets/Images/${photo}.jpeg`).default}
                alt="item"
              />
            </div>
          ))}
        </div>
        <div className={styles.right__col}>
          <div className={styles.info__header}>
            <div className={styles.title__container}>
              <span className={styles.product__title}>
                {productInView.title}
              </span>
              <span>{productInView.type}</span>
            </div>
            <div onClick={toggleQuickCart} className={styles.quickBag}>
              <span>quick bag</span>
              <div className={styles.bag_SVG}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 29 32"
                >
                  <g
                    id="Icon_feather-shopping-bag"
                    data-name="Icon feather-shopping-bag"
                    transform="translate(-3.5 -2)"
                  >
                    <path
                      id="Path_215"
                      data-name="Path 215"
                      d="M9,3,4.5,9V30a3,3,0,0,0,3,3h21a3,3,0,0,0,3-3V9L27,3Z"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                    <path
                      id="Path_216"
                      data-name="Path 216"
                      d="M4.5,9h27"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                    <path
                      id="Path_217"
                      data-name="Path 217"
                      d="M24,15a6,6,0,0,1-12,0"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.second__row}>
            <span className={styles.price}>${productInView.price}</span>
            <div className={styles.item__color__container}>
              <span className={styles.item__color}>{selectedColor}</span>
              <div className={styles.colors__holder}>
                {colorPhotos.map((photo) => (
                  <div
                    onClick={() => colorHandler(photo.color)}
                    key={photo.id}
                    className={styles.colorType__box}
                  >
                    <img
                      src={
                        require(`../../assets/Images/${photo.photo}.jpeg`)
                          .default
                      }
                      alt="color"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.user__actions__row}>
            <div className={styles.size__selector__container}>
              <span>select size</span>
              <div className={styles.checkbox__holder}>
                <div
                  onClick={() => checkboxHandler("small")}
                  className={`${styles.size__checkbox} ${
                    checkboxOption.smallCheckbox ? styles.checkedbox : ""
                  }`}
                >
                  <span>s</span>
                </div>
                <div
                  onClick={() => checkboxHandler("med")}
                  className={`${styles.size__checkbox} ${
                    checkboxOption.mediumCheckbox ? styles.checkedbox : ""
                  }`}
                >
                  <span>m</span>
                </div>
                <div
                  onClick={() => checkboxHandler("large")}
                  className={`${styles.size__checkbox} ${
                    checkboxOption.largeCheckbox ? styles.checkedbox : ""
                  }`}
                >
                  <span>l</span>
                </div>
                <div
                  onClick={() => checkboxHandler("xl")}
                  className={`${styles.size__checkbox} ${
                    checkboxOption.xLargeCheckbox ? styles.checkedbox : ""
                  }`}
                >
                  <span>xl</span>
                  <label
                    htmlFor="size-xl"
                    className={styles.size__label}
                  ></label>
                  <input type="checkbox" name="favorite" id="size-xl" />
                </div>
              </div>
            </div>
            <div className={styles.btn__holder}>
              <button
                onClick={addToCartHandler}
                className={styles.addToCart__BTN}
              >
                add to bag
              </button>
              <button
                onClick={addToFavoriteHandler}
                className={styles.addToFav__BTN}
              >
                favorite
                <div className={styles.heart__SVG}>
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductView;
