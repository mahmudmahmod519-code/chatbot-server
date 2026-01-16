const Joi = require("joi");


module.exports.validationMessage=(schema)=>{
    return Joi.object({
        context:Joi.string().valid('coding','interview','support','conversation','auto','image').required(),
        prompt:Joi.string().required(),
    }).validate(schema);
}

module.exports.signIn=(schema)=>{
    return Joi.object({
        username:Joi.string().required().min(7).max(30),
        password:Joi.string().required().min(8).max(16),
    }).validate(schema);
}

module.exports.signUp=(schema)=>{
    return Joi.object({
        username:Joi.string().required().trim().min(7).max(20),
        email:Joi.string().required().email().min(7).max(30).trim(),
        password:Joi.string().required().trim(),
        phone:Joi.string().required().trim(),
    }).validate(schema);
}


        // username VARCHAR(225) UNIQUE,
        // email VARCHAR(225) UNIQUE NOT NULL,
        // phone VARCHAR(225) UNIQUE NOT NULL,
        // password VARCHAR(225) NOT NULL,