import { HttpResponse } from '../helpers/http-response';
import productProvider from '../providers/product.provider';
import stocksProvider from '../providers/stocks.provider';

export const handler = async (event: any) => {
    console.log(event)
    const { title, price, description, count } = event.body;

    try {
        const product = await productProvider.createProduct(title, description, price)
        stocksProvider.createStock(count, product.id)
        const result = productProvider.getProductFullInfoById(product.id)
        return HttpResponse.success(result)
    } catch (err) {
        return HttpResponse.serverError(err)
    }

    
};
