import styles from './MiniOpinion.module.css';
import React from 'react'

const MiniOpinion = ({opinion}) => {

  const name = (stringa) => {
    return stringa.replace("By ", "").trim().toUpperCase();
  }

  const image = opinion?.multimedia[2].url

  const openExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className={styles.content}>
        <div>
          <div onClick={() => openExternalLink(opinion.url)} className={styles.name}>{name(opinion.byline)}</div>
          <div onClick={() => openExternalLink(opinion.url)} className={styles.title}>{opinion.title}</div>
        </div>
        <img onClick={() => openExternalLink(opinion?.url)} src={image} className={styles.photo} />
      </div>
    </>
  )
}

export default MiniOpinion;