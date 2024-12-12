import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../course/course.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Faculty } from "../faculty/faculty.model";
import { hasTimeConflict } from "./offeredCourse.utils";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicDepartment,
    academicFaculty,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester Registration not found");
  }

  const academicSemester = isSemesterRegistrationExist?.academicSemester;

  const isAcademicDepartmentExist =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Department not found");
  }

  const isAcademicFAcultyExist =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFAcultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Faculty not found");
  }

  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty not found");
  }

  const isCourseExist = await Course.findById(course);
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  // check if the department is belong to the academic faculty
  const isDepartmentBelongToAcademicFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty: academicFaculty,
  });

  if (!isDepartmentBelongToAcademicFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The ${isAcademicDepartmentExist.name} does not belong to the ${isAcademicFAcultyExist.name}`
    );
  }

  // check if the same offered course with same section in same semester registration already exist
  const isSameOfferedCourseExistWithSameSectionInSameRegisteredSemester =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistWithSameSectionInSameRegisteredSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exist`
    );
  }

  // schedule validation
  const assignedSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: {$in: days}
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  }

  if(hasTimeConflict(assignedSchedule, newSchedule)){
    throw new AppError(httpStatus.CONFLICT, "This faculty in not available at this time! Choose another time or day");
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCourseFromDB = async () => {
  const result = await OfferedCourse.find();
  return result;
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
};
