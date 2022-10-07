import { S3BucketPolicy } from "aws-sdk/clients/accessanalyzer"
import { IAMPolicyAssignment } from "aws-sdk/clients/quicksight"
import { Policy } from "aws-sdk/clients/s3control"


export const generatePolicy = (principalId: any, resource: any, effect = 'Allow') => {
    return {
        principalId,
        policyDocument: {
            Version: Date.now(),
            Statement: [
                {
                    Action: 'execute-api:invoke',
                    Effect: effect,
                    Resource: resource,
                }
            ]
        }
    }
}