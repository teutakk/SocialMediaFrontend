import React from "react";

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

const CustomInput = ({ children, type, value, onChange, id, name, label }) => {
  let input;
  switch (type) {
    case "text":
      input = (
        <>
          <label htmlFor={name}>{label}:</label>
          <input
            onChange={onChange}
            type={type}
            id={id}
            name={name}
            value={value}
            required
          />
        </>
      );
      break;
    case "email":
      input = (
        <>
          <label htmlFor={name}>Email:</label>
          <input
            onChange={onChange}
            value={value}
            id={id}
            name={name}
            type={type}
            required
          />
        </>
      );

      break;
    case "password":
      input = (
        <>
          <label htmlFor={name}>{label}:</label>
          <input
            onChange={onChange}
            value={value}
            id={id}
            name={name}
            type={type}
            required
          />
        </>
      );
      break;
    case "radio":
      input = (
        <>
          <label htmlFor={name}>Gender:</label>
          <div>
            <label htmlFor="female">Female</label>
            <input
              onChange={onChange}
              type={type}
              id="female"
              name={name}
              value="Female"
              checked={value === "Female"}
              required
            />

            <label htmlFor={name}>Male</label>
            <input
              onChange={onChange}
              type={type}
              id="male"
              name={name}
              value="Male"
              checked={value === "Male"}
              required
            />

            <label htmlFor={name}>Other</label>
            <input
              onChange={onChange}
              type={type}
              id="other"
              name={name}
              value="Other"
              checked={value === "Other"}
              required
            />
          </div>
        </>
      );
      break;
    case "date":
      input = (
        <>
          <label htmlFor={name}>Birthday:</label>
          <input
            onChange={onChange}
            type={type}
            id={id}
            name={name}
            value={value}
            required
          />
        </>
      );
      break;
    default:
      input = null;
  }

  return (
    <div className="custom-input">
      {children && React.cloneElement(children, { className: "error" })}
      {input}
    </div>
  );
};

export default CustomInput;
