import React from "react";
import Head from "next/head";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
const UserLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>My Store</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default UserLayout;
