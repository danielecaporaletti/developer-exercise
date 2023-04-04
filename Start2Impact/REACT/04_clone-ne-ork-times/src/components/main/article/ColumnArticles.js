import Article from './Article';
import styles from './ColumnArticles.module.css';
import React from 'react'

const ColumnArticles = ({otherArticle}) => {
  
  return (
    <>
      {otherArticle.map( (mainResults) => {
        return(
          <div className={styles.columnArticle}>
          <Article mainResults={mainResults} />
          </div>
        );
      })}
    </>
  )
}

export default ColumnArticles;