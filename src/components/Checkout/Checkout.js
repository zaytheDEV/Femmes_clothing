import React, { useEffect } from "react";
import PageTitle from "../../assets/PageTitle";
import styles from "./checkout.module.css";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
import { resetCart, setOrder } from "../../features/userCartSlice";


function Checkout() {
  const cart = useSelector((state) => state.cart.cart);
  const subTotal = useSelector((state) => state.cart.total);
  const cartTotal = useSelector((state) => state.cart.cartTotal);
  const taxAmount = useSelector((state) => state.cart.taxAmount);
  const { userName, lastName} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // place Order Handler
  const placeOrderHandler = () => {
    dispatch(setOrder({products: cart, orderTotal: cartTotal}));
    dispatch(resetCart())
    navigate('/order-confirmation');
  }
    useEffect(() => {
        if(cart?.length === 0){
            navigate('/cart')
        }
    },[cart?.length, navigate])


  return (
    <div className={`${styles.checkout__main} pageSection`}>
      <div className="page__header">
        <PageTitle title="confirm and checkout" />
      </div>
      <section className={styles.checkout__col__container}>
        <div className={styles.left__col}>
          {cart?.map((product) => (
            <div key={product.id} className={styles.item__holder}>
              <div className={styles.item__image__container}>
                <div
                  className={
                    product.lrgImg === true
                      ? styles.item__imageLRG
                      : styles.item__imageSmall
                  }
                >
                  <img
                    src={
                      require(`../../assets/Images/${product.iconImage}`)
                        .default
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className={styles.item__info}>
                <span>{product.title}</span>
                <span>${product.price}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.right__col}>
          <div className={styles.desktop__user__details}>
            <div className={`${styles.userInfo__container} ${styles.info__2}`}>
              <span className={styles.info__title}>Shipping Information</span>
              <span className={styles.user__SVG__info}>
                <span className={styles.info__icon}>
                  <div className={styles.info__SVG}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 21.189 21.189"
                    >
                      <path
                        id="Icon_ionic-md-person"
                        data-name="Icon ionic-md-person"
                        e
                        d="M14.345,14.345A4.922,4.922,0,1,0,9.422,9.422,4.937,4.937,0,0,0,14.345,14.345Zm0,2.461c-3.261,0-9.845,1.661-9.845,4.922v2.461H24.189V21.728C24.189,18.467,17.606,16.806,14.345,16.806Z"
                        transform="translate(-3.75 -3.75)"
                        fill="none"
                        stroke="#fec89a"
                        stroke-width="1.5"
                      />
                    </svg>
                  </div>
                </span>
                <span>{userName} {lastName}</span>
              </span>
              <span className={styles.user__SVG__info}>
                <span className={styles.info__icon}>
                  <div className={styles.info__SVG}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 15.999 25.28"
                    >
                      <path
                        id="Icon_metro-location"
                        data-name="Icon metro-location"
                        d="M15.854,1.928a7.5,7.5,0,0,0-7.5,7.5c0,7.5,7.5,16.5,7.5,16.5s7.5-9,7.5-16.5a7.5,7.5,0,0,0-7.5-7.5Zm0,12.093a4.594,4.594,0,1,1,4.594-4.594A4.594,4.594,0,0,1,15.854,14.021ZM12.948,9.428a2.906,2.906,0,1,1,2.906,2.906A2.906,2.906,0,0,1,12.948,9.428Z"
                        transform="translate(-7.855 -1.428)"
                        fill="none"
                        stroke="#fec89a"
                        stroke-width="1"
                      />
                    </svg>
                  </div>
                </span>
                <span>7248 Scarletwood Rd San Jose, CA 91259 </span>
              </span>
              <span className={styles.user__SVG__info}>
                <span className={styles.info__icon}>
                  <div className={styles.info__SVG}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 19.246 19.246"
                    >
                      <path
                        id="Icon_material-local-phone"
                        data-name="Icon material-local-phone"
                        d="M8.169,12.4a15.356,15.356,0,0,0,6.68,6.68l2.23-2.23a1.008,1.008,0,0,1,1.034-.243,11.563,11.563,0,0,0,3.619.578,1.017,1.017,0,0,1,1.014,1.014v3.538a1.017,1.017,0,0,1-1.014,1.014A17.231,17.231,0,0,1,4.5,5.514,1.017,1.017,0,0,1,5.514,4.5H9.062a1.017,1.017,0,0,1,1.014,1.014,11.516,11.516,0,0,0,.578,3.619,1.017,1.017,0,0,1-.253,1.034Z"
                        transform="translate(-4 -4)"
                        fill="none"
                        stroke="#fec89a"
                        stroke-width="1"
                      />
                    </svg>
                  </div>
                </span>
                <span>408-027-8153</span>
              </span>
              <div className={styles.edit__icon}>
                <div className={styles.edit__SVG}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 18.786 18.786"
                  >
                    <path
                      id="Icon_metro-pencil"
                      data-name="Icon metro-pencil"
                      d="M18.422,1.928a2.935,2.935,0,0,1,2.348,4.7L19.6,7.8l-4.11-4.11L16.66,2.515a2.922,2.922,0,0,1,1.761-.587ZM3.745,15.431,2.571,20.714,7.854,19.54,18.715,8.679l-4.11-4.11ZM15.7,8.6,7.48,16.817,6.468,15.805l8.219-8.219L15.7,8.6Z"
                      transform="translate(-2.571 -1.928)"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className={`${styles.userInfo__container} ${styles.info__3}`}>
              <span className={styles.info__title}>payment</span>
              <span className={styles.user__SVG__info}>
                <div className={styles.info__SVG}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 28.955 22.75"
                  >
                    <path
                      id="Icon_ionic-md-card"
                      data-name="Icon ionic-md-card"
                      d="M28.309,5.625H5.145A2.848,2.848,0,0,0,2.263,8.469L2.25,25.531a2.859,2.859,0,0,0,2.9,2.844H28.309a2.859,2.859,0,0,0,2.9-2.844V8.469A2.859,2.859,0,0,0,28.309,5.625Zm0,19.906H5.145V17H28.309Zm0-14.219H5.145V8.469H28.309Z"
                      transform="translate(-2.25 -5.625)"
                      fill="#fec89a"
                    />
                  </svg>
                </div>
                <div className={styles.card__info}>
                  <span>**** **** **** 6186</span>
                  <span>12/24</span>
                  <span>123</span>
                </div>
              </span>
              <div className={styles.shipping__address}>
                <span className={styles.check__holder}>
                  <div className={styles.check__SVG}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 13.408 10.196"
                    >
                      <path
                        id="Icon_ionic-md-checkmark"
                        data-name="Icon ionic-md-checkmark"
                        d="M8.77,15.762,5.617,12.6,4.5,13.669,8.77,17.93,17.908,8.8,16.791,7.734Z"
                        transform="translate(-4.5 -7.734)"
                      />
                    </svg>
                  </div>
                </span>
                <span>use shipping address</span>
              </div>
              <div className={styles.edit__icon}>
                <div className={styles.edit__SVG}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 18.786 18.786"
                  >
                    <path
                      id="Icon_metro-pencil"
                      data-name="Icon metro-pencil"
                      d="M18.422,1.928a2.935,2.935,0,0,1,2.348,4.7L19.6,7.8l-4.11-4.11L16.66,2.515a2.922,2.922,0,0,1,1.761-.587ZM3.745,15.431,2.571,20.714,7.854,19.54,18.715,8.679l-4.11-4.11ZM15.7,8.6,7.48,16.817,6.468,15.805l8.219-8.219L15.7,8.6Z"
                      transform="translate(-2.571 -1.928)"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.mobile__user__details}>
            <div className={styles.mobile__detail}>
              <span className={styles.detail__title}>shipping information</span>
              <div className={styles.mobile__right__detail}>
                <div>
                  <span className={styles.detail}>7248 Scarlet Rd</span>
                  <span className={styles.detail}>408-027-8153</span>
                </div>
                <span className={styles.expandBTN}>+</span>
              </div>
            </div>
            <div className={styles.mobile__detail}>
              <span className={styles.detail__title}>payment</span>
              <div className={styles.mobile__right__detail}>
                <div>
                  <span className={styles.detail}>6186</span>
                  <span className={styles.detail}>VISA</span>
                </div>
                <span className={styles.expandBTN}>+</span>
              </div>
            </div>
          </div>
          <div className={styles.cart__details}>
            <CurrencyFormat
              value={subTotal}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              decimalScale={2}
              renderText={(value) => (
                <>
                  <div className={styles.amount__detail}>
                    <span>subtotal:</span>
                    <span>{value}</span>
                  </div>
                </>
              )}
            />
            <CurrencyFormat
              value={taxAmount}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              decimalScale={2}
              renderText={(value) => (
                <>
                  <div className={styles.amount__detail}>
                    <span>taxes:</span>
                    <span>{value}</span>
                  </div>
                </>
              )}
            />
            <CurrencyFormat
              value={cartTotal}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              decimalScale={2}
              renderText={(value) => (
                <>
                  <div className={styles.amount__detail}>
                    <span className={styles.cart__total}>Total:</span>
                    <span className={styles.cart__total}>{value}</span>
                  </div>
                </>
              )}
            />
            <div className={styles.checkout__BTNs}>
              <button onClick={() => navigate("/cart")}>edit bag</button>
              <button onClick={placeOrderHandler}>place order</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout;
