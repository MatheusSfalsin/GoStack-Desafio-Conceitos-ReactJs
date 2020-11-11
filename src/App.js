import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App () {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    async function getRepositories () {
      const response = await api.get('repositories')
      const repositories = response.data
      setRepositories(repositories)
    }

    getRepositories()
  }, [])

  async function handleAddRepository () {
    const repository = `Repository ${Date.now()}`
    const formData = {
      title: repository,
      owneurlr: repository,
      techs: [repository]
    }

    const response = await api.post('repositories', { ...formData })
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository (id) {
    await api.delete(`repositories/${id}`)
    const filter = repositories.filter(repository => repository.id !== id)
    setRepositories(filter)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
