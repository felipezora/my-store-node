const faker = require('faker');
const boom = require('@hapi/boom'); // usaremos módulo boom para manejar errores, el cual devolverá los códigos de status correctos para cada error, es mala práctica usar siempre los genéricos- por defecto

class ProductsService {

  constructor(){
    this.products = [];
    this.generateData();
  }

  generateData() {
    for (let i = 0; i < 100; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        restricted: faker.datatype.boolean()
      });
    }
  }

  async create(data) {
     const newProduct = {
      id: faker.datatype.uuid(),
      ...data
     }
     this.products.push(newProduct);
     return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        resolve(this.products);
      }, 5000);
    })
    // return this.products;
  }

  async findOne(productId) {
    const product = this.products.find(item => item.id === productId);
    if(!product){
      throw boom.notFound('Product not found');
    }
    if(product.restricted){
      throw boom.conflict('Product is restricted');
    }
    return product;
  }

  async update(productId, dataChanges) {
    const index = this.products.findIndex(item => item.id === productId);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...dataChanges
    };
    return this.products[index];
  }

  async delete(productId) {
    const index = this.products.findIndex(item => item.id === productId);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { productId };
  }
}

module.exports = ProductsService;
