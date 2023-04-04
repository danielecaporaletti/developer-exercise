import ArticleTipe1 from './artclesForSection/ArticleTipe1';
import ArticleTipe3 from './artclesForSection/ArticleTipe3';
import Image from '../article/componentsMiniArticle/Image';
import styles from './TwoColumSection.module.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios';

const TwoColumSection = ({ sectionTitle }) => {

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
      <div className={styles.fistColumn}>
        <ArticleTipe1 data={data} num={0} center={true}/> 
      </div>
      <div className={styles.secondColumn}>
        <div className={styles.article1}>
          <ArticleTipe3 data={data} num={1} />
        </div>
        <div className={styles.article2}>
          <ArticleTipe3 data={data} num={2} />
        </div>
        <div className={styles.article3}>
          <ArticleTipe3 data={data} num={3} />
        </div>
      </div>
    </div>
  )
}

export default TwoColumSection;