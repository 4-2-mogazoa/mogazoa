import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import React, { ReactNode } from "react";

const queryClient = new QueryClient();

function Providers({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Providers>
				<Component {...pageProps} />
			</Providers>
		</>
	);
}
