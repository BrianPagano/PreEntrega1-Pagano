const fs = require('fs').promises;

class CartManager {

    constructor(filePath) {
        this.carts = []
        this.cartId = 0
        this.path = filePath
        // Cargar cart existentes desde el archivo al crear una nueva instancia
        this.loadCarts()
    }

    
    async loadCarts() {
        try {
            const contenidoJson = await fs.readFile(this.path, 'utf8')
            if (contenidoJson.trim()) {
                this.carts = JSON.parse(contenidoJson)
                // Encuentra el último ID para continuar con la secuencia
                this.cartId = Math.max(...this.carts.map(cart=> cart.id), 0) + 1
            }
        } catch (error) {
            console.error('No se puede leer el archivo, error:', error.message)
        }
    }

    async addCart() {
        try {
            const newCart = {
              id: this.cartId,
              products : []
            }
  
            //pusheo el nuevo carrito
            this.carts.push(newCart)
            await this.updateFile()

        } catch (error) {
            console.error('Error al cargar productos:', error.message)
        }
      }

    async updateFile() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, '\t'), 'utf8')
            console.log("Archivo actualizado correctamente")
        } catch (error) {
             console.error("Error al actualizar el archivo:", error.message)
        }
      }
  
    async getCartByID (id) {
        try {
            const findCart = this.carts.find (cart => cart.id === Number(id))
            if (findCart) return findCart.products
        } catch (error) {
            console.log ('Error al obtener los productos del carrito:', error.message)
          } 
      }

    async addProductInCart (cid, pid) {
        try {
            const cartIndex = this.carts.findIndex (cart => cart.id === Number(cid))
            // si el carrito existe
            if (cartIndex !== -1) {
                // buscar en array products con el id proporcionado por pid 
                const productIndex = this.carts[cartIndex].products.findIndex (prod => prod.product === Number (pid))
                
                //si existe el producto sumar cantidad
                if (productIndex !== -1){
                    this.carts[cartIndex].products[productIndex].quantity++

                } //si el producto no existe, agregar al carrito
                  else {
                    this.carts[cartIndex].products.push ({product: Number(pid), quantity: 1})
                }
            // Guardo los cambios en el archivo
            await this.updateFile();
            } else {
                console.error('El carrito con el ID proporcionado no existe.');
            }
            } catch (error) {
            console.log ('error al agregar el producto al carrito', error.message)
        }
    }
}

module.exports = CartManager


