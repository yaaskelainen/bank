import { Request, Response } from "express";
import { Repository } from "typeorm";

export class Controller {
    repository: Repository<any>;

    create = async (req, res) => {
        const entity = this.repository.create(req.body as {});

        try {
            entity.id = null;
            const entityInserted = await this.repository.save(entity);
            res.json(entityInserted);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    getAll = async (req, res) => {
        try {
            const answer = await this.repository.find();
            res.json(answer);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    getOne = async (req, res) => {
        const entityId = req.params.id;

        try {
            const entity = await this.repository.findOneBy({id:entityId});
            if (!entity) {
                res.status(404).json({ message: 'Nem található' });
            }
            res.json(entity);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    update = async (req, res) => {
        const entity = this.repository.create(req.body as {});

        try {
            const existingEntity = await this.repository.findOneBy({ id: entity.id });
            if (!existingEntity) {
                res.status(404).json({ message: 'Nem található' });
            }
            if(existingEntity.deleted){
                res.json({ message: 'Törölt státusszal már nem módostható!' });
            }else{
            const entityUpdated = await this.repository.save(entity);
            res.json(entityUpdated);
            }

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }


    delete = async (req, res) => {
        try {
            const entityId = req.params.id;
            const entity = await this.repository.findOneBy({ id: entityId });
            if (!entity) {
                res.status(404).json({ message: 'Nem található' });
            }
            await this.repository.delete(entity);
            res.status(200).json({ message: 'Deleted'})
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}