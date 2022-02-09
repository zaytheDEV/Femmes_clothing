import React from "react";
import PageTitle from "../../assets/PageTitle";
import Product from "../../assets/Product/Product";
import styles from "./shop.module.css";
import { products } from "../../assets/Iventory/Products";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementItem } from "../../features/userCartSlice";
import { addToFav, removeFav } from "../../features/userFavoritesSlice";
import QuickCart from "../QuickCart/QuickCart";
import { useNavigate } from "react-router-dom";
import { alertUser } from "../../features/userAlertSlice";
import { activateCart } from "../../features/quickCartSlice";

function ShopMen(props) {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //add to cart handler
  const addToCartHandler = (product) => {
    for (const item of cart) {
      if (item.id === product.id) {
        dispatch(incrementItem(product.id));
        return;
      }
    }
    dispatch(addToCart(product));
    dispatch(alertUser({ message: "added to bag", type: "success" }));
  };
  //toggle Quick Cart handler
  const toggleQuickCart = () => {
    dispatch(activateCart());
  };
  //add to favorites handler
  const addToFavoritesHandler = (item) => {
    dispatch(addToFav(item));
    dispatch(alertUser({ message: "added to favorites", type: "success" }));
  };
  //remove from favorites
  const removeFromFavoritesHandler = (favID) => {
    dispatch(removeFav(favID));
    dispatch(alertUser({ message: "removed from favorites", type: "remove" }));
  };

  //filtered products

  let menProducts = products.filter((item) => item.gender === "m");

  //prodcut view handler
  const productViewHandler = (productURL, productId) => {
    navigate(`/product/${productURL}/${productId}`);
  };
  return (
    <div className={`${styles.shop__main} `}>
      <QuickCart />
      <div className={styles.sort__nav__main}>
        <div className={`${styles.navSort__container} pageSection`}>
          <div className={styles.sort__options__holder}>
            <PageTitle title="Shop Men" />
            <ul>
              <li>
                sort by
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 15.189 8.684"
                  >
                    <path
                      id="Icon_ionic-ios-arrow-down"
                      data-name="Icon ionic-ios-arrow-down"
                      d="M13.785,17.313l5.743-5.748a1.081,1.081,0,0,1,1.533,0,1.1,1.1,0,0,1,0,1.538l-6.507,6.512a1.083,1.083,0,0,1-1.5.032L6.5,13.107A1.086,1.086,0,0,1,8.037,11.57Z"
                      transform="translate(-6.188 -11.246)"
                    />
                  </svg>
                </div>
              </li>
              <li>
                conscious
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 15.189 8.684"
                  >
                    <path
                      id="Icon_ionic-ios-arrow-down"
                      data-name="Icon ionic-ios-arrow-down"
                      d="M13.785,17.313l5.743-5.748a1.081,1.081,0,0,1,1.533,0,1.1,1.1,0,0,1,0,1.538l-6.507,6.512a1.083,1.083,0,0,1-1.5.032L6.5,13.107A1.086,1.086,0,0,1,8.037,11.57Z"
                      transform="translate(-6.188 -11.246)"
                    />
                  </svg>
                </div>
              </li>
              <li>
                size
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 15.189 8.684"
                  >
                    <path
                      id="Icon_ionic-ios-arrow-down"
                      data-name="Icon ionic-ios-arrow-down"
                      d="M13.785,17.313l5.743-5.748a1.081,1.081,0,0,1,1.533,0,1.1,1.1,0,0,1,0,1.538l-6.507,6.512a1.083,1.083,0,0,1-1.5.032L6.5,13.107A1.086,1.086,0,0,1,8.037,11.57Z"
                      transform="translate(-6.188 -11.246)"
                    />
                  </svg>
                </div>
              </li>
              <li>
                color
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 15.189 8.684"
                  >
                    <path
                      id="Icon_ionic-ios-arrow-down"
                      data-name="Icon ionic-ios-arrow-down"
                      d="M13.785,17.313l5.743-5.748a1.081,1.081,0,0,1,1.533,0,1.1,1.1,0,0,1,0,1.538l-6.507,6.512a1.083,1.083,0,0,1-1.5.032L6.5,13.107A1.086,1.086,0,0,1,8.037,11.57Z"
                      transform="translate(-6.188 -11.246)"
                    />
                  </svg>
                </div>
              </li>
              <li>
                pattern
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 15.189 8.684"
                  >
                    <path
                      id="Icon_ionic-ios-arrow-down"
                      data-name="Icon ionic-ios-arrow-down"
                      d="M13.785,17.313l5.743-5.748a1.081,1.081,0,0,1,1.533,0,1.1,1.1,0,0,1,0,1.538l-6.507,6.512a1.083,1.083,0,0,1-1.5.032L6.5,13.107A1.086,1.086,0,0,1,8.037,11.57Z"
                      transform="translate(-6.188 -11.246)"
                    />
                  </svg>
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.right__btns}>
            <div className={styles.all__filters}>
              <span>all filters</span>
              <div className={styles.__SVG}>
                <svg
                  id="filter-BTN"
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 30.956 19.866"
                >
                  <line
                    id="Line_9"
                    data-name="Line 9"
                    x2="30.956"
                    transform="translate(0 4.718)"
                    fill="none"
                    stroke="#1a1a1a"
                    stroke-width="2"
                  />
                  <line
                    id="Line_10"
                    data-name="Line 10"
                    x2="30.956"
                    transform="translate(0 14.735)"
                    fill="none"
                    stroke="#1a1a1a"
                    stroke-width="2"
                  />
                  <g
                    id="Ellipse_1"
                    data-name="Ellipse 1"
                    transform="translate(5.711)"
                    fill="#fff"
                    stroke="#1a1a1a"
                    stroke-width="2"
                  >
                    <circle cx="4.966" cy="4.966" r="4.966" stroke="none" />
                    <circle cx="4.966" cy="4.966" r="3.966" fill="none" />
                  </g>
                  <g
                    id="Ellipse_2"
                    data-name="Ellipse 2"
                    transform="translate(16.638 9.933)"
                    fill="#fff"
                    stroke="#1a1a1a"
                    stroke-width="2"
                  >
                    <circle cx="4.966" cy="4.966" r="4.966" stroke="none" />
                    <circle cx="4.966" cy="4.966" r="3.966" fill="none" />
                  </g>
                </svg>
              </div>
            </div>
            <div
              onClick={toggleQuickCart}
              className={styles.quickBag__container}
            >
              <span>quick bag</span>
              <div className={styles.__SVG}>
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
          </div>
        </div>
      </div>
      <div className={`${styles.shop__content__main} pageSection`}>
        <div className={styles.products__main}>
          {menProducts.map((product) => (
            <Product
              className={styles.item}
              key={product.id}
              id={product.id}
              title={product.title}
              color={product.color}
              price={product.price}
              iconImage={product.iconImage}
              images={product.images}
              type={product.type}
              colors={product.colors}
              colorPhotos={product.colorPhotos}
              newArrival={product.newArrival}
              lrgImg={product.lrgImg}
              qty={product.qty}
              url={product.url}
              addToCart={addToCartHandler}
              addToFavorite={addToFavoritesHandler}
              removeFromFavorites={removeFromFavoritesHandler}
              viewProduct={productViewHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShopMen;
