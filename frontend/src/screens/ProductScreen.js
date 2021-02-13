import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  listProductDetails,
  createProductReview,
} from "../actions/ProductActions";
import { Row, Col, Image, ListGroup, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
toast.configure();

const ProductScreen = (props) => {
  const [count, setCount] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => {
    return state.productDetails;
  });

  const { product, error, loading } = productDetails;
  const productCreateReview = useSelector((state) => {
    return state.productCreateReview;
  });

  const { success, error: productCreateReviewError } = productCreateReview;
  const userLogin = useSelector((state) => {
    return state.userLogin;
  });

  const { userInfo } = userLogin;
  useEffect(() => {
    if (success) {
      toast.info("Review Submitted !", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        type: "default",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(props.match.params.id));
  }, [dispatch, props.match, success]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${count}`);

    toast.info("Successfully added to cart!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      type: "default",
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(props.match.params.id, { rating, comment }));
  };
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={7}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={5}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price :${product.price}</ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price :</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status :</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <div className="counter">
                    <div className="px-2">QUANTITY</div>
                    <div className="counter-items">
                      <Button
                        className="btn-block"
                        variant="outline-dark"
                        disabled={count === product.countInStock}
                        onClick={() => {
                          setCount(count + 1);
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
                  </div>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review, i) => {
                  return (
                    <ListGroup.Item key={i}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>
                        {moment(review.createdAt).format(
                          "MMM Do, YYYY HH:mm:ss a"
                        )}
                      </p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  );
                })}
                <ListGroup.Item>
                  <h2>Write a customer Review</h2>
                  {productCreateReviewError && (
                    <Message variant="danger">
                      {productCreateReviewError}
                    </Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => {
                            setRating(e.target.value);
                          }}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 -Poor</option>
                          <option value="2">2 -Fair</option>
                          <option value="3">3 -Good</option>
                          <option value="4">4 -very Goood</option>
                          <option value="5">5 -Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="outline-info">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="warning">
                      Please <Link to="/login">Sign in</Link>to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
