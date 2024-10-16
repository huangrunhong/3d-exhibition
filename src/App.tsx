import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading"; // 导入Loading组件
import Home from "./components/Home";
import "./App.css";
import Exhibition from "./components/Exhibition";

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

  //过度动画;
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 4000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      <BrowserRouter>
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
