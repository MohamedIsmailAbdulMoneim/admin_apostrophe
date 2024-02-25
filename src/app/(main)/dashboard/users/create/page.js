"use client";

import { useEffect, useState, useMemo } from "react";

import HorizontalLinearStepper from "@/components/stepper/stepper";
import classes from "./create.module.css";
import Form from "@/components/form/form";
import { insertUser, insertAllUserCourses } from "@/lib/users/usersLib";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import BasicTable from "@/components/table/table";
import { getAllCoursesForUsers } from "@/lib/courses/coursesLib";
import BasicAlerts from "@/components/alert/alert";

let counter = 0;

const CreateUserPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [courses, setCourses] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [message, setMessage] = useState(null);
  const [userId, setUserId] = useState("");
  const [dataToAdd, setDataToAdd] = useState([]);

  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleAddCourse = () => {
    const user_id = params.get("user_id");
    const course_id = params.get("course_id");
    const course_name = params.get("course_name");

    const data = {
      user_id,
      course_id,
    };

    const dataToTable = {
      course_name,
      id: counter++,
    };

    if (course_name) {
      setTableData((old) => [...old, dataToTable]);
    }

    if (user_id && course_id) {
      setDataToAdd((old) => [...old, data]);
    }
  };

  const changeHandler = (e) => {
    if (e.target.name === "course_name") {
      const target = e.target;
      const selectedOptionText =
        target.options[target.selectedIndex].textContent;
      params.set("course_name", selectedOptionText);
      params.set("course_id", e.target.value);
    } else {
      params.set(e.target.name, e.target.value);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleNext = () => {
    const userid = params.get("user_id");

    if (!userid) {
      setMessage("you should first insert a user");
      return;
    }
    setMessage(null);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleAddCourses = () => {
    console.log("done add course");
    insertAllUserCourses(dataToAdd).then(() => {});
  };

  const handleDeleteCourses = (id) => {
    console.log(id);
    setTableData((old) => old.filter((row) => row.id !== id));
  };

  useEffect(() => {
    getAllCoursesForUsers().then((data) => {
      setCourses(data);
    });
  }, []);

  useEffect(() => {
    if (userId) {
      setMessage("User inserted successfuly");
      params.set("user_id", userId);
      params.delete("username");
      params.delete("isDisabled");
      replace(`${pathname}?${params.toString()}`);
    }
  }, [userId, params, pathname, replace]);

  const inputs = [
    {
      element: "input",
      labelText: "Username",
      identifier: "username",
      type: "text",
      defaultValue: params.get("username") || "",
    },
    {
      element: "select",
      labelText: "Is Disabled",
      identifier: "isDisabled",
      options: [
        { id: 0, value: "yes" },
        { id: 1, value: "no" },
      ],
      defaultValue: params.get("isDisabled") || "",
    },
  ];

  const stepTwoInput = useMemo(
    () => [
      {
        element: "select",
        labelText: "course_name",
        identifier: "course_name",
        options: courses,
        defaultValue: params.get("course_name") || "",
      },
    ],
    [courses, params]
  );

  return (
    <div className={classes.container}>
      <HorizontalLinearStepper
        setActiveStep={setActiveStep}
        activeStep={activeStep}
        handleNext={handleNext}
        handleAddCourses={handleAddCourses}
      >
        {activeStep === 0 && (
          <Form
            changeHandler={changeHandler}
            inputs={inputs}
            action={insertUser}
            getId={(id) => setUserId(id)}
          />
        )}
        {activeStep === 1 && (
          <>
            <h2 style={{ textAlign: "center" }}>
              Adding courses to {params.get("username")} user
            </h2>
            <Form
              changeHandler={changeHandler}
              inputs={stepTwoInput}
              action={handleAddCourse}
              stepper={true}
            />

            <div className={classes["table-container"]}>
              <BasicTable
                columns={["course_name"]}
                data={tableData}
                pagesCount={1}
                href="#"
                actionFuncModal={handleDeleteCourses}
                textModal={"Delete"}
                actionModal={"delete the course"}
                stepper={true}
                noUpdate={true}
                fastDelete={true}
              />
            </div>
          </>
        )}
      </HorizontalLinearStepper>
      {message === "you shoul first insert a user" && (
        <BasicAlerts text={message} severity={"error"} />
      )}
    </div>
  );
};

export default CreateUserPage;
