import './App.css';
import HomePage from './pages/HomePage';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [data, setData] = useState(null);
  const [groupedResults, setGroupedResults] = useState([]);
  const [opinionArticles, setOpinionArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /*
  Effettua una chiamata get con axios per prendere il json (data)
  Riotna un array con oggei divisi in sottosezioni (groupedResults)
  Mette la sottosezione vuota in fondo all'array
  */
  useEffect(() => {
    const apiKey = process.env.REACT_APP_NEW_YORK_TIMES_API_KEY;
    axios.get(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`)
      .then((response) => {
        setData(response.data);
        console.log('Risultati della ricerca:', response.data);
  
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
  
        setGroupedResults(newGroupedResults);
        console.log('Risultati raggruppati:', newGroupedResults);

        const newOpinionArticles = response.data.results.filter(result => result.section === 'opinion');
        setOpinionArticles(newOpinionArticles);
        console.log('Risultati solo opinion:', newOpinionArticles);
  
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Errore nella ricerca degli utenti:', error);
      });
  }, []);


  return (
    <div className='App'>
      {isLoading ? <h1>Caricamento...</h1> : <HomePage data={data}/>}
    </div>
  );
  
}

export default App;
