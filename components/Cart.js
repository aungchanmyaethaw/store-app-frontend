"use client";
import React from "react";
import { useStoreContext } from "lib/context";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import connectStripe from "lib/connectStripe";
const Cart = () => {
  const { setShowCart, cartItems, handleOnAdd, handleOnRemove, totalPrice } =
    useStoreContext();

  const handleCheckout = async () => {
    const stripe = await connectStripe();
    const res = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    });
    const data = await res.json();
    console.log(data);
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <CartWrapper
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => setShowCart(false)}
    >
      <CartStyled
        layout
        as={motion.div}
        initial={{ x: "50%" }}
        animate={{ x: 0 }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length < 1 ? (
          <EmptyStyled
            as={motion.div}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1>Shop more and add products to cart 😇</h1>
            <FaShoppingCart />
          </EmptyStyled>
        ) : null}
        {cartItems.length >= 1
          ? cartItems.map((item) => (
              <Card
                layout
                as={motion.div}
                key={item.slug}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <img
                  src={item.image.data.attributes.formats.small.url}
                  alt={item.title}
                />
                <CardInfo>
                  <h3>{item.title}</h3>
                  <h3>{item.price}$</h3>
                  <Quantity>
                    <span>Quantity</span>
                    <button onClick={() => handleOnRemove(item)}>
                      <AiFillMinusCircle />
                    </button>
                    <p>{item.quantity}</p>
                    <button onClick={() => handleOnAdd(item, 1)}>
                      <AiFillPlusCircle />
                    </button>
                  </Quantity>
                </CardInfo>
              </Card>
            ))
          : null}
        <Checkout layout>
          {cartItems.length > 0 ? (
            <div>
              <h3>Subtotal $ {totalPrice}</h3>
              <button onClick={handleCheckout}>Purchase</button>
            </div>
          ) : null}
        </Checkout>
      </CartStyled>
    </CartWrapper>
  );
};

export default Cart;

export const CartWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
`;

export const CartStyled = styled.div`
  width: 100%;
  max-width: 480px;
  background: #f1f1f1;
  padding: 2rem 3rem;
  overflow-y: scroll;
  position: relative;
`;

export const CartItemsStyle = styled.div``;

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  padding: 1rem 2rem;
  margin: 2rem 0rem;
  img {
    width: 8rem;
  }
`;

export const CardInfo = styled.div`
  width: 50%;
  div {
    display: flex;
    justify-content: space-between;
  }
`;

export const EmptyStyled = styled.div`
  /* For the empty cart */
  position: absolute;
  top: 0;
  left: 0;
  /*  */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  svg {
    font-size: 6rem;
    color: var(--secondary);
  }
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0rem;
  button {
    background: transparent;
    border: none;
    display: flex;
    font-size: 1.5rem;
  }
  p {
    width: 1rem;
    text-align: center;
  }
  span {
    color: var(--secondary);
  }
  svg {
    color: #494949;
  }
`;

export const Checkout = styled.div`
  button {
    background: var(--primary);
    padding: 1rem 2rem;
    width: 100%;
    color: white;
    margin-top: 2rem;
    cursor: pointer;
  }
`;
