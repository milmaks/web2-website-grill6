export class Order {
    id: number = 0;
    buyerEmail: string = "";
    deliveryEmail: string = "";
    productsInOrder: ProductsInOrder[] = [];
    address: string = "";
    comment: string = "";
    price: number = 0;
    orderTime: string = "";
    deliveryTime: string = "";
}

export class ProductsInOrder{
    product: Product = new Product;
    quantity:number = 0;

    constructor(public p:Product, public q:number) {
        this.product = p;
        this.quantity = q;
    }
}

class Product{
    id:number = 0;
    name:string = "";
    price:number = -1;
    ingredients:string = "";
}