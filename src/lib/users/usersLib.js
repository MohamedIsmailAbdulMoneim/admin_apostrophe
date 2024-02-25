"use server";

import {
  getUsers,
  getUser,
  getUsersCount,
  insertData,
  getUserCourses,
  deleteUser,
  deleteUserCourse,
  updateUser,
  insertUserCourses,
} from "@/db/users/queries";
import { redirect } from "next/navigation";

let numbersOfPage;

const isInvalidText = (text) => {
  return !text || text.trim() === "";
};

const countUsers = async () => {
  const [usersCountData] = await getUsersCount();
  const { count } = usersCountData;
  const pagesCount = Math.ceil(count / 5);

  numbersOfPage = pagesCount;

  return pagesCount;
};

const getAllUsers = async (pageNumber) => {
  if (numbersOfPage === 1 && pageNumber > 1) {
    pageNumber = 1;
    redirect(`/users`);
  }
  const courses = await getUsers(pageNumber);
  return courses;
};

const getAUser = async (userId) => {
  const data = await getUser(userId);
  return data;
};

const getAUserCourses = async (userId) => {
  const data = await getUserCourses(userId);
  return data;
};

const updateAUser = async (prevState, formData) => {
  const { id } = prevState;

  const userData = {
    username: formData.get("username"),
    isdisabled: formData.get("isDisabled"),
    id,
  };

  if (isInvalidText(userData.username) || isInvalidText(userData.isdisabled)) {
    return {
      message: "Invalid input",
      severity: "error",
    };
  }

  await updateUser(userData);
  redirect(`/users`);
};

const insertUser = async (prevState, formData) => {
  const userData = {
    username: formData.get("username"),
    isDisabled: formData.get("isDisabled"),
  };

  if (isInvalidText(userData.username) || isInvalidText(userData.isDisabled)) {
    return {
      message: "Invalid input",
      severity: "error",
    };
  }

  try {
    const data = await insertData(userData);
    return {
      message: "User Inserted Successfuly",
      severity: "success",
      id: data,
    };
  } catch (err) {
    console.log(err);
    return {
      message: "User already exists",
      severity: "error",
      id: null,
    };
  }
};

const insertAllUserCourses = async (userCourses) => {
  await insertUserCourses(userCourses);
  redirect("/dashboard/users/");
};

const deleteAUserCourse = async (subId) => {
  await deleteUserCourse(subId);
  redirect("");
};

const deleteAUser = (id, page) => {
  deleteUser(id);

  redirect(`users${page ? `?page=${page}` : ""}`);
};

export {
  countUsers,
  getAllUsers,
  getAUser,
  updateAUser,
  getAUserCourses,
  insertUser,
  deleteAUserCourse,
  insertAllUserCourses,
  deleteAUser,
};
