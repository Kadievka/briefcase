import Joi from 'joi';

export default function paginationValidator(reqBody: any): { validatorFailed: boolean, message: string } {

    const schema = Joi.object({
        page: Joi.string()
            .required(),

        limit: Joi.string()
        .required(),
    });

    const { error } = schema.validate(reqBody);

    return { validatorFailed: Boolean(error), message: error ? error.message : "validation passed" };
}