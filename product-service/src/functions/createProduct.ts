import { Client } from 'pg';
import { dbOptions, headers, TABLE_NAMES } from '../constants';

export const handler = async (event: any) => {
    console.log(event)
    const { title, price, description, count } = event.body;

    const client = new Client(dbOptions);
    await client.connect();

    const dataToProvide = await client.query(
        `insert into ${TABLE_NAMES.products}(title, price, description) values
        ($1, $2, $3)
        returning id`,
        [title, price, description]
    );
    await client.query(`insert into ${TABLE_NAMES.stocks}(product_id, count) values ($1, $2)`, [dataToProvide.rows[0].id, count])

    const {rows} = await client.query(`
        select id, title, description, price, count from ${TABLE_NAMES.products}
        inner join ${TABLE_NAMES.stocks} on ${TABLE_NAMES.products}.id=${TABLE_NAMES.stocks}.product_id
        where id = $1
    `, [dataToProvide.rows[0].id])

    return {
        body: rows[0],
        headers,
        statusCode: 200
    };
};
