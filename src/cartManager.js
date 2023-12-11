const fs = require('fs').promises;

class CartManager {

    constructor(filePath) {
        this.carts = []
        this.cartId = 1
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
  

}

module.exports = CartManager


/*             //valido si ya existe el product en el cart
            const idExist = products.find(product => product.id === id)
            if (idExist) {
            quantity ++
            return
            } */