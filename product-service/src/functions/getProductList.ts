import { Client } from 'pg';
import { dbOptions, headers, TABLE_NAMES } from '../constants';

const getProductList = async () => {
    const client = new Client(dbOptions);
    await client.connect();

    const {rows} = await client.query(
        `select * from ${TABLE_NAMES.products}`
    );

    return {
        body: JSON.stringify(rows),
        headers,
        statusCode: 200
    };
};

export const handler = getProductList;
