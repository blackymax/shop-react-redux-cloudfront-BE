import { DYNAMO_DB_TABLE_NAME, TABLE_NAMES } from '../constants';
import { connectToDynamoDB } from '../utils/dynamodb.connect';
import { v4 } from 'uuid';
import {
    GetItemInput,
    GetItemOutput,
    ListTablesInput,
    PutItemInput,
    ScanInput
} from 'aws-sdk/clients/dynamodb';

class ProductProviderDynamoDB {
    async createProduct(
        title: string,
        description: string,
        price: Number,
        count: Number
    ) {
        const client = await connectToDynamoDB();
        try {
            const params = {
                TableName: DYNAMO_DB_TABLE_NAME,
                Item: {
                    id: v4(),
                    title,
                    description,
                    price,
                    count
                }
            };
            const response = await client.put(params).promise();
            console.log(response);
            return params.Item.id;
        } catch (err) {
            console.log('DynamoDB error' + err);
        }
    }

    async getProductList() {
        try {
            const client = await connectToDynamoDB();
            const params: ScanInput = {
                TableName: DYNAMO_DB_TABLE_NAME
            };
            const scanOutput = await client.scan(params).promise();
            return scanOutput.Items;
        } catch (err) {
            console.log('DynamoDB error' + err);
        }
    }

    async getProductById(id: string) {
        try {
            const client = await connectToDynamoDB();
            const params = {
                TableName: DYNAMO_DB_TABLE_NAME,
                Key: { id }
            };
            const response = await client.get(params).promise();
            console.log(response.Item);
            return response.Item;
        } catch (err) {
            console.log('DynamoDB error' + err);
        }
        // const client = await connectToPGDB();
        // const { rows } = await client.query(`
        //     select id, title, description, price, count from ${TABLE_NAMES.products}
        //     inner join ${TABLE_NAMES.stocks} on ${TABLE_NAMES.products}.id=${TABLE_NAMES.stocks}.product_id
        //     where id = $1`,
        //     [id]
        // );
        // return rows[0]
    }

    async getProductFullInfoById(id: string) {
        // const client = await connectToPGDB();
        // const {rows} = await client.query(`
        //     select id, title, description, price, count from ${TABLE_NAMES.products}
        //     inner join ${TABLE_NAMES.stocks} on ${TABLE_NAMES.products}.id=${TABLE_NAMES.stocks}.product_id
        //     where id = $1`,
        //     [id])
        // return rows[0]
    }
}

const productProviderDynamoDB = new ProductProviderDynamoDB();

export default productProviderDynamoDB;
