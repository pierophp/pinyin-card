const config: any = {
  development: {
    apiUrl: 'http://localhost:5000',
    pinyinApiUrl: 'https://api.pinzi.org',
  },
  production: {
    apiUrl: 'https://cards-api.pinzi.org',
    pinyinApiUrl: 'https://api.pinzi.org',
  },
};

const env = process.env.NODE_ENV as any;

if (!config[env]) {
  throw new Error('Env not configured');
}

export default config[env];
