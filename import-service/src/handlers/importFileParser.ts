import { S3 } from 'aws-sdk';
import { BUCKET_NAME } from '../constants';
import { parse } from 'csv-parse';

const importFileParser = (event: any) => {
    const s3 = new S3({ region: 'eu-west-1' });

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
            results.push(chunk);
            console.log('ROW: ' + chunk);
        })
        .on('end', () => {
            console.log('END: ' + results);
            const uploadParams = {
                Bucket: BUCKET_NAME,
                Key: `parsed/${key.split('/')[1]}`,
                Body: results.join("\r\n"),
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
