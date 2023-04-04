import styles from './MiniOpinion.module.css';
import React from 'react'

const MiniOpinionNoImg = ({opinion}) => {

  const name = (stringa) => {
    return stringa.replace("By ", "").trim().toUpperCase();
  }

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
      </div>
    </>
  )
}

export default MiniOpinionNoImg;