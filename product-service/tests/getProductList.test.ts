import axios from 'axios'
import { API_URL } from '../src/constants'

describe('getProductsList', () => {
    describe('When getProductsList had been called', () => {
        test('getProductsById should return 200 OK', async () => {
            await axios.get(`${API_URL}/products`).then((response) => {
                expect(response.status).toBe(200)
            })
        })
    })
})