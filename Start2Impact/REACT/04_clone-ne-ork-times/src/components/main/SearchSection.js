import styles from './SerchSection.module.css';
import searchIcon from '../../images/searchIcon.svg';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import defaultImgArticle from '../../images/defaultImageOfAnArticle.png';

const SearchSection = ({ sectionTitle }) => {

  const [data , setData] = useState({});
  const [activeButton, setActiveButton] = useState('latest');
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
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

  // Funzione per gestire il click sui pulsanti e aggiornare lo stato di activeButton
  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === 'latest') {
      setSearchActive(false);
      setSearchResults(null);
    } else {
      setSearchActive(true);
    }
  };

  function formatDate(dateString) {
    const inputDate = new Date(dateString);
  
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const day = inputDate.getDate();
    const monthIndex = inputDate.getMonth();
    const year = inputDate.getFullYear();
  
    return `${monthNames[monthIndex]} ${day}, ${year}`;
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

  const toggleSearchInput = () => {
    setSearchActive(!searchActive);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (searchQuery.trim() === '') {
        setSearchResults(null);
        return;
      }
  
      const searchResults = data.results.map((result) => {
        const fieldsToSearch = [
          'published_date',
          'title',
          'abstract',
          'byline',
        ];
        let found = false;
  
        fieldsToSearch.forEach((field) => {
          if (result[field] && result[field].toLowerCase().includes(searchQuery.toLowerCase())) {
            found = true;
            result[field] = result[field].replace(
              new RegExp(`(${searchQuery})`, 'gi'),
              '<strong>$1</strong>'
            );
          }
        });
  
        return found ? result : null;
      }).filter((result) => result !== null);
  
      setSearchResults({ ...data, results: searchResults });
    }
  };

  return (
    <>
      <div className={styles.divisore}></div>
        <div className={styles.relativeDiv}>
        <div
          className={`${styles.latest} ${activeButton === 'latest' ? styles.active : ''}`}
          onClick={() => handleButtonClick('latest')}
        >
          Latest
        </div>
        <div
          className={`${styles.search} ${activeButton === 'search' ? styles.active : ''}`}
          onClick={() => handleButtonClick('search')}
        >
          <div className={styles.icoContainer}>
            <img src={searchIcon} alt='' className={styles.ico} />
            {searchActive ? (
              <input
                type="text"
                className={styles.searchInput}
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            ) : (
              <div onClick={toggleSearchInput}>Search</div>
            )}
          </div>
        </div>
      </div>
      

      {searchResults ? (
        searchResults.results.map((result) => {
          if (!result.multimedia || !result.multimedia[1]) return null;
          
          return (
            <>
              <div className={styles.contain}>
                <div className={styles.timeBig} dangerouslySetInnerHTML={{ __html: formatDate(result.published_date) }} />
                <div className={styles.article}>
                  <div className={styles.title} dangerouslySetInnerHTML={{ __html: result.title }} />
                  <div className={styles.abstract} dangerouslySetInnerHTML={{ __html: result.abstract }} />
                  <div className={styles.by} dangerouslySetInnerHTML={{ __html: capitalizeAuthor(result.byline) }} />
                  <div className={styles.timeSmall} dangerouslySetInnerHTML={{ __html: formatDate(result.published_date) }} />
                </div>
                <div className={styles.contaimerIma}>
                  <img onClick={() => openExternalLink(result.url)} src={result.multimedia[1].url} alt='' className={styles.image} />
                </div>
              </div>
            </>
          );
        
        })
      ) : data.results ? (
        data.results.map((result) => {
          if (!result.multimedia || !result.multimedia[1]) return null;
          
          return (
            <>
            <div className={styles.contain}>
              <div className={styles.timeBig}>{formatDate(result.published_date)}</div>
              <div className={styles.article}>
                <div className={styles.title}>{result.title}</div>
                <div className={styles.abstract}>{result.abstract}</div>
                <div className={styles.by}>{capitalizeAuthor(result.byline)}</div>
                <div className={styles.timeSmall}>{formatDate(result.published_date)}</div>
              </div>
              <div className={styles.contaimerIma}>
              <img onClick={() => openExternalLink(result.url)} src={result.multimedia[1]?.url || 'https://www.qualityformationsblog.co.uk/wp-content/uploads/2019/12/Default.jpg'} alt='' className={styles.image} />
              </div>
            </div>
            </>
          );
        
        })
      ) : (
        <p>Loading data...</p>
      )}



    </>
  );
}

export default SearchSection;