import { headers } from '../constants';
import { products } from '../mocks/data';

const getProductList = async () => {

    return {
        body: JSON.stringify(products),
        headers,
        statusCode: 200
    };
};

export const handler = getProductList;
