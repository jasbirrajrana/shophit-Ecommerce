import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
const NotFoundScreen = () => {
  return (
    <div>
      404 Page not found{" "}
      <Link className="btn btn-light" to="/">
        Go back
      </Link>
      <Image
        src="/icons/404.svg"
        style={{ objectFit: "contain" }}
        height="800px"
      />
    </div>
  );
};

export default NotFoundScreen;
