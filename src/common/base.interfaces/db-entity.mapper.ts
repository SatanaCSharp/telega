
export interface DBEntityToDtoMapper<DbEntity, Dto> {
    mapToDto(dbEntity: DbEntity): Dto;
}

export interface DBEntitiesToDtoMapper<DbEntity, Dto> {
    mapToDtos(dbEntities: DbEntity[]): Dto[];
}
