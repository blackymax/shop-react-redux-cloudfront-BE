import { products } from "../mocks/data";

class ProductProvider {
    getList() {
        return products
    }

    getListById(id: string) {
        const product = products.find(
            (item) => item.id === id.toString()
        );

        return product
    }
}

const productProvider = new ProductProvider()

export default productProvider