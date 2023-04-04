import styles from './MiniMiniArticle.module.css';
import React from 'react'

const MiniMiniArticle = ({ title, url }) => {

    const randomNumber = () => {
        const min = 3;
        const max = 8;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } 

    const openExternalLink = (url) => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };

  return (
    <div >
        <div onClick={() => openExternalLink(url)} className={styles.title}>{title}</div>
        <div className={styles.timeRead}>{randomNumber()} MIN READ</div>
    </div>
  )
}

export default MiniMiniArticle;