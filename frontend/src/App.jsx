import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/Login.jsx";
import Body from "./components/Body.jsx";
import Signup from "./components/Signup.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path={"/"} element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
