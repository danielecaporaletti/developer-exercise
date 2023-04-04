import styles from './MiniArticle.module.css';
import React from 'react'

const MiniArticle = ({main, title, content, url, noTime, center}) => {

    const randomNumber = () => {
        const min = 3;
        const max = 8;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const openExternalLink = (url) => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };

    const titleClass = `${main ? styles.mainTitle : styles.title} ${
      center ? styles.centerText : ''
    }`;
    const timeReadClass = `${styles.timeRead} ${center ? '' : ''}`;
    const contentClass = `${styles.content} ${center ? styles.centerText : ''}`;
    
  
    return (
      <div className={`${center ? styles.centerWrapper : ''}`}>
        <div onClick={() => openExternalLink(url)} className={titleClass}>
          {title}
        </div>
        <div onClick={() => openExternalLink(url)} className={contentClass}>
          {content}
        </div>
        {noTime !== true ? (
          <div className={styles.timeReadWrapper}>
            <div className={timeReadClass}>{randomNumber()} MIN READ</div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };
  
  export default MiniArticle;