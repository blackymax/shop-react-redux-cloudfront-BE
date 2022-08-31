import { ClientConfig } from 'pg';

const { PG_HOST, PG_PORT, PG_DB_NAME, PG_USERNAME, PG_PASSWORD } = process.env;

export const API_URL =
    'https://tz2cj9yrgd.execute-api.eu-west-1.amazonaws.com/dev';

export const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': '*'
};

export const BUCKET_NAME = 'maksim-charnou-products-files';

export const BUCKET_POLICY = {
    Version: '2012-10-17',
    Statement: [
        {
            Sid: 'AddPerm',
            Effect: 'Allow',
            Principal: '*',
            Action: ['s3:*'],
            Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`]
        }
    ]
};

export const BUCKET_URL =
    'https://maksim-charnou-products-files.s3.amazonaws.com';

export const dbOptions: ClientConfig = {
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
