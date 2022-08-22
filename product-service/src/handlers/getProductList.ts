import { HttpResponse } from '../helpers/http-response';
import productProvider from '../providers/product.provider';

const getProductList = async () => {
    try {
        const productsList = productProvider.getList()
        if (productsList) {
            return HttpResponse.success(productsList)
        } else {
            return HttpResponse.notFound()
        }
    } catch (error) {
        return HttpResponse.serverError()
    }
};

export const handler = getProductList;
