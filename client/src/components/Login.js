import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Sign_img from "./Sign_img";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "../config";
import store from "../store";

const Login = () => {
  const navigate = useNavigate();
  const [inpData, setInpData] = useState({
    email: "",
    password: "",
  });

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
    const { email, password } = inpData;
    if (email === "") {
      alert("Enter email address");
    } else if (!email.includes("@")) {
      alert("please enter valid email address");
    } else if (password === "") {
      alert("Enter password");
    } else if (password.length < 5) {
      alert("password lenght greater then 5");
    } else {
      let res = await axios.get(`${base_url}/login`, {
        params: inpData,
      });
      if (res.status === 200) {
        if (res.data.token) {
          store.dispatch({
            type: "SAVETOKEN",
            payload: { token: res.data.token },
          });
          navigate("/home");
        } else {
          alert(res.data.message);
        }
      } else alert(res.data.message);
    }
  };
  return (
    <div className="container mt-5">
      <section className="d-flex justify-content-between">
        <div className="left mt-5" style={{ width: "100%" }}>
          <h3 className="text-center col-lg-6 mb-3">Sign In</h3>
          <Form>
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
              Sign In
            </Button>
          </Form>
          <p>
            Don't have an acoount{" "}
            <span>
              <Link to={"/signup"}>SignUp</Link>
            </span>
          </p>
        </div>
        <Sign_img />
      </section>
    </div>
  );
};

export default Login;
