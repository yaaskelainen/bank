import { AppDataSource } from "../data-source";
import { Transaction } from "../entity/Transaction";
import { Controller } from "./base-controller";

export class TransactionContoller extends Controller{
    repository = AppDataSource.getRepository(Transaction);

    getAllByAccountNumber = async (req, res) => {
        const query = req.query.account || ''; // /api/transactionsbyaccount?account=keresoszo

        try {
           const transactions = await this.repository.createQueryBuilder('transaction')
                .where("transaction.accountnr LIKE CONCAT('%', :param ,'%')", { param: query })
                .getMany();
            res.json(transactions);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    getAllByBalance = async (req, res) => {
        const query = req.query.balance || ''; // /api/transactionsbybalance?balance=keresoszo

        try {
           const transactions = await this.repository.createQueryBuilder('transaction')
                .where("transaction.balance=:param", { param: query })
                .getMany();
            res.json(transactions);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    getAllByDate = async (req, res) => {
        const query1 = req.query.datum1 || ''; // /api/transactionsbydate?datum1=keresoszo&datum2=keresoszo
        const query2 = req.query.datum2 || '';

        try {
           const transactions = await this.repository.createQueryBuilder('transaction')
                .where("transaction.date BETWEEN :param1 AND :param2", { param1: query1, param2: query2 })
                .getMany();
            res.json(transactions);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
}