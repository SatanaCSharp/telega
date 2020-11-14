import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';

export abstract class BaseService<Dto, DatabaseEntity> {
    protected constructor(
        private repository: Repository<any>,
    ) {}

    public findAll = async (): Promise<DatabaseEntity[]> => {
        try {
            return await this.repository.findAll();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public findById = async (id: number): Promise<DatabaseEntity> => {
        try {
           return await this.repository.findByPk(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public create = async (createDto: Readonly<Dto>): Promise<DatabaseEntity> => {
        try {
            return await this.repository.create(createDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    public update = async (id: number, updateDto: Readonly<Dto>): Promise<DatabaseEntity> => {
        try {
            await this.repository.update(updateDto, { where: { id } });
            return await this.repository.findByPk(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    public delete = async (id: number): Promise<DatabaseEntity> => {
        try {
            const entity: DatabaseEntity = await this.repository.findByPk(id);
            await this.repository.destroy({ where: { id } });
            return entity;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
