import axios from 'axios';
import { API_URL } from '../src/constants';

describe('createProduct', () => {
    describe('When createProduct had been called', () => {
        const testProduct = {
            title: 'DB product',
            description: 'product',
            price: 24,
            count: 2
        }
        test('createProduct should return 200 OK', async () => {
            await axios
                .post(`${API_URL}/products`, testProduct)
                .then((response) => {
                    expect(response.status).toBe(200);
                    expect(response.data.title).toEqual(testProduct.title);
                    expect(response.data.description).toEqual(testProduct.description);
                    expect(response.data.price).toEqual(testProduct.price);
                    expect(response.data.count).toEqual(testProduct.count);
                });
        });
    });
});
