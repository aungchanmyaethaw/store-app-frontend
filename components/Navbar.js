import Link from "next/link";
import React from "react";
import { HiShoppingBag } from "react-icons/hi2";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useStoreContext } from "lib/context";

import Cart from "./Cart";

const Navbar = () => {
  const { showCart, setShowCart, totalQty } = useStoreContext();
  return (
    <NavStyled className="container mx-auto">
      <Link href="/">My Store</Link>
      <NavItems>
        <li
          onClick={() => setShowCart(true)}
          className="p-2 text-red-700 bg-red-100 rounded-lg shadow hover:shadow-md hover:bg-red-200"
        >
          {totalQty > 0 ? (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
              {totalQty}
            </motion.span>
          ) : null}
          <HiShoppingBag />
        </li>
      </NavItems>
      <AnimatePresence>{showCart ? <Cart /> : null}</AnimatePresence>
    </NavStyled>
  );
};

export default Navbar;

const NavStyled = styled.nav`
  min-height: 15vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  a {
    text-decoration: none;
    font-weight: 700;
    font-size: 1.5rem;

    color: #fff;
  }
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  li {
    margin-left: 3rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    cursor: pointer;
  }
  h3 {
    font-size: 0.75rem;
    padding: 0.25rem;
  }
  svg {
    font-size: 1.5rem;
  }
  span {
    background: #ff2626;
    color: white;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.75rem;
    position: absolute;
    right: -10%;
    top: -20%;
    font-weight: 700;
    pointer-events: none;
  }
`;
