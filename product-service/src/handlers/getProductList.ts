import { HttpResponse } from '../helpers/http-response';
import productProvider from '../providers/product.provider';

const getProductList = async () => {
    try {
        const products = await productProvider.getProductList();
        
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
