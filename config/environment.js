/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'oik-html-frontend',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      EXTEND_PROTOTYPES: {
      Date: false,
    },
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };
  
  ENV['ember-simple-auth'] = {
        authorizer: 'authorizer:token'
  };

  //  (JWT) Configuration
  ENV['ember-simple-auth-token'] = {
  serverTokenEndpoint: '/api/login',
  identificationField: 'username',
  passwordField: 'password',
  tokenPropertyName: 'token',
  authorizationPrefix: 'Bearer ',
  authorizationHeaderName: 'Authorization',
  headers: {},
  refreshAccessTokens: true,
  serverTokenRefreshEndpoint: '/api/token-refresh',
  tokenExpireName: 'exp',
  refreshLeeway: 0,
  timeFactor: 1000  // example - set to "1000" to convert incoming seconds to milliseconds.
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
