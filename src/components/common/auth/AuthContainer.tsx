import React, { ReactNode } from "react";

import Header from "../menu/Header";

export default function AuthContainer({ children }: { children: ReactNode }) {
	return (
		<div className="size-full bg-[#1c1c22]">
			<Header />
			<div className="flex h-screen items-center justify-center px-[2rem]">
				{children}
			</div>
		</div>
	);
}
