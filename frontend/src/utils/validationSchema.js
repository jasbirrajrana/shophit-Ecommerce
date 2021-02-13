import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Name is invalid type!")
    .min(2, "Too short!")
    .max(50, "Too long!"),
  email: yup.string().email("Invalid email!").required("Email is Required!"),
  password: yup
    .string()
    .required("password is required!")
    .min(7, "Password is too short - should be 7 chars minimum"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match"),
  // zip: yup.string().matches(/^ [0 - 9] * $/),
});
