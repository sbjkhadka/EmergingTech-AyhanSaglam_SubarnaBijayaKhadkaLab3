// Load module dependencies
const Student = require("mongoose").model("Student");
const Course = require("mongoose").model("Course");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;
var ObjectId = require("mongodb").ObjectId; 



exports.createCourse = (req, res) => {
    const course = new Course();
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;
    course.students = req.body.students;

    course.save(err => {
        if(err) {
            console.log('error', getErrorMessage(err));
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
    console.log('Inside Controller', req.body);

};

exports.listCourses = (req, res) => {
    console.log('course_list');
    Course.find({}, (err, courses) => {
        if (err) {
          console.log("error", getErrorMessage(err));
          return res.status(400).send({
            message: getErrorMessage(err),
          });
        } else {
          res.status(200).json(courses);
        }
    });
};

function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.enrollCourse = (req, res) => {
    const token = req.body.authKey;
    // if the cookie is not set, return 'auth'
    if (!token) {
      // console.log('no_token')
      return res.send({ message: "failed" }).end();
    }
    var payload;
    try {
      payload = jwt.verify(token, jwtKey);
      console.log('payload', payload);
      Student.findOne(ObjectId(payload.id), (error, student) => {
        if (error) {
          console.log("error", getErrorMessage(error));
          return res.status(400).send({
            message: getErrorMessage(error),
          });
        } else {
               Course.findOne(ObjectId(req.body.id), (err, course) => {
                 if (err) {
                   console.log("error", getErrorMessage(err));
                   return res.status(400).send({
                     message: getErrorMessage(err),
                   });
                 } else {
                   console.log("course_found", course);
                   console.log("course_students", course.students);

                   if(course.students.includes(student._id)) {
                       const deleteIndex = course.students.indexOf(student._id);
                       console.log('deleteIndex', deleteIndex);
                       course.students.splice(deleteIndex, 1);
                         course.save((courseSaveError) => {
                           if (courseSaveError) {
                             console.log("error", getErrorMessage(error));
                             return res.status(400).send({
                               message: getErrorMessage(error),
                             });
                           }
                         });

                   } else {
                       console.log('else block');
                       course.students.push(student);
                       var filtered = course.students.filter(
                         (item, position) => {
                           return course.students.indexOf(item) == position;
                         }
                       );
                       course.students = filtered;
                       course.save((courseSaveError) => {
                         if (courseSaveError) {
                           console.log("error", getErrorMessage(error));
                           return res.status(400).send({
                             message: getErrorMessage(error),
                           });
                         }
                       });
                   }

                      
                 }
               });
       
        }
      });
   
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        // the JWT is unauthorized, return a 401 error
        return res.status(401).end();
      }
      // otherwise, return a bad request error
      return res.status(400).end();
    }

    // Finally, token is ok, return the username given in the token
    res.status(200).send({ message: payload.email });
};

exports.getStudentsByCourse = (req, res) => {
    console.log(req.body);
    Course.findOne(ObjectId(req.body.id), (err, courses) => {
      if (err) {
        console.log("error", err);
      } else {
        console.log("courses_found", courses);
        if(courses.students && courses.students.length > 0) {
            var oids = [];
            courses.students.forEach((studentId) => {
                oids.push(new ObjectId(studentId));
                
            });
            Student.find({_id: {$in:oids}}, (err, students) => {
                if(err) {
                    console.log('error', err);
                } else {
                    console.log("found_stus", students);
                   res.json(students);
                }
            });
            console.log('students', oids);
        }
      }
    });
};

exports.editCourse = (req, res) => {
  console.log('updating in controller', req.body);
  const course = {
    courseCode: req.body.courseCode,
    courseName: req.body.courseName,
    section: req.body.section,
    semester: req.body.semester,
    students: req.body.students
  };
  Course.findByIdAndUpdate(req.body._id, course, (err, cs) => {
    if (err) {
       console.log("error", getErrorMessage(err));
       return res.status(400).send({
         message: getErrorMessage(err),
       });
      }
      console.log('updated_course', cs);
      res.json(cs);
    
  });
};

exports.getCoursesByStudentId = (req, res) => {

    Course.find({}, (err, courses) => {
      if (err) {
        console.log("error", getErrorMessage(err));
        return res.status(400).send({
          message: getErrorMessage(err),
        });
      } else {
        console.log(courses);
        const selectedCourses = [];
        courses.forEach(course => {
          if(course.students.includes(req.body.studentId)) {
            selectedCourses.push(course);
          }
        });
        res.status(200).json(selectedCourses);
      }
    });
};