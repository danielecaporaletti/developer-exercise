import MiniArticle from './componentsMiniArticle/MiniArticle';
import Image from './componentsMiniArticle/Image';
import styles from './Article.module.css';
import React, { useEffect, useState } from 'react';
import MiniMiniArticle from './componentsMiniArticle/MiniMiniArticle';

const Article = ({mainResults}) => {

  const [isOneColumn, setIsOneColumn] = useState(false);

  const image = mainResults.articles[0].multimedia[0].url;
  const copyright = mainResults.articles[0].multimedia[0].copyright;

  const title1 = mainResults.articles[0].title;
  const content1 = mainResults.articles[0].abstract;
  const url1 = mainResults.articles[0].url;

  const title2 = mainResults.articles[1]?.title;
  const content2 = mainResults.articles[1]?.abstract;
  const url2 = mainResults.articles[1]?.url;

  const title3 = mainResults.articles[2]?.title;
  const url3 = mainResults.articles[2]?.url;

  //scarta i primi due e prende i prossimi 3
  const titleRest = mainResults.articles.slice(3, 6).map(article => article.title);

  useEffect( () => {
    const handleResize = () => {
      if (window.innerWidth <= 739) {
        setIsOneColumn(true);
      } else {
        setIsOneColumn(false);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const img = () => {
    return (
      <>
        <div className={styles.rightUp}>
          <Image image={image} copyright={copyright} url={url1}/>
        </div>
      </>
    )
  }

  return (
    <>
      <div className={styles.upper}>
        <div className={styles.leftUp}>
          <div className={styles.articleOne}>
            <MiniArticle main={'true'} title={title1} content={content1} url={url1}/>
          </div>
          {isOneColumn && img()}
          {title2 !== undefined && 
            <div className={styles.articleTwo}>
            <MiniArticle title={title2} content={content2} url={url2}/> 
            </div>
          }
          <div className={styles.articleThree}>
            {title3 !== undefined && <MiniMiniArticle title={title3} url={url3}/>}
          </div>
        </div>
        {!isOneColumn && img()}
      </div>
      <div className={styles.down}>
        {(titleRest !== [] && titleRest.map((title) => <div className={styles.downArticle}><MiniMiniArticle title={title} /></div>))}
      </div>
    </>
  )
}

export default Article;