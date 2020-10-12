import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseRepository } from '../base.repository/base.repository';
import { DBEntitiesToDtoMapper, DBEntityToDtoMapper } from '../base.interfaces/db-entity.mapper';

export abstract class BaseService<
    DatabaseEntity,
    CreateDto,
    UpdateDto,
    ResponseDto,
    Repository extends BaseRepository<DatabaseEntity, CreateDto, UpdateDto>,
    Mapper extends DBEntityToDtoMapper<DatabaseEntity, ResponseDto> & DBEntitiesToDtoMapper<DatabaseEntity, ResponseDto>,
    > {
    protected constructor(
        private repository: Repository,
        private mapper: Mapper,
    ) {}

    public findAll = async (): Promise<ResponseDto[]> => {
        try {
            const entities: DatabaseEntity[] = await this.repository.findAll();
            return this.mapper.mapToDtos(entities);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public findById = async (id: number): Promise<ResponseDto> => {
        try {
            const entity: DatabaseEntity = await this.repository.findById(id);
            return this.mapper.mapToDto(entity);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public create = async (createDto: CreateDto): Promise<ResponseDto> => {
        try {
            const entity: DatabaseEntity = await this.repository.create(createDto);
            return this.mapper.mapToDto(entity);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    public update = async (id: number, updateDto: UpdateDto): Promise<ResponseDto> => {
        try {
            await this.repository.update(id, updateDto);
            const entity: DatabaseEntity = await this.repository.findById(id);
            return this.mapper.mapToDto(entity);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    public delete = async (id: number): Promise<ResponseDto> => {
        try {
            const entity: DatabaseEntity = await this.repository.findById(id);
            await this.repository.delete(id);
            return this.mapper.mapToDto(entity);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
