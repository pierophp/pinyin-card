const languagesPriorities: {
  [language: string]: string;
} = {
  chs: "zh-CN",
  cht: "zh-TW",
  de: "de-DE",
  en: "en-US",
  fr: "fr-FR",
  it: "it-IT",
  pt: "pt-BR",
};

export function filterVoices(
  voices: SpeechSynthesisVoice[],
  language: string
): SpeechSynthesisVoice[] {
  const languages: {
    [language: string]: string;
  } = {
    chs: "zh",
    cht: "zh",
  };
  const voiceFilter = languages[language] ?? language;

  let learningVoices = voices.filter((voice) =>
    voice.lang.startsWith(voiceFilter)
  );

  const languagesPriority = languagesPriorities[language];

  const preferredVoices = learningVoices.filter(
    (voice) => languagesPriority && voice.lang === languagesPriority
  );

  if (preferredVoices.length > 0) {
    learningVoices = preferredVoices;
  }

  return learningVoices;
}
