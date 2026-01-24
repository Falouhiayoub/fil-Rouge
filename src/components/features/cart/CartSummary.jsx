import React from 'react'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../../utils/formatCurrency'


const CartSummary = ({items}) => {
    const navigate = useNavigate()
    const subTotal = items.reduce((total, item) => total + (item.price * item.quantity))
    const tax = subTotal * 0.1 // 10%
    const total = subTotal + tax

    const handleCheckout = () => {
        navigate('/checkout')
    }
    return (
        <div className='cart-summary'>
            <h3>Order Summary</h3>
            <div className="summary-row">
                <span>SubTotal</span>
                <span>{formatCurrency(subTotal)}</span>
            </div>
            <div className='summary-row'>
                <span>Tax 10%</span>
                <span>{formatCurrency(tax)}</span>
            </div>
            <div className="summary-row totalrow">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>Proceed To Checkout</button>
        </div>
    )
}

export default CartSummary
