export class PaginatorModel {
    public pageNumber?: number;
    public pageSize?: number;
    public options?: number[];
    public totalRecords?: number;

    constructor(pageNumber: number, pageSize: number) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.options = [15, 30, 60];
        this.totalRecords = 0;
    }
}