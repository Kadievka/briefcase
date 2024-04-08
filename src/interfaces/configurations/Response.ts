import ResponseError from "./ResponseError";

export default interface Response {
    statusCode: number;
    message?: string;
    data?: Record<string, any>;
    error?: ResponseError;
}
