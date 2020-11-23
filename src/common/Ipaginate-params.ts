
export interface IPaginateParams {
    page: number;
    quantityPerPage: number;
    order: 'ASC' | 'DESC';
    orderFieldName: string;
}

export interface IPaginateDto {
    limit: number;
    offset: number;
    order: 'ASC' | 'DESC';
    orderFieldName: string;
}
