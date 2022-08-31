import axios from 'axios'
import { API_URL } from '../src/constants'

describe('getProductsById', () => {
    const testId = "bb33337e-3001-4fcb-9882-d712a34e62c6"
    describe('When id is correct', () => {
        test('getProductsById returns 200 OK', async () => {
            await axios.get(`${API_URL}/products/${testId}`).then((response) => {
                expect(response.status).toBe(200)
            })
        })
    })
    describe('When id is not correct', () => {
        test('getProductsById returns 404 not found', async () => {
            await axios.get(`${API_URL}/products/id=1`).catch((error) => {
                expect(error.message).toBe("Request failed with status code 404")
            })
        })
    })
})