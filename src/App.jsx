import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Whats from "./Pages/Whats/Whats";
import Learn from "./Pages/Learn/Learn";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import Yog1 from "./Pages/YogaPages/Yog1";
import Yog2 from "./Pages/YogaPages/Yog2";
import Yog3 from "./Pages/YogaPages/Yog3";
import Yog4 from "./Pages/YogaPages/Yog4";
import Yog5 from "./Pages/YogaPages/Yog5";
import Yog6 from "./Pages/YogaPages/Yog6";

// Custom route component to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('yogaAppUser') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="whats" element={<Whats />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="learn" element={
              <ProtectedRoute>
                <Learn />
              </ProtectedRoute>
            } />
            <Route path="learn/yog1" element={
              <ProtectedRoute>
                <Yog1 />
              </ProtectedRoute>
            } />
            <Route path="learn/yog2" element={
              <ProtectedRoute>
                <Yog2 />
              </ProtectedRoute>
            } />
            <Route path="learn/yog3" element={
              <ProtectedRoute>
                <Yog3 />
              </ProtectedRoute>
            } />
            <Route path="learn/yog4" element={
              <ProtectedRoute>
                <Yog4 />
              </ProtectedRoute>
            } />
            <Route path="learn/yog5" element={
              <ProtectedRoute>
                <Yog5 />
              </ProtectedRoute>
            } />
            <Route path="learn/yog6" element={
              <ProtectedRoute>
                <Yog6 />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;