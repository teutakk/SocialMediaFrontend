import React, { useState } from "react";
import classes from "./CustomInput.module.css";
import { BsEye, BsEyeSlash } from "react-icons/bs";
/**
 * Custom input component.
 * @param {object} props - Component props.
 * @param {JSX.Element} props.children - Child element to be wrapped.
 * @param {"text" | "email" | "password" | "radio" | "date"} props.type - Input type.
 * @param {string} props.value - Input value.
 * @param {function} props.onChange - Function to handle input change.
 * @param {string} props.id - Input ID.
 * @param {string} props.name - Input name.
 * @param {string} props.label - Input label.
 * @returns {JSX.Element} Custom input component.
 */

const CustomInput = ({
  children,
  type,
  icon,
  secondIcon,
  value,
  onChange,
  id,
  name,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  let input;
  switch (type) {
    case "text":
      input = (
        <>
          <div className={classes.customInputBlock}>
            <p>{icon}</p>
            <input
              onChange={onChange}
              type={type}
              id={id}
              name={name}
              value={value}
              placeholder={placeholder}
              required
              className={classes.input}
            />
          </div>
        </>
      );
      break;
    case "email":
      input = (
        <>
          <div className={classes.customInputBlock}>
            <p>{icon}</p>
            <input
              onChange={onChange}
              value={value}
              id={id}
              name={name}
              type={type}
              required
              placeholder={placeholder}
              autoComplete="username"
              className={classes.input}
            />
          </div>
        </>
      );

      break;
    case "password":
      input = (
        <>
          <div className={classes.customInputBlock}>
            <p>{icon}</p>
            <input
              onChange={onChange}
              value={value}
              id={id}
              name={name}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              autoComplete="new-password"
              required
              className={classes.input}
            />
            <div
              className={classes.togglePassword}
              onClick={handleTogglePassword}
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </div>
          </div>
        </>
      );
      break;
    case "date":
      input = (
        <>
          <input
            onChange={onChange}
            type={type}
            id={id}
            name={name}
            value={value}
            required
            className={classes.birthdayInput}
          />
        </>
      );
      break;
    default:
      input = null;
  }

  return (
    <div className={classes.inputBlock}>
      <div className={classes.icons}>{secondIcon}</div>
      {children && React.cloneElement(children, { className: "error" })}
      {input}
    </div>
  );
};

export default CustomInput;
