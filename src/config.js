const config = {
  development: {
    apiUrl: 'http://localhost:5000',
  },
  production: {
    apiUrl: 'http://138.197.224.37:5050',
  },
};

if (!config[process.env.NODE_ENV]) {
  throw new Error('Env not configured');
}

export default config[process.env.NODE_ENV];
