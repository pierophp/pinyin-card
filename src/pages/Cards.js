import React from 'react';
import axios from 'axios';
import upperFirst from 'lodash/upperFirst';
import config from '../config';
import useStyles from './Cards.css.js';

const Cards = props => {
  const [cards, setCards] = React.useState([]);
  const [currentCard, setCurrentCard] = React.useState(0);
  const classes = useStyles();

  const handleKeyDown = React.useCallback(
    e => {
      if (e.key === 'ArrowRight') {
        if (currentCard < cards.length - 1) {
          setCurrentCard(currentCard + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentCard > 0) {
          setCurrentCard(currentCard - 1);
        }
      }
    },
    [cards, currentCard]
  );

  React.useEffect(() => {
    async function init() {
      const response = (
        await axios.get(
          `${config.apiUrl}/card/category/${props.match.params.category}`
        )
      ).data;
      setCards(response);
      setCurrentCard(0);
    }

    init();
  }, []);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    // unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const card = cards[currentCard];
  const ideogramType = 'T';
  const language = 'pt';
  console.log(cards);
  return (
    <div>
      {card && (
        <div
          className={classes.cardContainer}
          style={{ backgroundImage: `url(${card.image})` }}
        >
          <div className={classes.informationContainer}>
            <div className={classes.translationTitle}>
              {card[`name${upperFirst(language)}`]
                ? card[`name${upperFirst(language)}`]
                : card.nameEn}
            </div>
            <div className={classes.chineseTitle}>
              {ideogramType === 'S' ? card.nameChs : card.nameCht}
            </div>
            <div className={classes.pinyin}>{card.pinyin}</div>
            {card.audioCh && <audio src={card.audioCh} autoPlay></audio>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
