import QueryBuilder from "../../builder/QueryBuilder";
import { Faculty } from "./faculty.model";

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(Faculty.find(), query)
    .filter()
    .fields()
    .sort()
    .paginate();

  const result = facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findOne({ id });
  return result;
};

export const FacultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
};
