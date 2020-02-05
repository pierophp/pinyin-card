import React from 'react';
import { Route } from 'react-router-dom';
import CardCreateUpdate from '../../pages/CardCreateUpdate';
import Categories from '../../pages/Categories';
import CategoryCreateUpdate from '../../pages/CategoryCreateUpdate';
import Configuration from '../../pages/Configuration';
import Login from '../../pages/Login';

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
      <Route exact path="/category/:id/:type?" component={Categories} />
      <Route exact path="/card-create/:category" component={CardCreateUpdate} />
      <Route exact path="/card-update/:id" component={CardCreateUpdate} />
      <Route exact path="/configuration" component={Configuration} />
      <Route exact path="/login" component={Login} />
    </>
  );
};

export default Routes;
