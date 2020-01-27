import React from 'react';
import { Route } from 'react-router-dom';
import CardCreateUpdate from '../../pages/CardCreateUpdate';
import Cards from '../../pages/Cards';
import Categories from '../../pages/Categories';
import CategoryCreateUpdate from '../../pages/CategoryCreateUpdate';
import Configuration from '../../pages/Configuration';

const Routes = () => {
  return (
    <>
      <Route exact path="/" component={Categories} />
      <Route exact path="/category-create" component={CategoryCreateUpdate} />
      <Route
        exact
        path="/category-update/:id"
        component={CategoryCreateUpdate}
      />
      <Route exact path="/category/:id" component={Categories} />
      <Route exact path="/cards/:category" component={Cards} />
      <Route exact path="/card-create/:category" component={CardCreateUpdate} />
      <Route exact path="/card-update/:id" component={CardCreateUpdate} />
      <Route exact path="/configuration" component={Configuration} />
    </>
  );
};

export default Routes;
