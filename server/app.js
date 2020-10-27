const express = require('express')
const app = express()
const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '',
    database: 'NAME_OF_THE_DATABASE_YOU_CREATED',
  },
})
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', async (req, res) => {
  res.json({message: 'test'})
})
app.listen(3001, () => {
  console.log('running on port 3001')
})