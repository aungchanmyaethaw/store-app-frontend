import { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export const useStoreContext = () => {
  return useContext(StoreContext);
};

export const StateContextProvider = ({ children }) => {
  const [productQty, setProductQty] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [totalQty, settotalQty] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);
  function increaseQty() {
    setProductQty((prev) => prev + 1);
  }

  function decreaseQty() {
    setProductQty((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  }

  function handleOnAdd(product, quantity) {
    settotalQty((prevValue) => prevValue + quantity);
    settotalPrice((prevValue) => prevValue + product.price * quantity);
    const existedProduct = cartItems.find((item) => item.slug === product.slug);
    if (existedProduct) {
      setCartItems(
        cartItems.map((item) => {
          if (item.slug === product.slug) {
            return {
              ...existedProduct,
              quantity: existedProduct.quantity + quantity,
            };
          }
          return item;
        })
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  }

  function handleOnRemove(product) {
    settotalQty((prevValue) => prevValue - 1);
    settotalPrice((prevValue) => prevValue - product.price);
    const existedProduct = cartItems.find((item) => item.slug === product.slug);

    if (existedProduct.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.slug !== product.slug));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? {
                ...existedProduct,
                quantity: existedProduct.quantity - 1,
              }
            : item
        )
      );
    }
  }

  const value = {
    productQty,
    cartItems,
    increaseQty,
    decreaseQty,
    handleOnAdd,
    setShowCart,
    showCart,
    handleOnRemove,
    totalQty,
    totalPrice,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default useStoreContext;
