import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import  Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Overlay from 'react-bootstrap/Overlay';
import { useRef } from "react";

function View(props) {
  const history = useHistory();
  const { screen, setScreen } = props;
  const [courses, setCourses] = useState([]);
  const [clickedCourse, setClickedCourse] = useState();
  const studentId = localStorage.getItem("loggedIn");
  const studentName = localStorage.getItem("loggedInName");
  const target = useRef(null);
  const apiUrl = "http://localhost:3000/login/landing/";
  const gallery = [
    "https://picsum.photos/id/4/200/200",
    "https://picsum.photos/id/5/200/200",
    "https://picsum.photos/id/1/200/200",
    "https://picsum.photos/id/2/200/200",
    "https://picsum.photos/id/3/200/200"
  ];
   const getCoursesOfLoggedInStudent = async () => {
     axios
       .post(apiUrl, { studentId })
       .then((res) => {
         console.log(res);
         setCourses(res.data);
       })
       .catch((error) => {
         console.log("failed");
       });
   };
  useEffect(() => {
    history.push('/login/landing/');
    setScreen(localStorage.getItem("screen"));
    getCoursesOfLoggedInStudent();
  }, []); //only the first render

  const logout = () => {
    setScreen('auth');
    localStorage.removeItem("authKey");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loggedInName");
    localStorage.removeItem("screen");
  };

  return (
    <div>
      <div className="d-flex justify-content-start m-2 p-2 flex-column align-items-start">
        <p className="w-100 d-flex justify-content-between">
          <span>
            <Image
              src="https://www.fillmurray.com/50/50"
              roundedCircle
              className="mr-3"
            />
            Welcome <span className="font-weight-bold">{studentName}</span>
          </span>
          <span className="pointer-cursor badge badge-secondary d-flex align-items-center" onClick={logout}>
            Logout
          </span>
        </p>

        <p>Registered Courses</p>
        <div className="d-flex justify-content-around align-items-center flex-wrap">
          {courses.map((item, idx) => (
            <Card key={idx} className="m-2" style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={gallery[idx]}
                onClick={() => {
                  setClickedCourse(item);
                }}
              />
              <Card.Body>
                <Card.Title>{item.courseCode}</Card.Title>
                <Card.Text>{item.courseName}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      <Overlay target={target.current} show={clickedCourse} placement="bottom">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            style={{
              backgroundColor: "tomato",
              color: "white",
              borderRadius: 3,
              ...props.style,
            }}
          >
            {
              <div>
                <div className="bg-primary p-3 ">
                  <span className="font-weight-bold">CourseCode:</span>{" "}
                  {clickedCourse.courseCode}
                </div>
                <div className="bg-secondary p-3">
                  <span className="font-weight-bold">CourseName: </span>
                  {clickedCourse.courseName}
                </div>
                <div className="bg-primary p-3">
                  <span className="font-weight-bold">Section:</span>{" "}
                  {clickedCourse.section}
                </div>
                <div className="bg-secondary p-3">
                  <span className="font-weight-bold">Semester:</span>{" "}
                  {clickedCourse.semester}
                </div>
              </div>
            }
          </div>
        )}
      </Overlay>
    </div>
  );
}


export default View;
