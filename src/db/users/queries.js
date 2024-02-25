// queries.js

import pool from "../connection";
import { generatePass } from "@/lib/password";

const getUsers = async (page) => {
  const offset = (page - 1) * 5;
  const client = await pool.connect();

  try {
    const result = await client.query(
      `SELECT id, username, password, isdisabled FROM users LIMIT 5 OFFSET ${offset}`
    );
    return result.rows;
  } finally {
    client.release();
  }
};

const getUser = async (userId) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT username, isdisabled FROM users WHERE id = ${userId}`
    );

    return result.rows;
  } finally {
    client.release();
  }
};

const getUserCourses = async (userId) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT id, (select course_name from courses where courses.id = subscriptions.course_id ) as course_name
      FROM subscriptions WHERE user_id = ${userId}`
    );

    return result.rows;
  } finally {
    client.release();
  }
};

const updateUser = async (dataSet) => {
  const client = await pool.connect();
  const { username, isdisabled, id } = dataSet;

  console.log(dataSet, "dataset called");

  try {
    // Construct the INSERT query with multiple value sets
    const query = `UPDATE users set username = '${username}', isdisabled = '${isdisabled}' WHERE id = ${id};`;

    // Execute the query
    await client.query(query);
  } finally {
    client.release();
  }
};

const getUsersCount = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(`SELECT count(id) FROM users`);
    return result.rows;
  } finally {
    client.release();
  }
};

const deleteUser = async (id) => {
  const client = await pool.connect();
  console.log("delete user");

  try {
    const query = `DELETE FROM users WHERE id = ${id}`;
    const res = await client.query(query);
  } finally {
    client.release();
  }
};

const insertData = async (dataSet) => {
  const client = await pool.connect();
  const { username, isDisabled } = dataSet;
  const password = generatePass();

  try {
    // Check if username already exists
    const checkQuery = `SELECT id FROM users WHERE username = '${username}'`;
    const checkResult = await client.query(checkQuery);

    if (checkResult.rows.length > 0) {
      // Username already exists, handle the error or return a message
      throw new Error("Username already exists");
    }

    // Construct the INSERT query with multiple value sets
    const insertQuery = `INSERT INTO users (username, password, isdisabled) VALUES ('${username}', '${password}', '${isDisabled}')`;

    // Execute the query
    await client.query(insertQuery);

    const result = await client.query("SELECT LASTVAL() as id");
    const insertedId = result.rows[0].id;
    return insertedId;
  } finally {
    client.release();
  }
};

const insertUserCourses = async (userCourses) => {
  const client = await pool.connect();

  try {
    userCourses.forEach(async (row) => {
      const result = await client.query(
        "INSERT INTO subscriptions (user_id, course_id) VALUES ($1, $2)",
        [row.user_id, row.course_id]
      );
    });
  } finally {
    client.release();
  }
};

const deleteUserCourse = async (subId) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `delete from subscriptions where id = ${subId} `
    );
  } finally {
    client.release();
  }
};

export {
  getUsers,
  getUser,
  updateUser,
  getUserCourses,
  getUsersCount,
  deleteUser,
  deleteUserCourse,
  insertData,
  insertUserCourses,
};
