import React from 'react';
import axios from 'axios';
import config from '../config';
import useStyles from './Categories.css.js';

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
    <div>
      <h2>Categories</h2>
      <div className={classes.container}>
        {categories.map(category => (
          <div className={classes.box}>{category.nameEn}</div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
