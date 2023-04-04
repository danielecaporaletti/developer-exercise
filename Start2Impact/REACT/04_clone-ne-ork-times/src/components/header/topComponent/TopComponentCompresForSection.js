import styles from './TopComponentCompres.module.css';
import React from 'react'
import { useState } from 'react';
import menuIcon from '../../../images/menuIcon.svg';
import NewYorkTimes from '../../../images/NewYorkTimes.svg';
import userIcon from '../../../images/userIcon.png';
import closeIcon from '../../../images/closeIcon.svg';
import sections from '../../../json/sections.json';
import { Link } from 'react-router-dom';
import noScrollStyles from './noScroll.module.css';

const TopComponentCompresForSection = () => {
  
  const [isMenu, setIsMenu] = useState(false);

  const openMenu = () => {
    setIsMenu(true);
    document.body.classList.add(noScrollStyles['no-scroll']);
  }
  
  const closeMenu = () => {
    setIsMenu(false);
    document.body.classList.remove(noScrollStyles['no-scroll']);
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
      <header className={styles.headerTopOpen}>
        <div className={styles.space}>
        </div>
        <Link to='/' className={styles.link}>
          <img src={NewYorkTimes} alt='' className={styles.imgNewYorkTimesIcon} />
        </Link>
        <button onClick={closeMenu} className={styles.buttonCloseIcon}>
          <img src={closeIcon} alt='' className={styles.imgCloseIcon}/>
        </button>
      </header>
    );
  }

  const closed = () => {
    return (
      <header className={styles.headerTop}>
        <button onClick={openMenu} className={styles.buttonMenuIcon}>
          <img src={menuIcon} alt='' className={styles.imgMenuIcon} />
        </button>
        <Link to='/' className={styles.link}>
          <img src={NewYorkTimes} alt='' className={styles.imgNewYorkTimesIcon} />
        </Link>
        <a href='https://myaccount.nytimes.com/auth/enter-email' className={styles.buttonUserIcon} >
          <img src={userIcon} alt='' className={styles.imgUserIcon} />
        </a>
      </header>
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

  const lists = (first, second, third) => {

    const left = sections.slice(first, second);
    const right = sections.slice(second, third);

    return (
      <>
      <ul className={styles.list}>
        {left.map( (section) => (
          <Link to={section.search ? `/section/${section.search}` : section.url} className={styles.link} >
            <li key={section.id}>{section.section}</li>
            </Link>
        ))}
      </ul>
      <ul className={styles.list}>
        {right.map( (section) => (
          <Link to={section.search ? `/section/${section.search}` : section.url} className={styles.link} >
            <li key={section.id}>{section.section}</li>
            </Link>
        ))}
      </ul>
      </>
    )
  }

  return (
    <>
      {isMenu ? open() : closed() }
      {isMenu && menuOpen()}
    </>
  )
}

export default TopComponentCompresForSection