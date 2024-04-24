import Joi from 'joi';

export default function createUserValidator(reqBody: any): {
    validatorFailed: boolean;
    message: string;
} {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),

        surname: Joi.string().min(3).max(30).required(),

        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

        // repeat_password: Joi.ref('password'),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
    });

    const { error } = schema.validate(reqBody);

    return {
        validatorFailed: Boolean(error),
        message: error ? error.message : 'validation passed',
    };
}
