import { Request, Response } from 'express';
import ProductService from '../services/product.service';

class ProductController {
  constructor(private productService = new ProductService()) {}

  public postProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, amount } = req.body;
    const newProduct = await this.productService.register({ name, amount });
    res.status(201).json(newProduct);
  };

  public getAllProducts = async (_req: Request, res: Response): Promise<void> => {
    const allProducts = await this.productService.listAll();
    res.status(200).json(allProducts).end();
  };
}

export default ProductController;
