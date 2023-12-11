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
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/:cid', async (req, res) => {
    try {
        //utilizo params el id
        const { cid } = req.params
        //realizo una busqueda por id
        const filterById =  await cartManager.getCartByID(cid)
        if (!filterById) {
            return res.status(404).json({ error: 'El producto con el id buscado no existe.'})
        } else {
            res.json ({filterById})
        }
    } catch (error) {
        console.error ('Error al obtener los products:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid} = req.params
        //Agrego el producto al carrito seleccionado
        await cartManager.addProductInCart(cid, pid)
        res.status(201).json ({message: 'Producto agregado correctamente al carrito'})
    } catch (error) {
        console.error ('Error al cargar productos:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router
 