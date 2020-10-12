export interface IBaseService<C, U, R> {
    findAll(): Promise<R[]>;
    create(createDto: C): Promise<R>;
    findOne(id: string | number): Promise<R>;
    update(id: string | number, updateDto: U): Promise<R>;
    delete(id: string | number): Promise<void>;
}

export interface FindInstancesService <ResponseDto> {
    findAll(): Promise<ResponseDto[]>;
}

export interface FindInstancesService<ResponseDto> {
    findById(id: string|number): Promise<ResponseDto>;
}

export interface CreateInstanceService<CreateDto, ResponseDto> {
    create(createDto: CreateDto): Promise<ResponseDto>;
}

export interface UpdateInstanceService<UpdateDto, ResponseDto> {
    update(id: string|number, updateDto: UpdateDto): Promise<ResponseDto>;
}

export interface DeleteInstanceService<ResponseDto> {
    delete(id: string|number): Promise<ResponseDto>;
}
