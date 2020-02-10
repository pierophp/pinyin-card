export default function getConfiguration() {
  const defaultConfiguration = {
    learningLanguage: 'en',
  };

  const configuration = localStorage.getItem('configuration')
    ? JSON.parse(localStorage.getItem('configuration') as string)
    : {};

  return {
    ...defaultConfiguration,
    ...configuration,
  };
}
