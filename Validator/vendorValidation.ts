import Joi from "joi";

// Joi schema for Vendor validation
export const vendorValidationSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(10)
    .max(40)
    .pattern(/^[^`~<>,"']+$/) // Disallow special characters
    .messages({
      "string.pattern.base":
        "Special characters are not allowed in the vendor name.",
      "string.min": "A vendor name must be at least 10 characters.",
      "string.max": "A vendor name must not exceed 40 characters.",
    }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: true } }) // Validates a proper email address
    .messages({
      "string.email": "Provide a valid email address.",
    }),
  website: Joi.string().uri().optional().messages({
    "string.uri": "Provide a valid website URL.",
  }),
  phone_number: Joi.string()
    .pattern(/^[0-9]{10}$/) // Ensure exactly 10 numeric digits
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be exactly 10 digits and contain only numbers.",
    }),
  address: Joi.string()
    // .required()
    .messages({
      "string.empty": "Address is required.",
    }),
  cod_available: Joi.boolean(),
  // .required(),
  registration_date: Joi.date()
    .iso()
    // .required()
    .default(() => new Date().toISOString())
    .messages({
      "date.iso": "Registration date must be in ISO format.",
    }),
});
