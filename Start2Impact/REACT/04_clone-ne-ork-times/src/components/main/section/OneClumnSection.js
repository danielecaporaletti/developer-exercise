import ArticleTipe1 from './artclesForSection/ArticleTipe1';
import ArticleTipe2 from './artclesForSection/ArticleTipe2';
import ArticleTipe3 from './artclesForSection/ArticleTipe3';
import ArticleTipe4 from './artclesForSection/ArticleTipe4';
import Image from '../article/componentsMiniArticle/Image';
import styles from './OneColumnSection.module.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios';

const OneClumnSection = ({sectionTitle}) => {

  const [data , setData] = useState({});

  useEffect(() => {
    console.log(sectionTitle);
    const apiKey = process.env.REACT_APP_NEW_YORK_TIMES_API_KEY;
    // Chiamata axios per ricevere le news della sezione
    axios
      .get(`https://api.nytimes.com/svc/topstories/v2/${sectionTitle}.json?api-key=${apiKey}`)
      .then((response) => {
        setData(response.data);
        console.log('Risultato intero della ricerca per sezione:', response.data);
      })
      .catch((error) => {
        console.log('Errore nella ricerca per sezione:', error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.up}>
        <ArticleTipe4 data={data} num={0}/>
      </div>
      <div className={styles.bottom} >
        <div className={styles.article1} >
          <ArticleTipe1 data={data} num={1} />
        </div>
        <div className={styles.article2} >
          <ArticleTipe1 data={data} num={2} />
        </div>
        <div className={styles.article3} >
          <ArticleTipe1 data={data} num={3} />
        </div>
      </div>
    </div>
  )
}

export default OneClumnSection;