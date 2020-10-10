export interface IBaseRepository<C, U, R> {
    findAll(): Promise<R[]>;
    findById(id: string|number): Promise<R>;
    create(createDto: C): Promise<R>;
    update(id: string|number, updateDto: U): Promise<R|void>;
    delete(id: string|number): Promise<void>;
}
