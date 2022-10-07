"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbOptions = exports.BUCKET_URL = exports.BUCKET_POLICY = exports.BUCKET_NAME = exports.headers = exports.API_URL = void 0;
var _a = process.env, PG_HOST = _a.PG_HOST, PG_PORT = _a.PG_PORT, PG_DB_NAME = _a.PG_DB_NAME, PG_USERNAME = _a.PG_USERNAME, PG_PASSWORD = _a.PG_PASSWORD;
exports.API_URL = 'https://tz2cj9yrgd.execute-api.eu-west-1.amazonaws.com/dev';
exports.headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': '*'
};
exports.BUCKET_NAME = 'maksim-charnou-products-files';
exports.BUCKET_POLICY = {
    Version: '2012-10-17',
    Statement: [
        {
            Sid: 'AddPerm',
            Effect: 'Allow',
            Principal: '*',
            Action: ['s3:*'],
            Resource: ["arn:aws:s3:::".concat(exports.BUCKET_NAME, "/*")]
        }
    ]
};
exports.BUCKET_URL = 'https://maksim-charnou-products-files.s3.amazonaws.com';
exports.dbOptions = {
    host: PG_HOST,
    port: Number(PG_PORT) || 5432,
    database: PG_DB_NAME,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 2000
};
//# sourceMappingURL=constants.js.map