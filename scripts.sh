# create user
curl -X POST http://localhost:3333/users -H 'content-type: application/json'  --data '{"name": "Jerson", "username": "jersonsatoru"}'

# list users
curl http://localhost:3333/todos
