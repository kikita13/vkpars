import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import { store } from "@redux/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}
