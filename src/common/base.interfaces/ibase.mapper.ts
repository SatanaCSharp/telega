export interface IBaseMapper<T, R> {
    mapToDTO(databaseObject: T): R;
    mapToDTOs(databaseObjects: T[]): R[];
}
