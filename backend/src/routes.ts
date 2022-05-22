import express from 'express';
import { TransactionContoller } from './controller/transaction-controller';
import {AccountContoller } from './controller/account-controller';
import { UserContoller } from './controller/user-controller';

export function getRouter(){
    const router = express.Router();

    const userController = new UserContoller();
    const accountController = new AccountContoller();
    const transactionController = new TransactionContoller();

    router.get('/users', userController.getAll);
    router.get('/users/:id', userController.getOne);
    router.get('/usersbyid', userController.getAllById);
    router.get('/usersbyszig', userController.getAllBySzig);
    router.get('/usersbyname', userController.getAllByName);
    router.post('/users', userController.createUser);
    router.put('/users', userController.update);
    router.delete('/users/:id', userController.deleteUser);

    router.get('/accounts', accountController.getAll);
    router.get('/accounts/:id', accountController.getOne);
    router.get('/accountsbyuser', accountController.getAllByUser);
    router.post('/accounts', accountController.createAccount);
    router.put('/accounts', accountController.update);
    router.delete('/accounts/:id', accountController.deleteAccount);

    router.get('/transactions', transactionController.getAll);
    router.get('/transactions/:id', transactionController.getOne);
    router.get('/transactionsbyaccount', transactionController.getAllByAccountNumber);
    router.get('/transactionsbybalance', transactionController.getAllByBalance);
    router.get('/transactionsbydate', transactionController.getAllByDate);
    router.post('/transactions', transactionController.create);
    router.delete('/transactions/:id', transactionController.delete);

    return router;
}