import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Exhibition from "./components/Exhibition";

import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const correctPassword = "123456";

  const handelPassword = (event: any) => {
    event.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      window.alert("Password is false, please try it again!");
      setPassword("");
    }
  };

  return (
    <>
      <BrowserRouter basename="3d-exhibition">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/exhibition"
            element={
              isAuthenticated ? (
                <Exhibition />
              ) : (
                <form className="passwordAuth" onSubmit={handelPassword}>
                  <input
                    className="passwordField"
                    type="password"
                    value={password}
                    placeholder="Please enter your password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <input className="button" type="submit" value="SUBMIT" />
                </form>
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
