

//LISTA DE CATEGORIAS DO STOCK
export const CATEGORIES = [
    "Jogos",
    "Livros",
    "Brinquedos",
    "Acessórios"
  ]

export default class StockItem {

    constructor({name, description, quantity, price, category}) {
        //vamos usar tbm um método para gerar um id único, por conta de estarmos trabalhando apenas com front-end nesse projeto
        this.id = Math.floor(Math.random() * 100000000)
        //
        this.name = name
        this.description = description
        this.quantity = +quantity
        this.price = +price
        this.category = category
        this.createdAt = new Date()
        this.updatedAt = new Date()
        this.#validate()
    }

    #validate() {
        const validName = typeof this.name === "string"
        const validDescription = typeof this.description === "string"
        const validQuantity = typeof this.quantity === "number" && Number.isInteger(this.quantity)
        const validPrice = typeof this.price === "number"
        const validCategory = CATEGORIES.includes(this.category)
        if (!(
          validName &&
          validDescription &&
          validQuantity &&
          validPrice &&
          validCategory
        )) {
          throw new Error("Invalid item!")
        }
      }
    }

