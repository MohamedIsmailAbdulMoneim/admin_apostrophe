import pool from "../connection";
//ROW_NUMBER() OVER (ORDER BY id) AS s,
const getCourses = async (page) => {
  const offset = (page - 1) * 5;
  const client = await pool.connect();

  try {
    const result = await client.query(
      `SELECT id, course_name, course_link FROM courses LIMIT 5 OFFSET ${offset}`
    );
    return result.rows;
  } finally {
    client.release();
  }
};

const getCoursesForUsers = async (page) => {
  const offset = (page - 1) * 5;
  const client = await pool.connect();

  try {
    const result = await client.query(
      `SELECT id, course_name as value FROM courses`
    );
    return result.rows;
  } finally {
    client.release();
  }
};

const getCoursesCount = async () => {
  const client = await pool.connect();

  try {
    const result = await client.query(`SELECT count(id) FROM courses`);
    return result.rows;
  } finally {
    client.release();
  }
};

const getCourse = async (id) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `SELECT id, course_name, course_link FROM courses where id = ${id}`
    );
    return result.rows;
  } finally {
    client.release();
  }
};

const deleteCourse = async (id) => {
  const client = await pool.connect();

  try {
    const query = `DELETE FROM courses WHERE id = ${id}`;
    const res = await client.query(query);
    console.log(res);
  } finally {
    client.release();
  }
};

const insertData = async (dataSet) => {
  const client = await pool.connect();
  const { course_name, course_link } = dataSet;

  try {
    // Construct the INSERT query with multiple value sets
    const query = `INSERT INTO courses (course_name, course_link) VALUES ('${course_name}', '${course_link}')`;

    // Execute the query
    await client.query(query);
  } finally {
    client.release();
  }
};

const updateData = async (dataSet) => {
  const client = await pool.connect();
  const { course_name, course_link, id } = dataSet;

  console.log(dataSet, "dataset");

  try {
    // Construct the INSERT query with multiple value sets
    const query = `UPDATE courses set course_name = '${course_name}', course_link = '${course_link}' WHERE id = ${id};`;

    // Execute the query
    await client.query(query);
  } finally {
    client.release();
  }
};

export {
  getCourses,
  getCoursesForUsers,
  getCoursesCount,
  getCourse,
  deleteCourse,
  insertData,
  updateData,
};
