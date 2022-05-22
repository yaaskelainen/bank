import { AppDataSource } from "../data-source";
import { Account } from "../entity/Account";
import { Transaction } from "../entity/Transaction";
import { Controller } from "./base-controller";

export class AccountContoller extends Controller{
    repository = AppDataSource.getRepository(Account);

    getAllByUser = async (req, res) => {
        const query = req.query.userid || ''; // /api/accountsbyuser?userid=keresoszo

        try {
           const accounts = await this.repository.createQueryBuilder('account')
                .where("account.userid LIKE CONCAT('%', :param ,'%')", { param: query })
                .leftJoinAndSelect('account.transactions','transactions')
                .getMany();
            res.json(accounts);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    deleteAccount = async (req, res) => {
        try {
            const entityId = req.params.id;
            const entity = await this.repository.findOneBy({ id: entityId });
            if (!entity) {
                res.status(404).json({ message: 'Nem található' });
            }
            entity.deleted=true;
            entity.balance=0;
            const entityDeleteStateChanged = await this.repository.save(entity);
            res.json(entityDeleteStateChanged);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    

    
}