import React from "react";
import { useRouter } from "next/router";
import { AiFillCheckCircle } from "react-icons/ai";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const Success = ({ order }) => {
  const router = useRouter();

  return (
    <div>
      <div className="p-8 bg-white rounded-md shadow-lg">
        <AiFillCheckCircle className="text-[5rem] fill-emerald-500 mx-auto mb-8" />
        <h1 className="mb-8 text-2xl font-bold text-center">
          Thank you for your purchase!
        </h1>
        <p className="mb-4 text-lg">
          Email sent to :{" "}
          <span className="font-semibold">{order.customer_details.email}</span>
        </p>
        <div className="w-full mb-8 border border-slate-500" />
        <div>
          <div className="flex flex-col gap-4 mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Address</h3>
            {Object.entries(order.customer_details.address).map(
              ([key, value]) => {
                if (value) {
                  return (
                    <p key={key}>
                      {key}: {value}
                    </p>
                  );
                } else {
                  return null;
                }
              }
            )}
          </div>
          <div className="w-full mb-8 border border-slate-500" />
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Products</h3>
            {/* {order.line_items.data.map((item) => (
              <div key={item.id}>
                <p>Product :{item.description}</p>
                <p>Quantity :{item.description}</p>
                <p>Price :{item.description}</p>
              </div>
            ))} */}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 rounded-md bg-[#2d2d2d] text-white"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(params) {
  console.log(params);
  const order = await stripe.checkout.sessions.retrieve(
    params.query.sessionId,
    { expand: ["line_items"] }
  );

  return {
    props: {
      order,
    },
  };
}

export default Success;
