import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import React, { ReactNode, useState } from "react";

import ModalWrapper from "@/components/common/modal/ModalWrapper";
import { useModalActions, useModalsStore } from "@/store/modal";

function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());
	const modals = useModalsStore();
	const { closeModal } = useModalActions();

	return (
		<>
			<QueryClientProvider client={queryClient}>
				{modals.map((modal) => (
					<ModalWrapper
						id={modal.id}
						key={modal.id}
						onRemove={() => closeModal(modal.id)}
						config={modal.config}
					>
						{modal.content}
					</ModalWrapper>
				))}
				{children}
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
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
