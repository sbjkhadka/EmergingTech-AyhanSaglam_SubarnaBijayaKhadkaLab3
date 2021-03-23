import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
function UpdateCourse(props) {
  const history = useHistory();
  const [course, setCourse] = useState({
    _id: props.item._id,
    courseCode: props.item.courseCode,
    courseName: props.item.courseName,
    section: props.item.section,
    semester: props.item.semester,
    students: props.item.students,
  });

  const apiUrl = "http://localhost:3000/createCourse/";

  const onChange = (e) => {
    e.persist();
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setCourse({
      _id: props.item._id,
      courseCode: props.item.courseCode,
      courseName: props.item.courseName,
      section: props.item.section,
      semester: props.item.semester,
      students: props.item.students,
    });
  }, [props]);

  const saveCourse = (e) => {
    console.log("sending");
    e.preventDefault();
    const data = {
      _id: course._id,
      courseCode: course.courseCode,
      courseName: course.courseName,
      section: course.section,
      semester: course.semester,
      students: course.students,
    };
    axios
      .put(apiUrl, data)
      .then((result) => {
        console.log("course_updated", result);
        
        history.push("/home"); // hack to refresh page, not a best way
        history.push("/listCourses");
        console.log(this.props);
      })
      .catch((error) => {
        console.log("error");
      });
  };

  return (
    <div className="p-3">
      <h1>Edit Course</h1>
      <Form onSubmit={saveCourse}>
        <Form.Group>
          <Form.Label>Course Code</Form.Label>
          <Form.Control
            type="text"
            name="courseCode"
            id="courseCode"
            value={course.courseCode}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            name="courseName"
            id="courseName"
            value={course.courseName}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Section</Form.Label>
          <Form.Control
            type="text"
            name="section"
            id="section"
            value={course.section}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Semester</Form.Label>
          <Form.Control
            as="select"
            name="semester"
            id="semester"
            value={course.semester}
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

export default withRouter(UpdateCourse);
