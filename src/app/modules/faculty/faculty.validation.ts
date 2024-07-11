import { z } from "zod";

const createUserNameValidationSchema = z.object({
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

const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(6, "Password should be atleast 6 charecters")
      .max(20, "Password shouldn't be more than 20 charecters"),
    faculty: z.object({
      designation: z.string(),
      name: createUserNameValidationSchema,
      gender: z.enum(["Male", "Female", "Other"]),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email("Invalid email format")
        .min(1, "Email is required"),
      contactNo: z.string().min(1, "Contact number is required"),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string().min(1, "Present address is required"),
      permanentAddress: z.string().min(1, "Permanent address is required"),
      profileImage: z.string().optional().default(""),
      academicFaculty: z.string(),
    }),
  }),
});
const updateUserNameValidationSchema = z.object({
  firstName: z.string().max(20).min(1).optional(),
  middleName: z.string().optional(),
  lastName: z.string().min(1).optional(),
});

const updateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      designation: z.string(),
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum(["Male", "Female", "Other"]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email("Invalid email format").min(1).optional(),
      contactNo: z.string().min(1).optional(),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z
        .string()
        .min(1, "Present address is required")
        .optional(),
      permanentAddress: z
        .string()
        .min(1, "Permanent address is required")
        .optional(),
      profileImage: z.string().optional().default(""),
      academicFaculty: z.string().optional(),
    }),
  }),
});

export const FacultyValidation = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
