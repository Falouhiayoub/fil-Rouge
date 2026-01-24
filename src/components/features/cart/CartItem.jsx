import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../../redux/slices/cartSlice";
import { formatCurrency } from '../../../utils/formatCurrency'

import React from 'react'

const CartItem = ({item}) => {
    const disptach = useDispatch()

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value)
        if(!isNaN(newQuantity) && newQuantity > 0) {
            disptach(updateQuantity({id: item.id, quantity: newQuantity}))
        }
    }

    const handleRemove = () => {
        disptach(removeFromCart(item.id))
    }
  return (
    <div className="cart-item">
        <img src= {item.image} alt= {item.name} className="cart-item-image"/>
        <div className="cart-item-details">
            <h3 className="cart-item-title">{item.title}</h3>
            <p className="cart-item-price">{formatCurrency(item.price)}</p>
        </div>
        <div className="cart-item-actions">
            <input type="number" 
                min="1"
                value={item.quantity}
                onChange={handleQuantityChange}
                className="quantity-input"
            />
            <button className="remove-btn" onClick={handleRemove}>Remove</button>
        </div>
        <div className="cart-item-total">
            {formatCurrency(item.price * item.quantity)}
        </div>
    </div>
  )
}

export default CartItem
