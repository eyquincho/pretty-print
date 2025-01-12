const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(compression());
app.use(cors({ origin: 'https://trello.com' }));
app.use(helmet.contentSecurityPolicy({
  useDefaults: false,
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://*.trellocdn.com", "https://*.trello.com", "https://cdn.skypack.dev https://esm.sh", "https://*.fontawesome.com"],
    imgSrc: ["*"],
    fontSrc: ["*"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://*.trello.com", "https://fonts.googleapis.com", "https://*.fontawesome.com"],
    frameSrc: ["'self'"],
    connectSrc: ["'self'", "https://*.fontawesome.com"],
    objectSrc: ["'none'"],
  },
}));
app.use(helmet.hsts({
  maxAge: 63072000,
  preload: true,
}));
app.use(helmet.originAgentCluster());
app.use(helmet.noSniff());
app.use(helmet.referrerPolicy());

app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    'geolocation=(self "https://trello.com/"), microphone=()'
  );
  next();
});
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const listener = app.listen(process.env.PORT, function () {
  console.info(`Node Version: ${process.version}`);
  console.log('Trello Power-Up Server listening on port ' + listener.address().port);
});

