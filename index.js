import express from "express";
import List from './models/list.js'
const app = express()

// CRUD & REST

// Read   -> GET
// Create -> POST
// Update -> PATCH/PUT
// Delete -> DELETE

app.use(express.json())

import './seed.js'

app.get('/', (request, response) => {
  response.send('Hello, World!')
})

app.get('/list', async (request, response) => {
  const list = await List.find()
  response.json(list)
})

app.post('/list', async (request, response) => {
  const { name, items } = request.body
  if (name && items) {

    const filteredItems = items
    .filter(item => item.title !== undefined)
    .map(item => {
      return {
        title: item.title,
        status: item.status || false
      }
    })

    const createdList = await List.create({
      name,
      items: filteredItems,
    })
    response.json(createdList)
    return
  }

  response.status(400).send('https://http.cat/400')
})

app.get('/list/:id', async (request, response) => {
  const id = request.params.id
  const list = await List.findById(id)
  if (list) {
    response.json(list)
    return
  }
  response.status(404).json({
    message: 'list by that Id was not found',
    url: 'https://http.cat/404',
  })
})

app.listen(8080, () => {
  console.log('Server started at http://localhost:8080');
})