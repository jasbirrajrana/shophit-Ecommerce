import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartAction";
import Message from "../components/Message";
import Meta from "../components/Meta";

const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cart;
  });
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  useEffect(() => {
    if (productId) {
      return dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const { cartItems } = cart;
  console.log(cartItems);

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <>
      <Meta title="Welcome to ShopHit | cart" />
      <Row>
        <Col md={7}>
          <h2>
            Shopping Cart
            <span>
              <Image
                src="/icons/cart-128.svg"
                alt="cart-icon"
                className="mx-2"
              />
            </span>
          </h2>
          {cartItems.length === 0 ? (
            <Message variant="warning">
              Cart is Empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => {
                return (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/api/product/${item.product}`}>
                          <p>{item.name}</p>
                        </Link>
                      </Col>
                      <Col md={2}>
                        <p>${item.price}</p>
                      </Col>
                      <Col md={2}>
                        {/* <div className="counter">
                        <div className="px-2">QUANTITY</div>
                        <div className="counter-items">
                          <Button
                            className="btn-block"
                            variant="outline-dark"
                            disabled={count === product.countInStock}
                            onClick={() => {
                              setCount( + 1);
                            }}
                          >
                            +
                          </Button>
                          <p className="count">{count}</p>
                          <Button
                            className="btn-block"
                            variant="outline-dark"
                            disabled={count <= 0}
                            onClick={() => {
                              setCount(count - 1);
                            }}
                          >
                            -
                          </Button>
                        </div>
                      </div> */}
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => {
                            removeFromCartHandler(item.product);
                          }}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Col>
        <Col md={5}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items{" "}
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                >
                  Proceed to CheckOut
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
