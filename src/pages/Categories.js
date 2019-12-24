import React from "react";
import axios from "axios";
import config from "../config";

const Categories = () => {
  const [categories, setCategories] = React.useState([]);
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
      {categories.map(category => (
        <div>{category.nameEn}</div>
      ))}
    </div>
  );
};

export default Categories;
