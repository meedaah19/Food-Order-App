import { useState, useEffect } from "react";
import Cart from "./component/Cart";
import Checkout from "./component/Checkout";
import Header from "./component/Header";
import Meals from "./component/Meals";
import { CartContextProvider } from "./store/CartContext";
import UserProgressContextProvider from "./store/UserProgressContext";
import LoadingSpinner from "./component/LoadingPage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
        setLoading(false); 
    }, 4000);

    return () => clearTimeout(timer); 
}, []);

  return (
    <>
    {loading && <LoadingSpinner />} 
    {!loading && (
    <UserProgressContextProvider>
    <CartContextProvider>
    <Header/>
    <Meals/>
    <Cart/>
    <Checkout/>
    </CartContextProvider>
    </UserProgressContextProvider>
    )}
    </>
  );
}

export default App;
