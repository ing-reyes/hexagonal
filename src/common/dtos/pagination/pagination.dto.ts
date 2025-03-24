export class PaginationDto {
    constructor(
        public page: number = 1,
        public limit: number = 10,
    ) { }

    static validatePagination(object: { [key: string]: any }): [string?, PaginationDto?] {
        const { page = 1, limit = 10 } = object;
        if (page && isNaN(+page)) return ['Page must be a number'];

        if (limit && isNaN(+limit)) return ['Limit must be a number'];

        return [undefined, new PaginationDto(+page, +limit)];
    }
}