"use client";

import { useEffect, useState, useMemo } from "react";

import HorizontalLinearStepper from "@/components/stepper/stepper";
import classes from "./update.module.css";
import Form from "@/components/form/form";
import {
  getAUser,
  getAUserCourses,
  updateAUser,
  insertAllUserCourses,
  deleteAUserCourse,
} from "@/lib/users/usersLib";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import BasicTable from "@/components/table/table";
import { getAllCoursesForUsers } from "@/lib/courses/coursesLib";

let counter = 0;

const UpdateUserPage = ({ params }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [courses, setCourses] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [dataToAdd, setDataToAdd] = useState([]);
  console.log(dataToAdd);

  const searchParams = useSearchParams();
  const param = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );
  const pathname = usePathname();
  const { replace } = useRouter();
  const userId = params.user;

  const handleAddCourse = () => {
    const user_id = userId;
    const course_id = param.get("course_id");
    const course_name = param.get("course_name");

    const data = {
      user_id,
      course_id,
    };

    const dataToTable = {
      course_name,
      data_table: true,
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
      param.set("course_name", selectedOptionText);
      param.set("course_id", e.target.value);
    } else {
      param.set(e.target.name, e.target.value);
    }
    replace(`${pathname}?${param.toString()}`);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleAddCourses = () => {
    insertAllUserCourses(dataToAdd).then(() => {});
  };

  const handleDeleteCourses = (id, page, rowData) => {
    if (rowData.data_table) {
      setTableData((old) => old.filter((row) => row.id !== id));
    } else {
      deleteAUserCourse(id).then();
    }
  };

  useEffect(() => {
    getAllCoursesForUsers().then((data) => {
      setCourses(data);
    });
  }, []);

  useEffect(() => {
    getAUser(userId).then((data) => {
      console.log(data);
      setUserData(data);
    });
    getAUserCourses(userId).then((data) => {
      setUserCourses(data);
    });
  }, [userId]);

  const inputs = [
    {
      element: "input",
      labelText: "Username",
      identifier: "username",
      type: "text",
      defaultValue: userData[0]?.username,
    },
    {
      element: "select",
      labelText: "Is Disabled",
      identifier: "isDisabled",
      options: [
        { id: 0, value: "yes" },
        { id: 1, value: "no" },
      ],
      defaultValue: userData[0]?.isdisabled === "0" ? "yes" : "no",
    },
  ];

  const stepTwoInput = useMemo(
    () => [
      {
        element: "select",
        labelText: "course_name",
        identifier: "course_name",
        options: courses,
        defaultValue: param.get("course_name") || "",
      },
    ],
    [courses, param]
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
            action={updateAUser}
            id={userId}
          />
        )}
        {activeStep === 1 && (
          <>
            <h2 style={{ textAlign: "center" }}>
              Adding courses to {param.get("username")} user
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
                data={[...tableData, ...userCourses]}
                pagesCount={1}
                href="#"
                actionFuncModal={handleDeleteCourses}
                textModal={"Delete"}
                actionModal={"delete the course"}
                stepper={true}
                noUpdate={true}
                fastDelete={false}
              />
            </div>
          </>
        )}
      </HorizontalLinearStepper>
    </div>
  );
};

export default UpdateUserPage;
