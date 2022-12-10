import * as Joi from 'joi';

export const loginSchema = Joi.object().keys({
    username: Joi.string().min(3).max(10).required(),
    password:  Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});