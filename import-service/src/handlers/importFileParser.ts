import { S3, SQS } from 'aws-sdk';

import { BUCKET_NAME } from '../constants';
import { parse } from 'csv-parse';
import { buildMessageAttributes } from '../utils/buildMessageAttrs';
import { S3EventRecord } from 'aws-lambda';

const sqs = new SQS();
const s3 = new S3({ region: 'eu-west-1' });

const region = process.env.SQS_QUEUE_URL?.split(':')[3]
const queueId = process.env.SQS_QUEUE_URL?.split(':')[4]
const queueName = process.env.SQS_QUEUE_URL?.split(':')[5]

type S3FilesUploadEvent = {
    Records: S3EventRecord[]
}

const importFileParser = (event: S3FilesUploadEvent) => {

    const key = event.Records[0].s3.object.key;

    console.log(event)

    const params:S3.GetObjectRequest = {
        Bucket: BUCKET_NAME,
        Key: key,
        
    };

    console.log(key)

    const stream = s3.getObject(params).createReadStream();

    const results: any[] = [];
    stream
        .pipe(parse())
        .on('data', (chunk) => {
            const [title, description, price, count] = chunk;
            const messageattrs = buildMessageAttributes(title, description, price, count);
            console.log('SQS ARN', process.env.SQS_QUEUE_URL)
            sqs.sendMessage(
                {
                    QueueUrl: `https://sqs.${region}.amazonaws.com/${queueId}/${queueName}`,
                    MessageBody: "Current product was created",
                    MessageAttributes: messageattrs
                },
                (error, data) => {
                    if (error) {
                        console.log(error, data);
                    } else {
                        console.log('Send chunk to SQS' + chunk);
                    }
                }
            );
            results.push(chunk);
            console.log('ROW: ' + chunk);
        })
        .on('end', () => {
            console.log('END: ' + results);
            const uploadParams = {
                Bucket: BUCKET_NAME,
                Key: `parsed/${key.split('/')[1]}`,
                Body: results.join('\r\n'),
                ContentType: 'text/csv'
            };
            s3.upload(uploadParams)
                .promise()
                .then(console.log)
                .catch(console.error);
            s3.deleteObject(params).promise();
        })
        .on('error', (err: any) => {
            console.log('ERROR: ' + err);
        });
};

export const handler = importFileParser;
