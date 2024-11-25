import { Route } from "react-router-dom";
import CardCreateUpdate from "../../pages/CardCreateUpdate";
import Categories from "../../pages/Categories";
import CategoryCreateUpdate from "../../pages/CategoryCreateUpdate";
import Configuration from "../../pages/Configuration";
import EnglishPortugueseIpa from "../../pages/EnglishPortugueseIpa";
import Login from "../../pages/Login";

const Routes = () => {
  return (
    <>
      <Route path="/" element={<Categories />} />
      <Route path="/category-create" element={<CategoryCreateUpdate />} />
      <Route path="/category-update/:id" element={<CategoryCreateUpdate />} />
      <Route path="/category/:id/:type?" element={<Categories />} />
      <Route path="/card-create/:category" element={<CardCreateUpdate />} />
      <Route path="/card-update/:id" element={<CardCreateUpdate />} />
      <Route path="/configuration" element={<Configuration />} />
      <Route
        path="/english-portuguese-ipa"
        element={<EnglishPortugueseIpa />}
      />
      <Route path="/login" element={<Login />} />
    </>
  );
};

export default Routes;
