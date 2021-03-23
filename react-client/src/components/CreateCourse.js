import React, { useState } from "react";
import { withRouter } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
function CreateCourse(props) {
  const [course, setCourse] = useState({
    _id: "",
    courseCode: "",
    courseName: "",
    section: "",
    semester: "",
    students: []
  });

 
  //   const apiUrl = "http://localhost:5000/create/";
  const apiUrl = "http://localhost:3000/createCourse/";

  const onChange = (e) => {
    e.persist();
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const saveCourse = (e) => {
    console.log("sending");
    e.preventDefault();
    const data = {
      courseCode: course.courseCode,
      courseName: course.courseName,
      section: course.section,
      semester: course.semester,
      students: course.students,
    };
    axios
      .post(apiUrl, data)
      .then((result) => {
          console.log('course_created', result);
        props.history.push("/show/" + result.data._id);
      })
      .catch((error) => {
        console.log('error');
      });
  };

  return (
    <div className="p-3">
      <h1>Create New Course</h1>
      <Form onSubmit={saveCourse}>
        <Form.Group>
          <Form.Label>Course Code</Form.Label>
          <Form.Control
            type="text"
            name="courseCode"
            id="courseCode"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            name="courseName"
            id="courseName"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Section</Form.Label>
          <Form.Control
            type="text"
            name="section"
            id="section"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Semester</Form.Label>
          <Form.Control
            as="select"
            name="semester"
            id="semester"
            onChange={onChange}
          >
            <option value="1">First</option>
            <option value="2">Second</option>
            <option value="3">Third</option>
            <option value="4">Fourth</option>
            <option value="5">Fifth</option>
            <option value="6">Sixth</option>
            <option value="7">Seventh</option>
            <option value="8">Eighth</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default withRouter(CreateCourse);
