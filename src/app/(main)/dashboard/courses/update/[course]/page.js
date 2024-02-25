import { handleGetCourse, updateCourse } from "@/lib/courses/coursesLib";
import classes from "./course.module.css";
import Form from "@/components/form/form";

const courseUpate = async ({ params }) => {
  const id = params.course;

  const course = await handleGetCourse(id);

  const inputData = {
    name: course["course_name"],
    link: course["course_link"],
  };

  const inputs = [
    {
      element: "input",
      labelText: "Course Name",
      defaultValue: inputData.name,
      identifier: "coursename",
      type: "text",
    },
    {
      element: "input",
      labelText: "Course Link",
      defaultValue: inputData.link,
      identifier: "courselink",
      type: "text",
    },
  ];

  return (
    <div className={classes["container"]}>
      <h2>Course Details</h2>
      <Form inputs={inputs} action={updateCourse} id={id} />
    </div>
  );
};

export default courseUpate;
