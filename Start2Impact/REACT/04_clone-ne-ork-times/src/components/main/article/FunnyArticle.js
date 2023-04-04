import Article from './Article';
import Image from './componentsMiniArticle/Image';
import styles from './FunnyArticle.module.css';
import React, { useState } from 'react'

const FunnyArticle = ({funnyArticle}) => {

  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isScren, setIsScreen] = useState(false);

  const image1 = funnyArticle[0].multimedia[0].url;
  const copyright1 = funnyArticle[0].multimedia[0].copyright;
  const url1 = funnyArticle[0].url;
  const image2 = funnyArticle[1].multimedia[0].url;
  const image2a = funnyArticle[1].multimedia[1].url;
  const url2 = funnyArticle[1].url;
  const image3 = funnyArticle[2].multimedia[0].url;
  const image3a = funnyArticle[2].multimedia[1].url;
  const url3 = funnyArticle[2].url;

  const title1 = funnyArticle[0].title;
  const abstract1 = funnyArticle[0].abstract;

  const title2 = funnyArticle[1].title;
  const title3 = funnyArticle[2].title;

  const randomNumber = () => {
    const min = 3;
    const max = 8;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const mainResults = {
    articles: [
      {
        title: title1,
        abstract: abstract1,
        multimedia: [
          {
            url: image1,
            copyright: copyright1,
          },
        ],
      },
    ],
  };

  React.useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 1069) {
        setIsMediumScreen(true);
      } else {
        setIsMediumScreen(false);
      }

      if (screenWidth <= 1069 && screenWidth >= 740) {
        setIsScreen(true);
      } else {
        setIsScreen(false);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className={styles.up}>
        {isMediumScreen ? (
          <>
            <div className={styles.space} />
            <Article mainResults={mainResults} />
          </>
        ) : (
          <>
            <Image image={image1} copyright={copyright1} url={url1}/>
            <div onClick={() => openExternalLink(url1)} className={styles.upTitle}>{title1}</div>
            <div onClick={() => openExternalLink(url1)} className={styles.upAbstract}>{abstract1}</div>
            <div className={styles.timeRead}>{randomNumber()} MIN READ</div>
          </>
        )}
      </div>
      {isScren && (
        <>
          <div className={styles.down}>
            <div className={styles.downLeft}>
              <div className={styles.orderTwo}>
                <Image image={image2a} copyright={''} url={url2}/>
              </div>
              <div className={styles.orderOne}>
                <div onClick={() => openExternalLink(url2)} className={styles.downTitle}>{title2}</div>
                <div className={styles.timeRead}>{randomNumber()} MIN READ</div>
              </div>
            </div>
            <div className={styles.downRight}>
              <div className={styles.orderTwo}>
                <Image image={image3a} copyright={''} url={url3}/>
              </div>
              <div className={styles.orderOne}>
                <div onClick={() => openExternalLink(url3)} className={styles.downTitle}>{title3}</div>
                <div className={styles.timeRead}>{randomNumber()} MIN READ</div>
              </div>
            </div>
          </div>
        </>
      )}
      {!isScren && (
        <div className={styles.down}>
          <div >
            <Image image={image2} copyright={''} url={url2}/>
            <div onClick={() => openExternalLink(url2)} className={styles.downTitle}>{title2}</div>
            <div className={styles.timeRead}>{randomNumber()} MIN READ</div>
          </div>
          <div >
            <Image image={image3} copyright={''} url={url3}/>
            <div onClick={() => openExternalLink(url3)} className={styles.downTitle}>{title3}</div>
            <div className={styles.timeRead}>{randomNumber()} MIN READ</div>
          </div>
        </div>
      )}

    </>
  )
}

export default FunnyArticle;

 
