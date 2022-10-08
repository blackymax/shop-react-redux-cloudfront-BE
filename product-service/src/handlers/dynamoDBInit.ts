import { v4 } from 'uuid';
import { DYNAMO_DB_TABLE_NAME } from '../constants';
import { connectToDynamoDB } from '../utils/dynamodb.connect';

const products = [
    {
        description: 'Product from script',
        count: 2,
        price: 24,
        title: 'ProductOne'
    },
    {
        description: 'Product from script',
        count: 2,
        price: 15,
        title: 'ProductTitle'
    },
    {
        description: 'Product from script',
        count: 2,
        price: 23,
        title: 'Product'
    }
];

export const handler = async () => {
    const client = await connectToDynamoDB();
    const newProducts = products.map((product) => {
        const { title, description, price, count } = product;
        return {
            PutRequest: {
                Item: {
                    id: v4(),
                    title,
                    description,
                    price,
                    count
                }
            }
        };
    });
    const params = {
        RequestItems: {
            [DYNAMO_DB_TABLE_NAME]: [...newProducts]
        }
    };
    const response = await client.batchWrite(params).promise();
    console.log(response);
};
