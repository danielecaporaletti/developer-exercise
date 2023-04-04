import styles from './Image.module.css';
import React from 'react'

const Image = ({ image, copyright, url }) => {

  const openExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={styles.container}>
        <img onClick={() => openExternalLink(url)}src={image} className={styles.image} />
        <div className={styles.copyright}>{copyright}</div>
    </div>
  )
}

export default Image