import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Router from "next/router";
import { useSession, signIn } from "next-auth/react";
import MyImage from "../images/img.gif";
import Image from "next/image";
import { useEffect } from "react";

import "../styles/bootstrap.min.css";
import "../styles/icomoon/style.css";

import "../styles/style.css";

function App() {
  // React States

  const [errorMessages, setErrorMessages] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { status, data } = useSession();

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Sign in the user with the credentials they entered.
    await signIn("credentials", {
      email: username,
      password: password,
      redirect: false,
    });
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  useEffect(() => {
    if (status === "authenticated") Router.replace("/");
  }, [status]);

  // JSX code for login form
  if (status === "unauthenticated")
    return (
      <>
        <title>Login</title>
        <div className="form-container sign-in-container">
          <div className="half">
            <div className="bg order-1 order-md-2" style={{ height: "auto" }}>
              <Image
                src={MyImage}
                style={{ width: "100%", height: "45%" }}
                alt="Picture of the author"
              />
            </div>
            <div className="contents order-2 order-md-1">
              <div className="container">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-6">
                    <div className="form-block">
                      <div className="text-center mb-5">
                        <h3>
                          Login to <strong>Abhikalpan</strong>
                        </h3>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group first">
                          <label for="username">Username</label>
                          <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            // value={state.email}
                            // onChange={handleChange}
                            onChange={(event) =>
                              setUsername(event.target.value)
                            }
                            className="form-control"
                            id="username"
                          />
                        </div>
                        <div style={{ textAlign: "center" }}>
                          {renderErrorMessage("uname")}
                        </div>
                        <br />
                        <div className="form-group last mb-3">
                          <label for="password">Password</label>
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            // value={state.password}
                            // onChange={handleChange}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                            className="form-control"
                            id="password"
                          />
                          <br />
                          <div style={{ textAlign: "center" }}>
                            {renderErrorMessage("pass")}
                          </div>
                        </div>

                        <div className="d-sm-flex mb-5 align-items-center">
                          <label className="control control--checkbox mb-3 mb-sm-0">
                            <span className="caption">Remember me</span>
                            <input type="checkbox" />
                            <div className="control__indicator"></div>
                          </label>
                          {/* <span className="ml-auto"><a href="#" className="forgot-pass">Forgot Password</a></span>  */}
                        </div>

                        {/* <input className="btn btn-block btn-primary"/> */}
                        <button className="btn btn-block btn-primary">
                          Sign In
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default App;
