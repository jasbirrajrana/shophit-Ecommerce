import React from "react";
import { Nav, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="mb-4 stepper-nav">
      <Nav.Item className="step-nav-item">
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link className="step">
              <Image
                src="/icons/right.svg"
                alt="checkmark-icon"
                roundedCircle
              />
              <p>Sign in</p>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <p>Sign in</p>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item className="step-nav-item">
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link className="step">
              <Image
                src="/icons/right.svg"
                alt="checkmark-icon"
                roundedCircle
              />
              <p>Shipping</p>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <p>Shipping</p>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item className="step-nav-item">
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link className="step">
              <Image
                src="/icons/right.svg"
                alt="checkmark-icon"
                roundedCircle
              />
              <p>Payment</p>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <p>Payment</p>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item className="step-nav-item">
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link className="step">
              <Image
                src="/icons/right.svg"
                alt="checkmark-icon"
                roundedCircle
              />
              <p>Place order</p>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <p>Place order</p>
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutStep;
