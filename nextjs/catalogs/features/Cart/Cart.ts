import type { Product } from '@/types';

export interface Summary {
  product: Product;
  amount: number;
}

export class Cart {
  constructor(
    private readonly storage: Storage,
    public readonly cartId: string,
  ) {}

  protected store(products: Product[]) {
    this.storage.setItem(this.cartId, JSON.stringify(products));
  }

  list(): Product[] {
    return JSON.parse(this.storage.getItem(this.cartId) ?? '[]');
  }

  add(products: Product[]) {
    const productsInCart = this.list();
    productsInCart.push(...products);
    this.store(productsInCart);
  }

  find(productCode: Product['productCode']): Summary | null {
    const products = this.list();
    const matchingProducts = products.filter(
      (product) => product.productCode === productCode,
    );
    if (matchingProducts.length === 0) return null;

    return {
      product: matchingProducts[0],
      amount: matchingProducts.length,
    };
  }

  pop(productCode: Product['productCode']): Product | null {
    const products = this.list();
    const index = products.findLastIndex(
      (product) => product.productCode === productCode,
    );
    if (index === -1) return null;

    const popped = products[index];
    products.splice(index, 1);
    this.store(products);

    return popped;
  }

  remove(productCode: Product['productCode']) {
    const products = this.list().filter((p) => p.productCode !== productCode);
    this.store(products);
  }

  clear() {
    this.store([]);
  }

  summary(): Summary[] {
    const products = this.list();
    const summaryMap = new Map<Product['productCode'], Summary>();

    products.forEach((product) => {
      const existing = summaryMap.get(product.productCode);
      if (existing) {
        existing.amount += 1;
      } else {
        summaryMap.set(product.productCode, {
          product,
          amount: 1,
        });
      }
    });

    return Array.from(summaryMap.values());
  }
}
