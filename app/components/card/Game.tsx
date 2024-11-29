import {
  EditIcon,
  CirclePlayIcon,
  CheckCircleIcon,
  CircleXIcon,
} from "lucide-react";

import shuffle from "lodash/shuffle";
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

import { CardDTO } from "~/types/CardDTO";
import { Button } from "../ui/button";
import { Link } from "react-router";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "../ui/dialog";

type ExtraField =
  | "extraCh"
  | "extraDe"
  | "extraEn"
  | "extraFr"
  | "extraIt"
  | "extraPt";

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
  card: CardDTO;
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

const Game = (props: { cards: CardDTO[] }) => {
  const [cards, setCards] = useState<CardDTO[]>([]);
  const [speaker, setSpeaker] = useState("");
  const [cardOptions, setCardOptions] = useState<CardDTO[]>([]);
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

  // const extraField: ExtraField = useMemo(
  //   () =>
  //     isChinese
  //       ? "extraCh"
  //       : (`extra${upperFirst(configuration.learningLanguage)}` as ExtraField),
  //   [isChinese, configuration.learningLanguage]
  // );

  const card = useMemo(() => cards[currentCard], [cards, currentCard]);

  const goToNextCard = useCallback(() => {
    dispatchCurrentCard("next");
    setShowAnswer(false);
  }, []);

  const play = useCallback(
    (card: CardDTO, forceSynthesis = false) => {
      if (!card) {
        return;
      }

      if (card.audio && !forceSynthesis) {
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

      const utterance = new SpeechSynthesisUtterance(card.learningTitle);
      if (learningVoices.length > 0) {
        utterance.voice = learningVoices[0];
        setSpeaker(learningVoices[0].name);
      }

      window.speechSynthesis.speak(utterance);
    },
    [configuration.learningLanguage]
  );

  const selectAnswer = useCallback(
    (selectedCard: CardDTO) => {
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
      audioAnswerElement.volume = 0.02;
      audioAnswerElement.play();

      setTimeout(() => {
        play(selectedCard);
      }, 1000);
    },
    [card, setAnswers, play]
  );

  const preloadAudios = useCallback(async (cards: CardDTO[]) => {
    for (const card of cards) {
      await new Promise((resolve) => {
        if (!card.audio) {
          return;
        }

        const audio = new Audio();
        audio.addEventListener(
          "canplaythrough",
          () => {
            resolve(undefined);
          },
          false
        );
        audio.src = card.audio;
      });
    }
  }, []);

  const preloadImages = useCallback(async (cards: CardDTO[]) => {
    for (const card of cards) {
      await new Promise((resolve) => {
        if (!card.image) {
          return;
        }

        const image = new Image();
        image.onload = () => {
          resolve(undefined);
        };
        image.src = card.image;
      });
    }
  }, []);

  const loadOptions = useCallback(
    (cards: CardDTO[], currentCard: number) => {
      if (!cards || cards.length === 0) {
        return;
      }

      if (!props.cards || props.cards.length === 0) {
        return;
      }

      const tempCards: CardDTO[] = shuffle(props.cards)
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
    if (card?.audio) {
      return;
    }

    play(card);
  }, [card, play]);

  React.useEffect(() => {
    const tempCards = shuffle(props.cards.filter((card) => card.learningTitle));
    setCards(tempCards);
    preloadAudios(tempCards);
    preloadImages(tempCards);
  }, [props, loadOptions, preloadAudios, preloadImages]);

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

  // const genderLanguage: keyof Genders =
  //   `${configuration.learningLanguage}_${card?.[extraField]?.gender}` as keyof Genders;

  let genderClass = "";
  // if (card && card[extraField]?.gender) {
  //   const gender: GenderClass = `gender${card[
  //     extraField
  //   ].gender?.toUpperCase()}` as GenderClass;

  //   const genderClasses = {
  //     genderM: "text-blue-500",
  //     genderF: "text-red-500",
  //     genderN: "text-green-300",
  //   };

  //   if (genderClasses[gender]) {
  //     genderClass = genderClasses[gender];
  //   }
  // }

  return (
    <div>
      <audio src="/audios/wrong-answer.mp3" id="wrong-audio"></audio>
      <audio src="/audios/right-answer.mp3" id="right-audio"></audio>

      {appBarPortal &&
        ReactDOM.createPortal(
          <div className="flex">
            <Button onClick={() => play(card)}>
              <CirclePlayIcon style={{ color: "#fff" }} />
            </Button>

            <Button onClick={() => play(card, true)}>
              <CirclePlayIcon style={{ color: "#fff" }} />
            </Button>
            <div className="flex items-center">{speaker}</div>
          </div>,
          appBarPortal
        )}

      {card && card.audio && (
        <audio src={card.audio} autoPlay id="audio"></audio>
      )}
      {card && answers[card.id] && (
        <Dialog
          onOpenChange={(open) => {
            if (!open) {
              goToNextCard();
            }
          }}
          open={showAnswer}
        >
          <DialogContent className="max-w-screen h-screen ">
            <DialogHeader>
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
                    <CircleXIcon fontSize="large" />
                    Resposta errada
                  </>
                )}
              </DialogTitle>
            </DialogHeader>
            <CardComponent card={card} border={false} />
            {/* <div
              className="bg-center w-full bg-white bg-no-repeat h-[calc(50vh-(56px/2)-4px)] w-[calc(50%-4px)] relative mx-auto  portrait:h-[50vh] landscape:h-[50vh]"
              style={{ backgroundImage: `url(${card.image})` }}
            ></div> */}

            <div className="bg-black bg-opacity-50 w-180 min-h-75 text-center mx-auto">
              {showTranslation && (
                <div className="w-full text-center text-white text-2xl">
                  {card.translatedtitle}
                </div>
              )}

              <div
                className={`w-full text-center text-white text-2xl ${genderClass}`}
              >
                {/* {card[extraField] && card[extraField].gender && (
                  <span>({genders[genderLanguage]}) </span>
                )} */}

                {card.learningTitle}
              </div>

              {isChinese && (
                <div className="w-full text-center text-white text-2xl">
                  {card.pronunciation}
                </div>
              )}
              {/* {card[extraField] && card[extraField].pronunciation && (
                <div className="w-full text-center text-white text-2xl">
                  {card[extraField].pronunciation}
                </div>
              )} */}

              <Button color="primary" onClick={() => play(card)}>
                <CirclePlayIcon />
              </Button>

              {user && user.admin && (
                <Button color="primary" asChild>
                  <Link to={`/card-update/${card.id}`} target="_blank">
                    <EditIcon />
                  </Link>
                </Button>
              )}
            </div>
          </DialogContent>

          <DialogFooter>
            <Button onClick={goToNextCard} color="primary">
              Continuar
            </Button>
          </DialogFooter>
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
