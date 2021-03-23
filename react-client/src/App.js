import './App.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Login from './components/Login';
import CreateStudent from './components/CreateStudent';
import StudentList from './components/StudentList';
import CreateCourse from './components/CreateCourse';
import CourseList from "./components/ListCourses";



function App() {

  return (
    <div>
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/list">List of Students</Nav.Link>
              <Nav.Link href="/create">Sign Up</Nav.Link>
              <Nav.Link href="/createCourse">Create Course</Nav.Link>
              <Nav.Link href="/listCourses">List Courses</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="p-3 mt-3 ">
          <Route exact path="/" component={Login} />
          <Route render={() => <Login />} path="/login" />
          <Route render={() => <CreateStudent />} path="/create" />
          <Route render={() => <StudentList />} path="/list" />
          <Route render={() => <CreateCourse />} path="/createCourse" />
          <Route render={() => <CourseList />} path="/listCourses" />
        </div>
      </Router>
    </div>
  );
}

export default App;
