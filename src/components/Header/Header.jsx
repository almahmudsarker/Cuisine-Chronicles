import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from 'react-bootstrap';
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { AuthContext } from "../../providers/AuthProvider";
import { FaUser } from "react-icons/fa";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const Header = () => {

  const { user, handleSignOut } = useContext(AuthContext);
  
  const Name = user ? user.displayName : "Guest";
  const photo = user ? user.photoURL : <FaUser />;

  const location = useLocation();
    const [url, setUrl] = useState(null);
    useEffect(() => {
      setUrl(location.pathname);
    }, [location]);
    
  return (
    <Navbar
      className="shadow-sm  bg-body rounded"
      expand="lg"
      variant="light"
      bg="transparent"
      sticky="top"
    >
      <Container>
        <Navbar.Brand href="/">
          Cuisine Chronicles
          <br />
          <small className="fw-light">Indian Cuisine Chronicles</small>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="flex-grow-1">
            <Link
              to="/"
              className={"underline" + (url === "/" ? " active" : "")}
              style={{
                marginRight: "1rem",
                marginLeft: "20rem",
                textDecoration: "none",
                fontSize: "20px",
                transition: "all 0.2s ease-in-out",
                fontWeight: "400",
              }}
            >
              Home
            </Link>
            <Link
              to="/blog"
              className={"underline" + (url === "/blog" ? " active" : "")}
              style={{
                textDecoration: "none",
                fontSize: "20px",
                transition: "all 0.2s ease-in-out",
                fontWeight: "400",
              }}
            >
              Blog
            </Link>
          </div>
          <div>
            {user && (
              <img src={photo} id="app-title" className="rounded-circle me-3" style={{width: "50px"}} />
            )}
            <Tooltip
              anchorId="app-title"
              place="bottom"
              content={user ? Name : "Login"}
            />
          </div>
          {user ? (
            <Button onClick={handleSignOut} variant="light">
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: "400",
                  color: "black",
                }}
                to="/login"
              >
                Logout
              </Link>
            </Button>
          ) : (
            <Button variant="light">
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: "400",
                  color: "black",
                }}
                to="/login"
              >
                Login
              </Link>
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;