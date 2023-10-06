import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/slices/registerSlice";
import { validateForm } from "../utils/validateRegisterData";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
  });

  const dispatch = useDispatch();
  // errors state
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // we dispatch an action when the formError does not contain any errors in it.
    if (Object.keys(formErrors).length === 0) {
      dispatch(registerUser(formData));
    }
  }, [formErrors]);

  const handleSubmit = (event) => {
    // prevent the reload
    event.preventDefault();
    // when the inputs are filled, we validate the form data, and let the useEffect dispatch the action of sending the post register request, depending on the validity of formErrors
    setFormErrors(validateForm(formData));
  };

  // input state update handler
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="">
      <div>
        {/* Some design if provided */}
        <p></p>
      </div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "flex-start",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="firstName">First Name:</label>
        {formErrors.firstName && <p>{formErrors.firstName}</p>}
        <input
          onChange={onChangeHandler}
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          required
        />

        <label htmlFor="lastName">Last Name:</label>
        {formErrors.lastName && <p>{formErrors.lastName}</p>}
        <input
          onChange={onChangeHandler}
          value={formData.lastName}
          type="text"
          id="lastName"
          name="lastName"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          onChange={onChangeHandler}
          value={formData.email}
          id="email"
          name="email"
          type="email"
          required
        />

        <label htmlFor="password">Password:</label>
        {formErrors.password && <p>{formErrors.password}</p>}

        <input
          onChange={onChangeHandler}
          value={formData.password}
          id="password"
          name="password"
          type="password"
          required
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        {formErrors.confirmPassword && !formErrors.password && (
          <p>{formErrors.confirmPassword}</p>
        )}

        <input
          onChange={onChangeHandler}
          value={formData.confirmPassword}
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
        />

        <label htmlFor="gender">Gender:</label>
        <div>
          <label htmlFor="female">Female</label>
          <input
            onChange={onChangeHandler}
            type="radio"
            id="female"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            required
          />

          <label htmlFor="male">Male</label>
          <input
            onChange={onChangeHandler}
            type="radio"
            id="male"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            required
          />

          <label htmlFor="other">Other</label>
          <input
            onChange={onChangeHandler}
            type="radio"
            id="other"
            name="gender"
            value="Other"
            checked={formData.gender === "Other"}
            required
          />
        </div>

        <label htmlFor="birthday">Birthday:</label>
        {formErrors.birthday && <p>{formErrors.birthday}</p>}
        <input
          onChange={onChangeHandler}
          type="date"
          id="birthday"
          name="birthday"
          value={formData.birthday}
          required
        />

        <button type="submit">Submit</button>
      </form>
      <div>
        <p>Already have an account?</p>
        {/* change later to NavLink when we define our routes */}
        <a href="login">Log In</a>
      </div>
    </div>
  );
};

export default Register;
