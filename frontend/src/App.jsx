import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";

import Login from "./components/Login.jsx";
import Body from "./components/Body.jsx";
import Signup from "./components/Signup.jsx";

import { Provider } from "react-redux";
import { store } from "./utils/store.js";
import Feed from "./components/Feed.jsx";
import Hero from "./components/Hero.jsx";
import Profile from "./components/profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Request from "./components/Request.jsx";
import Connections from "./components/Connections.jsx";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path={"/"} element={<Body />}>
              <Route path="/" element={<Hero />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/feed"
                element={
                  <ProtectedRoute>
                    <Feed />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/request"
                element={
                  <ProtectedRoute>
                    <Request />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/connection"
                element={
                  <ProtectedRoute>
                    <Connections />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
