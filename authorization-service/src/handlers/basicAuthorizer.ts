import { S3 } from 'aws-sdk';
import { CreateBucketConfiguration } from 'aws-sdk/clients/s3control';
import { BUCKET_NAME, BUCKET_POLICY } from '../constants';
import { generatePolicy } from '../utils/generatePolicy';

const basicAuthorizer = async (event: any, ctx: any, cb: any) => {
    console.log(`Event: ${JSON.stringify(event)}`)
    // if (event['type'] !== 'TOKEN') cb('Unauthorized')


    try {
        const authToken = event.authorizationToken;

        const encodedCreds = authToken.split('.')[1]
        console.log(encodedCreds)
        const buff = Buffer.from(encodedCreds, 'base64')
        const plainCreds = JSON.parse(buff.toString('utf-8'));
        const {username, password} = plainCreds

        console.log(plainCreds)
    
        const storedUserPassword = process.env[username];
        const effect = !storedUserPassword || (storedUserPassword !== password) ? 'Deny' : 'Allow'
    
        const policy = generatePolicy(encodedCreds, event.methodArn, effect);
    
        cb(null, policy)
    } catch (err) {
        cb(`Unauthorized : ${err.message}`)
    }
};

export const handler = basicAuthorizer;
