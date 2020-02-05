import axios from 'axios';
import React from 'react';

import config from '../config';
import getUser from '../helpers/get.user';
import useStyles from './Categories.css';
import Initial from '../components/card/Initial';
import Presentation from '../components/card/Presentation';
const user = getUser();

const Categories = (props: any) => {
  const [categories, setCategories] = React.useState([]);
  const [currentCategory, setCurrentCategory] = React.useState<any>(null);
  const [cards, setCards] = React.useState<any>([]);

  const classes = useStyles();

  const type = props.match.params.type || 'initial';

  React.useEffect(() => {
    async function init() {
      if (props.match.params.id) {
        return;
      }

      const response = (await axios.get(`${config.apiUrl}/category`)).data;
      setCategories(response);
    }

    init();
  }, []);

  React.useEffect(() => {
    async function init() {
      if (!props.match.params.id) {
        return;
      }

      const categoryResponse = (
        await axios.get(`${config.apiUrl}/category/${props.match.params.id}`)
      ).data;

      setCurrentCategory(categoryResponse);

      const cardsResponse = (
        await axios.get(
          `${config.apiUrl}/card/category/${props.match.params.id}`
        )
      ).data;
      setCards(cardsResponse);
    }

    init();
  }, [props.match.params.id]);

  return (
    <div>
      {type === 'initial' && (
        <Initial
          currentCategory={currentCategory}
          user={user}
          cards={cards}
          categories={categories}
        />
      )}

      {type === 'presentation' && <Presentation cards={cards} />}
    </div>
  );
};

export default Categories;
