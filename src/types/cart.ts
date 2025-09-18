import type { Product } from "./index";

export class Cart {
  #products: Product[];

  constructor(products: Product[]) {
    this.#products = products;
  }

  get totalItems() {
    return this.#products.reduce((total, product) => total + product.price, 0);
  }

  get products() {
    return this.#products;
  }

  addToCart(product: Product) {
    this.#products.push(product);
  }

  removeFromCart(productId: number) {
    this.#products = this.#products.filter(
      (product) => product.id !== productId
    );
  }

  clearCart() {
    this.#products = [];
  }

  discount(discountPercentage: number) {
    const discountAmount = (this.totalItems * discountPercentage) / 100;
    return this.totalItems - discountAmount;
  }
}

export const cart = new Cart([]);
