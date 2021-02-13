import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/usersAction";
import { validationSchema } from "../utils/validationSchema";
const RegisterScreen = ({ location, history }) => {
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = ({ name, password, email }, { setSubmitting }) => {
    setSubmitting(true);
    dispatch(register(name, email, password));
    setSubmitting(false);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
      onSubmit={submitHandler}
    >
      {({
        touched,
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        errors,
      }) => (
        <FormContainer>
          <h1>Sign Up</h1>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>username</Form.Label>
              <Form.Control
                type="name"
                name="name"
                placeholder="Enter name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                className={errors.name && touched.name ? "invalid" : "valid"}
              ></Form.Control>
            </Form.Group>
            {errors.name && touched.name && (
              <p style={{ color: "red" }}>{errors.name}</p>
            )}
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                name="email"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email ? "invalid" : "valid"}
              ></Form.Control>
            </Form.Group>
            {errors.email && touched.email && (
              <p style={{ color: "red" }}>{errors.email}</p>
            )}

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={values.password}
                onChange={handleChange}
                name="password"
                onBlur={handleBlur}
                className={
                  errors.password && touched.password ? "invalid" : "valid"
                }
              ></Form.Control>
            </Form.Group>
            {errors.password && touched.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={values.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.confirmPassword && touched.confirmPassword
                    ? "invalid"
                    : "valid"
                }
              ></Form.Control>
            </Form.Group>
            {errors.confirmPassword && touched.confirmPassword && (
              <p style={{ color: "red" }}>{errors.confirmPassword}</p>
            )}

            <Button type="submit" variant="primary" disabled={isSubmitting}>
              Register
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              Have an Account?{" "}
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                Login
              </Link>
            </Col>
          </Row>
        </FormContainer>
      )}
    </Formik>
  );
};

export default RegisterScreen;
