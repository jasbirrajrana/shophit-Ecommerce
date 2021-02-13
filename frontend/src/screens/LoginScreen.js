import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { login } from "../actions/usersAction.js";
import FormContainer from "../components/FormContainer.js";
import { validationSchema } from "../utils/validationSchema";
import Meta from "../components/Meta";

const LoginScreen = ({ location, history }) => {
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => {
    return state.userLogin;
  });
  const { error, loading, userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = ({ email, password }, { setSubmitting }) => {
    setSubmitting(true);
    //disptach login
    dispatch(login(email, password));
    setSubmitting(false);
  };
  return (
    <>
      <Meta title="Welcome to ShopHit | Login" />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={submitHandler}
      >
        {({
          touched,
          handleBlur,
          handleChange,
          errors,
          handleSubmit,
          isSubmitting,
          values,
        }) => (
          <FormContainer>
            <h1>Sign in</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  placeholder="Enter Email"
                  value={values.email}
                  name="email"
                  className={
                    errors.email && touched.email ? "invalid" : "valid"
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? "invalid" : "valid"
                  }
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                Sign in
              </Button>
            </Form>
            <Row className="py-3">
              <Col>
                New Customer ?{" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
                  Register
                </Link>
              </Col>
            </Row>
          </FormContainer>
        )}
      </Formik>
    </>
  );
};

export default LoginScreen;
