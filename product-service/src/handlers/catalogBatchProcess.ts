import { SNS } from 'aws-sdk';
import { PublishInput } from 'aws-sdk/clients/sns';
import productProviderDynamoDB from '../dynamodb-providers/product.provider';
import { HttpResponse } from '../helpers/http-response';
import { isJson } from '../utils/isJson';

const catalogBatchProcess = (event: any, context: any, cb: any) => {
    const sns = new SNS();
    const products = event.Records;
    try {
        products.forEach(async (data: any) => {
            const product = isJson(data.messageAttributes)
                ? JSON.parse(data.messageAttributes)
                : data.messageAttributes;
            console.log('Data: ' + JSON.stringify(data));
            console.log('Product: ' + data.body);
            const productNew = {
                title: product.title.stringValue,
                description: product.description.stringValue,
                price: product.price.stringValue,
                count: product.count.stringValue
            };
            const { title, description, price, count } = productNew;
            console.log(title, description, price, count);
            productProviderDynamoDB.createProduct(
                title,
                description,
                price,
                count
            );
        });
        const publishParams: PublishInput = {
            Subject: 'Products has been created',
            Message: "Success",
            // MessageAttributes: products[0],
            TopicArn: 'arn:aws:sns:eu-west-1:673313573473:createProductTopic'
        };
        sns.publish(publishParams, (err, data) => {
            if (err) {
                console.log('SNS:ERROR: ' + JSON.stringify(err));
            } else {
                console.log('SNS:DATA: ' + JSON.stringify(data));
            }
        })
        cb(null, HttpResponse.success({}));
    } catch (err) {
        cb(null, HttpResponse.serverError(err));
    }
};

export const handler = catalogBatchProcess;
