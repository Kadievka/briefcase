export function ISODate(date: Date): string {
    return date.toISOString().substring(0, 10);
}
