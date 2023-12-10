/* const { Router } = require('express')
const router = Router()
const ProductManager = require('../index')
const productManager = new ProductManager('../../archivo/cart.json')

router.get('/', async (req, res) => {
    try {
        //leo el parametro de consulta limit para la query
        const { limit } = req.query
        // traigo todos los productos
        const cart = await productManager.getProducts()
        //realizo una validacion para saber si existe limit , si no, traigo todos los productos.
        if (!(isNaN(limit) || limit <= 0)) {    
            cartFilter = cart.slice (0, limit)
            return res.json ({ cartFilter })
        }
        res.json ({ cart })
    } catch (error) {
        console.error ('Error al obtener el carrito:', error.message)
    }
})


module.exports = router
 */