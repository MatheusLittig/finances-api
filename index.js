// const express = require('express')
// const { PrismaClient } = require('@prisma/client')

// const server = express()
// const prisma = new PrismaClient()

// const port = process.env.PORT || 3000

// server.use(express.json())


const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3000;
const axios = require('axios');
const { v4 } = require('uuid')

server.use(middlewares)
server.use(router)

/** Get transactions */
server.get('/transactions', async (_, res) => {
  const transactions = await axios.get(`${port}/transactions`)
  res.json(transactions.data)
})

/** Get transactions by id*/
server.get('/transactions/:id', async (req, res) => {
  const transaction = await axios.get(`${port}/transaction/${req.params.id}`)
  res.json(transaction.data)
})

/** Post transactions */
server.post('/transactions', async (req, res) => {
  const { ...rest } = req.body

  const data = {
    ...rest,
    id: v4(),
    createdAt: Date.now().toLocaleString(),
    updatedAt: Date.now().toLocaleString(),
  }

  const transaction = await axios.post(`${port}/transactions`, { data })

  return res.json(transaction)
})

/** Delete transactions */
server.delete('/transactions/:id', async (req, res) => {
  const { id } = req.params

  const transaction = await axios.delete(`${port}/transactions/${id}`)

  return res.json(transaction)
})

/** Update transactions */
server.put('/transactions/:id', async (req, res) => {
  const { id } = req.params
  const { amount, description, type, category } = req.body

  const transaction = await axios.put(`${port}/transactions/${id}`, {
    data: {
      amount,
      description,
      type,
      category,
    }
  })

  return res.json(transaction)
})

server.listen(3000, () => {
  console.log('JSON Server is running')
})