const express = require("express");
const cors = require ('cors');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors())

const repositories = []


app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
  repositories.push(repository);
  return response.status(201).json(repository);
});

  app.get('/repositories', (request, response) => {
  response.json(repositories)
  });

  app.put("/repositories/:id", (request, response) => {
    const { id } = request.params;
    const { title, url, techs } = request.body;
    const repositoryIndex = repositories.findIndex(repo => repo.id === id);
    if (repositoryIndex < 0) {
      return response.status(400).json({ error: "Repository not found" });
    }
    const { likes } = repositories[repositoryIndex];
    repositories[repositoryIndex] = {
      id,
      title,
      url,
      techs,
      likes
    };
    return response.json(repositories[repositoryIndex]);
  });

  app.delete("/repositories/:id", (request, response) => {
    const { id } = request.params;

    const findRepositoryIndex = repositories.findIndex(repository =>
       repository.id === id);
    if (findRepositoryIndex >= 0) {
      repositories.splice(findRepositoryIndex, 1);
    } else {
      return response.status(400).json({error: 'repository does not exist'})
    }
    return response.status(204).send();
  });

  app.put("repositories/:id", (request, response) => {
    const { id } = request.params;
    const { title, url, techs} = request.body;

    const findRepositoryIndex = repositories.findIndex(repository =>
      repository.id === id);

      if(!findRepositoryIndex === -1) {
        return response.status(400).json({error: 'repository does not exist'});
      }

      const repository = {
        id,
        title,
        url,
        techs,
        likes: repositories[findRepositoryIndex].likes,
      }
      repositories[findRepositoryIndex] = repository;
        return response.json(repository)
  });

  app.post("repositories/:id/like", (request, response) => {
    const { id } = request.params;

    const findRepositoryIndex = repositories.findIndex(repository =>
      repository.id === id);

      if(!findRepositoryIndex === -1) {
        return response.status(400).json({error: 'repository does not exist'});
      }

      repositories[findRepositoryIndex].likes++;

      return response.json(repositories[findRepositoryIndex]);
  });


module.exports = app;