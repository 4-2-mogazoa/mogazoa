import React, { ReactNode } from "react";

export default function AuthContainer({ children }: { children: ReactNode }) {
	return (
		<div className="w-full bg-[#1c1c22]">
			<div className="flex items-center justify-center px-[2rem]">
				{children}
			</div>
		</div>
	);
}
