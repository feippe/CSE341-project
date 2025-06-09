const OAuth2Server = require('oauth2-server');
const oauthModel = require('../data/oauth');
const { Request, Response } = OAuth2Server;

const oauth = new OAuth2Server({
    model: oauthModel,
    accessTokenLifetime: 3600,
    allowBearerTokensInQueryString: true,
});

const token = (req, res) => {
    const request = new Request(req);
    const response = new Response(res);

    oauth.token(request, response)
        .then(token => {
            res.json(token);
        })
        .catch(err => {
            res.status(err.code || 500).json(err);
        });
};

const authenticate = (req, res, next) => {
    const request = new Request(req);
    const response = new Response(res);

    oauth.authenticate(request, response)
        .then(token => {
            req.user = token.user;
            next();
        })
        .catch(err => {
            res.status(err.code || 500).json(err);
        });
};

module.exports = {
    token,
    authenticate
};
