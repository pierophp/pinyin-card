export type Languages = "en" | "fr" | "de" | "it" | "pt" | "cht" | "chs";

export type Configuration = {
  learningLanguage: Languages;
};

const defaultConfiguration: Configuration = {
  learningLanguage: "en",
};

export default function getConfiguration(): Configuration {
  const configuration = localStorage.getItem("configuration")
    ? JSON.parse(localStorage.getItem("configuration") as string)
    : {};

  return {
    ...defaultConfiguration,
    ...configuration,
  };
}
