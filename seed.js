import List from './models/list.js'

await List.deleteMany()
await List.insertMany([
  {
    name: 'Watch Later',
    items: [
      {
        title: 'The boys',
        status: false,
      },
      {
        title: 'Vampire Hunter D',
        status: false,
      }
    ]
  },
  {
    name: 'Shopping List',
    items: [
      {
        title: 'Bread',
        status: false,
      },
      {
        title: 'Milk',
        status: false,
      },
      {
        title: 'Chicken',
        status: false,
      },
      {
        title: 'Ramen',
        status: false,
      },
      {
        title: 'Ramen',
        status: false,
      },
      {
        title: 'Ramen',
        status: false,
      },
      {
        title: 'Ramen',
        status: false,
      },
    ]
  },
])
