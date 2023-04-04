import TopComponentCompresForSection from './topComponent/TopComponentCompresForSection';
import TopComponentExpandedForSection from './topComponent/TopComponentExpandedForSection';
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
        {isExpand ? <TopComponentExpandedForSection /> : <TopComponentCompresForSection />}
    </>
  )
}

export default Header;
