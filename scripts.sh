# create user
curl -X POST http://localhost:3333/users -H 'content-type: application/json'  --data '{"name": "Jerson", "username": "jersonsatoru"}'

# add todo from user todo list
curl -X POST http://localhost:3333/todos -H 'content-type: application/json' -H 'username: jersonsatoru' --data '{"title": "My new todo", "deadline": "2021-06-05"}'

# update todo data
# curl -X PUT http://localhost:3333/todos/2174c6b2-0d0f-4e8c-8f11-ae5e65bb6c20 -H 'content-type: application/json' -H 'username: jersonsatoru' --data '{"title": "My new todo 2", "deadline": "2021-06-09"}'

# list todos from user
curl http://localhost:3333/todos/ -H 'username: jersonsatoru' | json_pp

# mark todo done
# curl -X PATCH http://localhost:3333/todos/197cc527-b9bd-4711-90c5-cff32bf53246/done -H 'content-type: application/json' -H 'username: jersonsatoru'

# delete todo
# curl -X DELETE http://localhost:3333/todos/35448109-888a-4141-b079-e53a79b01155 -H 'content-type: application/json' -H 'username: jersonsatoru'
