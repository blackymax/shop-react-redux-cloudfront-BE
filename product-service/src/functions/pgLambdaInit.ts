import { Client } from 'pg';
import { ClientConfig } from 'pg';
import { headers, TABLE_NAMES } from '../constants';

const { PG_HOST, PG_PORT, PG_DB_NAME, PG_USERNAME, PG_PASSWORD } = process.env;

const dbOptions: ClientConfig = {
    host: PG_HOST,
    port: Number(PG_PORT) || 5432,
    database: PG_DB_NAME,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 2000
};

export const handler = async (event: any) => {
    const client = new Client(dbOptions);
    await client.connect()
    try {

        const clearingProductTableIfExist = await client.query(`
            drop table if exists ${TABLE_NAMES.stocks};

            drop table if exists ${TABLE_NAMES.products};

            create extension if not exists "uuid-ossp";
        `)
        const productsTable = await client.query(`
            create table if not exists ${TABLE_NAMES.products} (
                id uuid primary key default uuid_generate_v4(),
                title text,
                description text,
                price integer
            );
        `)
        const stocksTable = await client.query(`
            create table if not exists ${TABLE_NAMES.stocks} (
                count integer,
                product_id uuid,
                foreign key(product_id) references ${TABLE_NAMES.products}(id)
            );
        `)

        const predefineProducts = await client.query(`
            insert into ${TABLE_NAMES.products} (id, title, description, price) values
            ('7567ec4b-b10c-48c5-9345-fc73c48a80aa', 'ProductOne', 'Short Product Description1', 24),
            ('7567ec4b-b10c-48c5-9345-fc73c48a80a1', 'ProductTitle', 'Short Product Description7', 15),
            ('7567ec4b-b10c-48c5-9345-fc73c48a80a3', 'Product', 'Short Product Description2', 23),
            ('7567ec4b-b10c-48c5-9345-fc73348a80a1', 'ProductTest', 'Short Product Description4', 15),
            ('7567ec4b-b10c-48c5-9445-fc73c48a80a2', 'Product2', 'Short Product Descriptio1', 23),
            ('7567ec4b-b10c-45c5-9345-fc73c48a80a1', 'ProductName', 'Short Product Description7', 15);
        `)

        const predefineStocks = await client.query(`
            insert into ${TABLE_NAMES.stocks} (count, product_id) values
            (2, '7567ec4b-b10c-48c5-9345-fc73c48a80aa'),
            (3, '7567ec4b-b10c-48c5-9345-fc73c48a80a1'),
            (4, '7567ec4b-b10c-45c5-9345-fc73c48a80a1');
        `)

        const { rows: listOfProducts } = await client.query(`select * from ${TABLE_NAMES.products}`);
        return {
            body: listOfProducts,
            headers,
            statusCode: 200
        };

    } catch (err) {
        return {
            body: `No executed${err}`,
            headers,
            statusCode: 404
        };
    } finally {
        client.end()
    }
};
