"use strict";
// const { ExpressOIDC } = require('@okta/oidc-middleware');
Object.defineProperty(exports, "__esModule", { value: true });
// const OktaJwtVerifier = require('@okta/jwt-verifier');
// const oktaJwtVerifier = new OktaJwtVerifier({
//   clientId: '0oafvaqmsRtxLk6nS356',
//   issuer: 'https://dev-246708.okta.com/oauth2/default',
// // tslint:disable-next-line: object-literal-sort-keys
//   assertClaims: {
//     aud: 'api://default',
//   },
// });
function authenticationRequired(req, res, next) {
    var authHeader = req.headers.authorization || '';
    var match = authHeader.match(/Bearer (.+)/);
    if (!match) {
        return res.status(401).send('Error: No authHeaders').end();
    }
    var accessToken = match[1];
    // return oktaJwtVerifier.verifyAccessToken(accessToken)
    //   .then((jwt: any) => {
    //     req.jwt = jwt;
    //     next();
    //   })
    //   .catch((err: Error) => {
    //     res.status(401).send(err.message);
    //   });
}
exports.default = authenticationRequired;
