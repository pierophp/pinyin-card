const config = {
  development: {
    apiUrl: 'http://localhost:5000',
    pinyinApiUrl: 'https://api.pinzi.org',
  },
  production: {
    apiUrl: 'https://cards-api.pinzi.org',
    pinyinApiUrl: 'https://api.pinzi.org',
  },
};

if (!config[process.env.NODE_ENV]) {
  throw new Error('Env not configured');
}

export default config[process.env.NODE_ENV];
