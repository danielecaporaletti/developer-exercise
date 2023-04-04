import './App.css';
import HomePage from './pages/HomePage';
import SectionPage from './pages/SectionPage';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {

  // articolo principale
  const [mainResults, setMainResults] = useState([]);
  // altri articoli da mettere sotto l'articolo principale
  const [otherArticle, setOtherArticle] = useState([]);
  // articoli funny da mettere a destra
  const [funnyArticle, setFunnyArticle] = useState([])
  // articoli delle opinioni da mettere sotto a destra
  const [opinionArticles, setOpinionArticles] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  /*
  Effettua una chiamata get con axios per prendere il json (data)
  Riotna un array con oggei divisi in sottosezioni (groupedResults)
  Mette la sottosezione vuota in fondo all'array
  */
  useEffect(() => {
    const apiKey = process.env.REACT_APP_NEW_YORK_TIMES_API_KEY;
    //Chiamata axios per ricevere le news della home
    axios.get(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`)
      .then((response) => {
        //console.log('Risultato intero della ricerca:', response.data);
        
        //raggruppami i risultati per le loro subsection, in fondo la subsection ''
        const newGroupedResults = [];
  
        response.data.results.forEach((result) => {
          const index = newGroupedResults.findIndex(
            (groupedResult) => groupedResult.section === result.subsection
          );
  
          if (index !== -1) {
            newGroupedResults[index].articles.push(result);
          } else {
            newGroupedResults.push({
              section: result.subsection,
              articles: [result],
            });
          }
        });
  
        newGroupedResults.sort((a, b) => {
          if (a.section === '') return 1;
          if (b.section === '') return -1;
          return 0;
        });

        //eliminare i primi risultati e settarli
        const newMainResults = newGroupedResults.shift();
        setMainResults(newMainResults);
        //console.log(`Primi risultati per il Main: `, newMainResults);

        // Prendere gli articoli con subsection = ''
        const filteredGroupedResults = newGroupedResults.pop();
        
        //Filtrare gli opionio article e settarli
        const newOpinionArticles = filteredGroupedResults.articles.filter(result => result.section === 'opinion');
        setOpinionArticles(newOpinionArticles);
        //console.log(`Risultati '' solo opinion:`, newOpinionArticles);

        //Filtrare gli altri articoli che non sono opinion e settarli
        const newOtherArticle = filteredGroupedResults.articles.filter(result => result.section !== 'opinion');
        setFunnyArticle(newOtherArticle);
        //console.log(`Risultati '' diversi da opinion:`, newOtherArticle);

        //Ordino gli articoli rimanenti e li setto
        newGroupedResults.sort( (a, b) => {
          return b.articles.length - a.articles.length;
        })
        setOtherArticle(newGroupedResults);
        //console.log('Risultati rimanenti in ordine crescente: ', newGroupedResults);
        
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Errore nella ricerca degli utenti:', error);
      });

      
  }, []);

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={isLoading ? <h1>Caricamento...</h1> : <HomePage mainResults={mainResults} otherArticle={otherArticle} funnyArticle={funnyArticle} opinionArticles={opinionArticles} />} />
          <Route path='/section/:titleSection' element={<SectionPage />} />
        </Routes>
      </Router>
    </div>
  );
  
}

export default App;
