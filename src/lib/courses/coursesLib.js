"use server";

import { redirect } from "next/navigation";

import {
  getCourses,
  getCoursesForUsers,
  getCoursesCount,
  insertData,
  deleteCourse,
  getCourse,
  updateData,
} from "@/db/courses/qureies";

let numbersOfPage;

const isInvalidText = (text) => {
  return !text || text.trim() === "";
};

const countCourses = async () => {
  const [coursesCountData] = await getCoursesCount();
  const { count } = coursesCountData;
  const pagesCount = Math.ceil(count / 5);

  numbersOfPage = pagesCount;

  return pagesCount;
};

const getAllCourses = async (pageNumber) => {
  if (numbersOfPage === 1 && pageNumber > 1) {
    pageNumber = 1;
    redirect(`/courses`);
  }
  const courses = await getCourses(pageNumber);
  return courses;
};

const getAllCoursesForUsers = async () => {
  const courses = await getCoursesForUsers();
  return courses;
};

const handleGetCourse = async (id) => {
  const [course] = await getCourse(id);

  return course;
};

const insertCourse = async (prevState, formData) => {
  const courseData = {
    course_name: formData.get("coursename"),
    course_link: formData.get("courselink"),
  };

  if (
    isInvalidText(courseData.course_name) ||
    isInvalidText(courseData.course_link)
  ) {
    return {
      message: "Invalid input",
      severity: "error",
    };
  }

  await insertData(courseData);
  redirect(`../courses`);
};

const updateCourse = async (prevState, formData) => {
  const { id } = prevState;

  const courseData = {
    course_name: formData.get("coursename"),
    course_link: formData.get("courselink"),
    id,
  };

  if (
    isInvalidText(courseData.course_name) ||
    isInvalidText(courseData.course_link)
  ) {
    return {
      message: "Invalid input",
      severity: "error",
    };
  }

  await updateData(courseData);
  redirect(`/courses`);
};

const deleteACourse = (id, page) => {
  deleteCourse(id);

  redirect(`/courses?page=${page}`);
};

export {
  getAllCourses,
  getAllCoursesForUsers,
  countCourses,
  handleGetCourse,
  insertCourse,
  updateCourse,
  deleteACourse,
};
