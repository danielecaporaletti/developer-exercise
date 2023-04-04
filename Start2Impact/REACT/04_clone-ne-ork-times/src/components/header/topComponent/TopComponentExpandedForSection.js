import menuIcon from '../../../images/menuIcon.svg';
import searchIcon from '../../../images/searchIcon.svg';
import NewYorkTimes from '../../../images/NewYorkTimes.svg';
import sections from '../../../json/sections.json';
import styles from './TopComponentExpanded.module.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TopComponentExpandedForSection = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);
  const [query, setQuery] = useState('');

  const BarraDiRicerca = () => {
  
    const eseguiRicerca = (e) => {
      e.preventDefault();
      if (query) {
        window.location.href = `https://www.nytimes.com/search?query=${query}`;
      } else {
        alert('Inserisci qulcosa di valido');
      }
    };
  
    return (
      <div className={styles.searchTop}>
        <form onSubmit={eseguiRicerca}>
          <input
            type="text"
            placeholder="SEARCH"
            className={styles.inputMenu}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.inputButtonCerca}>
            GO
          </button>
        </form>
      </div>
    );
  };

  const sidebarOpen = () => {
    const first = sections.slice(0, 10);
    const second = sections.slice(10, 22);
    const more = sections.slice(22, 42);
  
    return (
      <div 
        className={styles.sidebar} 
        onMouseLeave={() => setTimeout(() => setIsSidebar(false), 500)}
      >
        <ul className={styles.sidebarContents}>
          <Link to="/" className={styles.link}><li className={styles.sidebarSection}>Home Page</li></Link>
          {first.map((section) => {
            return (
              <Link to={section.search ? `/section/${section.search}` : section.url} className={styles.link}>
              <li key={section.id} className={styles.sidebarSection}>
                <div>{section.section}</div>
                <div className={styles.arrow}>&gt;</div>
                <div className={styles.fumetto}></div>
                <div className={styles.finestrella}>
                  <div className={styles.finestrellaTitle}>{section.section}</div>
                  {section.subsection.map((subsection) => (
                    <Link to={subsection.search ? `/section/${subsection.search}` : subsection.url} onClick={(event) => event.stopPropagation()} className={styles.link}>
                      <div className={styles.subsection}>{subsection.section}</div>
                    </Link>
                  ))}
                </div>
              </li>
              </Link>
            );
          })}
          <div className={styles.separa}></div>
          {second.map((section) => {
            return (
              <Link to={section.search ? `/section/${section.search}` : section.url} className={styles.link}>
              <li key={section.id} className={styles.sidebarSection}>
                <div>{section.section}</div>
                {section.subsection !== undefined && (
                  <>
                    <div className={styles.arrow}>&gt;</div>
                    <div className={styles.fumetto}></div>
                    <div className={styles.finestrella}>
                      <div className={styles.finestrellaTitle}>{section.section}</div>
                      {section.subsection.map((subsection) => (
                        <Link to={subsection.search ? `/section/${subsection.search}` : subsection.url} onClick={(event) => event.stopPropagation()} className={styles.link}>
                          <div className={styles.subsection}>{subsection.section}</div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </li>
              </Link>
            );
          })}
          <div className={styles.separa}></div>
          <li className={styles.sidebarSection}>
            <div>More</div>
            <div className={styles.arrow}>&gt;</div>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <>
    <header className={styles.headerExpanded}>

      {isSidebar && sidebarOpen()}

      <div className={styles.headerTop} >
        <div className={styles.headerTopLeft}>
          <button  onClick={() => setIsSidebar(!isSidebar)} className={styles.buttonMenuIcon}>
            <img src={menuIcon} alt='' className={styles.imgMenuIcon} />
          </button>
          <button onClick={() => setIsSearch(!isSearch)} className={`${styles.buttonSearchIcon} ${isSearch ? styles['buttomSearchIconActive'] : ''}`}>
            <img src={searchIcon} alt='' className={styles.imgSearchIcon} />
          </button>
          {isSearch && BarraDiRicerca()}
        </div>
        <div className={styles.headerTopMiddle}>
          <Link to='/' className={styles.link}>
            <img src={NewYorkTimes} alt='' className={styles.imgNewYorkTimesIconForSelection} />
          </Link>
        </div>
        <div className={styles.headerTopRight}>
          <a href='https://myaccount.nytimes.com/auth/enter-email' className={styles.bottomLogIn} >LOG IN</a>
        </div>
      </div> 



    </header>
    <div className={styles.diviso}></div>
    </>
  )
}

export default TopComponentExpandedForSection;