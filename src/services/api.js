import axios from 'axios'

const api = axios.create({
    baseURL: 'https://69528ac13b3c518fca12fccd.mockapi.io/api/v1/',
    headers: {
        'Content-type' : 'application/json',
    }
})

export const getProducts = () => api.get('/products')
export const getproduct = (id) => api.get(`/products/${id}`)
export const createProduct = (product) => api.post('/products', product)
export const updateProduct = (id, product) => api.put(`/products/${id}`, product)
export const deleteProduct = (id) => api.delete(`/products/${id}`)


export const getOrders = () => api.get('/orders');
export const updateOrder = (id, order) => api.put(`/orders/${id}`, order);
export const createOrder = (order) => api.post('/orders', order);

export default api