import './App.css';
import HomePage from './pages/HomePage';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () =>{
    axios.get('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=bIUGeMWixSxJcdZ7TohSahnP0hC0iBK0')
      .then( (response) => {
        setData(response.data);
        console.log('Risultati della ricerca:', response.data)
        setIsLoading(false);
      })
      .catch( (error) => {
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
