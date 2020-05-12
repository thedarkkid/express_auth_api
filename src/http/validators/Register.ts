import Joi from "@hapi/joi";

const schema = Joi.object({
    email: Joi.string().min(5).max(225).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    name: Joi.string().min(6).max(225). required(),
});

export = schema;
