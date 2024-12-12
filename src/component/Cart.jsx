import Modal from './UI/modal';
import { useContext } from "react";
import { CartContext } from '../store/CartContext';
import { UserProgressContext } from '../store/UserProgressContext';
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import CartItem from './cartItem';

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx =  useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)
   

    function handleCloseCart(){
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout(){
        userProgressCtx.showCheckout();
        }

    return(
        <Modal className="cart" open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}>
            <h2>Your Cart</h2>
            <div >
            {cartCtx.items.length === 0 && <p id="noItem">No items in cart!</p>}
                <ul>
                {cartCtx.items.map((item) => (
                    <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price}
                    onIncrease={() => cartCtx.addItem(item)}
                    onDecrease={() => cartCtx.removeItem(item.id)}
                    />
                ))}
            </ul>
    
            <p className="cart-total">Cart Total:{currencyFormatter.format(cartTotal)}
            </p>
        </div>
        <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>Close</Button>
       {cartCtx.items.length > 0 && ( 
        <Button onClick={handleGoToCheckout}>Go to Checkout</Button> 
        )}
        </p>
        </Modal>
    )
}