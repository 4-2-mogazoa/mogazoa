import React, { ReactNode } from "react";

import Header from "../common/menu/Header";

export default function AuthContainer({ children }: { children: ReactNode }) {
	return (
		<div className="size-full bg-[#1c1c22]">
			<div className="flex h-screen items-center justify-center px-[2rem]">
				{children}
			</div>
		</div>
	);
}
