import axios from 'axios'
import { API_URL } from '../src/constants'

describe('getProductsById', () => {
    const testId = "7567ec4b-b10c-48c5-9345-fc73c48a80aa"
    describe('When id is correct', () => {
        test('getProductsById returns 200 OK', async () => {
            await axios.get(`${API_URL}/products/${testId}`).then((response) => {
                expect(response.status).toBe(200)
            })
        })
    })
    describe('When id is correct', () => {
        test('getProductsById returns 404 not found', async () => {
            await axios.get(`${API_URL}/products/id=1`).catch((error) => {
                expect(error.message).toBe("Request failed with status code 404")
            })
        })
    })
})