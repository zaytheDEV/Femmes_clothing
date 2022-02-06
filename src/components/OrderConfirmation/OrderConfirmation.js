import React from "react";
import styles from "./orderConfirmation.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";

function ConfirmationPage() {
  const navigate = useNavigate();
  const order = useSelector((state) => state.cart.order.products);
  const orderTotal = useSelector((state) => state.cart.order.orderTotal);
  const { userName, lastName, email} = useSelector((state) => state.user);
  let newOrder = order[0];
  return (
    <div className={`${styles.confirmationPage__main} pageSection`}>
      <div className={styles.logo__container}>
        <img
          src={process.env.PUBLIC_URL + "/images/Femmes (logo) - 2.png"}
          alt="logo"
        />
      </div>
      <span className={styles.comp__name}>femmes.</span>
      <div className={styles.order__received}>
        <span>
          Thank you, <b>{userName}</b>
        </span>
        <span>Your order has been received.</span>
      </div>
      <button onClick={() => navigate("/shop")} className={styles.shop__button}>
        shop
      </button>
      <div className={styles.order__contianer}>
        <span className={styles.order__number}>ORDER#: 10345923-00</span>
        <div className={styles.order__info}>
          <div className={styles.order__user__info}>
            <span>{userName} {lastName}</span>
            <span className={styles.user__email}>{email}</span>
            <span>7248 ScarletWood Rd</span>
            <span>San Jose, CA 91259</span>
            <span>United States</span>
          </div>
          <CurrencyFormat
            value={orderTotal}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
            renderText={(value) => (
              <div className={styles.order__amount}>
                <span className={styles.order__price}>{value}</span>
                <span>6186 VISA</span>
              </div>
            )}
          />
        </div>
      </div>
      <div className={styles.order__items__contianer}>
        <span>your order</span>
        <div className={styles.items__holder}>
          {newOrder?.map((item) => (
            <div className={styles.item} key={item.id}>
              <div
                className={item.lrgImg ? styles.img__lrg : styles.img__small}
              >
                <img
                  src={require(`../../assets/Images/${item.iconImage}`).default}
                  alt="product"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;
