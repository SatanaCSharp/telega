
export interface IPaginateParams {
    page: number;
    quantity: number;
    order: 'ASC' | 'DESC';
    orderFieldName: string;
}

export interface IPaginateDto {
    limit: number;
    offset: number;
    order: 'ASC' | 'DESC';
    orderFieldName: string;
}
