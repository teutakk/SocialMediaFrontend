export function validateForm(formData) {
  const { firstName, lastName, email, password, confirmPassword } = formData;

  const errors = {};

  // check each one of the inputs with some custom made up validation

  if (firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters.";
  }

  if (/[^A-Za-zÀ-ÖØ-öø-ÿ]/.test(firstName)) {
    errors.firstName = "First name should only contain letters.";
  }

  if (lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters.";
  }

  if (/[^A-Za-zÀ-ÖØ-öø-ÿ]/.test(lastName)) {
    errors.lastName = "Last name should only contain letters.";
  }

  if (/\s/.test(lastName)) {
    errors.lastName = "Last name should not contain spaces.";
  }

  if (!email.includes("@")) {
    errors.email = "Email must contain @";
  }

  const trimmedPassword = password.trim();
  if (trimmedPassword.length < 7 || !/\d/.test(trimmedPassword)) {
    errors.password =
      "Password must be at least 7 characters long and contain at least one number.";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  // const ageDifference = calculateAge(birthday);
  // if (ageDifference < 16) {
  //    errors.birthday =
  //    "You must be at least 16 years old to register on this site.";
  // }

  // Check if there are any errors
  if (Object.keys(errors).length > 0) {
    return errors; // Return the errors object if there are errors
  }

  return { error: false };
  // Return false when there is no error
}

// function calculateAge(birthday) {
//   const currentDate = new Date();
//   const selectedDate = new Date(birthday);
//   const ageDifference = currentDate.getFullYear() - selectedDate.getFullYear();
//   return ageDifference;
// }
