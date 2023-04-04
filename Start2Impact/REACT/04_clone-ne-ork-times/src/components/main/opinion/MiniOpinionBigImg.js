import styles from './MiniOpinion.module.css';
import React from 'react'

const MiniOpinionBigImg = ({opinion}) => {

  const name = (stringa) => {
    return stringa.replace("By ", "").trim().toUpperCase();
  }

  const image = opinion?.multimedia[1].url

  const openExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className={styles.content}>
        <img onClick={() => openExternalLink(opinion.url)} src={image} className={styles.photoBig} />
        <div>
          <div onClick={() => openExternalLink(opinion.url)} className={styles.name}>{name(opinion.byline)}</div>
          <div onClick={() => openExternalLink(opinion.url)} className={styles.title}>{opinion.title}</div>
        </div>
      </div>
    </>
  )
}

export default MiniOpinionBigImg;