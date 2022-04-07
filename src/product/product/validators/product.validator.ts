import * as Joi from 'joi';


export class ProductValidator {
  static createProductValidator = Joi.object().keys({
    productName: Joi.string().required().messages({
      'string.base': '"productName" should be a type of \'text\'',
      'any.required': '"productName" is a required field',
    }),

    Description: Joi.string().required().messages({
      'string.base': '"Description" should be a type of \'text\'',
      'any.required': '"Description" is a required field',
    }),
    price: Joi.number().required().messages({
      'any.required': '"price" is a required field',
    }),

    quantityInStock: Joi.number().required().messages({
      'string.base': '"quantityInStock" should be a type of \'number\'',
      'any.required': '"quantityInStock" is a required field',
    }),

    material: Joi.string().trim().required().messages({
      'string.base': '"material" should be a type of \'text\'',
      'any.required': '"material" is a required field',
    }),



  });
}

// export const userValidator = new UserValidator();


