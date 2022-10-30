import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { SQSEvent } from 'aws-lambda';
import productProviderDynamoDB from '../dynamodb-providers/product.provider';
import { HttpResponse } from '../helpers/http-response';
import productProvider from '../providers/product.provider';
import stocksProvider from '../providers/stocks.provider';

const sns = new SNSClient({ region: 'eu-west-1' });

const catalogBatchProcess = async (event: SQSEvent) => {
    const products = event.Records;
    try {
        for await (const data of products) {
            console.log(data);
            const product = data.messageAttributes;

            console.log('Data: ' + JSON.stringify(data));
            console.log('Product: ' + JSON.stringify(data.body));

            const productNew = {
                title: product.title.stringValue || '',
                description: product.description.stringValue || '',
                price: +(product.price.stringValue || ''),
                count: +(product.count.stringValue || '')
            };
            const { title, description, price, count } = productNew;

            console.log(title, description, price, count);

            // await productProviderDynamoDB.createProduct(
            //     title,
            //     description,
            //     price,
            //     count
            // );
            const createdProduct = await productProvider.createProduct(
                title,
                description,
                price
            );
            await stocksProvider.createStock(count, createdProduct.id)

            console.log(process.env.SNS_ARN);

            const publishCommand: PublishCommand = new PublishCommand({
                Subject: 'Products has been created',
                Message: JSON.stringify(productNew),
                TopicArn: process.env.SNS_ARN,
                MessageAttributes: {
                    count: {
                        DataType: 'Number',
                        StringValue: data.messageAttributes.count.stringValue
                    }
                }
            });

            const d = await sns.send(publishCommand);
            console.log(JSON.stringify(d));
        }
        return HttpResponse.success({});
    } catch (err) {
        return HttpResponse.serverError(err);
    }
};

export const handler = catalogBatchProcess;
