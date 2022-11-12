import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { persistor, store } from '../store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from 'next-auth/react';

function App({ Component, pageProps: { session, ...pageProps} }: AppProps) {
	return (
		<SessionProvider session={session}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</PersistGate>
			</Provider>
		</SessionProvider>
	);
}

export default App;