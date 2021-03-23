// Load module dependencies
const Student = require("mongoose").model("Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

exports.isSignedIn = (req, res) => {
  // Obtain the session token from the requests cookies,
  // which come with every request
  // console.log('req_cook', req);
  // const token = req.cookies.token;
  const token = req.body.authKey;
  console.log("token_received", token);
  // if the cookie is not set, return 'auth'
  if (!token) {
    // console.log('no_token')
    return res.send({ screen: "auth" }).end();
  }
  var payload;
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // the JWT is unauthorized, return a 401 error
      return res.status(401).end();
    }
    // otherwise, return a bad request error
    return res.status(400).end();
  }

  // Finally, token is ok, return the username given in the token
  res.status(200).send({ screen: payload.email });
};


//Get All Students
exports.getAllStudents = function (req, res, next) {
  Student.find({}, function (err, students) {
    // console.log(students);
    if (err) {
      // console.log("some error in getAllStudents method");
      return next(err);
    } else {
      res.json(students);
    }
  });
};

// Create a new student
exports.create = function (req, res, next) {
  var student = new Student(req.body);
  // console.log("body: " + req.body.firstName);

  student.save(function (err) {
    if (err) {
      return next(err);
    } else {
      res.json(student);
    }
  });
};

// Create a new student
exports.create = function (req, res, next) {
  var student = new Student(req.body);
  // console.log("body: " + req.body.firstName);

  student.save(function (err) {
    if (err) {
      return next(err);
    } else {
      res.json(student);
    }
  });
};


exports.authenticate = function (req, res, next) {
  // Get credentials from request
  console.log('body', req.body);
  const email = req.body.email;
  const password = req.body.password;
  console.log(password);
  console.log(email);
  //find the user with given username using static method findOne
  Student.findOne({ email: email }, (err, student) => {
    if (err) {
      return next(err);
    } else {
      console.log(student);
      //compare passwords
      if (student && bcrypt.compareSync(password, student.password)) {
        // Create a new token with the user id in the payload
        // and which expires 300 seconds after issue
        const token = jwt.sign(
          { id: student._id, email: student.email },
          jwtKey,
          { algorithm: "HS256", expiresIn: jwtExpirySeconds }
        );
        console.log("token:", token);
        // set the cookie as the token string, with a similar max age as the token
        // here, the max age is in milliseconds
        
        res.status(200).send({ screen: student.email, token: token, 
          studentId: student.id, firstName: student.firstName, lastName: student.lastName });
      
        req.student = student;
        //call the next middleware
        next();
      } else {
        res.json({
          status: "error",
          message: "Invalid username/password!!!",
          data: null,
        });
      }
    }
  });
};

exports.getAllStudents = function(req, res) {
    Student.find({}, (err, students) => {
        res.json(students);
    } );
}