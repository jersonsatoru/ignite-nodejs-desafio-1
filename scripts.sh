# create user
curl -X POST http://localhost:3333/users -H 'content-type: application/json'  --data '{"name": "Jerson", "username": "jersonsatoru"}'

# add todo from user todo list
curl -X POST http://localhost:3333/todos -H 'content-type: application/json' -H 'username: jersonsatoru' --data '{"title": "My new todo", "deadline": "2021-06-05"}'

# list todos from user
curl http://localhost:3333/todos -H 'username: jersonsatoru'
