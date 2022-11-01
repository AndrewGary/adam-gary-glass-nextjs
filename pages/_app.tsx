import "../styles/globals.css";
import type { AppProps } from "next/app";
// import { wrapper } from "../store/store";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import { store } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

function App({ Component, ...pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</PersistGate>
		</Provider>
	);
}

export default App;
