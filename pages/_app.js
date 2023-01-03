import "styles/globals.css";
import { createClient, Provider } from "urql";
import { StateContextProvider } from "lib/context";
import UserLayout from "components/layouts/UserLayout";
const client = createClient({ url: process.env.NEXT_PUBLIC_GRAPHQL_URL });

export default function App({ Component, pageProps }) {
  return (
    <StateContextProvider>
      <Provider value={client}>
        <UserLayout>
          <Component {...pageProps} />
        </UserLayout>
      </Provider>
    </StateContextProvider>
  );
}
