import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};
const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: "faculty",
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastFaculty?.id ? lastFaculty.id : undefined;
};
const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: "admin",
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastAdmin?.id ? lastAdmin.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString(); // 0000 bydefault

  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

export const generatedFacultyId = async () => {
  const currentFId = (0).toString();
  const lastFacultyId = await findLastFacultyId();
  const lastFourDigit = lastFacultyId?.substring(2, 6);

  let incrementFId = lastFacultyId
    ? (Number(lastFourDigit) + 1).toString().padStart(4, "0")
    : (Number(currentFId) + 1).toString().padStart(4, "0");

  incrementFId = `F-${incrementFId}`;
  return incrementFId;
};

export const generatedAdminId = async () => {
  const currentAId = (0).toString();
  const lastAdminId = await findLastAdminId();
  const lastFourDigit = lastAdminId?.substring(2, 6);

  let incrementAId = lastAdminId
    ? (Number(lastFourDigit) + 1).toString().padStart(4, "0")
    : (Number(currentAId) + 1).toString().padStart(4, "0");

  incrementAId = `A-${incrementAId}`;
  return incrementAId;
};
