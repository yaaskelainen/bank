import express from 'express';
import { CategoryContoller } from './controller/transaction-controller';
import { ProductContoller } from './controller/account-controller';
import { UserContoller } from './controller/user-controller';

export function getRouter(){
    const router = express.Router();

    const userController = new UserContoller();
    const productController = new ProductContoller();
    const categoryController = new CategoryContoller();

    router.get('/users', userController.getAll);
    router.get('/users/:id', userController.getOne);
    router.post('/users', userController.create);
    router.put('/users', userController.update);
    router.delete('/users/:id', userController.delete);

    router.get('/products', productController.getAll);
    router.get('/products/:id', productController.getOne);
    router.post('/products', productController.create);
    router.put('/products', productController.update);
    router.delete('/products/:id', productController.delete);

    router.get('/categories', categoryController.getAll);
    router.get('/categories/:id', categoryController.getOne);
    router.post('/categories', categoryController.create);
    router.put('/categories', categoryController.update);
    router.delete('/categories/:id', categoryController.delete);

    return router;
}