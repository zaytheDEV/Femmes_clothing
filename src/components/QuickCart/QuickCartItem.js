import React from 'react'
import styles from'./quickCartItem.module.css'
function QuickCartItem(props) {
    //remove from cart
    const removeFromCartHandler = () => {
        props.removeFromCart(props.id);
    }
    return (
        <div className={styles.quickCartItem__main}>
            <div onClick={() => removeFromCartHandler()} className={styles.item__delete__BTN}>x</div>
            <div className={styles.item__img}>
                <img src={require(`../../assets/Images/${props.iconImage}`).default} alt=""/>
            </div>
        </div>
    )
}

export default QuickCartItem
