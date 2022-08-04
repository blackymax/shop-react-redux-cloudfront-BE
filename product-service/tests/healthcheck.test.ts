import axios from 'axios'
import { API_URL } from '../src/constants'

test('healthcheck returns 200 OK', async () => {
    await axios.get(`${API_URL}/healthcheck`).then((response) => {
        expect(response.status).toBe(200)
    })
})
