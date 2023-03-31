import TopComponentCompres from './topComponent/TopComponentCompres';
import TopComponentExpanded from './topComponent/TopComponentExpanded';
import MiddleComponent from './MiddleComponent';
import BottomComponent from './BottomComponent';
import React, { useEffect, useState } from 'react'

const Header = () => {

  const [isExpand, setIsExpand] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsExpand(true);
      } else {
        setIsExpand(false);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
        {isExpand ? <TopComponentExpanded /> : <TopComponentCompres />}
        <MiddleComponent />
        <BottomComponent />
    </>
  )
}

export default Header;
