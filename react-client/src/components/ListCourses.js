import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import ListGroup from "react-bootstrap/ListGroup";

import axios from "axios";
import UpdateCourse from './UpdateCourse';


function CourseList(props) {
  const [courseDetails, setCourseDetails] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [displayStudentList, setDisplayStudentList] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const apiUrl = "http://localhost:3000/listCourses/";
  const isLoggedIn = localStorage.getItem("authKey");
  const loggedInStudentId = localStorage.getItem("loggedIn");
  const getAllCourses = () => {
      axios.get(apiUrl).then((response) => {
        console.log(response);
        setCourseDetails(response.data);
      });
  };
  useEffect(() => {
      getAllCourses();
  }, []);

 

  const enrollCourse = (id) => {
      console.log(id);
      axios.post(apiUrl, {id, authKey: localStorage.getItem('authKey')})
      .then(res => {
          console.log('enrolled successfully', res);
            getAllCourses();

      })
      .catch(error => {
          console.log('enroll failed badly', error);
      });
  };

  const getStudentList = (id) => {
    setDisplayStudentList(true);
    setStudentList([]);
      axios.post(apiUrl+ 'studentList/', {id})
      .then(res => {
          console.log(res);
          setStudentList(res.data);
      })
      .catch(error => {
          console.log('cannot get list');
      });
  };

  const editCourse = (item) => {
    setDisplayStudentList(false);
    setSelectedCourse(item)
    console.log(item);
  };

   

  

 

  return (
    <div>
      <h1>Register and drop courses</h1>
      <div className="d-flex justify-content-between">
        <div className="w-50">
          <ListGroup>
            {courseDetails.map((item, idx) => (
              <ListGroup.Item
                key={idx}
                className="d-flex justify-content-between"
              >
                {item.courseCode} {item.courseName}{" "}
                <div>
                  {isLoggedIn ? (
                    item.students.includes(loggedInStudentId) ? (
                      <span
                        className="badge badge-danger"
                        action
                        onClick={(e) => {
                          e.preventDefault();
                          enrollCourse(item._id);
                        }}
                      >
                        Drop
                      </span>
                    ) : (
                      <span
                        className="badge badge-success"
                        action
                        onClick={(e) => {
                          e.preventDefault();
                          enrollCourse(item._id);
                        }}
                      >
                        Enroll
                      </span>
                    )
                  ) : (
                    <span></span>
                  )}
                  <span
                    className="badge badge-warning ml-3"
                    action
                    onClick={(e) => {
                      e.preventDefault();
                      getStudentList(item._id);
                    }}
                  >
                    View Students
                  </span>

                  <span
                    className="badge badge-primary ml-3"
                    action
                    onClick={(e) => {
                      e.preventDefault();
                      editCourse(item);
                    }}
                  >
                    Edit Course
                  </span>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="flex-grow-1" style={{ backgroundColor: "lightblue" }}>
          {displayStudentList ? (
            <ListGroup>
              {studentList.map((item, idx) => (
                <ListGroup.Item
                  key={idx}
                  className="d-flex justify-content-between"
                >
                  {item.firstName} {item.lastName}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <UpdateCourse item={selectedCourse}></UpdateCourse>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(CourseList);
