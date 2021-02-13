import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { logout } from "../actions/usersAction.js";
import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => {
    return state.userLogin;
  });
  const { userInfo } = userLogin;
  const cart = useSelector((state) => {
    return state.cart;
  });
  const { cartItems } = cart;
  const logoutHandler = () => {
    dispatch(logout());
    // console.log("Logout");
  };
  return (
    <Navbar bg="light" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="logo">
            <Image src="/icons/logo.png" alt="logo" />
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Route render={({ history }) => <SearchBox history={history} />} />
          <Nav className="ml-auto">
            <LinkContainer to="/cart">
              <Nav.Link className="link mx-3">
                <div className="cart-icon">
                  <div
                    className={cartItems.length !== 0 ? "have-items" : ""}
                  ></div>
                  <Image src="/icons/cart.svg" alt="cart-icon" />
                </div>
                <span>Cart</span>
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <div className="user-info">
                <NavDropdown title={`Hi, ${userInfo.name}`} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link className="link mx-3">
                  {" "}
                  <div className="user-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="32"
                      height="32"
                      viewBox="0 0 48 48"
                      style={{
                        fill: "#4a90e2",
                      }}
                    >
                      <path d="M 24 4 C 18.494917 4 14 8.494921 14 14 C 14 19.505079 18.494917 24 24 24 C 29.505083 24 34 19.505079 34 14 C 34 8.494921 29.505083 4 24 4 z M 12.5 28 C 10.032499 28 8 30.032499 8 32.5 L 8 33.699219 C 8 36.640082 9.8647133 39.277974 12.708984 41.091797 C 15.553256 42.90562 19.444841 44 24 44 C 28.555159 44 32.446744 42.90562 35.291016 41.091797 C 38.135287 39.277974 40 36.640082 40 33.699219 L 40 32.5 C 40 30.032499 37.967501 28 35.5 28 L 12.5 28 z"></path>
                    </svg>
                  </div>
                  <span>Sign in</span>
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="user-info">
                <NavDropdown title="Admin" id="admin-menu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
