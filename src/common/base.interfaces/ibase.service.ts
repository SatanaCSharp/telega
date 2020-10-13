export interface IBaseService<C, U, R> {
    findAll(): Promise<R[]>;
    create(createDto: C): Promise<R>;
    findOne(id: string | number): Promise<R>;
    update(id: string | number, updateDto: U): Promise<R>;
    delete(id: string | number): Promise<void>;
}

export interface FindableService <ResponseDto> {
    findAll(): Promise<ResponseDto[]>;
}

export interface SingleFindableService<ResponseDto> {
    findById(id: string|number): Promise<ResponseDto>;
}

export interface CreatableService<CreateDto, ResponseDto> {
    create(createDto: CreateDto): Promise<ResponseDto>;
}

export interface UpdatableService<UpdateDto, ResponseDto> {
    update(id: string|number, updateDto: UpdateDto): Promise<ResponseDto>;
}

export interface DeletableService<ResponseDto> {
    delete(id: string|number): Promise<ResponseDto>;
}
