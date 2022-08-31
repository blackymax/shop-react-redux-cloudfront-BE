import { HttpResponse } from '../helpers/http-response';
// import productProvider from '../providers/product.provider';
// import stocksProvider from '../providers/stocks.provider';
import productProviderDynamoDB from '../dynamodb-providers/product.provider'

export const handler = async (event: any) => {
    console.log(event)
    const { title, price, description, count } = event.body;

    try {
        // const product = await productProvider.createProduct(title, description, price)
        // stocksProvider.createStock(count, product.id)
        // const result = productProvider.getProductFullInfoById(product.id)
        const id = await productProviderDynamoDB.createProduct(title, description, price, count)
        if (id) {
            const result = await productProviderDynamoDB.getProductById(id)
            return HttpResponse.success(result)
        }
    } catch (err) {
        console.log(err)
        return HttpResponse.serverError(err)
    }
};
