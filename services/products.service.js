import { faker } from '@faker-js/faker';
import boom from '@hapi/boom';

export class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    this.products = new Array(100).fill(null).map(() => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      image: faker.image.url(),
      isBlocked: faker.datatype.boolean(),
    }));
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return this.products;
  }

  async findOne(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) throw boom.notFound('Product not found');
    if (product.isBlocked) throw boom.conflict('roduct is blocked');
    return product;
  }

  async update(id, changes) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) throw boom.notFound('Product not found');

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...changes,
    };
    return this.products[productIndex];
  }

  async delete(id) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) throw boom.notFound('Product not found');
    this.products.splice(productIndex, 1);
    return { id };
  }
}
