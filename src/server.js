require('dotenv').config('../.env');

import App from './app.js';
import http from 'http';

const app = new App();

var PORT = process.env.PORT || 3337;

const server = http.createServer(app.app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
