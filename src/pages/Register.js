import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/slices/registerSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    birthday: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    dispatch(registerUser(formData));
  };

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
        {/* some design if we get provided with it  */}
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
        <label htmlFor="firstName">Name</label>
        <input
          onChange={(e) => onChangeHandler(e)}
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
        />
        <label htmlFor="lastName">Surname</label>
        <input
          onChange={(e) => onChangeHandler(e)}
          value={formData.lastName}
          type="text"
          id="lastName"
          name="lastName"
        />
        <label htmlFor="email">Email:</label>
        <input
          onChange={(e) => onChangeHandler(e)}
          value={formData.email}
          id="email"
          name="email"
          type="email"
        />
        <label htmlFor="password">Password:</label>
        <input
          onChange={(e) => onChangeHandler(e)}
          value={formData.password}
          id="password"
          name="password"
          type="password"
        />
        <label htmlFor="gender">Gender</label>
        <label htmlFor="male">Male</label>
        <input
          onChange={(e) => onChangeHandler(e)}
          type="radio"
          id="male"
          name="gender"
          value="Male"
          checked={formData.gender === "Male"}
        />
        <label htmlFor="female">Female</label>
        <input
          onChange={(e) => onChangeHandler(e)}
          type="radio"
          id="female"
          name="gender"
          value="Female"
          checked={formData.gender === "Female"}
        />
        <label htmlFor="other">Other</label>
        <input
          onChange={(e) => onChangeHandler(e)}
          type="radio"
          id="other"
          name="gender"
          value="Other"
          checked={formData.gender === "Other"}
        />
        <label htmlFor="birthday">Birthday</label>
        <input
          onChange={(e) => onChangeHandler(e)}
          type="date"
          id="birthday"
          name="birthday"
          value={formData.birthday}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <p>Already have an account ?!</p>
        <a href="login">Log In</a>
      </div>
    </div>
  );
};

export default Register;
