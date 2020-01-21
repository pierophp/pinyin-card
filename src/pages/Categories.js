import React from 'react';
import axios from 'axios';
import config from '../config';
import useStyles from './Categories.css.js';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = React.useState([]);
  const classes = useStyles();

  React.useEffect(() => {
    async function init() {
      const response = (await axios.get(`${config.apiUrl}/category`)).data;
      setCategories(response);
    }

    init();
  }, []);

  return (
    <div className={classes.container}>
      <h2>Categories</h2>
      <div className={classes.categoriesContainer}>
        {categories.map(category => (
          <Link to={`cards/${category.id}`}>
            <div className={classes.box}>
              {category.namePt} <br /> {category.nameCht}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
