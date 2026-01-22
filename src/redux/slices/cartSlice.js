import { createSlice } from "@reduxjs/toolkit";

const LoadCartFromStorage = () => {
    try {
        const serializedState = localStorage.getItem('cart')
        if(!serializedState) return []

        const parsed = JSON.parse(serializedState)
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

const saveCartToStorage = (cart) => {
    try {
        const serializedState = JSON.stringify(cart)
        localStorage.setItem('cart', serializedState)
    } catch {
        //ignore Writing errors
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: LoadCartFromStorage()
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload
            const existingItem = state.items.find(item => item.id === action.payload.id)

            if(existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({...product, quantity : 1})
            }
            saveCartToStorage(state.items)
        },
        removeFromCart: (state, action) => {
            const id = action.payload
            state.items = state.items.filter(item => item.id !== id)
            saveCartToStorage(state.items)
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload
            const item = state.items.find(item => item.id === id)
            if(item && quantity > 0) {
                item.quantity = quantity
            }
            saveCartToStorage(state.items) 
        },
        clearCart: (state) => {
            state.items = []
            saveCartToStorage(state.items)
        }
    }
})

export const {addToCart, removeFromCart, updateQuantity, clearCart} = cartSlice.actions

// get the total items count
export const selectCartItemsCount = (state) =>
    state.cart.items.reduc((total, item) => total + item.quantity, 0)

export default cartSlice.reducer