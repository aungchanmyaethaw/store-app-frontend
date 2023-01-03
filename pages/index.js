import { useQuery } from "urql";
import { GET_PRODUCTS } from "graphql/query";
import Link from "next/link";
import Product from "components/Product";
import styled from "styled-components";
import UserLayout from "components/layouts/UserLayout";

export default function Home() {
  const [results] = useQuery({
    query: GET_PRODUCTS,
    variables: {
      sort: "createdAt:desc",
      pagination: { limit: 3 },
    },
  });
  const { data, fetching, error } = results;

  const [latest] = useQuery({
    query: GET_PRODUCTS,
    variables: {
      sort: "createdAt:desc",
      pagination: { limit: 3 },
    },
  });

  const {
    data: latestData,
    fetching: latestFetching,
    error: latestError,
  } = latest;

  if (fetching || latestFetching) {
    return <p>Loading</p>;
  }
  if (error || latestError) {
    return <p>{error.message}</p>;
  }
  const products = data.products.data;
  const latestProducts = latestData.products.data;
  return (
    <>
      <main>
        <section className="mb-4">
          <h1 className="mb-8 text-4xl text-center">Featured</h1>
          <ProductGallery>
            {products.map((product) => (
              <Product key={product.attributes.slug} product={product} />
            ))}
          </ProductGallery>
          <div className="flex justify-center">
            <Link
              className="mx-auto my-8 btn btn-primary btn-sm"
              href="/products"
            >
              See more Products
            </Link>
          </div>
        </section>
        <section>
          <h1 className="mb-8 text-4xl text-center">Latest</h1>
          <ProductGallery>
            {latestProducts.map((product) => (
              <Product key={product.attributes.slug} product={product} />
            ))}
          </ProductGallery>
          <div className="flex justify-center">
            <Link
              className="mx-auto my-8 btn btn-primary btn-sm"
              href="/products"
            >
              See more Products
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

const ProductGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 1em;
`;
