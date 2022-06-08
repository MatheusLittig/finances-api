import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

/** Get transactions */
app.get('/transaction', async (_, res) => {
  const transaction = await prisma.transactions.findMany()
  return res.json(transaction)
})

/** Post transactions */
app.post('/transaction', async (req, res) => {
  const { amount, description, type, category } = req.body

  const transaction = await prisma.transactions.create({
    data: {
      amount: Number(amount),
      description,
      type: Number(type),
      category: Number(category),
    },
  })

  return res.json(transaction)
})

/** Delete transactions */
app.delete('/transaction/:id', async (req, res) => {
  const { id } = req.params

  const transaction = await prisma.transactions.delete({
    where: {
      id: Number(id),
    },
  })

  return res.json(transaction)
})

/** Update transactions */
app.put('/transaction/:id', async (req, res) => {
  const { id } = req.params
  const { amount, description, type, category } = req.body

  const transaction = await prisma.transactions.update({
    where: {
      id: Number(id),
    },
    data: {
      amount,
      description,
      type,
      category,
    },
  })

  return res.json(transaction)
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})