import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response.data);
      setRepositories(response.data);
    });
  } , []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
        title: `Repositório ${Date.now()}`,
        url: "https://github.com/thiagocesar1/conceitos-reactjs-bootcamp-gostack",
        techs: ["ReactJS", "JavaScript"]});
    console.log(response);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete('repositories/'+id);
    let reposUpdated = [...repositories];
    const repoIndex = reposUpdated.findIndex(repository => repository.id === id);
    
    reposUpdated.splice(repoIndex, 1);    
    setRepositories(reposUpdated);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => <li key={repository.id}>{repository.title}<button onClick={() => handleRemoveRepository(repository.id)}>Remover</button></li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
