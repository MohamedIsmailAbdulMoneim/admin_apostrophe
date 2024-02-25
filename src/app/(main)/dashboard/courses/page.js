import BasicTable from "@/components/table/table";
import {
  getAllCourses,
  countCourses,
  deleteACourse,
} from "@/lib/courses/coursesLib";
import AddBtn from "@/components/add-btn/add-btn";
import classes from "./courses.module.css";

const CoursePage = async ({ searchParams }) => {
  const pagesCount = await countCourses();

  const pageNumber = searchParams?.page || 1;

  const courses = await getAllCourses(pageNumber);

  return (
    <div className={classes.container}>
      <BasicTable
        columns={["course_name", "course_link"]}
        data={courses}
        pagesCount={pagesCount || 1}
        href="courses/update/"
        actionFuncModal={deleteACourse}
        textModal={"Delete"}
        actionModal={"delete the course"}
      />
      <AddBtn path="dashboard/courses" text="Add New Course" />
    </div>
  );
};

export default CoursePage;
