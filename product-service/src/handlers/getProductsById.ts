import productProviderDynamoDB from '../dynamodb-providers/product.provider';
import { HttpResponse } from '../helpers/http-response';
// import productProvider from '../providers/product.provider';

const getProductsById = async (event: any) => {
    const { id } = event.pathParameters;
    try {
        // const product = await productProvider.getProductById(id)
        const product = await productProviderDynamoDB.getProductById(id)
        if (product) {
            return HttpResponse.success(product);
        } else {
            return HttpResponse.notFound()
        }
    } catch (err) {
        return HttpResponse.serverError(err);
    }
};

export const handler = getProductsById;
