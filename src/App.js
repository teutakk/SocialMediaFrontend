import React from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./App.css";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { authenticateUser } from "./store/slices/authSlice";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
