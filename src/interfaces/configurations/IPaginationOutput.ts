export default interface IPaginationOutput {
    docs: Array<Record<string, any>>;
    limit: number;
    skip: number;
    total: number;
    page: number;
    pages: number;
}
