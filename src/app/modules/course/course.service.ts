import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    query
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();
  const course = await courseQuery.modelQuery;
  return course;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate({
    path: "preRequisiteCourses.course",
    populate: {
      path: "preRequisiteCourses.course",
    },
  });
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  // step-1: basic course info update

  const updateBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    courseRemainingData,
    { new: true, runValidators: true }
  );

  // check if there any pre requisites exist or not
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    // filter out deleted pre requisites
    const deletedPreRequisites = preRequisiteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);

    const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } },
    });

    // filter out added pre requisites
    const addedPreRequisites = preRequisiteCourses.filter(
      (el) => el.course && !el.isDeleted
    );

    const addedPreRequisitesCourses = await Course.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourses: { $each: addedPreRequisites } },
    });
  }

  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course"
  );

  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
};
