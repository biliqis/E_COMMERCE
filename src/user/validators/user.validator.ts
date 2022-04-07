import * as Joi from "joi";

const strongPasswordRegex =
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

	
export class UserValidator {
	public static createUserValidator = Joi.object().keys({
		firstName: Joi.string().trim().required().messages({
			"string.base": `"firstName" should be a type of 'text'`,
		}),

		lastName: Joi.string().trim().required().messages({
			"string.base": `"lastName" should be a type of 'text'`,
			"any.required": `"lastName" is a required field`,
		}),
		username: Joi.string().trim().required().lowercase().messages({
			"string.base": `"username" should be a type of 'text'`,
			"any.required": `"username" is a required field`,
		}),

		// role: Joi.string().trim().required().valid("admin", "staff" ,"user").messages({
		// 	'string.base': `"role" should be a type of 'text'`,
		// 	'any.required': `"role" is a required field`,
		// }),
		role: Joi.string()
		
			.trim()
			.required()
			.valid("admin", "user", "staff")
			.messages({
				"string.base": `"role" should be a type of 'text'`,
				unique: "true",
				"any.required": `"role" is a required field`,
			}),

		email: Joi.string()
			.trim()
			.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
			.required()
			.lowercase()
			.messages({
				"string.base": `"email" should be a type of 'email'`,
				"any.required": `"email" is a required field`,
			}),

		password: Joi.string()
			.regex(strongPasswordRegex)
			.trim()
			.required()
			.messages({
				"string.base": `"password must be strong". At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum 8 in lenght'`,
				"any.required": `"password" is a required field`,
			}),
		confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
			"string.base": `"confirmPassword" should match password'`,
			"any.required": `"confirmPassword" is a required field`,
		}),

		phonenumber: Joi.string().length(11).required(),
		
	});



	public static loginUserValidator = Joi.object().keys({
		email: Joi.string().trim().optional().messages({
			"string.base": `"username" should be a type of 'text'`,
			"any.required": `"username" is a required field`,
		}),
		username: Joi.string().trim().required().lowercase().messages({
			"string.base": `"username" should be a type of 'text'`,
			"any.required": `"username" is a required field`,
		}),

		password: Joi.string().trim().required().messages({
			"string.base": `"password" should be a type of 'text'`,
			"any.required": `"password" is a required field`,
		}),
	});

	
	public static editUserValidator = Joi.object().keys({
		lastName: Joi.string().trim().optional().messages({
			"string.base": `"lastName" should be a type of 'text'`,
			"any.required": `"lastName" is a required field`,
		}),
		
		firstName: Joi.string().trim().optional().messages({
			"string.base": `"firstName" should be a type of 'text'`,
			"any.required": `"firstName" is a required field`,
		}),



	

		email: Joi.string()
			.trim()
			.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
			.optional()
			.messages({
				"string.base": `"email" should be a type of 'email'`,
				"any.required": `"email" is a required field`,
			}),
		phoneNumber: Joi.string().length(11).alphanum().optional(),

		address: Joi.string().trim().optional().messages({
			"string.base": `"address" should be a type of 'text'`,
			"any.required": `"address" is a required field`,
		}),

		password: Joi.string() //TODO remove. create a dedicated endpoint to reset password
			.regex(strongPasswordRegex)
			.trim()
			.optional()
			.messages({
				"string.base": `"password must be strong". At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum 8 in lenght'`,
				"any.required": `"password" is a required field`,
			}),

		confirmPassword: Joi.any().valid(Joi.ref("password")).optional().messages({
			//TODO remove. create a dedicated endpoint to reset password
			"string.base": `"confirmPassword" should match password'`,
			"any.required": `"confirmPassword" is a required field`,
		}),
	});
}

// export const userValidator = new UserValidator();

export const promoteToAdminValidator = Joi.object().keys({
	role: Joi.string().trim().optional().messages({
		"string.base": `"role" should be a type of 'text'`,
		"any.required": `"role" is a required field`,
	}),
})

	export const wishListValidator = Joi.object().keys({
		wishList: Joi.string().trim().optional().messages({
			"string.base": `"wishList" should be a type of 'text'`,
			"any.required": `"wishList" is a required field`,
	

	})
})


