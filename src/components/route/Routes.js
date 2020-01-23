import React from 'react';
import { Route } from 'react-router-dom';
import Categories from '../../pages/Categories';
import Cards from '../../pages/Cards';
import CardCreate from '../../pages/CardCreate';

const Routes = () => {
  return (
    <>
      <Route exact path="/" component={Categories} />
      <Route exact path="/cards/:category" component={Cards} />
      <Route exact path="/card/create/:category" component={CardCreate} />
    </>
  );
};

export default Routes;
