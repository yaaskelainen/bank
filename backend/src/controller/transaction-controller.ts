import { AppDataSource } from "../data-source";
import { Transaction } from "../entity/Transaction";
import { Controller } from "./base-controller";

export class TransactionContoller extends Controller{
    repository = AppDataSource.getRepository(Transaction);

    getAllByAccountNumber = async (req, res) => {
        const query = req.query.account || ''; // /api/transactionsbyaccount?account=keresoszo

        try {
           const transactions = await this.repository.createQueryBuilder('transaction')
                .where("transaction.accountId LIKE CONCAT('%', :param ,'%')", { param: query })
                .leftJoinAndSelect('transaction.accountId', 'account')
                .getMany();
            res.json(transactions);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    getAllByAmount = async (req, res) => {
        const query = req.query.amount || ''; // /api/transactionsbybalance?amount=keresoszo

        try {
           const transactions = await this.repository.createQueryBuilder('transaction')
                .where("transaction.amount=:param", { param: query })
                .leftJoinAndSelect('transaction.accountId', 'account')
                .getMany();
            res.json(transactions);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    getAllByDate = async (req, res) => {
        const query1 = req.query.datum1 || ''; // /api/transactionsbydate?datum1=keresoszo&datum2=keresoszo
        const query2 = req.query.datum2 + ' 23:59:59.999';

        try {
           const transactions = await this.repository.createQueryBuilder('transaction')
                .where("transaction.date BETWEEN :param1 AND :param2", { param1: query1, param2: query2 })
                .leftJoinAndSelect('transaction.account', 'account')
                .getMany();
            res.json(transactions);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
}