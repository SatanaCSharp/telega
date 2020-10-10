export interface IBaseService<C, U, R> {
    findAll(): Promise<R[]>;
    create(createDto: C): Promise<R>;
    findOne(id: string | number): Promise<R>;
    update(id: string | number, updateDto: U): Promise<R>;
    delete(id: string | number): Promise<void>;
}
