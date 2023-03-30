import TopComponent from './TopComponent';
import MiddleComponent from './MiddleComponent';
import BottomComponent from './BottomComponent';
import React from 'react'

const Header = () => {
  return (
    <>
        <TopComponent />
        <MiddleComponent />
        <BottomComponent />
    </>
  )
}

export default Header;
