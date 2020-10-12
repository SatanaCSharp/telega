import { Repository } from 'sequelize-typescript';

export abstract class BaseRepository<DatabaseEntity, CreateDto, UpdateDto> {
    protected constructor(private tableModel: Repository<any>) {}

    public findAll(): Promise<DatabaseEntity[]> {
        return this.tableModel.findAll();
    }
    public findById(id: number): Promise<DatabaseEntity> {
        return this.tableModel.findByPk(id)
    }
    public create(createDto: CreateDto): Promise<DatabaseEntity> {
        return this.tableModel.create(createDto);
    }
    public update = async (id: number| string,  updateDto: UpdateDto): Promise<void> => {
        await this.tableModel.update(updateDto, { where: { id } })
    }
    public delete = async (id: number| string): Promise<void> => {
        await this.tableModel.destroy({ where: { id } });
    };
}
