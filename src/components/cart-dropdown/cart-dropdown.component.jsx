import './cart-dropdown.style.scss';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import { useContext } from 'react';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.length ? (
                    cartItems.map((cartItem) => (
                        <CartItem key={cartItem.id} cartItem={cartItem} />
                    ))
                ) : (
                    <span className='empty-message'>Your cart is empty</span>
                )}
            </div>
            <Button>GO TO CHECK OUT</Button>
        </div>
    );
}

export default CartDropdown;