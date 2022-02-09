import React, { useRef, useEffect, useState } from "react";
import PageTitle from "../../assets/PageTitle";
import styles from "./cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../../assets/Cart-Item/CartItem";
import { alertUser } from "../../features/userAlertSlice";

import {
  removeFromCart,
  getSubtotal,
  promoCodeTotal,
  updateQuantity,
} from "../../features/userCartSlice";
import { addToFav, removeFav } from "../../features/userFavoritesSlice";
import CurrencyFormat from "react-currency-format";
function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLoggedIn } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart.cart);
  const taxAmount = useSelector((state) => state.cart.taxAmount);
  const subTotal = useSelector((state) => state.cart.total);
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  //Promo code fucntion
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoValid, setPromoValid] = useState(false);
  const [codeAdded, setCodeAdded] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [invalidCode, setInvalidCode] = useState(false);
  const [addItems, setAddItems] = useState(false);
  const promoRef = useRef();
  const promoCodeHandler = () => {
    let promoValue = promoRef.current.value.toLowerCase();
    if (promoValue.trim() === "femmes20" && !promoValid && cart.length > 0) {
      dispatch(promoCodeTotal());
      setPromoValid(true);
      setPromoApplied(true);
      setInvalidCode(false);
      return;
    } else if (promoValid) {
      setCodeAdded(true);
      setPromoApplied(false);
      return;
    } else if (cart.length === 0 && promoValue.trim() === "femmes20") {
      setAddItems(true);
      return;
    }
    setInvalidCode(true);
  };

  //remove from cart Handler
  const removeItemHandler = (itemId) => {
    dispatch(removeFromCart(itemId));
    dispatch(alertUser({ message: "removed from bag", type: "remove" }));
  };

  //Increase quantity handler
  const increaseQuantity = (incrementValue, prodId) => {
    dispatch(updateQuantity({ quantity: incrementValue, productId: prodId }));
  };

  //add to favorites handler
  const favoriteHandler = (type, itemID, item) => {
    if (type === "add") {
      dispatch(addToFav(item));
      dispatch(alertUser({ message: "added to favorites", type: "success" }));
    } else if (type === "remove") {
      dispatch(removeFav(itemID));
      dispatch(
        alertUser({ message: "removed from favorites", type: "remove" })
      );
    }
  };

  //product view handler
  const productViewHandler = (productURL, productId) => {
    navigate(`/product/${productURL}/${productId}`);
  };

  //checkoutBTN handler
  const continueToCheckout = () => {
    if (cart.length === 0) {
      return;
    }
    navigate("/checkout");
  };

  useEffect(() => {
    dispatch(getSubtotal());
  }, [cart, dispatch]);

  return (
    <div className={`${styles.cart__main} pageSection`}>
      <div className="page__header">
        <PageTitle title="Cart" />
      </div>
      <div className={styles.col__main}>
        <div className={styles.left__col}>
          {!userLoggedIn && (
            <div className={styles.freeShipping__alert__container}>
              <span className={styles.alert__title}>
                Free Shipping for members
              </span>
              <div className={styles.alert__message}>
                <span>become a member for fast and free shipping.</span>
                <Link to="/login" style={{ color: "#000" }}>
                  <span>Join or Sign-in</span>
                </Link>
              </div>
            </div>
          )}
          <div className={styles.savings__alert__container}>
            <span>Femmes Deals: save 20% off your purchase</span>
            <span>
              use code <b>FEMMES20</b> at checkout to save 20% on your purchase.{" "}
            </span>
          </div>
          <div className={styles.cart__items__container}>
            <span className={styles.cart__title}>Your Bag</span>
            {cart?.length === 0 && <span>There are no items in your bag.</span>}
            <div className={styles.cartItems__holder}>
              {cart?.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  color={item.color}
                  price={item.price}
                  iconImage={item.iconImage}
                  prodImages={item.images}
                  type={item.type}
                  numberOfColors={item.colors}
                  colorPhotos={item.colorPhotos}
                  newArrival={item.newArrival}
                  lrgImg={item.lrgImg}
                  qty={item.qty}
                  productLink={item.url}
                  incrementItem={increaseQuantity}
                  removeItem={removeItemHandler}
                  favoriteHandler={favoriteHandler}
                  viewProduct={productViewHandler}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.right__col}>
          <span className={styles.sub__title}>summary</span>
          <div
            className={`${styles.cart__promoCode} ${
              showPromoInput ? styles.active__promo : ""
            }`}
          >
            <div className={styles.promo__BTN__container}>
              <span
                onClick={() => setShowPromoInput(!showPromoInput)}
                className={styles.promo__code__BTN}
              >
                APPLY PROMO CODE
              </span>
            </div>
            <div className={`${styles.promo__form__container}`}>
              {codeAdded && (
                <span className={styles.code__applied}>
                  code already applied
                </span>
              )}
              {promoApplied && (
                <span className={styles.promoCode__correct}>code applied</span>
              )}
              {invalidCode && (
                <span className={styles.code__applied}>not a valid code</span>
              )}
              {addItems && (
                <span className={styles.code__applied}>please add items</span>
              )}
              <div className={styles.promoCode__actions}>
                <input ref={promoRef} type="text" />
                <div onClick={promoCodeHandler}>apply</div>
              </div>
            </div>
          </div>
          <div className={styles.amountType__holder}>
            <CurrencyFormat
              value={subTotal}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              decimalScale={2}
              renderText={(value) => (
                <>
                  <span>Subtotal</span>
                  <span>{value}</span>
                </>
              )}
            />
          </div>
          <div className={styles.amountType__holder}>
            <span>Shipping and Handling</span>
            <span>{userLoggedIn ? "Free" : "$14.99"}</span>
          </div>
          <div className={styles.amountType__holder}>
            <CurrencyFormat
              value={taxAmount}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              decimalScale={2}
              renderText={(value) => (
                <>
                  <span>Estimated Tax</span>
                  <span>{value}</span>
                </>
              )}
            />
          </div>
          <div className={styles.cart__total}>
            <CurrencyFormat
              value={cartTotal}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              decimalScale={2}
              renderText={(value) => (
                <>
                  <span>Total:</span>
                  <span>{value}</span>
                </>
              )}
            />
          </div>
          <button
            onClick={continueToCheckout}
            className={`${styles.checkoutBTN} ${
              cart?.length > 0 ? "" : styles.disableBTN
            }`}
          >
            checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
