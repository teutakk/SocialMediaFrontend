import React, { useEffect } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./App.css";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { authenticateUser } from "./store/slices/authSlice";

function App() {
  return (
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
