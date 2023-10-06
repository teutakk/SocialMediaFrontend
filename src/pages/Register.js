import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/slices/registerSlice";
import { validateForm } from "../utils/validateRegisterData";
import CustomInput from "../components/CustomInput";

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
        <CustomInput
          onChange={onChangeHandler}
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          label="First Name"
        >
          {formErrors.firstName && <p>{formErrors.firstName}</p>}
        </CustomInput>
        <CustomInput
          onChange={onChangeHandler}
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          label="Last Name"
        >
          {formErrors.lastName && <p>{formErrors.lastName}</p>}
        </CustomInput>
        <CustomInput
          onChange={onChangeHandler}
          type="email"
          id="email"
          name="email"
          value={formData.email}
        />
        <CustomInput
          onChange={onChangeHandler}
          type="password"
          id="password"
          name="password"
          value={formData.password}
          label="Password"
        >
          {formErrors.password && <p>{formErrors.password}</p>}
        </CustomInput>
        <CustomInput
          onChange={onChangeHandler}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          label="Confirm Password"
        >
          {formErrors.confirmPassword && !formErrors.password && (
            <p>{formErrors.confirmPassword}</p>
          )}
        </CustomInput>
        <CustomInput
          onChange={onChangeHandler}
          name="gender"
          type="radio"
          value={formData.gender}
        />
        <CustomInput
          onChange={onChangeHandler}
          type="date"
          id="birthday"
          name="birthday"
          value={formData.date}
          label="Birthday"
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
