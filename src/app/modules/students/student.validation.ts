import Joi from "joi";

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/, "first name capitalization")
    .messages({
      "string.empty": "First name is required",
      "string.max": "First Name can not be more than 20 characters",
      "string.pattern.name": "{#label} is not in capitalize format",
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .regex(/^[A-Za-z]+$/, "alpha characters")
    .messages({
      "string.empty": "Last name is required",
      "string.pattern.name": "{#label} is not valid",
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    "string.empty": "Father's name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    "string.empty": "Father's occupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    "string.empty": "Father's contact number is required",
  }),
  motherName: Joi.string().required().messages({
    "string.empty": "Mother's name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    "string.empty": "Mother's occupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    "string.empty": "Mother's contact number is required",
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Local guardian's name is required",
  }),
  occupation: Joi.string().required().messages({
    "string.empty": "Local guardian's occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Local guardian's contact number is required",
  }),
  address: Joi.string().required().messages({
    "string.empty": "Local guardian's address is required",
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "Student ID is required",
  }),
  name: userNameValidationSchema.required().messages({
    "object.base": "Student name is required",
  }),
  gender: Joi.string().valid("male", "female").required().messages({
    "any.only": "Gender is required",
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
  }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Contact number is required",
  }),
  emergencyContactNo: Joi.string().required().messages({
    "string.empty": "Emergency contact number is required",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .optional(),
  presentAddress: Joi.string().required().messages({
    "string.empty": "Present address is required",
  }),
  permanentAddress: Joi.string().required().messages({
    "string.empty": "Permanent address is required",
  }),
  guardian: guardianValidationSchema.required().messages({
    "object.base": "Guardian details are required",
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    "object.base": "Local guardian details are required",
  }),
  profileImage: Joi.string().optional(),
  isActive: Joi.string()
    .valid("active", "blocked")
    .default("active")
    .optional(),
});

export default studentValidationSchema;
