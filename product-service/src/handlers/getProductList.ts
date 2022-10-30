// import productProviderDynamoDB from '../dynamodb-providers/product.provider';
import { HttpResponse } from '../helpers/http-response';
import productProvider from '../providers/product.provider';

const getProductList = async () => {
    try {
        const products = await productProvider.getProductList();
        // const products = await productProviderDynamoDB.getProductList()
        console.log(products)
        if (products) {
            return HttpResponse.success(products);
        } else {
            return HttpResponse.notFound()
        }
    } catch (err) {
        return HttpResponse.serverError(err)
    }
};

export const handler = getProductList;
