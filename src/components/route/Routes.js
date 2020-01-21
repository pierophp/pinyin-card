import React from 'react';
import { Route } from 'react-router-dom';
import Categories from '../../pages/Categories';
import Cards from '../../pages/Cards';

const Routes = () => {
  return (
    <>
      <Route exact path="/" component={Categories} />
      <Route exact path="/cards/:category" component={Cards} />
    </>
  );
};

export default Routes;
