import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Controller } from "./base-controller";
import { GenerateId } from "../service/id-generator"

export class UserContoller extends Controller{
    repository = AppDataSource.getRepository(User);

    createUser = async (req, res) => {
        const entity = this.repository.create(req.body as {});

        try {
            entity.id = GenerateId();
            const entityInserted = await this.repository.save(entity);
            res.json(entityInserted);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    getAllById = async (req, res) => {
        const query = req.query.searchid || ''; // /api/usersbyid?searchid=keresoszo

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
        const query = req.query.szig || ''; // /api/usersbyszig?szig=keresoszo

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
        const query = req.query.name || ''; // /api/usersbyname?name=keresoszo

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