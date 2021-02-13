import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, desc, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta http-equiv="X-UA-Compatible" content="IE=7" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={desc} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to shopHit | Home",
  desc: "We sell the best product",
  keywords: "electronics,buy electronics,cheap,better,quailty products",
};

export default Meta;
