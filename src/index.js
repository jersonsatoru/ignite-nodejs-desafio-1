const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const user = users.find((u) => u.username === username);
  if (!user) {
    return response.status(404).json({
      message: 'User not found',
    });
  }

  request.user = user;
  return next();
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const exists = users.find((u) => u.username === username);
  if (exists) {
    return response.status(400).json({
      error: 'Mensagem de erro',
    });
  }

  const newUser = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  };

  users.push(newUser);

  return response.status(201).json(newUser);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  response.json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const {
    user,
    body: {
      title,
      deadline,
    },
  } = request;

  const newTodo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };

  user.todos.push(newTodo);
  return response.status(201).json(newTodo);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const {
    user,
    body: {
      title,
      deadline,
    },
    params: {
      id,
    },
  } = request;

  const todo = user.todos.find((t) => t.id === id);
  if (!todo) {
    return response.status(404).json({
      error: 'Mensagem do erro',
    });
  }

  todo.title = title;
  todo.deadline = new Date(deadline);

  return response.json(todo);
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const {
    user,
    params: {
      id,
    },
  } = request;

  const todo = user.todos.find((t) => t.id === id);

  if (!todo) {
    return response.status(404).json({
      error: 'Mensagem do erro',
    });
  }

  todo.done = true;

  return response.json(todo);
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const {
    user,
    params: {
      id,
    },
  } = request;

  const index = user.todos.findIndex((t) => t.id === id);

  if (index < 0) {
    return response.status(404).json({
      error: 'TODO not found',
    });
  }

  user.todos.splice(index, 1);
  return response.status(204).send();
});

module.exports = app;
