import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./login.css";
import FormInput from "./FormInput";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [values, setValues] = useState({
    teamname: "",
    email: "",
    u1: "",
    b1: "",
    b2: "",
    b3: "",
    d1: "",
    d2: "",
    d3: "",
    u2: "",
    u3: "",
    email1: "",
    email2: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "teamname",
      type: "text",
      required: true,
      autocomplete:"off",
      pattern: "^[A-Za-z0-9]{3,16}$",
      errorMessage:
        "Teamname should be 3-16 characters and shouldn't include any special character or space!",
      placeholder: "Teamname",
      label: "Enter Teamname",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      autocomplete:"off",
      required: true,
      errorMessage: "Please enter a valid email address!",
      placeholder: "someone@domain.com",
      label: "E-mail ID of Team Leader",
    },
    {
      id: 3,
      name: "u1",
      type: "text",
      autocomplete:"off",
      required: true,
      errorMessage: "Leader Name can't be empty",
      placeholder: "Leader name",
      label: "Name of Leader",
    },
    {
      id: 4,
      name: "d1",
      type: "text",
      autocomplete:"off",
      required: true,
      errorMessage: "Department can't be empty",
      placeholder: "CSE",
      label: "Department",
    },
    {
      id: 5,
      name: "b1",
      type: "number",
      autocomplete:"off",
      required: true,
      errorMessage: "Year of Graduation can't be empty!",
      placeholder: "2025",
      label: "Year of Graduation",
    },
    {
      id: 6,
      name: "u2",
      autocomplete:"off",
      type: "text",
      errorMessage: "",
      placeholder: "Team Player 1",
      label: "Name of Player 1",
    },
    {
      id: 7,
      name: "email1",
      type: "email",
      autocomplete:"off",
      errorMessage: "Please enter a valid email address!",
      placeholder: "someone@domain.com",
      label: "E-mail ID of Player 1",
    },
    {
      id: 8,
      name: "d2",
      type: "text",
      autocomplete:"off",
      placeholder: "CSE",
      label: "Department",
    },
    {
      id: 9,
      name: "b2",
      type: "number",
      autocomplete:"off",
      placeholder: "2025",
      label: "Year of Graduation",
    },
    {
      id: 10,
      name: "u3",
      type: "text",
      autocomplete:"off",
      errorMessage: "",
      placeholder: "Team Player 2",
      label: "Name of Player 2",
    },
    {
      id: 11,
      name: "email2",
      type: "email",
      autocomplete:"off",
      errorMessage: "Please enter a valid email address!",
      placeholder: "someone@domain.com",
      label: "E-mail ID of the Player 2",
    },
    {
      id: 12,
      name: "d3",
      type: "text",
      autocomplete:"off",
      placeholder: "CSE",
      label: "Department",
    },
    {
      id: 13,
      name: "b3",
      type: "number",
      autocomplete:"off",
      placeholder: "2025",
      label: "Year of Graduation",
    },
    {
      id: 14,
      name: "password",
      type: "password",
      required: true,
      autocomplete:"off",
      errorMessage:
        "Password should be atleast 6-16 characters and must include atleast 1 letter, 1 number and 1 special character ",
      placeholder: "Password",
      label: "Enter password",
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const payload = JSON.stringify(Object.fromEntries(data.entries()));
    const myObj = JSON.parse(payload);

    axios
      .post("/api/user/signup/", {
        teamname: myObj.teamname,
        u1: myObj.u1,
        u3: myObj.u3,
        u2: myObj.u2,
        d1: myObj.d1,
        d2: myObj.d2,
        d3: myObj.d3,
        b1: myObj.b1,
        b2: myObj.b2,
        b3: myObj.b3,
        email1: myObj.email1,
        email2: myObj.email2,
        email: myObj.email,
        password: myObj.password,
      })
      .then((result) => {
        toast.success(" Successful registration!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        var msg = "";
        if (typeof err.response == "undefined") {
          msg = "Server error, please try later!";
        } else {
          msg = err.response.data.errors[0].msg;
        }
        toast.error(msg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Container fluid className="sponsor-section" id="about">
        <Container>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "600",
              letterSpacing: "0.5rem",
              paddingBottom: "3rem",
              paddingTop: "7rem",
            }}
          >
            <span className="purple"> REGISTER </span>
          </h1>
          <Row>
            <div className="form-gallery">
              <form onSubmit={handleSubmit} className="form-content">
                {inputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                ))}
                <style type="text/css">
                  {`
    .btn-outline-light:hover{
      color: white;}
      .btn-outline-light:active{
        color:green;
      }    
    `}
                </style>
                <div
                  className="g-recaptcha"
                  data-sitekey="6Ld2Cf0fAAAAAGUlXmCKZBT8j6cG0Dk5kb7qzriZ"
                ></div>
                <Button
                  variant="outline-light"
                  type="submit"
                  style={{
                    display: "flex",
                    fontSize: "1.5rem",
                    width: "auto",
                    height: "auto",
                    background: "none",
                    marginTop: "3rem",
                    marginBottom: "3rem",
                    justifyContent: "center",
                    align: "center",
                  }}
                >
                  Register !
                </Button>{" "}
              </form>
            </div>
          </Row>
        </Container>
      </Container>
      <ToastContainer />
    </>
  );
}
