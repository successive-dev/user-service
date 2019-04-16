// const { ExpressOIDC } = require('@okta/oidc-middleware');

// // session support is required to use ExpressOIDC

// const oidc = new ExpressOIDC({
//   appBaseUrl: 'http://localhost:9001',
//   client_id: '0oafvaqmsRtxLk6nS356',
//   // client_secret: 'jGqNwoJOiioBjHoDb1K56gPUEIQ21P6p43TTPCgh',
//   issuer: 'https://dev-246708.okta.com/oauth2/default',
//   scope: 'openid profile',
//   // loginRedirectUri: 'http://localhost:9001'
// });

// export { oidc };
// import { configuration } from '../config';

import { NextFunction, Response, } from 'express';
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: '0oafvaqmsRtxLk6nS356',
  issuer: 'https://dev-246708.okta.com/oauth2/default',
// tslint:disable-next-line: object-literal-sort-keys
  assertClaims: {
    aud: 'api://default',
  },
});

function authenticationRequired(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  if (!match) {
    return res.status(401).send('Error: No authHeaders').end();
  }
  const accessToken = match[1];

  return oktaJwtVerifier.verifyAccessToken(accessToken)
    .then((jwt: any) => {
      req.jwt = jwt;
      next();
    })
    .catch((err: Error) => {
      res.status(401).send(err.message);
    });
}

export default authenticationRequired;
