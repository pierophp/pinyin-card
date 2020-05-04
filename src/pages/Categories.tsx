import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';
import Game from '../components/card/Game';
import Initial from '../components/card/Initial';
import Presentation from '../components/card/Presentation';
import config from '../config';
import getUser from '../helpers/get.user';
import useStyles from './Categories.css';

const user = getUser();

const Categories = withRouter(({ match }) => {
  const [categories, setCategories] = React.useState([]);
  const [currentCategory, setCurrentCategory] = React.useState<any>(null);
  const [cards, setCards] = React.useState<any>([]);

  const classes = useStyles();

  const type = match.params.type || 'initial';

  React.useEffect(() => {
    async function init() {
      const response = (
        await axios.get(
          `${config.apiUrl}/category/by-parent-category/${
            match.params.id ? match.params.id : ''
          }`
        )
      ).data;
      setCategories(response);
    }

    init();
  }, [match.params.id]);

  React.useEffect(() => {
    async function init() {
      if (!match.params.id) {
        return;
      }

      const categoryResponse = (
        await axios.get(`${config.apiUrl}/category/${match.params.id}`)
      ).data;

      setCurrentCategory(categoryResponse);

      const cardsResponse = (
        await axios.get(`${config.apiUrl}/card/category/${match.params.id}`)
      ).data;
      setCards(cardsResponse);
    }

    init();
  }, [match.params.id]);

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

      {type === 'presentation' && <Presentation cards={cards} user={user} />}
      {type === 'game' && <Game cards={cards} />}
    </div>
  );
});

export default Categories;
