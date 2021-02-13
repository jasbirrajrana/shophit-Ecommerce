import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { getUserDetails, updateUserProfile } from "../actions/usersAction.js";
import { listMyOrder } from "../actions/orderActions";
import Meta from "../components/Meta";
import { USER_UPDATE_RESET } from "../constants/usersConstant";

const ProfileScreen = ({ location, history }) => {
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => {
    return state.userDetails;
  });
  const { error, loading, user } = userDetails;
  const orderListMy = useSelector((state) => {
    return state.orderListMy;
  });
  const { loading: loadingMyOrders, error: errorOrders, orders } = orderListMy;
  const userUpdateProfile = useSelector((state) => {
    return state.userUpdateProfile;
  });
  const { success } = userUpdateProfile;

  const userLogin = useSelector((state) => {
    return state.userLogin;
  });
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrder());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, dispatch, redirect, user, orders, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      // dispatch update profile
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };
  console.log(orders);
  return (
    <>
      <Meta title="Welcome to ShopHit | Profile" />

      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassowrd(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassowrd(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="danger" disabled={!name || !email}>
              Update Changes
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>Orders</h2>
          {loadingMyOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table bordered striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => {
                  return (
                    <tr key={i}>
                      <td>{order._id}</td>
                      <td>
                        {moment(order.createdAt).format(
                          "MMM Do, YYYY HH:mm:ss a"
                        )}
                      </td>
                      <td>${order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          moment(order.paidAt).format("MMM Do, YYYY HH:mm:ss a")
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          moment(order.deliveredAt).format(
                            "MMMM Do, YYYY HH:mm:ss a"
                          )
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className="btn-sm" variant="info">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
