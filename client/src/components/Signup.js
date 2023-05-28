import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Sign_img from "./Sign_img";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "../config";

const Signup = () => {
  const navigate = useNavigate();
  const [inpData, setInpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [data, setData] = useState([]);

  const getData = (e) => {
    const { value, name } = e.target;
    setInpData(() => {
      return {
        ...inpData,
        [name]: value,
      };
    });
  };

  const addData = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = inpData;
    if (firstName === "") {
      alert("Enter first name");
    } else if (lastName === "") {
      alert("Enter last name");
    } else if (email === "") {
      alert("Enter email address");
    } else if (!email.includes("@")) {
      alert("please enter valid email address");
    } else if (password === "") {
      alert("Enter password");
    } else if (password.length < 5) {
      alert("password lenght greater then 5");
    } else {
      let res = await axios.post(`${base_url}/register`, inpData);
      if (res.status === 200) {
        alert("Registered Successfully");
        navigate("/login");
      } else alert(res.data.message);
    }
  };
  return (
    <div className="container mt-3">
      <section className="d-flex justify-content-between">
        <div className="left mt-5" style={{ width: "100%" }}>
          <h3 className="text-center col-lg-6 mb-3">Sign Up</h3>
          <Form>
            <Form.Group className="mb-3 col-lg-6">
              <Form.Control
                type="text"
                name="firstName"
                onChange={getData}
                placeholder="Enter Your First Name"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
              <Form.Control
                type="text"
                name="lastName"
                onChange={getData}
                placeholder="Enter Your Last Name"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
              <Form.Control
                type="email"
                name="email"
                onChange={getData}
                placeholder="Enter email Address"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
              <Form.Control
                type="password"
                name="password"
                onChange={getData}
                placeholder="Password Your Password"
              />
            </Form.Group>

            <Button
              className="text-center col-lg-6 mb-3"
              variant="primary"
              onClick={addData}
            >
              Submit
            </Button>
          </Form>
          <p>
            Already have an acoount{" "}
            <span>
              <Link to={"/"}>Sign In</Link>
            </span>
          </p>
        </div>
        <Sign_img />
      </section>
    </div>
  );
};

export default Signup;
