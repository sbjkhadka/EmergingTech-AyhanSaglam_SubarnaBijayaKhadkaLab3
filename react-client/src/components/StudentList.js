import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";


import axios from "axios";

function StudentList(props) {
    const [studentDetails, setstudentDetails] = useState([]);
    const [selectedItem, setselectedItem] = useState();
      const apiUrl = "http://localhost:3000/studentList/";
      const gallery = [
        "https://picsum.photos/id/4/200/200",
        "https://picsum.photos/id/5/200/200",
        "https://picsum.photos/id/1/200/200",
        "https://picsum.photos/id/2/200/200",
        "https://picsum.photos/id/3/200/200",
      ];
    useEffect(() => {
        axios.get(apiUrl).then(response => {
            console.log(response);
            setstudentDetails(response.data);
        });
    }, []);

    const showDetail = (item, idx) => {
      setselectedItem(item);
    };

    return (
      <div>
        <h1>Student Details</h1>
        <small>Click to see details</small>
        <div className="d-flex justify-content-around">
          <ListGroup>
            {studentDetails.map((item, idx) => (
              <ListGroup.Item
                key={idx}
                action
                onClick={() => {
                  showDetail(item, idx);
                }}
              >
                {item.firstName} {item.lastName}
              </ListGroup.Item>
            ))}
          </ListGroup>
          {selectedItem ? (
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={gallery[Math.floor(Math.random() * gallery.length)]}
              />
              <Card.Body>
                <Card.Title>
                  {selectedItem.firstName} {selectedItem.lastName}
                </Card.Title>
                <Card.Text>
                  <p>{selectedItem.email}</p>
                  <p>Phone: {selectedItem.phone}</p>
                  <p>Program: {selectedItem.program}</p>
                  <p>Student#: {selectedItem.studentNumber}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <div>..</div>
          )}
        </div>
      </div>
    );
}



export default withRouter (StudentList);
