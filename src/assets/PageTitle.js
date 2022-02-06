import React from 'react'
import styles from './pageTitle.module.css';
const  PageTitle = props => {
    return (
        <div className={styles.title__main}>
            <span>{props.title}</span> 
        </div>
    )
}

export default PageTitle
