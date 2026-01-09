const Sentry = require("@sentry/node");


Sentry.init({
  dsn: process.env.DSN,

  enableLogs: true,

  tracesSampleRate: 1.0, 
  
  sendDefaultPii: true,
});