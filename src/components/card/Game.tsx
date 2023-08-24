import EditIcon from "@mui/icons-material/Edit";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import shuffle from "lodash/shuffle";
import upperFirst from "lodash/upperFirst";
import React, {
  Reducer,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";
import ReactDOM from "react-dom";
import getConfiguration from "../../helpers/get.configuration";
import getUser from "../../helpers/get.user";
import usePartialState from "../../hooks/usePartialState";

import { filterVoices } from "../../helpers/filter.voices";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

type AudioField =
  | "audioCh"
  | "audioDe"
  | "audioEn"
  | "audioFr"
  | "audioIt"
  | "audioPt";

type ExtraField =
  | "extraCh"
  | "extraDe"
  | "extraEn"
  | "extraFr"
  | "extraIt"
  | "extraPt";

type NameField =
  | "nameChs"
  | "nameCht"
  | "nameDe"
  | "nameEn"
  | "nameFr"
  | "nameIt"
  | "namePt";

type Genders = {
  de_m: string;
  de_f: string;
  de_n: string;
};

type GenderClass = "genderM" | "genderF" | "genderN";

type Extra = {
  gender?: string;
  pronunciation?: string;
};

type Card = {
  id: number;
  image: string;
  pinyin: string;
  audioCh: string;
  audioDe: string;
  audioEn: string;
  audioFr: string;
  audioIt: string;
  audioPt: string;

  extraCh: Extra;
  extraDe: Extra;
  extraEn: Extra;
  extraFr: Extra;
  extraIt: Extra;
  extraPt: Extra;

  nameChs: string;
  nameCht: string;
  nameDe: string;
  nameEn: string;
  nameFr: string;
  nameIt: string;
  namePt: string;
};

type Answers = {
  [cardId: number]: {
    id: number;
    correct: boolean;
  };
};

const user = getUser();

const genders: Genders = {
  de_m: "Der",
  de_f: "Die",
  de_n: "Das",
};

const CardComponent = ({
  card,
  onClick,
  border = true,
}: {
  card: Card;
  onClick?: () => void;
  border?: boolean;
}) => {
  const borderClass = border
    ? "border-2 border-solid border-black hover:border-blue-500"
    : "";

  return (
    <div
      className={
        "bg-white bg-no-repeat bg-center portrait:bg-[length:50vw_auto] landscape:bg-[length:auto_50vh] w-[calc(50%-4px)] h-[calc(50vh-(56px/2)-4px)] relative mx-auto " +
        borderClass
      }
      style={{ backgroundImage: `url(${card.image})` }}
      onClick={onClick}
    ></div>
  );
};

const Game = (props: { cards: Card[] }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [speaker, setSpeaker] = useState("");
  const [cardOptions, setCardOptions] = useState<Card[]>([]);
  const [answers, setAnswers] = usePartialState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [appBarPortal, setAppBarPortal] = useState<HTMLElement | undefined>(
    undefined
  );

  const currentCardReducer = (state: number, action: "previous" | "next") => {
    if (action === "previous") {
      if (state === 0) {
        return state;
      }

      return state - 1;
    } else if (action === "next") {
      if (state >= cards.length - 1) {
        return state;
      }

      return state + 1;
    }

    return state;
  };

  const [currentCard, dispatchCurrentCard] = useReducer<
    Reducer<number, "previous" | "next">
  >(currentCardReducer, 0);

  const configuration = useMemo(() => getConfiguration(), []);

  const isChinese = useMemo(
    () => ["chs", "cht"].includes(configuration.learningLanguage),
    [configuration.learningLanguage]
  );

  const nameField: NameField = useMemo(
    () => `name${upperFirst(configuration.learningLanguage)}` as NameField,
    [configuration.learningLanguage]
  );

  const audioField: AudioField = useMemo(
    () =>
      isChinese
        ? "audioCh"
        : (`audio${upperFirst(configuration.learningLanguage)}` as AudioField),
    [isChinese, configuration.learningLanguage]
  );

  const extraField: ExtraField = useMemo(
    () =>
      isChinese
        ? "extraCh"
        : (`extra${upperFirst(configuration.learningLanguage)}` as ExtraField),
    [isChinese, configuration.learningLanguage]
  );

  const card = useMemo(() => cards[currentCard], [cards, currentCard]);

  const goToNextCard = useCallback(() => {
    dispatchCurrentCard("next");
    setShowAnswer(false);
  }, []);

  const play = useCallback(
    (card: Card, forceSynthesis = false) => {
      if (!card) {
        return;
      }

      if (card[audioField] && !forceSynthesis) {
        setSpeaker("");
        const audioElement: HTMLAudioElement = document.getElementById(
          "audio"
        ) as HTMLAudioElement;

        audioElement.play();

        return;
      }
      const voices = window.speechSynthesis.getVoices();
      let learningVoices = filterVoices(voices, configuration.learningLanguage);
      learningVoices = shuffle(learningVoices);

      const utterance = new SpeechSynthesisUtterance(card[nameField]);
      if (learningVoices.length > 0) {
        utterance.voice = learningVoices[0];
        setSpeaker(learningVoices[0].name);
      }

      window.speechSynthesis.speak(utterance);
    },
    [configuration.learningLanguage, nameField, audioField]
  );

  const selectAnswer = useCallback(
    (selectedCard: Card) => {
      const answer: Answers = {
        [card.id]: {
          id: card.id,
          correct: selectedCard.id === card.id,
        },
      };

      setAnswers(answer);
      setShowAnswer(true);

      const audioAnswerElement: HTMLAudioElement = document.getElementById(
        selectedCard.id === card.id ? "right-audio" : "wrong-audio"
      ) as HTMLAudioElement;
      audioAnswerElement.volume = 0.05;
      audioAnswerElement.play();

      setTimeout(() => {
        play(selectedCard);
      }, 1000);
    },
    [card, setAnswers, play]
  );

  const preloadAudios = useCallback(
    async (cards: Card[]) => {
      for (const card of cards) {
        await new Promise((resolve) => {
          const audio = new Audio();
          audio.addEventListener(
            "canplaythrough",
            () => {
              resolve(undefined);
            },
            false
          );
          audio.src = card[audioField];
        });
      }
    },
    [audioField]
  );

  const preloadImages = useCallback(async (cards: Card[]) => {
    for (const card of cards) {
      await new Promise((resolve) => {
        const image = new Image();
        image.onload = () => {
          resolve(undefined);
        };
        image.src = card.image;
      });
    }
  }, []);

  const loadOptions = useCallback(
    (cards: Card[], currentCard: number) => {
      if (!cards || cards.length === 0) {
        return;
      }

      if (!props.cards || props.cards.length === 0) {
        return;
      }

      const tempCards: Card[] = shuffle(props.cards)
        .slice(0, 4)
        .filter((card) => card.id !== cards[currentCard].id)
        .slice(0, 3);

      tempCards.push(cards[currentCard]);
      setCardOptions(shuffle(tempCards));
    },
    [props]
  );

  React.useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  React.useEffect(() => {
    if (card?.[audioField]) {
      return;
    }

    play(card);
  }, [card, audioField, play]);

  React.useEffect(() => {
    const tempCards = shuffle(props.cards.filter((card) => card[nameField]));
    setCards(tempCards);
    preloadAudios(tempCards);
    preloadImages(tempCards);
  }, [props, nameField, loadOptions, preloadAudios, preloadImages]);

  React.useEffect(() => {
    function loadPortal() {
      const element = document.getElementById("app-bar-portal");

      if (!element) {
        setTimeout(loadPortal, 500);
        return;
      }

      setAppBarPortal(element);
    }

    loadPortal();
  }, []);

  React.useEffect(() => {
    if (cards.length === 0) {
      return;
    }

    loadOptions(cards, currentCard);
  }, [currentCard, cards, loadOptions]);

  const showTranslation = false;
  const language = "pt";
  const translatedField: NameField = `name${upperFirst(language)}` as NameField;
  const genderLanguage: keyof Genders =
    `${configuration.learningLanguage}_${card?.[extraField]?.gender}` as keyof Genders;

  let genderClass = "";
  if (card && card[extraField]?.gender) {
    const gender: GenderClass = `gender${card[
      extraField
    ].gender?.toUpperCase()}` as GenderClass;

    const genderClasses = {
      genderM: "text-blue-500",
      genderF: "text-red-500",
      genderN: "text-green-300",
    };

    if (genderClasses[gender]) {
      genderClass = genderClasses[gender];
    }
  }

  return (
    <div>
      <audio src="/audios/wrong-answer.mp3" id="wrong-audio"></audio>
      <audio src="/audios/right-answer.mp3" id="right-audio"></audio>

      {appBarPortal &&
        ReactDOM.createPortal(
          <div className="flex">
            <IconButton onClick={() => play(card)}>
              <PlayCircleOutlineIcon style={{ color: "#fff" }} />
            </IconButton>

            <IconButton onClick={() => play(card, true)}>
              <PlayCircleOutlineIcon style={{ color: "#fff" }} />
            </IconButton>
            <div className="flex items-center">{speaker}</div>
          </div>,
          appBarPortal
        )}

      {card && card[audioField] && (
        <audio src={card[audioField]} autoPlay id="audio"></audio>
      )}
      {card && answers[card.id] && (
        <Dialog onClose={goToNextCard} open={showAnswer} fullWidth={true}>
          <DialogTitle
            className={
              answers[card.id].correct ? "text-green-500" : "text-red-500"
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
            <CardComponent card={card} border={false} />
            {/* <div
              className="bg-center w-full bg-white bg-no-repeat h-[calc(50vh-(56px/2)-4px)] w-[calc(50%-4px)] relative mx-auto  portrait:h-[50vh] landscape:h-[50vh]"
              style={{ backgroundImage: `url(${card.image})` }}
            ></div> */}

            <div className="bg-black bg-opacity-50 w-180 min-h-75 text-center mx-auto">
              {showTranslation && (
                <div className="w-full text-center text-white text-2xl">
                  {card[translatedField] ? card[translatedField] : card.nameEn}
                </div>
              )}

              <div
                className={`w-full text-center text-white text-2xl ${genderClass}`}
              >
                {card[extraField] && card[extraField].gender && (
                  <span>({genders[genderLanguage]}) </span>
                )}

                {card[nameField]}
              </div>

              {isChinese && (
                <div className="w-full text-center text-white text-2xl">
                  {card.pinyin}
                </div>
              )}
              {card[extraField] && card[extraField].pronunciation && (
                <div className="w-full text-center text-white text-2xl">
                  {card[extraField].pronunciation}
                </div>
              )}

              <IconButton color="primary" onClick={() => play(card)}>
                <PlayCircleOutlineIcon />
              </IconButton>

              {user && user.admin && (
                <IconButton
                  color="primary"
                  component="a"
                  href={`/card-update/${card.id}`}
                  target="_blank"
                >
                  <EditIcon />
                </IconButton>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={goToNextCard} color="primary">
              Continuar
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <div className="flex flex-wrap">
        {cardOptions.map((cardOption) => {
          return (
            <CardComponent
              card={cardOption}
              key={cardOption.id}
              onClick={() => selectAnswer(cardOption)}
              border={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Game;
