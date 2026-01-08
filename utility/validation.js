const Joi = require("joi");


module.exports.validationMessage=(schema)=>{
    return Joi.object({
        context:Joi.string().valid('codeing','interview','support','conversation','auto','image').required(),
        prompt:Joi.string().required(),
    }).validate(schema);
}