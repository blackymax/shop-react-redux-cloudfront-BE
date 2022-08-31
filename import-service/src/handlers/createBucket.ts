import { S3 } from 'aws-sdk';
import { CreateBucketConfiguration } from 'aws-sdk/clients/s3control';
import { BUCKET_NAME, BUCKET_POLICY } from '../constants';

const createBucketIfNotExists = async () => {
    const s3 = new S3();

    const params: S3.CreateBucketRequest = {
        Bucket: BUCKET_NAME
    };
    await s3.createBucket(params, (err, data) => {
        console.log(err, data);
        if (err && err.statusCode == 409) {
            console.log('Bucket has been created already');
        } else {
            console.log('Bucket Created Successfully', data.Location);
        }
    });

    const policyParams: S3.PutBucketPolicyRequest = {
        Bucket: BUCKET_NAME,
        Policy: JSON.stringify(BUCKET_POLICY)
    };

    await s3.putBucketPolicy(policyParams, function (err, data) {
        if (err) {
            console.log('Error', err);
        } else {
            console.log('Success', data);
        }
    });

    await s3.putBucketAcl((data, err) => {
        if (err) {
            console.log('Error', err);
        } else {
            console.log('Success', data);
        }
    })
};

export const handler = createBucketIfNotExists;
