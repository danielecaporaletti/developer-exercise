import ThreeColumnSection from './section/ThreeColumnSection';
import TwoColumnSection from './section/TwoColumSection';
import OneClumnSection from './section/OneClumnSection';
import SectionRestricted from './section/SectionRestricted';
import styles from './MainSection.module.css';
import React, { useState, useEffect } from 'react'

const MainSection = ({sectionTitle}) => {

  const [isScreen, setIsScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 765) {
        setIsScreen(true);
      } else {
        setIsScreen(false);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const randomNumber = Math.floor(Math.random() * 3) + 1;

  return (
    <>
      <div className={styles.title}>{sectionTitle.charAt(0).toUpperCase() + sectionTitle.slice(1)}</div>
      {isScreen ? (
        <>
          {randomNumber === 1 && <OneClumnSection sectionTitle={sectionTitle}/>}
          {randomNumber === 2 && <TwoColumnSection sectionTitle={sectionTitle}/>}
          {randomNumber === 3 && <ThreeColumnSection sectionTitle={sectionTitle}/>}
        </>
      ):(
        <>
          <SectionRestricted sectionTitle={sectionTitle}/>
        </>
      )}
    </>
  )
}

export default MainSection;