export default interface IPaginationOutput {
    docs: Record<string, any>[],
    limit: number;
    skip: number;
    total: number;
    page: number;
    pages: number;
}