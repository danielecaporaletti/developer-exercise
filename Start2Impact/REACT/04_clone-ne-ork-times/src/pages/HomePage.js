import Header from '../components/header/Header';
import Main from '../components/main/Main';
import Footer from '../components/footer/Footer';
import React from 'react'

const HomePage = ({ mainResults, otherArticle, funnyArticle, opinionArticles, onSectionSelect }) => {
  
  return (
    <>
        <Header onSectionSelect={onSectionSelect} />
        <Main mainResults={mainResults} otherArticle={otherArticle} funnyArticle={funnyArticle} opinionArticles={opinionArticles}/>
        <Footer />
    </>
  )
}

export default HomePage