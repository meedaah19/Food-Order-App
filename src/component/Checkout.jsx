import { useContext } from "react";
import Modal from "./UI/modal";
import { CartContext } from "../store/CartContext";
import Input from "./UI/Input"; 
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import ErrorPage from "./ErrorPage";
import { currencyFormatter } from "../util/formatting";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};


export default function Checkout(){
   const cartCtx = useContext(CartContext);
   const userProgressCtx = useContext(UserProgressContext);

   const {data, isLoading: isSending, error, sendRequest, clearData} = useHttp('http://localhost:3000/orders', requestConfig);

   const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

function handleClose(){
    userProgressCtx.hideCheckout();
}

function  handleFinish(){
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData()
}

function handleSubmit(event){
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
        JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        })
    );
}

let actions = (
    <>
    <Button id="button" textOnly type="button" onClick={handleClose}>Close</Button>
    <Button id="button" >Submit order</Button>
            </>
);

if (isSending) {
    actions = <span>Sending order data...</span>;
}
if (data && !error) {
    return <Modal open = {userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
        <h2>Hooray! </h2>
        <p>We're preparing your meal with love and care.</p>
        <p> We'll notify you as soon as it's ready.</p>
        <p className="modal-actions">
            <button id="button" onClick={handleFinish}>Okay</button>
        </p>

    </Modal>
}

    return(
     <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(cartTotal)}</p>

        <Input label= 'Full Name' type='text' id='name' />
        <Input label= 'E-mail Address' type='email' id='email' />
        <Input label= 'Street' type='text' id='street' />
        <div className="control-row">
            <Input label='Postal Code' type='text' id="postal-code"/>
            <Input label='City' type='text' id="city"/>
        </div>

        {error && <ErrorPage title='Failed to submit order' message={error} />}
        <p className="modal-actions">{actions}</p>
        </form>
    </Modal>
    )
}