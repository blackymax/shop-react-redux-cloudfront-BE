import { TABLE_NAMES } from '../constants';
import { connectToDB } from '../utils/dbconnect';

class StocksProvider {
    async createStock(count: number, product_id: string) {
        const client = await connectToDB();
        const { rows } = await client.query(
            `
            insert into ${TABLE_NAMES.stocks}(count, product_id) values
            ($1, $2)
            returning product_id, count`,
            [count, product_id]
        );
        return rows[0];
    }

    async getStock(product_id: string) {
        const client = await connectToDB();
        const { rows } = await client.query(
            `select * from ${TABLE_NAMES.stocks} where id=$1`,
            [product_id]
        );
        return rows[0];
    }
}

const stocksProvider = new StocksProvider();

export default stocksProvider;
