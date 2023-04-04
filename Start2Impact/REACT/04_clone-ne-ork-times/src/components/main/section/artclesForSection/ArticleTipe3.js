import Image from '../../article/componentsMiniArticle/Image';
import MiniArticle from '../../article/componentsMiniArticle/MiniArticle';
import MiniMiniArticle from '../../article/componentsMiniArticle/MiniMiniArticle';
import styles from './ArticleTipe3.module.css';
import { useState, useEffect } from 'react';
import React from 'react';

const ArticleTipe3 = ({ data, num }) => {
  const [image, setImage] = useState('');
  const [copyright, setCopyright] = useState('');
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [url, setUrl] = useState('');
  const [time, setTime] = useState('');
  const [by, setBy] = useState('');

  useEffect(() => {
    if (data.results) {
      let currentIndex = num;
      while (!data.results[currentIndex]?.title && currentIndex < data.results.length - 1) {
        currentIndex++;
      }
  
      setTitle(data.results[currentIndex]?.title);
      setImage(data.results[currentIndex]?.multimedia?.[0]?.url);
      setCopyright(data.results[currentIndex]?.multimedia?.[0]?.copyright);
      setAbstract(data.results[currentIndex]?.abstract);
      setUrl(data.results[currentIndex]?.url);
      setTime(timeAgo(data.results[currentIndex]?.published_date));
      if (data.results[currentIndex]?.byline) {
        setBy(capitalizeAuthor(data.results[currentIndex]?.byline));
      }
    }
  }, [data]);

  function timeAgo(dateString) {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
    const differenceInSeconds = Math.floor((currentDate - inputDate) / 1000);
  
    const secondsInHour = 3600;
    const secondsInDay = 86400;
  
    if (differenceInSeconds >= secondsInDay) {
      const days = Math.floor(differenceInSeconds / secondsInDay);
      return `${days}d ago`;
    } else if (differenceInSeconds >= secondsInHour) {
      const hours = Math.floor(differenceInSeconds / secondsInHour);
      return `${hours}h ago`;
    } else {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes}m ago`;
    }
  }

  function capitalizeAuthor(inputString) {
    if (!inputString) return '';
  
    const parts = inputString.split('By ');
    const author = parts[1];

    if (!author) return inputString;
  
    const authorUpperCase = author.toUpperCase();
    return `By ${authorUpperCase}`;
  }

  const openExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    data.results ? (
      <>
        <div className={styles.titleImg}>
          <div onClick={() => openExternalLink(url)} className={styles.title}>{title}</div>
          <img onClick={() => openExternalLink(url)} src={image} alt='' className={styles.image} />
        </div>
        <div onClick={() => openExternalLink(url)} className={styles.text}>{abstract}</div>
        <div className={styles.time}>{time} &bull; {by}</div>
      </>
    ) : (
      <p>Loading...</p>
    )
  );
};

export default ArticleTipe3;