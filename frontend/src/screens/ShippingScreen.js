import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { Form, Button, Image } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartAction";

import CheckoutStep from "../components/CheckoutStep";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cart;
  });
  const { shippingAddress } = cart;

  const submitHandler = (
    { address, city, zip, country },
    { setSubmitting }
  ) => {
    setSubmitting(true);
    dispatch(
      saveShippingAddress({
        address,
        city,
        zip,
        country,
      })
    );
    history.push("/payment");
    setSubmitting(false);
  };
  return (
    <FormContainer>
      <CheckoutStep step1 />
      <h1>
        Shipping <Image src="/icons/shipping.svg" alt="shipping-icon" />
      </h1>
      <Formik
        initialValues={{
          address: shippingAddress.address,
          country: shippingAddress.country,
          city: shippingAddress.city,
          zip: shippingAddress.zip,
        }}
        onSubmit={submitHandler}
      >
        {({ handleBlur, handleChange, handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={values.address}
                onBlur={handleBlur}
                name="address"
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={values.country}
                onChange={handleChange}
                placeholder="Enter country"
                onBlur={handleBlur}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={values.city}
                name="city"
                onChange={handleChange}
                onBlur={handleBlur}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="zip">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Postal Code"
                name="zip"
                value={values.zip}
                onChange={handleChange}
                onBlur={handleBlur}
              ></Form.Control>
            </Form.Group>
            <Button
              className="btn-block"
              variant="outline-primary"
              type="submit"
            >
              Continue
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default ShippingScreen;
