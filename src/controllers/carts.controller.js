const { Router } = require('express')
const router = Router()
const CartManager = require('../cartManager')
const cartManager = new CartManager('./archivo/cart.json')


router.post('/', async (req, res) => {
    try {
        await cartManager.addCart()
        res.status(201).json ({message: 'Carrito creado correctamente'})
    } catch (error) {
        console.error ('Error al cargar productos:', error.message)
    }
})


module.exports = router
 