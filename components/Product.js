import styled from "styled-components";
import Link from "next/link";
const Product = ({ product }) => {
  const { title, price, image, slug } = product.attributes;

  return (
    <ProductStyled>
      <Link href={`/products/${slug}`}>
        <img src={image.data.attributes.formats.small.url} alt={title} />
      </Link>
      <div>
        <h2>{title}</h2>
        <span>{price}</span>
      </div>
    </ProductStyled>
  );
};

export default Product;

const ProductStyled = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  cursor: pointer;

  img {
    width: 100%;
    object-fit: cover;
  }

  h2 {
    padding: 0.5rem 0;
  }
`;
