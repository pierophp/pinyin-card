import React from 'react';
import { Route } from 'react-router-dom';
import CardCreate from '../../pages/CardCreate';
import Cards from '../../pages/Cards';
import Categories from '../../pages/Categories';
import CategoryCreate from '../../pages/CategoryCreate';
import Configuration from '../../pages/Configuration';

const Routes = () => {
  return (
    <>
      <Route exact path="/" component={Categories} />
      <Route exact path="/category-create" component={CategoryCreate} />
      <Route exact path="/category/:id" component={Categories} />
      <Route exact path="/cards/:category" component={Cards} />
      <Route exact path="/card-create/:category" component={CardCreate} />
      <Route exact path="/configuration" component={Configuration} />
    </>
  );
};

export default Routes;
