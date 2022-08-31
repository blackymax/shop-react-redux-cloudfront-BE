import { handler } from '../src/handlers/importProductsFile';
import { HttpResponse } from '../src/helpers/http-response';

jest.mock('../src/utils/createSignedUrl.ts', () => {
    return { createSignedUrl: (name: string) => name };
});

describe('importProductsFile', () => {
    describe('When importProductsFile had been called', () => {
        const mockedFileName = 'products.csv';
        const mockedEvent = {
            queryStringParameters: {
                name: mockedFileName
            }
        };
        test('getProductsById should return 200 OK', async () => {
            const result = await handler(mockedEvent);
            expect(result).toEqual(HttpResponse.success(mockedFileName));
        });
    });
});
