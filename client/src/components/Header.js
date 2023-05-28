import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import store from "../store";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = store.getState();
  const handleLogout = () => {
    store.dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">TODO APP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav>
        </Container>
        {!token ? (
          <Button
            onClick={() =>
              location.pathname.includes("signup")
                ? navigate("/login")
                : navigate("/signup")
            }
          >
            {location.pathname.includes("signup") ? "Login" : "Sign Up"}
          </Button>
        ) : (
          <Button onClick={handleLogout}>Logout</Button>
        )}
      </Navbar>
    </>
  );
};

export default Header;
