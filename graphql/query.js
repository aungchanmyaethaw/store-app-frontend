export const GET_PRODUCTS = `

query getProducts($sort:[String],$pagination:PaginationArg,$filters:ProductFiltersInput)
{
    products(sort:$sort,pagination:$pagination,filters:$filters){
      data{
        id
        attributes{
              title
          description
          price
          slug
          image{
            data{
                      attributes{
              formats
              
            }		
            }
          }
        }
    }
    }
  }
  `;

export const GET_SINGLE_PRODUCT = `query getProducts($slug: String!) {
    products(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          title
          slug
          description
          price
          image {
            data {
              attributes {
                formats
              }
            }
          }
        }
      }
    }
  }
  `;

export const GET_CATEGORIES = `
  query{
    categories{

      data{
        id
        attributes{
           name
           slug
        }
    }
      }
    }



  `;
