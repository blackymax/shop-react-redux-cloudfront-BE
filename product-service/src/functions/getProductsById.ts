import { Client } from 'pg';
import { dbOptions, headers, TABLE_NAMES } from '../constants';

const getProductsById = async (event: any) => {
    const { id } = event.pathParameters;

    const {rows} = await client.query(`
        select id, title, description, price, count from ${TABLE_NAMES.products}
        inner join ${TABLE_NAMES.stocks} on ${TABLE_NAMES.products}.id=${TABLE_NAMES.stocks}.product_id
        where id = $1
    `, [id])
    const product = rows[0]
    try {
        if (product) {
            return {
                body: JSON.stringify(product),
                headers,
                statusCode: 200
            };
        } else {
            return {
                body: JSON.stringify(id),
                headers,
                statusCode: 404
            };
        }
    } catch (error) {
        return {
            body: JSON.stringify(id),
            headers,
            statusCode: 404
        };
    }
};

export const handler = getProductsById;
