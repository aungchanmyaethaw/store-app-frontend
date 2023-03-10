import { useQuery } from "urql";
import { GET_SINGLE_PRODUCT } from "graphql/query";
import { useRouter } from "next/router";
import styled from "styled-components";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import Image from "next/image";
import ImageMagnifier from "components/ImageMagnifier";
import useStoreContext from "lib/context";
const ProductDetails = () => {
  const { query } = useRouter();
  const { productQty, increaseQty, decreaseQty, handleOnAdd } =
    useStoreContext();

  const [results] = useQuery({
    query: GET_SINGLE_PRODUCT,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;
  if (fetching) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  const product = data.products.data[0].attributes;
  const { title, description, image, slug } = product;
  return (
    <ProductDetailsStyled>
      {/* <Image
        src={image.data.attributes.formats.medium.url}
        alt={title}
        width={image.data.attributes.formats.medium.width}
        height={image.data.attributes.formats.medium.height}
      /> */}

      <ImageMagnifier
        src={image.data.attributes.formats.medium.url}
        width={image.data.attributes.formats.medium.width}
        height={image.data.attributes.formats.medium.height}
        zoomLevel={1.5}
        magnifieWidth={150}
        magnifierHeight={150}
      />

      <ProductInfo>
        <h2>{title}</h2>
        <p>{description}</p>

        <Quantity>
          <span>Quantity</span>
          <button onClick={decreaseQty}>
            <AiFillMinusCircle />
          </button>
          <p>{productQty}</p>
          <button onClick={increaseQty}>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <CartButtonStyled onClick={() => handleOnAdd(product, productQty)}>
          Add to Cart
        </CartButtonStyled>
      </ProductInfo>
    </ProductDetailsStyled>
  );
};

export default ProductDetails;

const ProductDetailsStyled = styled.main`
  display: flex;
  max-width: 960px !important;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 5rem 0;
  gap: 2em;
  img {
    width: 40%;
  }
`;

const ProductInfo = styled.div`
  width: 40%;
  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    background-color: var(--primary);
    color: white;
    border: none;
    cursor: pointer;
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

const CartButtonStyled = styled.button`
  width: 100%;
  background: var(--primary);
  color: white;
  font-weight: 500;
  &:hover,
  &:active {
    background-color: black;
    box-shadow: 1px 2px 3px #ccc;
  }
`;
