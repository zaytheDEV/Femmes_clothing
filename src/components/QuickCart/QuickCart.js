import React, { useEffect } from "react";
import styles from "./quickCart.module.css";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import QuickCartItem from "./QuickCartItem";
import { Link } from "react-router-dom";
import { removeFromCart, getSubtotal } from "../../features/userCartSlice";
import ReactDom from "react-dom";
import { Fragment } from "react";

function QuickCart() {
  const subTotal = useSelector((state) => state.cart.total);
  const cart = useSelector((state) => state.cart.cart);
  const quickCartState = useSelector((state) => state.quickCart.active);
  const dispatch = useDispatch();

  //Remove from Cart
  const removeHandler = (itemId) => {
    dispatch(removeFromCart(itemId));
  };
  //useEffect
  useEffect(() => {
    dispatch(getSubtotal());
  }, [cart, dispatch]);

  const portalElement = document.getElementById("overlays");
  return (
    <Fragment>
      {ReactDom.createPortal(
        <div
          className={`${styles.quickCart__main} ${
            !quickCartState ? styles.close__cart : styles.open__cart
          } pageSection`}
        >
          <section className={styles.left__quickCart}>
            <span className={styles.cart__title}>your bag</span>
            <div className={styles.cart__items}>
              {cart?.length > 0 &&
                cart?.map((item) => (
                  <QuickCartItem
                    key={item.id}
                    id={item.id}
                    iconImage={item.iconImage}
                    removeFromCart={removeHandler}
                  />
                ))}
            </div>
            {cart?.length === 0 && <span>(your bag is empty)</span>}
          </section>
          <section className={styles.right__quickCart}>
            <div className={styles.subtotal}>
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
            <Link to="/cart" style={{ color: "#000" }}>
              <button>checkout</button>
            </Link>
          </section>
        </div>,
        portalElement
      )}
    </Fragment>
  );
}

export default QuickCart;
