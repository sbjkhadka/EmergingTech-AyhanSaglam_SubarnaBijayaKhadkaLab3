var students = require("../controllers/students.server.controller.js");
var courses = require("../controllers/courses.server.controller.js");
var express = require("express");
var router = express.Router();

module.exports = function (app) {
    app.post("/createCourse", courses.createCourse);
    app.get("/listCourses", courses.listCourses);
    app.post("/listCourses", courses.enrollCourse);

    app.post("/listCourses/studentList", courses.getStudentsByCourse);

    app.put("/createCourse", courses.editCourse);
    app.post("/login/landing", courses.getCoursesByStudentId);
};
