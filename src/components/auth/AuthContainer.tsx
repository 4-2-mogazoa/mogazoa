import React, { ReactNode } from "react";

import Header from "../common/menu/Header";

export default function AuthContainer({ children }: { children: ReactNode }) {
	return (
		<div className="w-full bg-[#1c1c22]">
			<Header />
			<div className="flex h-screen items-center justify-center overflow-auto p-[2rem]">
				{children}
			</div>
		</div>
	);
}
