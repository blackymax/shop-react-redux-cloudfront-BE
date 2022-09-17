import { S3, SQS } from 'aws-sdk';
import { BUCKET_NAME } from '../constants';
import { parse } from 'csv-parse';
import { MessageAttributeValue } from 'aws-sdk/clients/sqs';
import { buildMessageAttributes } from '../utils/buildMessageAttrs';

const importFileParser = (event: any) => {
    const s3 = new S3({ region: 'eu-west-1' });
    const sqs = new SQS();

    const key = event.Records[0].s3.object.key;

    const params = {
        Bucket: BUCKET_NAME,
        Key: key
    };

    const stream = s3.getObject(params).createReadStream();

    const results: any[] = [];
    stream
        .pipe(parse())
        .on('data', (chunk) => {
            const [title, description, price, count] = chunk;
            const messageattrs = buildMessageAttributes(title, description, price, count);
            sqs.sendMessage(
                {
                    QueueUrl:
                        'https://sqs.eu-west-1.amazonaws.com/673313573473/catalogItemsQueue',
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
