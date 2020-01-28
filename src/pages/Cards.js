import axios from 'axios';
import upperFirst from 'lodash/upperFirst';
import shuffle from 'lodash/shuffle';
import React from 'react';
import config from '../config';
import getConfiguration from '../helpers/get.configuration';
import useStyles from './Cards.css.js';

const Cards = props => {
  const [cards, setCards] = React.useState([]);

  const currentCardReducer = (state, action) => {
    if (action === 'previous') {
      if (state === 0) {
        return state;
      }

      return state - 1;
    } else if (action === 'next') {
      if (state >= cards.length - 1) {
        return state;
      }

      return state + 1;
    }
  };

  const [currentCard, dispatchCurrentCard] = React.useReducer(
    currentCardReducer,
    0
  );

  const classes = useStyles();

  const configuration = getConfiguration();

  const isChinese = ['chs', 'cht'].includes(configuration.learningLanguage);
  const nameField = `name${upperFirst(configuration.learningLanguage)}`;
  const audioField = isChinese
    ? 'audioCh'
    : `audio${upperFirst(configuration.learningLanguage)}`;

  const previousCard = () => {
    dispatchCurrentCard('previous');
  };

  const nextCard = () => {
    dispatchCurrentCard('next');
  };

  const handleKeyDown = React.useCallback(e => {
    if (e.key === 'ArrowRight') {
      nextCard();
    } else if (e.key === 'ArrowLeft') {
      previousCard();
    }
  }, []);

  const orientation =
    window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';

  React.useEffect(() => {
    async function init() {
      const response = (
        await axios.get(
          `${config.apiUrl}/card/category/${props.match.params.category}`
        )
      ).data;
      setCards(shuffle(response.filter(card => card[nameField])));
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
  const showTranslation = false;
  const language = 'pt';

  return (
    <div>
      {card && (
        <div
          className={[classes.cardContainer, classes[orientation]].join(' ')}
          style={{ backgroundImage: `url(${card.image})` }}
        >
          <div className={classes.containerClick}>
            <div className={classes.leftClick} onClick={previousCard}></div>
            <div className={classes.rightClick} onClick={nextCard}></div>
          </div>
          <div className={classes.informationContainer}>
            {showTranslation && (
              <div className={classes.translationTitle}>
                {card[`name${upperFirst(language)}`]
                  ? card[`name${upperFirst(language)}`]
                  : card.nameEn}
              </div>
            )}

            <div className={classes.title}>{card[nameField]}</div>

            {isChinese && <div className={classes.pinyin}>{card.pinyin}</div>}

            {card.audioCh && <audio src={card[audioField]} autoPlay></audio>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
