const router = require('express').Router()
import { Order, Product, User, Order_Products } from '../db/models'

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [{model: Order_Products, include: [Product]}]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body, {
      include: {
        model: Order_Products
      }
    })
    res.status(201).send(newOrder)
  } catch (err) {
    next(err)
  }
})

router.post('/checkout/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    order.update({
      complete: true,
      total: req.body.total
    })
    const newOrder = await Order.create({
      userId: order.userId
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
