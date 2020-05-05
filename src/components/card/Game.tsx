import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import shuffle from 'lodash/shuffle';
import upperFirst from 'lodash/upperFirst';
import React from 'react';
import ReactDOM from 'react-dom';
import getConfiguration from '../../helpers/get.configuration';
import getUser from '../../helpers/get.user';
import useStyles from './Game.css';
import usePartialState from '../../hooks/usePartialState';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

const user = getUser();

const Game = (props: any) => {
  const [cards, setCards] = React.useState<any[]>([]);
  const [cardOptions, setCardOptions] = React.useState<any[]>([]);
  const [answers, setAnswers] = usePartialState({});
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [appBarPortal, setAppBarPortal] = React.useState<any>(undefined);

  const currentCardReducer = (state: any, action: any) => {
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
    0,
  );

  const classes = useStyles();

  const configuration = getConfiguration();

  const isChinese = ['chs', 'cht'].includes(configuration.learningLanguage);
  const nameField = `name${upperFirst(configuration.learningLanguage)}`;
  const audioField = isChinese
    ? 'audioCh'
    : `audio${upperFirst(configuration.learningLanguage)}`;

  const extraField = isChinese
    ? 'extraCh'
    : `extra${upperFirst(configuration.learningLanguage)}`;

  const card = cards[currentCard];

  let genderClass = '';
  if (card[extraField]?.gender) {
    const gender = `gender${card[extraField]?.gender.toUppercase()}`;
    // @ts-ignore
    if (classes[gender]) {
      // @ts-ignore
      genderClass = classes[gender];
    }
  }

  const nextCard = () => {
    dispatchCurrentCard('next');
    setShowAnswer(false);
  };

  const select = React.useCallback(
    (selectedCard) => {
      const answer: any = {
        [card.id]: {
          id: card.id,
          correct: selectedCard.id === card.id,
        },
      };

      setAnswers(answer);
      setShowAnswer(true);
    },
    [card],
  );

  const preloadAudios = async (cards: any[]) => {
    for (const card of cards) {
      await new Promise((resolve) => {
        const audio = new Audio();
        audio.addEventListener(
          'canplaythrough',
          () => {
            resolve();
          },
          false,
        );
        audio.src = card[audioField];
      });
    }
  };

  const preloadImages = async (cards: any[]) => {
    for (const card of cards) {
      await new Promise((resolve) => {
        const image = new Image();
        image.onload = () => {
          resolve();
        };
        image.src = card.image;
      });
    }
  };

  const play = () => {
    const audioElement: HTMLAudioElement = document.getElementById(
      'audio',
    ) as HTMLAudioElement;

    audioElement.play();
  };

  const loadOptions = React.useCallback(() => {
    if (!cards || cards.length === 0) {
      return;
    }

    if (!props.cards || props.cards.length === 0) {
      return;
    }

    let tempCards: any[] = shuffle(props.cards)
      .slice(0, 4)
      .filter((card) => card.id !== cards[currentCard].id)
      .slice(0, 3);

    tempCards.push(cards[currentCard]);
    setCardOptions(shuffle(tempCards));
  }, [props, cards, currentCard]);

  const orientation =
    window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';

  React.useEffect(() => {
    async function init() {
      const tempCards = shuffle(
        props.cards.filter((card: any) => card[audioField]),
      );
      setCards(tempCards);
      loadOptions();
      preloadAudios(tempCards);
      preloadImages(tempCards);
    }

    init();
  }, [props]);

  React.useEffect(() => {
    function loadPortal() {
      const element = document.getElementById('app-bar-portal');

      if (!element) {
        setTimeout(loadPortal, 500);
        return;
      }

      setAppBarPortal(element);
    }

    loadPortal();
  }, []);

  React.useEffect(() => {
    loadOptions();
  }, [currentCard, cards]);

  const showTranslation = false;
  const language = 'pt';
  const genders: any = {
    de_m: 'Der',
    de_f: 'Die',
    de_n: 'Das',
  };

  return (
    <div className={classes.container}>
      {appBarPortal &&
        ReactDOM.createPortal(
          <IconButton onClick={play}>
            <PlayCircleOutlineIcon style={{ color: '#fff' }} />
          </IconButton>,
          appBarPortal,
        )}

      {card && card[audioField] && (
        <audio src={card[audioField]} autoPlay id="audio"></audio>
      )}
      {card && answers[card.id] && (
        <Dialog onClose={nextCard} open={showAnswer} fullWidth={true}>
          <DialogTitle
            className={
              answers[card.id].correct
                ? classes.rightAnswer
                : classes.wrongAnswer
            }
          >
            {answers[card.id].correct ? (
              <>
                <CheckCircleIcon fontSize="large" />
                Resposta correta
              </>
            ) : (
              <>
                <ErrorIcon fontSize="large" />
                Resposta errada
              </>
            )}
          </DialogTitle>
          <DialogContent dividers>
            <div
              className={[
                classes.cardContainer,
                classes[orientation],
                classes.cardContainerAnswer,
              ].join(' ')}
              style={{ backgroundImage: `url(${card.image})` }}
            ></div>

            <div className={classes.informationContainer}>
              {showTranslation && (
                <div className={classes.translationTitle}>
                  {card[`name${upperFirst(language)}`]
                    ? card[`name${upperFirst(language)}`]
                    : card.nameEn}
                </div>
              )}

              <div className={`${classes.title} ${genderClass}`}>
                {card[extraField] && card[extraField].gender && (
                  <span>
                    (
                    {
                      genders[
                        `${configuration.learningLanguage}_${card[extraField].gender}`
                      ]
                    }
                    ){' '}
                  </span>
                )}

                {card[nameField]}
              </div>

              {isChinese && (
                <div className={classes.pronunciation}>{card.pinyin}</div>
              )}
              {card[extraField] && card[extraField].pronunciation && (
                <div className={classes.pronunciation}>
                  {card[extraField].pronunciation}
                </div>
              )}

              <IconButton color="primary" onClick={play}>
                <PlayCircleOutlineIcon />
              </IconButton>

              {user && user.admin && (
                <IconButton
                  color="primary"
                  component="a"
                  href={`/#/card-update/${card.id}`}
                  target="_blank"
                >
                  <EditIcon />
                </IconButton>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={nextCard} color="primary">
              Continuar
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <div className={classes.optionsContainer}>
        {cardOptions.map((cardOption) => {
          return (
            <div
              className={[
                classes.cardContainer,
                classes[orientation],
                classes.cardContainerOption,
              ].join(' ')}
              style={{ backgroundImage: `url(${cardOption.image})` }}
              onClick={() => select(cardOption)}
              key={cardOption.id}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Game;
