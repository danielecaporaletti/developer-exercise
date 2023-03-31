import styles from './TopComponentCompres.module.css';
import React from 'react'
import { useState } from 'react';
import menuIcon from '../../../images/menuIcon.svg';
import NewYorkTimes from '../../../images/NewYorkTimes.svg';
import userIcon from '../../../images/userIcon.svg';
import closeIcon from '../../../images/closeIcon.svg';
import sections from '../../../json/sections.json';

const TopComponent = () => {

  const [isMenu, setIsMenu] = useState(false);

  const openMenu = () => {
    setIsMenu(true);
  }
  
  const closeMenu = () => {
    setIsMenu(false);
  }

  const eseguiRicerca = () => {
    const query = document.querySelector('.inputMenu').value;
    if (query) {
      window.location.href = `https://www.nytimes.com/search?query=${query}`;
    } else {
      alert('Inserisci qulcosa di valido');
    }
    
  }

  const open = () => {
    return (
      <>
        <button className={styles.buttonMenuIcon}>
        </button>
        <img src={NewYorkTimes} alt='' className={styles.imgNewYorkTimesIcon} />
        <button onClick={closeMenu} className={styles.buttonCloseIcon}>
          <img src={closeIcon} alt='' className={styles.imgCloseIcon}/>
        </button>
      </>
    );
  }

  const closed = () => {
    return (
      <>
        <button onClick={openMenu} className={styles.buttonMenuIcon}>
          <img src={menuIcon} alt='' className={styles.imgMenuIcon} />
        </button>
        <img src={NewYorkTimes} alt='' className={styles.imgNewYorkTimesIcon} />
        <a href='https://myaccount.nytimes.com/auth/enter-email' className={styles.buttonUserIcon} >
          <img src={userIcon} alt='' className={styles.imgUserIcon} />
        </a>
      </>
    );
  }

  const menuOpen = () => {
    return (
      <div  className={styles.menu}>
        <div className={styles.searchTop}>
          <input type='text' placeholder='SEARCH' className={styles.inputMenu} />
          <button onClick={eseguiRicerca} className={styles.inputButtonCerca}>GO</button>
        </div>
        <div className={styles.sectionsList}>
          <div className={styles.lists}>{lists(0, 5, 10)}</div>
          <div className={styles.lists}>{lists(10, 15, 20)}</div>
          <div className={styles.lists}>{lists(20, 31, 42)}</div>
        </div>
      </div>
    );
  }

  const menuClosed = () => {

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dataOggi = new Date().toLocaleDateString('en-US', options);

    return (
      <div className={styles.headerBotton}>
        {dataOggi}
      </div>
    );
  }

  const lists = (first, second, third) => {

    const left = sections.slice(first, second);
    const right = sections.slice(second, third);

    return (
      <>
      <ul className={styles.list}>
        {left.map( (section) => (
          <li key={section.id}>{section.section}</li>
        ))}
      </ul>
      <ul className={styles.list}>
        {right.map( (section) => (
          <li key={section.id}>{section.section}</li>
        ))}
      </ul>
      </>
    )
  }

  return (
    <>
      <header className={styles.headerTop}>
        {isMenu ? open() : closed() }
      </header>
      {isMenu ? menuOpen() : menuClosed()}
    </>
  )
}

export default TopComponent;