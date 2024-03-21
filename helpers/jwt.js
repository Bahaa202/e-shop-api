const expressJwt = require('express-jwt');
let jwt = require('jsonwebtoken');
let token = jwt.sign({name: 'test'}, 'secret',{algorithm:'HS256'})


function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret, // Pass the secret key
        algorithms: ['HS256'], // Specify the algorithms
        isRevoked: isRevoked,
    }).unless({
        path: [
            { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET','POST', 'OPTIONS'] },
            { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
            { url: /\/api\/v1\/users(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
            `${api}/users/login`,
            `${api}/users/register`,
        ],
    });
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true);
    } else {
        done(); // Don't revoke for admin users
    }
}

module.exports = authJwt;
