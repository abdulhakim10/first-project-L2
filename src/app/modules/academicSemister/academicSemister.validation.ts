import { z } from "zod";

const monthValidationSchema = z.enum([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

const createAcademicSemisterValidetionSchema = z.object({
  name: z.enum(["Autumn", "Summar", "Fall"]),
  code: z.enum(["01", "02", "03"]),
  year: z.date(),
  startMonth: monthValidationSchema,
  endMonth: monthValidationSchema,
});

export const AcademicSemisterValidetion = {
  createAcademicSemisterValidetionSchema,
};
