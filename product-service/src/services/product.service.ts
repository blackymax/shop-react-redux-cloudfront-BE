import { TABLE_NAMES } from '../constants';
import { connectToDB } from '../utils/dbconnect';

class ProductService {
    async createProduct(title: string, description: string, price: number) {
        const client = await connectToDB();
        const { rows } = await client.query(
            `insert into ${TABLE_NAMES.products}(title, price, description) values
            ($1, $2, $3)
            returning id`,
            [title, price, description]
        );
        return rows[0];
    }

    async getProductList() {
        const client = await connectToDB();
        const { rows } = await client.query(
            `select * from ${TABLE_NAMES.products}`
        );
        return rows;
    }

    async getProductById(id: string) {
        const client = await connectToDB();
        const { rows } = await client.query(
            `select id, title, description, price, count from ${TABLE_NAMES.products}
            inner join ${TABLE_NAMES.stocks} on ${TABLE_NAMES.products}.id=${TABLE_NAMES.stocks}.product_id
            where id = $1`,
            [id]
        );
        return rows[0]
    }
}

const productService = new ProductService();

export default productService;
