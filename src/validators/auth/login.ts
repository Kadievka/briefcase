import Joi from 'joi';

export default function loginValidator(reqBody: any): { validatorFailed: boolean, message: string } {

    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
    });

    const { error } = schema.validate(reqBody);

    return { validatorFailed: Boolean(error), message: error ? error.message : "validation passed" };
}