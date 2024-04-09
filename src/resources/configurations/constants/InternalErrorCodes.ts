import BaseError from "../../../interfaces/configurations/BaseError";


const INTERNAL_ERROR_CODES: Record<string, BaseError> = {
    GENERAL_UNKNOWN: {
        code: 100,
        message: "General unknown error",
        statusCode: 500,
    }
}

export default INTERNAL_ERROR_CODES;