import connection from '../models/connection';
import Product from '../interfaces/product.interface';
import ProductModel from '../models/product.model';

class ProductService {
  public productModel: ProductModel;
  
  constructor() {
    this.productModel = new ProductModel(connection);
  }

  public async register(product: Product): Promise<Product> {
    const registeredProduct = await this.productModel.insert(product);
    return registeredProduct;
  }

  public async listAll(): Promise<Product[]> {
    const allProducts = await this.productModel.selectAll();
    return allProducts;
  }
}

export default ProductService;
