import React from "react";
import styles from "./favorites.module.css";
import PageTitle from "../../assets/PageTitle";
import Favorite from "../../assets/Product/Favorite";
import { useNavigate } from "react-router-dom";
import { alertUser } from "../../features/userAlertSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/userCartSlice";
import { removeFav } from "../../features/userFavoritesSlice";

function Favorites() {
  const { userLoggedIn } = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // add to cart handler
  const addToCartHandler = (item) => {
    dispatch(addToCart(item));
    dispatch(alertUser({ message: "added to bag", type: "success" }));
  };
  //remove favorite
  const removeFavorite = (itemID) => {
    dispatch(removeFav(itemID));
    dispatch(alertUser({ message: "removed from favorites", type: "remove" }));
  };
  //prodcut view handler
  const productViewHandler = (productURL, productId) => {
    navigate(`/product/${productURL}/${productId}`);
  };
  return (
    <div className={`${styles.favorites__main}`}>
      <div className="page__header pageSection">
        <PageTitle title="favorites" />
      </div>
      {!userLoggedIn && (
        <div className={styles.empty__favorites}>
          <>
            <span className={styles.favorites__title}>
              Please sign in to view your favorite items.
            </span>
            <div
              className={styles["favorites-button"]}
              onClick={() => navigate("/login")}
            >
              sign in
            </div>
          </>
        </div>
      )}
      {userLoggedIn && favorites.length === 0 && (
        <div className={styles.empty__favorites}>
          <span className={styles.noFavorites}>Save your favorite items </span>
          <div
            className={styles["favorites-button"]}
            onClick={() => navigate("/shop")}
          >
            shop
          </div>
        </div>
      )}
      {userLoggedIn && favorites.length > 0 && (
        <section className={`${styles.favorites__items__holder} pageSection`}>
          {favorites.map((item) => (
            <Favorite
              key={item.id}
              id={item.id}
              title={item.title}
              color={item.color}
              price={item.price}
              iconImage={item.iconImage}
              prodImages={item.images}
              type={item.type}
              colors={item.colors}
              colorPhotos={item.colorPhotos}
              newArrival={item.newArrival}
              lrgImg={item.lrgImg}
              qty={item.qty}
              productLink={item.url}
              viewProduct={productViewHandler}
              addToCart={addToCartHandler}
              removeFavorite={removeFavorite}
            />
          ))}
        </section>
      )}
    </div>
  );
}

export default Favorites;
