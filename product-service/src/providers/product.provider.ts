import { TABLE_NAMES } from '../constants';
import { connectToPGDB } from '../utils/pgdb.connect';

class ProductProvider {    
    async createProduct(title: string, description: string, price: number) {
        const client = await connectToPGDB();
        const { rows } = await client.query(
            `insert into ${TABLE_NAMES.products}(title, price, description) values
            ($1, $2, $3)
            returning id`,
            [title, price, description]
        );
        return rows[0];
    }

    async getProductList() {
        const client = await connectToPGDB();
        const { rows } = await client.query(
            `select * from ${TABLE_NAMES.products}`
        );
        return rows;
    }

    async getProductById(id: string) {
        const client = await connectToPGDB();
        const { rows } = await client.query(`
            select id, title, description, price, count from ${TABLE_NAMES.products}
            inner join ${TABLE_NAMES.stocks} on ${TABLE_NAMES.products}.id=${TABLE_NAMES.stocks}.product_id
            where id = $1`,
            [id]
        );
        return rows[0]
    }

    async getProductFullInfoById(id: string) {
        const client = await connectToPGDB();
        const {rows} = await client.query(`
            select id, title, description, price, count from ${TABLE_NAMES.products}
            inner join ${TABLE_NAMES.stocks} on ${TABLE_NAMES.products}.id=${TABLE_NAMES.stocks}.product_id
            where id = $1`,
            [id])
        return rows[0]
    }
}

const productProvider = new ProductProvider();

export default productProvider;
