export interface FindDbEntitiesRepository <DatabaseEntity> {
    findAll(): Promise<DatabaseEntity[]>;
}

export interface FindDbEntityRepository<DatabaseEntity> {
    findById(id: string|number): Promise<DatabaseEntity>;
}

export interface CreateDbEntityRepository<CreateDto, DatabaseEntity> {
    create(createDto: CreateDto): Promise<DatabaseEntity>;
}

export interface UpdateDbEntityRepository<UpdateDto> {
    update(id: string|number, updateDto: UpdateDto): Promise<void>;
}

export interface DeleteDbEntityRepository {
    delete(id: string|number): Promise<void>;
}


