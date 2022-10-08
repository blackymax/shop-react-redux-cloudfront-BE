import { APIGatewayAuthorizerEvent, Context } from 'aws-lambda';
import { HttpResponse } from '../helpers/http-response';
import { generatePolicy } from '../utils/generatePolicy';

const basicAuthorizer = async (event: APIGatewayAuthorizerEvent, context: Context) => {
    console.log(`Event: ${JSON.stringify(event)}`)
    if (event?.type !== 'TOKEN') return HttpResponse.noToken('Unauthorized')

    try {
        const authToken = event?.authorizationToken;

        const encodedCreds = authToken.split(' ')[1]
        console.log(encodedCreds)
        const buff = Buffer.from(encodedCreds, 'base64')
        const plainCreds = buff.toString('utf-8').split(':');
        const [username, password] = plainCreds

        console.log(plainCreds)
    
        const storedUserPassword = process.env[username];
        const effect = !storedUserPassword || (storedUserPassword !== password) ? 'Deny' : 'Allow'
    
        const policy = generatePolicy(encodedCreds, event.methodArn, effect);
        console.log(JSON.stringify(policy))
        return policy
    } catch (err) {
        return HttpResponse.unauthorized(`Unauthorized : ${err.message}`)
    }
};

export const handler = basicAuthorizer;
