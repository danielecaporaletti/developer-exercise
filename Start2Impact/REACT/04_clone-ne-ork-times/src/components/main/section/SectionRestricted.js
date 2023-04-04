import MiniArticle from '../article/componentsMiniArticle/MiniArticle';
import Image from '../article/componentsMiniArticle/Image';
import styles from './Sectionrestricted.module.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios';

const SectionRestricted = ({ sectionTitle }) => {

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
  }, [sectionTitle]);

  return (
    <>  
      {data && data.results ? (
    <>
      <div className={styles.article1}>
        <Image image={data.results[0].multimedia[0].url} copyright={data.results[0].multimedia[0].copyright} url={data.results[0].url} />
        <MiniArticle title={data.results[0].title} content={data.results[0].abstract} url={data.results[0].url} noTime={true}/>
      </div>
      <div className={styles.article2}>
        <Image image={data.results[1].multimedia[0].url} copyright={data.results[1].multimedia[0].copyright} url={data.results[1].url} />
        <MiniArticle title={data.results[1].title} content={data.results[1].abstract} url={data.results[1].url} noTime={true}/>
      </div>
      <div className={styles.article3}>
        <Image image={data.results[2].multimedia[0].url} copyright={data.results[2].multimedia[0].copyright} url={data.results[2].url} />
        <MiniArticle title={data.results[2].title} content={data.results[2].abstract} url={data.results[2].url} noTime={true}/>
      </div>
    </>
    ):(<p>Loading...</p>)}
    </>
  )
}

export default SectionRestricted;