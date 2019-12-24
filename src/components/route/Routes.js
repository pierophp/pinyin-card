import React from "react";
import { Route } from "react-router-dom";
import Categories from "../../pages/Categories";

const Routes = () => {
  return (
    <>
      <Route exact path="/" component={Categories} />
    </>
  );
};

export default Routes;
