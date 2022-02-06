import React from 'react'
import styles from './TitleAni.module.css';
const TitleAni = props => {
    return (
        <div className={styles.TitleAni__main}>
            <span style={{fontFamily: props.bold ? 'fontBold' : ''}}>{props.title1}</span>
            <span style={{fontFamily: props.bold ? 'fontBold' : ''}}>{props.title2}</span>
        </div>
    )
}

export default TitleAni
