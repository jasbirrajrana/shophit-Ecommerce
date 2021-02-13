import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Image, Carousel } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { topRatedProducts } from "../actions/ProductActions";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => {
    return state.productTopRated;
  });
  useEffect(() => {
    dispatch(topRatedProducts());
  }, [dispatch]);
  const { products, loading, error } = productTopRated;
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Carousel pause="hover" className="bg-light">
          {products.map((product) => {
            return (
              <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <Image src={product.image} alt={product.name} fluid />
                </Link>
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
    </>
  );
};

export default ProductCarousel;
