import "../styles/globals.css";
import type { AppProps } from "next/app";
// import { wrapper } from "../store/store";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import { store } from '../store/store';

function App({ Component, ...pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

export default App;
