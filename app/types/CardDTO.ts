export type CardDTO = {
  id: number;
  learningTitle: string;
  translatedtitle: string;
  pronunciation?: string;
  image: string | null;
  audio: string | null;
  gender: string | null;
};
