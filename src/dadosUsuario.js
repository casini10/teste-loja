const joi=require('joi')
const schema=joi.object({
    nome:joi.string().required().messages({
		'any.required': 'O campo nome é obrigatório',
		'string.empty': 'O campo nome é obrigatório',
	}),
    email:joi.string().required().email().messages({
		'string.email': 'O campo email precisa ter um formato válido',
		'any.required': 'O campo email é obrigatório',
		'string.empty': 'O campo email é obrigatório',
	}),
    senha:joi.string().required().max(5).messages({
		'any.required': 'O campo senha é obrigatório',
		'string.empty': 'O campo senha é obrigatório',
		'string.min': 'A senha precisa conter, no mínimo, 5 caracteres',
	}),
})




module.exports={schema}