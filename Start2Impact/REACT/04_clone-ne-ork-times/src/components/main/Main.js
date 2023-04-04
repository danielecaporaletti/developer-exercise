import Article from './article/Article';
import FunnyArticle from './article/FunnyArticle';
import ColumnArticles from './article/ColumnArticles';
import OpinionListArtcle from './opinion/OpinionListArticle';
import styles from './Main.module.css';
import React from 'react'

const Main = ({mainResults, otherArticle, funnyArticle, opinionArticles}) => {
  return (
    <main className={styles.main} >  
    <div className={styles.left} > 
      <div className={styles.Article}>
        <Article mainResults={mainResults}/>
      </div>
      <div className={styles.ColumnArticles}>
        <ColumnArticles otherArticle={otherArticle}/>
      </div>
    </div>
    <div className={styles.right} >
      <div className={styles.funnyArticle}>
        <FunnyArticle funnyArticle={funnyArticle} />
      </div>
      <div className={styles.OpinionListArtcle}>
        <OpinionListArtcle opinionArticles={opinionArticles}/>
      </div>
    </div>
    </main>
  )
}

export default Main;