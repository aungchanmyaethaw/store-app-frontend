import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "urql";
import { GET_PRODUCTS, GET_CATEGORIES } from "graphql/query";
import Product from "components/Product";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [results, reexecuteQuery] = useQuery({
    query: GET_PRODUCTS,
    variables: selectedCategory
      ? { filters: { category: { slug: { eq: selectedCategory } } } }
      : null,
  });
  const { data, fetching, error } = results;
  const [categoryResults] = useQuery({
    query: GET_CATEGORIES,
    variables: {},
  });

  function handleCategorySelect(category) {
    setSelectedCategory(category);
    reexecuteQuery({ requestPolicy: "network-only" });
  }

  const {
    data: categoryData,
    fetching: categoryFetching,
    error: categoryError,
  } = categoryResults;

  // const products = data?.products?.data;
  // const categories = categoryData?.categories?.data;

  return (
    <main className="flex gap-8">
      <aside className="w-1/3">
        <ul>
          {!categoryFetching && !categoryError
            ? categoryData.categories.data.map((category) => (
                <li
                  key={category.attributes.slug}
                  className="px-2 py-4 border cursor-pointer border-slate-400 text-slate-800"
                  onClick={() => handleCategorySelect(category.attributes.slug)}
                >
                  {category.attributes.name}
                </li>
              ))
            : null}
        </ul>
      </aside>
      <section className="w-2/3 mb-4">
        <h1 className="mb-8 text-4xl text-center">Latest</h1>
        <ProductGallery>
          {!fetching && !error
            ? data.products.data.map((product) => (
                <Product key={product.attributes.slug} product={product} />
              ))
            : null}
        </ProductGallery>
      </section>
    </main>
  );
};

export default Products;

const ProductGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  grid-gap: 1em;
`;
