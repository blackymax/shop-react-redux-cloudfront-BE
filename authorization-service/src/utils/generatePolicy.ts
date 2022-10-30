import { S3BucketPolicy } from "aws-sdk/clients/accessanalyzer"
import { IAMPolicyAssignment } from "aws-sdk/clients/quicksight"
import { Policy } from "aws-sdk/clients/s3control"


export const generatePolicy = (principalId: any, resource: any, effect = 'Allow') => {
    return {
        principalId: principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource,
                }
            ]
        }
    }
}