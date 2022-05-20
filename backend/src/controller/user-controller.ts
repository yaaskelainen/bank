import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Controller } from "./base-controller";

export class UserContoller extends Controller{
    repository = AppDataSource.getRepository(User);

    getAllById = async (req, res) => {
        const query = req.query.id || ''; // /api/users?id=keresoszo

        try {
           const users = await this.repository.createQueryBuilder('user')
                .where("user.id LIKE CONCAT('%', :param ,'%')", { param: query })
                .leftJoinAndSelect('user.accounts','accounts')
                .getMany();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    getAllBySzig = async (req, res) => {
        const query = req.query.szig || ''; // /api/users?szig=keresoszo

        try {
           const users = await this.repository.createQueryBuilder('user')
                .where("user.szig LIKE CONCAT('%', :param ,'%')", { param: query })
                .leftJoinAndSelect('user.accounts','accounts')
                .getMany();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    getAllByName = async (req, res) => {
        const query = req.query.name || ''; // /api/users?name=keresoszo

        try {
           const users = await this.repository.createQueryBuilder('user')
                .where("user.name LIKE CONCAT('%', :param ,'%')", { param: query })
                .leftJoinAndSelect('user.accounts','accounts')
                .getMany();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    deleteUser = async (req, res) => {
        try {
            const entityId = req.params.id;
            const entity = await this.repository.findOneBy({ id: entityId });
            if (!entity) {
                res.status(404).json({ message: 'Nem található' });
            }
            entity.deleted=true;
            const entityDeleteStateChanged = await this.repository.save(entity);
            res.json(entityDeleteStateChanged);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}