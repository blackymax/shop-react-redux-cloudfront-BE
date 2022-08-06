import { headers } from '../constants';
import { products } from '../mocks/data';

const getProductsById = async (event: any) => {
    const { id } = event.pathParameters;
    try {
        const product = products.find(
            (item) => item.id === id.toString()
        );
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
