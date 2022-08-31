import { HttpResponse } from '../helpers/http-response';
import { createSignedUrl } from '../utils/createSignedUrl';

const importProductsFile = async (event: any) => {
    try {
        const url = await createSignedUrl(event.queryStringParameters.name)
        return HttpResponse.success(url)
    } catch (err) {
        return HttpResponse.serverError(err)
    }
};

export const handler = importProductsFile;
