import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { SQSEvent } from 'aws-lambda';
import productProviderDynamoDB from '../dynamodb-providers/product.provider';
import { HttpResponse } from '../helpers/http-response';

const sns = new SNSClient({region: 'eu-west-1'});

const catalogBatchProcess = async (event: SQSEvent) => {
    const products = event.Records;
    try {
        for await (const data of products) {
            console.log(data)
            const product = data.messageAttributes;
            
            console.log('Data: ' + JSON.stringify(data));
            console.log('Product: ' + JSON.stringify(data.body));

            const productNew = {
                title: product.title.stringValue || '',
                description: product.description.stringValue || '',
                price: +(product.price.stringValue || ''),
                count: +(product.price.stringValue || '')
            };
            const { title, description, price, count } = productNew;

            console.log(title, description, price, count);

            await productProviderDynamoDB.createProduct(
                title,
                description,
                price,
                count
            );
            console.log(process.env.SNS_ARN)

            const publishCommand: PublishCommand = new PublishCommand({
                Subject: 'Products has been created',
                Message: `Successfully added`,
                TopicArn: 'arn:aws:sns:eu-west-1:673313573473:createProductTopic',
            });

            const d = await sns.send(publishCommand)
            console.log(JSON.stringify(d))
        };
        return HttpResponse.success({});
    } catch (err) {
        return HttpResponse.serverError(err);
    }
};

export const handler = catalogBatchProcess;
