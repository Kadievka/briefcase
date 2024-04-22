export function calculateSkip( page: number, limit: number ): number{
    return limit * (page - 1);
}

export function calculatePages(limit: number, total: number): number{
    return Math.ceil(total/limit);
}