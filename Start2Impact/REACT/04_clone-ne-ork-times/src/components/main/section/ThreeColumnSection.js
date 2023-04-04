import ArticleTipe1 from './artclesForSection/ArticleTipe1';
import ArticleTipe2 from './artclesForSection/ArticleTipe2';
import ArticleTipe3 from './artclesForSection/ArticleTipe3';
import styles from './ThreeColumnSection.module.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios';

const ThreeColumnSection = ({sectionTitle}) => {

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
    <>
      <div className={styles.containerTop}>
        <div className={styles.columnOne}>
          <ArticleTipe1 main={true} data={data} num={0}/>
        </div>
        <div className={styles.columnTwo}>
          <ArticleTipe1 data={data} num={1}/>
        </div>
        <div className={styles.columnThree}>
          <ArticleTipe2 data={data} num={2}/>
          <ArticleTipe2 data={data} num={3}/>
        </div>
      </div>
    </>
  )
}

export default ThreeColumnSection;