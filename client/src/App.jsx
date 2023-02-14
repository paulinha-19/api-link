import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/links");
        let data = await response.json();
        console.log("DATA", data);
        setLinks(data);
        setLoading(false);
        setError(null);
      }
      catch (error) {
        console.error(`Erro: `, error);
        setLoading(false);
        setError({ error });
      }
    }
    fetchData();
  }, []);

  const renderLinks = () => {
    return links.map(link => {
      return (
        <div key={link.id}>
          <p>{link.id}</p>
          <p>{link.title}</p>
        </div>
      );
    });
  }


  return (
    <div className="App">
      {renderLinks()}
    </div>
  )
}

export default App
