export type Languages = "en" | "fr" | "de" | "it" | "pt" | "cht" | "chs";

export type Configuration = {
  learningLanguage: Languages;
  voice?: string;
};

const defaultConfiguration: Configuration = {
  learningLanguage: "en",
  voice: undefined,
};

export default function getConfiguration(): Configuration {
  // const configuration = localStorage.getItem("configuration")
  //   ? JSON.parse(localStorage.getItem("configuration") as string)
  //   : {};
  const configuration = {};

  return {
    ...defaultConfiguration,
    ...configuration,
  };
}
