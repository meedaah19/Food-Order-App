import Button from './UI/Button';
import logoImg from '../assets/logo.jpg';
import CartContext from '../store/CartContext';
import { useContext } from 'react';
import { UserProgressContext } from '../store/UserProgressContext';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItem, item) => {
    return totalNumberOfItem + item.quantity;
    }, 0);

    function handleShowCart(){
        userProgressCtx.showCart();
    }


    return(
        <header id='main-header'>
            <div id='title'>
                <img src={logoImg} alt="logoimg" />
                <h1>Meedah's kitchen</h1>
            </div>
            <nav>
                <Button onClick={handleShowCart} >Cart ({totalCartItems})</Button>
            </nav>
        </header>
    );
}