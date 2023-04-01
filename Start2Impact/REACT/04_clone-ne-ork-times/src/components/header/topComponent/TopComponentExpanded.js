import menuIcon from '../../../images/menuIcon.svg';
import searchIcon from '../../../images/searchIcon.svg';
import NewYorkTimes from '../../../images/NewYorkTimes.svg';
import headerList from '../../../json/header.json';
import sections from '../../../json/sections.json';
import styles from './TopComponentExpanded.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopComponentExpanded = () => {

  const [isSearch, setIsSearch] = useState(false);
  const [meteo, setMeteo] = useState({icon: '01d', temp: 273.15, temp_min: 273.15, temp_max: 273.15});
  const [marketData, setMarketData] = useState({name: '', change: 0});
  const [positiveChange, setPositiveChange] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dataOggi = new Date().toLocaleDateString('en-US', options);

  let index = 0;
  const data = ["GSPC", "DJI", "IXIC", "DAX", "CAC", "ASX"];

  const barraDiRicerca = () => {
    return (
      <>
        <div className={styles.searchTop}>
          <input type='text' placeholder='SEARCH' className={styles.inputMenu} />
          <button onClick={eseguiRicerca} className={styles.inputButtonCerca}>GO</button>
        </div>
      </>
    )
  }

  const eseguiRicerca = () => {
    const query = document.querySelector('.inputMenu').value;
    if (query) {
      window.location.href = `https://www.nytimes.com/search?query=${query}`;
    } else {
      alert('Inserisci qulcosa di valido');
    }
  }

  const getIPAddress = async () => {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  };

  const ipToLatLng = async (ip) => {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    return {
      latitude: response.data.lat,
      longitude: response.data.lon,
    };
  };

  const getWeatherData = async (lat, lon, apiKey) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    return {
      icon: response.data.weather[0].icon,
      temp: response.data.main.temp,
      temp_min: response.data.main.temp_min,
      temp_max: response.data.main.temp_max,
    };
  };

  const fetchWeatherData = async () => {
    try {
      const ipAddress = await getIPAddress();
      const coordinates = await ipToLatLng(ipAddress);
      const apiKey = process.env.REACT_APP_WEATHER_DATA_API_KEY;
      const weather = await getWeatherData(coordinates.latitude, coordinates.longitude, apiKey);
      setMeteo({
        icon: weather.icon, 
        temp: Math.round(weather.temp - 273.15), 
        temp_min: Math.round(weather.temp_min - 273.15), 
        temp_max: Math.round(weather.temp_max - 273.15)
      });
    } catch (error) {
      console.error('Si è verificato un errore:', error);
    }
  };

  const fetchData = async (symbol) => {
    const API_KEY = process.env.REACT_APP_TWELVE_DATA_API_KEY; // Inserisci la tua chiave API

    try {
      const response = await axios.get(
        `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${API_KEY}`
      );

      const data = response.data;
      const timeSeries = data['values'];
      const latest = timeSeries[0];
      const previous = timeSeries[1];

      const closeLatest = parseFloat(latest['close']);
      const closePrevious = parseFloat(previous['close']);
      const percentageChange = ((closeLatest - closePrevious) / closePrevious) * 100;
      const sign = percentageChange >= 0 ? '+' : '-';
      const change = `${sign} ${Math.abs(percentageChange).toFixed(2)}`;

      setPositiveChange(percentageChange >= 0);

      setMarketData({
        name: data.meta.symbol,
        change: change,
      });
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  const sidebarOpen = () => {

    const first = sections.slice(0, 10);
    const second = sections.slice(10, 22)
    const more = sections.slice(22, 42)

    return(
      <div className={styles.sidebar} onMouseLeave={() => setTimeout( () => setIsSidebar(false), 500)}>
        <ul className={styles.sidebarContents}>
          <li className={styles.sidebarSection}>Home Page</li>
          { first.map( (section) => {
            return(
              <li key={section.id} className={styles.sidebarSection}>
                <div>{section.section}</div>
                <div className={styles.arrow}>&gt;</div>
                <div className={styles.fumetto}></div>
                <div className={styles.finestrella}><div className={styles.finestrellaTitle}>{section.section}</div>{section.subsection.map((subsection) => <div className={styles.subsection}>{subsection}</div>)}</div>
              </li>
            );
          })}
          <div className={styles.separa}></div>
          { second.map( (section) => {
            return (
              <li key={section.id} className={styles.sidebarSection}>
                <div>{section.section}</div>
                {section.subsection!==undefined && 
                  <>
                  <div className={styles.arrow}>&gt;</div>
                  <div className={styles.fumetto}></div>
                  <div className={styles.finestrella}><div className={styles.finestrellaTitle}>{section.section}</div>{section.subsection.map((subsection) => <div className={styles.subsection}>{subsection}</div>)}</div>
                  </>
                }
              </li>
            )
          })}
          <div className={styles.separa}></div>
          <li className={styles.sidebarSection}><div>More</div><div className={styles.arrow}>&gt;</div></li>
        </ul>
      </div>
    )
  }

  useEffect(() => {
    fetchWeatherData();
    fetchData(data[index]);
        const intervalId = setInterval(() => {
      index = (index + 1) % data.length;
      fetchData(data[index]);
    }, 100000000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <header className={styles.headerExpanded}>

      {isSidebar && sidebarOpen()}

      <div className={styles.headerTop} >
        <div className={styles.headerTopLeft}>
          <button  onClick={() => setIsSidebar(!isSidebar)} className={styles.buttonMenuIcon}>
            <img src={menuIcon} alt='' className={styles.imgMenuIcon} />
          </button>
          <button onClick={() => setIsSearch(!isSearch)} className={`${styles.buttonSearchIcon} ${isSearch ? styles['buttonSearchIcon-active'] : ''}`}>
            <img src={searchIcon} alt='' className={styles.imgSearchIcon} />
          </button>
          {isSearch && barraDiRicerca()}
        </div>
        <div className={styles.headerTopRight}>
          <a href='https://myaccount.nytimes.com/auth/enter-email' className={styles.bottomLogIn} >LOG IN</a>
        </div>
      </div>

      <div className={styles.headerMiddle}>
        <div className={styles.dataOggi}>{dataOggi}<br/><div>Today’s Paper</div></div>
        <img src={NewYorkTimes} alt='' className={styles.imgNewYorkTimesIcon} />
        <div className={styles.headerMiddleRight}>
          <div className={styles.headerMiddleRightTop} >
            <img src={`https://openweathermap.org/img/wn/${meteo.icon}.png`} className={styles.meteo}/>
            <div className={styles.tempA}>{meteo.temp}°C</div>
            <div className={styles.tempB}>{meteo.temp_max}°</div>
            <div className={styles.tempB}>{meteo.temp_min}°</div>
          </div>
          <div className={styles.headerMiddleRightBotton} > {marketData.name} <div className={positiveChange ? styles.positive : styles.negative}> {marketData.change}%</div></div>
        </div>
      </div>

      <div className={styles.headerBottom}>
        { ( () => {
          const left = headerList.slice(0, 17);
          const right = headerList.slice(17, 21);
          return (
            <>
              {left.map( (section) => (
                <div key={section.id} className={styles.section}>{section.section}</div>
              ))}
              <div className={styles.separator}></div>
              {right.map( (section) => (
                <div key={section.id} className={styles.section}>{section.section}</div>
              ))}
            </>
          )
        }) ()}
      </div>
      <div className={styles.divisorFirst}></div>
      <div className={styles.divisorSecond}></div>

    </header>
  )
}

export default TopComponentExpanded;