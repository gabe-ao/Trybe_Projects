import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import ValidationController from '../controllers/validation.controller';
import 'express-async-errors';

const productsRouter = Router();
const productController = new ProductController();
const validationController = new ValidationController();

productsRouter.post('/', validationController.newProductReq, productController.postProduct);
productsRouter.get('/', productController.getAllProducts);

export default productsRouter;
