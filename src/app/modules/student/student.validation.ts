import { z } from "zod";

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, "First Name can not be more than 20 characters")
    .min(1, "First name is required")
    .regex(/^[A-Z][a-z]*$/, "First name must be capitalized"),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .regex(/^[A-Za-z]+$/, "Last name must only contain alphabetic characters"),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  fatherContactNo: z.string().min(1, "Father's contact number is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
  motherContactNo: z.string().min(1, "Mother's contact number is required"),
});

// LocalGuardian Schema
const localGuardianValidationShema = z.object({
  name: z.string().min(1, "Local guardian's name is required"),
  occupation: z.string().min(1, "Local guardian's occupation is required"),
  contactNo: z.string().min(1, "Local guardian's contact number is required"),
  address: z.string().min(1, "Local guardian's address is required"),
});

// Student Schema
const createStudentValidationShema = z.object({
  body: z.object({
    password: z
      .string()
      .min(6, "Password should be atleast 6 charecters")
      .max(20, "Password shouldn't be more than 20 charecters"),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(["male", "female"]),
      dateOfBirth: z.date().optional(),
      email: z
        .string()
        .email("Invalid email format")
        .min(1, "Email is required"),
      contactNo: z.string().min(1, "Contact number is required"),
      emergencyContactNo: z
        .string()
        .min(1, "Emergency contact number is required"),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string().min(1, "Present address is required"),
      permanentAddress: z.string().min(1, "Permanent address is required"),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationShema,
      profileImage: z.string().optional(),
    }),
  }),
});

export const StudentValidation = {
  createStudentValidationShema,
};
